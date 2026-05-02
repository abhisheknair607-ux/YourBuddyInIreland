"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

import { getClientRequestHeaders } from "@/lib/clientRequestHeaders";
import { getMockUser } from "@/lib/mockAuth";

type TriggeredAlert = {
  id: string;
  targetRate: number;
  triggerRate: number | null;
  browserNotifiedAt: string | null;
  channels: {
    browser: boolean;
  };
};

type AlertResponse = {
  triggeredAlerts?: TriggeredAlert[];
};

const POLL_INTERVAL_MS = 5 * 60 * 1000;

export function ExchangeRateAlertNotifications() {
  const { data: session, status } = useSession();
  const shownAlertIdsRef = useRef(new Set<string>());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (status === "loading") {
      return;
    }

    const mockUser = getMockUser();
    const hasUser = Boolean(session?.user?.email || mockUser?.email);

    if (!hasUser) {
      return;
    }

    let cancelled = false;

    const pollAlerts = async () => {
      if (cancelled || document.visibilityState === "hidden") {
        return;
      }

      try {
        const response = await fetch("/api/exchange-rate-alerts", {
          headers: getClientRequestHeaders()
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as AlertResponse;
        const alerts = data.triggeredAlerts ?? [];

        for (const alert of alerts) {
          if (
            !alert.channels.browser ||
            alert.browserNotifiedAt ||
            shownAlertIdsRef.current.has(alert.id)
          ) {
            continue;
          }

          shownAlertIdsRef.current.add(alert.id);
          if (
            typeof Notification !== "undefined" &&
            Notification.permission === "granted"
          ) {
            const body =
              alert.triggerRate !== null
                ? `EUR/INR reached ${alert.triggerRate.toFixed(4)}. Your target was ${alert.targetRate.toFixed(2)}.`
                : `Your EUR/INR target of ${alert.targetRate.toFixed(2)} has been hit.`;
            const notification = new Notification("Guidon forex alert", {
              body,
              icon: "/logo.png",
              tag: `guidon-exchange-alert-${alert.id}`
            });

            notification.onclick = () => {
              window.focus();
              window.location.href = "/currency-check";
            };
            void fetch(
              `/api/exchange-rate-alerts/${alert.id}/browser-delivered`,
              {
                method: "POST",
                headers: getClientRequestHeaders()
              }
            ).catch(() => {
              shownAlertIdsRef.current.delete(alert.id);
            });
          }
        }
      } catch (error) {
        console.error("Exchange alert polling failed:", error);
      }
    };

    void pollAlerts();
    const intervalId = window.setInterval(() => {
      void pollAlerts();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [session?.user?.email, status]);

  return null;
}
