import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function getAuthHost() {
  try {
    const authUrl = process.env.AUTH_URL;

    return authUrl ? new URL(authUrl).host : undefined;
  } catch {
    return undefined;
  }
}

export function middleware(request: NextRequest) {
  const authHost = getAuthHost();
  const requestHost = request.headers.get("host") ?? request.nextUrl.host;

  if (
    process.env.NODE_ENV === "development" &&
    authHost &&
    requestHost.startsWith("127.0.0.1") &&
    authHost.startsWith("localhost")
  ) {
    const url = request.nextUrl.clone();
    url.hostname = "localhost";
    url.port = authHost.split(":")[1] ?? url.port;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
