"use client";

import { MotionConfig } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";

import { ExchangeRateAlertNotifications } from "@/components/exchange-rate/ExchangeRateAlertNotifications";
import { GoogleAnalyticsProvider } from "@/components/GoogleAnalyticsProvider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <Suspense fallback={null}>
        <GoogleAnalyticsProvider />
      </Suspense>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      <ExchangeRateAlertNotifications />
    </SessionProvider>
  );
}
