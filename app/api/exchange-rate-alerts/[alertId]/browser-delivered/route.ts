import { NextRequest, NextResponse } from "next/server";

import {
  createExchangeAlertOwner,
  markExchangeAlertBrowserNotified
} from "@/lib/firestoreExchangeAlerts";
import { getRequestUser, isPreviewGuestUser } from "@/lib/requestUser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  context: { params: { alertId: string } }
) {
  const user = await getRequestUser(request);

  if (!user || isPreviewGuestUser(user.email)) {
    return NextResponse.json(
      { error: "Please sign in before updating exchange-rate alerts." },
      { status: 401 }
    );
  }

  try {
    await markExchangeAlertBrowserNotified(
      createExchangeAlertOwner(user.email, user.name),
      context.params.alertId
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Exchange alert browser delivery update failed:", error);

    return NextResponse.json(
      { error: "Exchange-rate alert could not be updated." },
      { status: 500 }
    );
  }
}
