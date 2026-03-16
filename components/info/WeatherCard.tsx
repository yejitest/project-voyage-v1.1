import type { WeatherInfo } from "@/lib/types";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { WeatherIcon, WeatherConditionIcon, WarningIcon } from "@/components/icons/PixelIcons";

interface WeatherCardProps {
  weather: WeatherInfo | null;
  isLoading: boolean;
}

export default function WeatherCard({ weather, isLoading }: WeatherCardProps) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
          <WeatherIcon size={20} />
        </div>
        <span className="text-[15px] font-bold text-ink">날씨 · 기온</span>
      </div>

      {isLoading ? (
        <div className="px-5 py-4 flex flex-col gap-3">
          <SkeletonLoader height="h-5" width="w-full" />
          <SkeletonLoader height="h-5" width="w-2/3" />
        </div>
      ) : weather ? (
        <>
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-50">
            <span className="text-[13px] text-gray-500">현재 날씨</span>
            <span className="font-mono text-[13px] font-semibold text-ink flex items-center gap-1.5">
              <WeatherConditionIcon conditionKey={weather.conditionKey} size={16} />
              {weather.currentTempCelsius}°C
            </span>
          </div>
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-50">
            <span className="text-[13px] text-gray-500">여행 기간 기온</span>
            <span className="font-mono text-[13px] font-semibold text-ink">
              {weather.minTempCelsius}°C ~ {weather.maxTempCelsius}°C
            </span>
          </div>
          {weather.isRainySeason && (
            <div className="flex items-center gap-2 px-5 py-3 bg-orange-50">
              <WarningIcon size={16} />
              <span className="text-[13px] text-orange-600 font-semibold">우기 기간 — 우산 필수</span>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
