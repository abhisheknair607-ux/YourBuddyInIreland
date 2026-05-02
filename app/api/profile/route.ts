import { NextRequest, NextResponse } from "next/server";

import { getRequestUser } from "@/lib/requestUser";
import {
  calculateStudentProfileCompletion,
  normalizeStudentProfileInput
} from "@/lib/studentProfile";
import {
  createStudentProfileOwner,
  getStudentProfile,
  saveStudentProfile
} from "@/lib/studentProfileStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const user = await getRequestUser(request);

    if (!user?.email) {
      return NextResponse.json(
        { error: "Please sign in to view your profile." },
        { status: 401 }
      );
    }

    const owner = createStudentProfileOwner(user.email, user.name);
    const profile = await getStudentProfile(owner);
    const completion = calculateStudentProfileCompletion(profile);

    return NextResponse.json({
      profile: normalizeStudentProfileInput(profile),
      completion
    });
  } catch (error) {
    console.error("Profile load error:", error);

    return NextResponse.json(
      { error: "Unable to load your profile right now." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getRequestUser(request);

    if (!user?.email) {
      return NextResponse.json(
        { error: "Please sign in to update your profile." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as {
      profile?: unknown;
    };
    const owner = createStudentProfileOwner(user.email, user.name);
    const profile = await saveStudentProfile(
      owner,
      normalizeStudentProfileInput(
        typeof body.profile === "object" && body.profile !== null
          ? (body.profile as Record<string, unknown>)
          : {}
      )
    );
    const completion = calculateStudentProfileCompletion(profile);

    return NextResponse.json({
      profile: normalizeStudentProfileInput(profile),
      completion
    });
  } catch (error) {
    console.error("Profile save error:", error);

    return NextResponse.json(
      { error: "Unable to save your profile right now." },
      { status: 500 }
    );
  }
}
