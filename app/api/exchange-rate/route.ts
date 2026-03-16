import { NextRequest, NextResponse } from "next/server";
import type { ExchangeRate } from "@/lib/types";

// 시연용 mock 환율 데이터 (2026년 3월 기준 근사치)
const MOCK_RATES: Record<string, { symbol: string; rate: number }> = {
  JPY: { symbol: "¥", rate: 9 },
  THB: { symbol: "฿", rate: 40 },
  EUR: { symbol: "€", rate: 1530 },
  IDR: { symbol: "Rp", rate: 0.086 },
  USD: { symbol: "$", rate: 1380 },
  GBP: { symbol: "£", rate: 1750 },
  AUD: { symbol: "A$", rate: 880 },
  SGD: { symbol: "S$", rate: 1020 },
  HKD: { symbol: "HK$", rate: 176 },
  MYR: { symbol: "RM", rate: 308 },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const currency = req.nextUrl.searchParams.get("currency") ?? "USD";
  const mock = MOCK_RATES[currency] ?? { symbol: currency, rate: 1000 };

  const exchangeRate: ExchangeRate = {
    currencyCode: currency,
    currencySymbol: mock.symbol,
    rateToKRW: mock.rate,
  };

  return NextResponse.json(exchangeRate);
}
