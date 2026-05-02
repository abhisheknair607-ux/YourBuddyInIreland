import { NextRequest, NextResponse } from "next/server";

import {
  createExchangeAlert,
  createExchangeAlertOwner,
  isExchangeAlertsConfigured,
  listExchangeAlerts
} from "@/lib/firestoreExchangeAlerts";
import { processExchangeRateAlerts } from "@/lib/exchangeRateAlertService";
import { fetchLatestExchangeRate } from "@/lib/exchangeRates";
import { getRequestUser, isPreviewGuestUser } from "@/lib/requestUser";
import { isEmailDeliveryConfigured } from "@/lib/serverMail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getNumber(value: unknown) {
  return typeof value === "number"
    ? value
    : typeof value === "string"
      ? Number(value)
      : NaN;
}

function isBoolean(value: unknown) {
  return value === true;
}

export async function GET(request: NextRequest) {
  const user = await getRequestUser(request);

  if (!user || isPreviewGuestUser(user.email)) {
    return NextResponse.json(
      { error: "Please sign in before using exchange-rate alerts." },
      { status: 401 }
    );
  }

  if (!isExchangeAlertsConfigured()) {
    return NextResponse.json({
      alertsConfigured: false,
      emailEnabled: isEmailDeliveryConfigured(),
      activeAlerts: [],
      triggeredAlerts: []
    });
  }

  try {
    await processExchangeRateAlerts();

    const owner = createExchangeAlertOwner(user.email, user.name);
    const alerts = await listExchangeAlerts(owner);
    const currentRate = await fetchLatestExchangeRate().catch(() => null);

    return NextResponse.json({
      alertsConfigured: true,
      emailEnabled: isEmailDeliveryConfigured(),
      currentRate,
      activeAlerts: alerts.filter((alert) => alert.status === "active"),
      triggeredAlerts: alerts.filter((alert) => alert.status === "triggered")
    });
  } catch (error) {
    console.error("Exchange alert listing failed:", error);

    return NextResponse.json(
      { error: "Exchange-rate alerts could not be loaded." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await getRequestUser(request);

  if (!user || isPreviewGuestUser(user.email)) {
    return NextResponse.json(
      { error: "Please sign in before saving exchange-rate alerts." },
      { status: 401 }
    );
  }

  if (!isExchangeAlertsConfigured()) {
    return NextResponse.json(
      { error: "Exchange-rate alerts are not configured yet." },
      { status: 503 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const payload = body as {
    targetRate?: unknown;
    browserEnabled?: unknown;
  };
  const targetRate = getNumber(payload.targetRate);

  if (!Number.isFinite(targetRate) || targetRate <= 0) {
    return NextResponse.json(
      { error: "Enter a valid EUR/INR target rate." },
      { status: 400 }
    );
  }

  try {
    const currentRate = await fetchLatestExchangeRate(true);

    if (Math.abs(currentRate.eurToInr - targetRate) < 0.0001) {
      return NextResponse.json(
        { error: "This target is already met at the current ECB rate." },
        { status: 400 }
      );
    }

    const alert = await createExchangeAlert(
      createExchangeAlertOwner(user.email, user.name),
      {
        targetRate,
        currentRateAtCreation: currentRate.eurToInr,
        direction: targetRate > currentRate.eurToInr ? "above" : "below",
        channels: {
          email: isEmailDeliveryConfigured(),
          browser: isBoolean(payload.browserEnabled),
          inApp: true
        }
      }
    );

    return NextResponse.json({
      alert,
      currentRate
    });
  } catch (error) {
    console.error("Exchange alert creation failed:", error);

    return NextResponse.json(
      { error: "Exchange-rate alert could not be saved." },
      { status: 500 }
    );
  }
}
