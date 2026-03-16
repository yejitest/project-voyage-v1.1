"use client";

import { useEffect, useState } from "react";
import type { Destination, ExchangeRate, WeatherInfo } from "@/lib/types";
import { fetchExchangeRate } from "@/lib/api/exchangeRate";
import { fetchWeather } from "@/lib/api/weather";
import ExchangeRateCard from "@/components/info/ExchangeRateCard";
import WeatherCard from "@/components/info/WeatherCard";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { TipsIcon } from "@/components/icons/PixelIcons";

interface InfoTabProps {
  destination: Destination;
}

function buildTravelTips(
  destination: Destination,
  weather: WeatherInfo | null
): string[] {
  const tips: string[] = [];

  if (!destination.isVisaFree) {
    tips.push("비자 필요 — 출발 최소 2주 전 신청하세요.");
  } else {
    tips.push("한국 여권 무비자 입국 가능합니다.");
  }

  if (weather?.isRainySeason) {
    tips.push("우기 기간입니다 — 우산과 방수 재킷을 챙기세요.");
  }

  if (destination.estimatedPricePerNight < 80000) {
    tips.push("물가가 저렴해 현금을 소액 환전해 두면 편리합니다.");
  } else if (destination.estimatedPricePerNight > 180000) {
    tips.push("카드 결제가 보편화되어 있습니다. 소액 현금만 준비하세요.");
  }

  if (destination.avgTempCelsius >= 28) {
    tips.push("더운 날씨입니다 — 자외선 차단제와 가벼운 옷을 준비하세요.");
  } else if (destination.avgTempCelsius <= 5) {
    tips.push("추운 날씨입니다 — 두꺼운 외투와 방한 용품이 필요합니다.");
  }

  tips.push("여행자 보험에 꼭 가입하고 출발하세요.");

  return tips.slice(0, 4);
}

export default function InfoTab({ destination }: InfoTabProps) {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    Promise.all([
      fetchExchangeRate(destination.currencyCode),
      fetchWeather(destination.cityEn),
    ])
      .then(([rate, wx]) => {
        if (!cancelled) {
          setExchangeRate(rate);
          setWeather(wx);
        }
      })
      .catch(() => {
        if (!cancelled) setError("정보를 불러오는데 실패했습니다.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [destination.currencyCode, destination.cityEn]);

  const travelTips = buildTravelTips(destination, weather);
  const timezoneOffsetHours = weather?.timezoneOffsetHours ?? 0;

  return (
    <div className="p-5 space-y-4" style={{ animation: "fadeInUp 0.2s ease-out both" }}>

      {/* 환율 · 시차 + 날씨 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ExchangeRateCard
          exchangeRate={exchangeRate}
          timezoneOffsetHours={timezoneOffsetHours}
          isLoading={isLoading}
        />
        <WeatherCard weather={weather} isLoading={isLoading} />
      </div>

      {/* 에러 메시지 */}
      {error && !isLoading && (
        <div className="border border-orange-200 rounded-2xl p-4 bg-orange-50">
          <p className="text-sm text-orange-600">{error}</p>
        </div>
      )}

      {/* 여행 팁 */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
            <TipsIcon size={20} />
          </div>
          <span className="text-[15px] font-bold text-ink">여행 팁</span>
        </div>

        {isLoading ? (
          <div className="px-5 py-4 flex flex-col gap-3">
            <SkeletonLoader height="h-4" width="w-full" />
            <SkeletonLoader height="h-4" width="w-5/6" />
            <SkeletonLoader height="h-4" width="w-4/5" />
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {travelTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 px-5 py-3">
                <span className="text-purple-600 font-bold text-sm mt-0.5 flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-[13px] text-gray-700 leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
