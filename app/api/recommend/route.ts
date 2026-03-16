import { NextRequest, NextResponse } from "next/server";
import type { RecommendRequest, RecommendResponse, Destination } from "@/lib/types";

const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "tokyo",
    city: "도쿄",
    country: "일본",
    cityEn: "Tokyo",
    heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    rating: 4.93,
    reviewCount: 2847,
    tags: [{ emoji: "🌸", label: "사계절 명소" }, { emoji: "🍜", label: "미식 천국" }],
    reasonOneLiner: "무비자 · 3시간 비행 · 압도적 미식",
    estimatedPricePerNight: 140000,
    region: "asia",
    isVisaFree: true,
    avgTempCelsius: 16,
    currencyCode: "JPY",
  },
  {
    id: "bangkok",
    city: "방콕",
    country: "태국",
    cityEn: "Bangkok",
    heroImage: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80",
    rating: 4.88,
    reviewCount: 1923,
    tags: [{ emoji: "🌞", label: "따뜻함" }, { emoji: "💸", label: "가성비" }],
    reasonOneLiner: "겨울 탈출 · 무비자 · 야시장",
    estimatedPricePerNight: 75000,
    region: "asia",
    isVisaFree: true,
    avgTempCelsius: 29,
    currencyCode: "THB",
  },
  {
    id: "paris",
    city: "파리",
    country: "프랑스",
    cityEn: "Paris",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    rating: 4.85,
    reviewCount: 3102,
    tags: [{ emoji: "🏛️", label: "예술 · 문화" }, { emoji: "🥐", label: "미식" }],
    reasonOneLiner: "낭만의 도시 · 세계 최고 박물관",
    estimatedPricePerNight: 230000,
    region: "europe",
    isVisaFree: false,
    avgTempCelsius: 13,
    currencyCode: "EUR",
  },
  {
    id: "bali",
    city: "발리",
    country: "인도네시아",
    cityEn: "Bali",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    rating: 4.91,
    reviewCount: 2214,
    tags: [{ emoji: "🌿", label: "자연 · 힐링" }, { emoji: "🧘", label: "요가 · 서핑" }],
    reasonOneLiner: "신들의 섬 · 무비자 · 올인클루시브",
    estimatedPricePerNight: 90000,
    region: "asia",
    isVisaFree: true,
    avgTempCelsius: 28,
    currencyCode: "IDR",
  },
  {
    id: "barcelona",
    city: "바르셀로나",
    country: "스페인",
    cityEn: "Barcelona",
    heroImage: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    rating: 4.87,
    reviewCount: 1678,
    tags: [{ emoji: "🏖️", label: "지중해 해변" }, { emoji: "🎨", label: "가우디 건축" }],
    reasonOneLiner: "건축 · 해변 · 타파스의 도시",
    estimatedPricePerNight: 180000,
    region: "europe",
    isVisaFree: false,
    avgTempCelsius: 19,
    currencyCode: "EUR",
  },
  {
    id: "new-york",
    city: "뉴욕",
    country: "미국",
    cityEn: "New York",
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    rating: 4.82,
    reviewCount: 4501,
    tags: [{ emoji: "🗽", label: "랜드마크" }, { emoji: "🎭", label: "문화 · 예술" }],
    reasonOneLiner: "세계의 수도 · 브로드웨이 · 미식",
    estimatedPricePerNight: 350000,
    region: "americas",
    isVisaFree: false,
    avgTempCelsius: 11,
    currencyCode: "USD",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: NextRequest) {
  // 시연용 로딩 애니메이션을 위한 인위 지연
  await new Promise((r) => setTimeout(r, 1500));
  const response: RecommendResponse = { destinations: MOCK_DESTINATIONS };
  return NextResponse.json(response);
}

// 실제 Gemini 연동 코드 (API 크레딧 충전 후 활성화)
// import type { RecommendRequest } from "@/lib/types";
// const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent";
// export async function POST(req: NextRequest) { ... }
