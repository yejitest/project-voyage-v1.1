import type { ExchangeRate } from "@/lib/types";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { CurrencyIcon } from "@/components/icons/PixelIcons";

interface ExchangeRateCardProps {
  exchangeRate: ExchangeRate | null;
  timezoneOffsetHours: number;
  isLoading: boolean;
}

export default function ExchangeRateCard({
  exchangeRate,
  timezoneOffsetHours,
  isLoading,
}: ExchangeRateCardProps) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
          <CurrencyIcon size={20} />
        </div>
        <span className="text-[15px] font-bold text-ink">환율 · 시차</span>
      </div>

      {isLoading ? (
        <div className="px-5 py-4 flex flex-col gap-3">
          <SkeletonLoader height="h-5" width="w-full" />
          <SkeletonLoader height="h-5" width="w-3/4" />
        </div>
      ) : exchangeRate ? (
        <>
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-50">
            <span className="text-[13px] text-gray-500">
              1 {exchangeRate.currencyCode}
            </span>
            <span className="font-mono text-[13px] font-semibold text-ink">
              {exchangeRate.rateToKRW.toLocaleString()} KRW
            </span>
          </div>
          <div className="flex justify-between items-center px-5 py-3">
            <span className="text-[13px] text-gray-500">시차</span>
            <span className="font-mono text-[13px] font-semibold text-ink">
              한국 기준 {timezoneOffsetHours > 0 ? "+" : ""}
              {timezoneOffsetHours}시간
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
