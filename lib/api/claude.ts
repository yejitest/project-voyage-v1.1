import type {
  RecommendRequest,
  RecommendResponse,
  ItineraryRequest,
  ItineraryResponse,
} from "@/lib/types";

export async function fetchRecommendations(
  params: RecommendRequest
): Promise<RecommendResponse> {
  const res = await fetch("/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("여행지 추천을 불러오는데 실패했습니다.");
  return res.json();
}

export async function fetchItinerary(
  params: ItineraryRequest
): Promise<ItineraryResponse> {
  const res = await fetch("/api/itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("일정 생성에 실패했습니다.");
  return res.json();
}
