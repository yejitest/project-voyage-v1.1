import { NextRequest, NextResponse } from "next/server";
import type { WeatherInfo } from "@/lib/types";

// 시연용 mock 날씨 데이터 (3월 기준 근사치)
// timezoneOffsetHours = 현지 시간대 - 한국(UTC+9)
const MOCK_WEATHER: Record<string, WeatherInfo> = {
  Tokyo: {
    currentTempCelsius: 14,
    minTempCelsius: 9,
    maxTempCelsius: 18,
    condition: "흐리고 가끔 맑음",
    conditionKey: "partly-cloudy",
    isRainySeason: false,
    timezoneOffsetHours: 0,
  },
  Bangkok: {
    currentTempCelsius: 32,
    minTempCelsius: 27,
    maxTempCelsius: 36,
    condition: "맑고 더움",
    conditionKey: "sunny",
    isRainySeason: false,
    timezoneOffsetHours: -2,
  },
  Paris: {
    currentTempCelsius: 10,
    minTempCelsius: 6,
    maxTempCelsius: 14,
    condition: "흐리고 가끔 비",
    conditionKey: "rainy",
    isRainySeason: true,
    timezoneOffsetHours: -8,
  },
  Bali: {
    currentTempCelsius: 29,
    minTempCelsius: 25,
    maxTempCelsius: 32,
    condition: "열대 스콜 가끔",
    conditionKey: "partly-cloudy",
    isRainySeason: true,
    timezoneOffsetHours: -1,
  },
  Barcelona: {
    currentTempCelsius: 16,
    minTempCelsius: 11,
    maxTempCelsius: 20,
    condition: "맑고 온화함",
    conditionKey: "partly-cloudy",
    isRainySeason: false,
    timezoneOffsetHours: -8,
  },
  "New York": {
    currentTempCelsius: 9,
    minTempCelsius: 3,
    maxTempCelsius: 13,
    condition: "맑고 쌀쌀함",
    conditionKey: "sunny",
    isRainySeason: false,
    timezoneOffsetHours: -14,
  },
};

const DEFAULT_WEATHER: WeatherInfo = {
  currentTempCelsius: 20,
  minTempCelsius: 15,
  maxTempCelsius: 25,
  condition: "맑음",
  conditionKey: "sunny",
  isRainySeason: false,
  timezoneOffsetHours: 0,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city") ?? "";

  // 도시명 key 매칭 (부분 일치 허용)
  const matched = Object.keys(MOCK_WEATHER).find(
    (key) => city.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(city.toLowerCase())
  );

  const weatherInfo = matched ? MOCK_WEATHER[matched] : DEFAULT_WEATHER;

  return NextResponse.json(weatherInfo);
}
