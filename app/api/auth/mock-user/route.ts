import { NextRequest, NextResponse } from "next/server";

import { saveAuthUser } from "@/lib/authUserStore";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      privacyAccepted?: unknown;
    };

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name =
      typeof body.name === "string" ? body.name.trim() : email.split("@")[0];

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const savedUser = await saveAuthUser({
      provider: "email-demo",
      providerAccountId: email,
      name,
      email,
      privacyAccepted: body.privacyAccepted === true
    });

    return NextResponse.json({ savedUser });
  } catch (error) {
    console.error("Mock auth save error:", error);

    return NextResponse.json(
      { error: "Unable to save the mock auth user." },
      { status: 500 }
    );
  }
}
