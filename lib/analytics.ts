export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

export const GUIDON_PRIVACY_ACCEPTED_EVENT = "guidon:privacy-accepted";
export const GUIDON_GA_READY_EVENT = "guidon:ga-ready";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

export function trackPageView(url: string) {
  if (
    typeof window === "undefined" ||
    !isAnalyticsEnabled() ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag("event", "page_view", {
    page_location: url,
    page_path: window.location.pathname,
    page_title: document.title
  });
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean | null | undefined>
) {
  if (
    typeof window === "undefined" ||
    !isAnalyticsEnabled() ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag("event", eventName, parameters ?? {});
}
