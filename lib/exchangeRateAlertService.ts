import {
  isExchangeAlertsConfigured,
  listActiveExchangeAlerts,
  markExchangeAlertTriggered
} from "@/lib/firestoreExchangeAlerts";
import { fetchLatestExchangeRate } from "@/lib/exchangeRates";
import type { ExchangeAlert } from "@/lib/exchangeRateTypes";
import { isEmailDeliveryConfigured, sendSmtpMail } from "@/lib/serverMail";

const PROCESS_INTERVAL_MS = 5 * 60 * 1000;

let processingPromise: Promise<void> | null = null;
let lastProcessedAt = 0;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shouldTriggerAlert(alert: ExchangeAlert, currentRate: number) {
  return alert.direction === "above"
    ? currentRate >= alert.targetRate
    : currentRate <= alert.targetRate;
}

async function sendAlertEmail(alert: ExchangeAlert, currentRate: number, asOf: string) {
  if (!alert.channels.email || !isEmailDeliveryConfigured()) {
    return null;
  }

  const subject = `[Guidon] EUR/INR alert hit ${alert.targetRate.toFixed(2)}`;
  const ownerName = alert.ownerName || alert.ownerEmail;
  const directionText =
    alert.direction === "above" ? "reached or moved above" : "reached or moved below";
  const text = [
    `Hi ${ownerName},`,
    "",
    `Your EUR/INR target of ${alert.targetRate.toFixed(2)} has been hit.`,
    `Current rate: ${currentRate.toFixed(4)} INR per EUR`,
    `Observed on: ${asOf}`,
    "",
    `This means the rate has ${directionText} your alert threshold.`,
    "",
    "Open Guidon and check Currency Check for the latest view."
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <p>Hi ${escapeHtml(ownerName)},</p>
      <p>Your <strong>EUR/INR</strong> target of <strong>${escapeHtml(
        alert.targetRate.toFixed(2)
      )}</strong> has been hit.</p>
      <p><strong>Current rate:</strong> ${escapeHtml(
        currentRate.toFixed(4)
      )} INR per EUR<br /><strong>Observed on:</strong> ${escapeHtml(asOf)}</p>
      <p>The rate has ${
        alert.direction === "above"
          ? "reached or moved above"
          : "reached or moved below"
      } your alert threshold.</p>
      <p>Open Guidon and check Currency Check for the latest view.</p>
    </div>
  `;

  await sendSmtpMail({
    to: alert.ownerEmail,
    subject,
    text,
    html,
    headers: {
      "X-Guidon-Exchange-Alert": alert.id
    },
    fromName: "Guidon Exchange Alerts"
  });

  return new Date().toISOString();
}

async function processExchangeRateAlertsInternal() {
  if (!isExchangeAlertsConfigured()) {
    return;
  }

  const alerts = await listActiveExchangeAlerts();

  if (!alerts.length) {
    return;
  }

  const snapshot = await fetchLatestExchangeRate(true);
  const matchingAlerts = alerts.filter((alert) =>
    shouldTriggerAlert(alert, snapshot.eurToInr)
  );

  if (!matchingAlerts.length) {
    return;
  }

  for (const alert of matchingAlerts) {
    let emailSentAt: string | null = null;

    try {
      emailSentAt = await sendAlertEmail(alert, snapshot.eurToInr, snapshot.asOf);
    } catch (error) {
      console.error("Exchange alert email failed:", error);
    }

    try {
      await markExchangeAlertTriggered(alert, {
        triggeredAt: new Date().toISOString(),
        triggerRate: snapshot.eurToInr,
        emailSentAt
      });
    } catch (error) {
      console.error("Exchange alert trigger save failed:", error);
    }
  }
}

export async function processExchangeRateAlerts(options?: { force?: boolean }) {
  const force = options?.force === true;
  const now = Date.now();

  if (!force && now - lastProcessedAt < PROCESS_INTERVAL_MS) {
    return;
  }

  if (processingPromise) {
    await processingPromise;
    return;
  }

  processingPromise = processExchangeRateAlertsInternal()
    .catch((error) => {
      console.error("Exchange alert processing failed:", error);
    })
    .finally(() => {
      lastProcessedAt = Date.now();
      processingPromise = null;
    });

  await processingPromise;
}
