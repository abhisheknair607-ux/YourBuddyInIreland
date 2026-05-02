import { NextRequest, NextResponse } from "next/server";

import {
  cancelExchangeAlert,
  createExchangeAlertOwner
} from "@/lib/firestoreExchangeAlerts";
import { getRequestUser, isPreviewGuestUser } from "@/lib/requestUser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  context: { params: { alertId: string } }
) {
  const user = await getRequestUser(request);

  if (!user || isPreviewGuestUser(user.email)) {
    return NextResponse.json(
      { error: "Please sign in before deleting exchange-rate alerts." },
      { status: 401 }
    );
  }

  try {
    await cancelExchangeAlert(
      createExchangeAlertOwner(user.email, user.name),
      context.params.alertId
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Exchange alert deletion failed:", error);

    return NextResponse.json(
      { error: "Exchange-rate alert could not be removed." },
      { status: 500 }
    );
  }
}
