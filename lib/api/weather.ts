import type { WeatherInfo } from "@/lib/types";

export async function fetchWeather(city: string): Promise<WeatherInfo> {
  const res = await fetch(
    `/api/weather?city=${encodeURIComponent(city)}`
  );
  if (!res.ok) throw new Error("날씨 정보를 불러오는데 실패했습니다.");
  return res.json();
}
