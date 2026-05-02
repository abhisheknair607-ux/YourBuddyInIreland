"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  GA_MEASUREMENT_ID,
  GUIDON_GA_READY_EVENT,
  GUIDON_PRIVACY_ACCEPTED_EVENT,
  isAnalyticsEnabled,
  trackPageView
} from "@/lib/analytics";
import { hasAcceptedPrivacy } from "@/lib/mockAuth";

export function GoogleAnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const isEnabled = isAnalyticsEnabled();
  const pageUrl = useMemo(() => {
    const query = searchParams?.toString();

    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    setHasConsent(hasAcceptedPrivacy());

    const handlePrivacyAccepted = (event: Event) => {
      const customEvent = event as CustomEvent<{ accepted?: boolean }>;
      setHasConsent(customEvent.detail?.accepted === true);
    };
    const handleGaReady = () => {
      setIsReady(true);
    };

    window.addEventListener(
      GUIDON_PRIVACY_ACCEPTED_EVENT,
      handlePrivacyAccepted as EventListener
    );
    window.addEventListener(GUIDON_GA_READY_EVENT, handleGaReady);

    return () => {
      window.removeEventListener(
        GUIDON_PRIVACY_ACCEPTED_EVENT,
        handlePrivacyAccepted as EventListener
      );
      window.removeEventListener(GUIDON_GA_READY_EVENT, handleGaReady);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || !hasConsent || !isReady) {
      return;
    }

    trackPageView(window.location.href);
  }, [hasConsent, isEnabled, isReady, pageUrl]);

  if (!isEnabled || !hasConsent || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="guidon-ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          window.dispatchEvent(new Event('${GUIDON_GA_READY_EVENT}'));
        `}
      </Script>
    </>
  );
}
