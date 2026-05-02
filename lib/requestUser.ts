import type { NextRequest } from "next/server";

import { auth } from "@/auth";

export type RequestUser = {
  email: string;
  name: string | null;
  source: "session" | "preview";
};

const LOCAL_HOST_PATTERNS = [
  /^localhost$/i,
  /^127(?:\.\d{1,3}){3}$/,
  /^192\.168(?:\.\d{1,3}){2}$/,
  /^10(?:\.\d{1,3}){3}$/
];

function getString(value: string | null | undefined) {
  return value?.trim() || "";
}

function normalizeEmail(value: string) {
  const email = value.trim().toLowerCase();

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

function isLocalPreviewHost(hostname: string) {
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

function getRequestHostname(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.host;

  return host.split(":")[0]?.trim().toLowerCase() || "";
}

export function isPreviewGuestUser(email: string) {
  return email.trim().toLowerCase() === "guest@guidon.local";
}

export async function getRequestUser(
  request: NextRequest
): Promise<RequestUser | null> {
  const session = await auth();
  const sessionEmail = normalizeEmail(getString(session?.user?.email));

  if (sessionEmail) {
    return {
      email: sessionEmail,
      name: getString(session?.user?.name) || null,
      source: "session"
    };
  }

  const hostname = getRequestHostname(request);

  if (!isLocalPreviewHost(hostname)) {
    return null;
  }

  const previewEmail = normalizeEmail(
    getString(request.headers.get("x-guidon-preview-email"))
  );

  if (!previewEmail) {
    return null;
  }

  return {
    email: previewEmail,
    name: getString(request.headers.get("x-guidon-preview-name")) || null,
    source: "preview"
  };
}
