import { NextResponse } from "next/server";

import { fetchLatestExchangeRate } from "@/lib/exchangeRates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rate = await fetchLatestExchangeRate();

    return NextResponse.json({ rate });
  } catch (error) {
    console.error("Exchange rate fetch failed:", error);

    return NextResponse.json(
      { error: "Live EUR/INR data is unavailable right now." },
      { status: 503 }
    );
  }
}
