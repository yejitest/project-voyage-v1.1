import type { Attraction } from "@/lib/types";

interface FetchAttractionsParams {
  city: string;
  cityEn: string;
}

export async function fetchAttractions({ city, cityEn }: FetchAttractionsParams): Promise<Attraction[]> {
  const res = await fetch(
    `/api/places?city=${encodeURIComponent(city)}&cityEn=${encodeURIComponent(cityEn)}`
  );
  if (!res.ok) throw new Error("관광지 정보를 불러오는데 실패했습니다.");
  return res.json();
}
