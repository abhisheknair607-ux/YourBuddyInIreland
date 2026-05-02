import { NextRequest, NextResponse } from "next/server";

import { fetchExchangeRateHistory } from "@/lib/exchangeRates";
import { type ExchangeHistoryRange } from "@/lib/exchangeRateTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeRange(value: string): ExchangeHistoryRange {
  return value === "30d" || value === "1y" || value === "5y" ? value : "90d";
}

export async function GET(request: NextRequest) {
  const range = normalizeRange(request.nextUrl.searchParams.get("range") || "90d");

  try {
    const points = await fetchExchangeRateHistory(range);

    return NextResponse.json({
      range,
      points
    });
  } catch (error) {
    console.error("Exchange rate history fetch failed:", error);

    return NextResponse.json(
      { error: "EUR/INR history is unavailable right now." },
      { status: 503 }
    );
  }
}
