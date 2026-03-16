import type { ExchangeRate } from "@/lib/types";

export async function fetchExchangeRate(
  currencyCode: string
): Promise<ExchangeRate> {
  const res = await fetch(
    `/api/exchange-rate?currency=${encodeURIComponent(currencyCode)}`
  );
  if (!res.ok) throw new Error("환율 정보를 불러오는데 실패했습니다.");
  return res.json();
}
