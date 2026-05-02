const LOCAL_HOST_PATTERNS = [
  /^localhost$/i,
  /^127(?:\.\d{1,3}){3}$/,
  /^192\.168(?:\.\d{1,3}){2}$/,
  /^10(?:\.\d{1,3}){3}$/
];

export const LOCAL_PREVIEW_USER = {
  name: "Guest Preview",
  email: "guest@guidon.local"
} as const;

export function isLocalPreviewHostname(hostname: string) {
  if (hostname === "::1") {
    return true;
  }

  if (LOCAL_HOST_PATTERNS.some((pattern) => pattern.test(hostname))) {
    return true;
  }

  const private172Match = hostname.match(
    /^172\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
  );

  if (!private172Match) {
    return false;
  }

  const secondOctet = Number(private172Match[1]);

  return secondOctet >= 16 && secondOctet <= 31;
}

export function isLocalPreviewHost() {
  if (typeof window === "undefined") {
    return false;
  }

  return isLocalPreviewHostname(window.location.hostname);
}
