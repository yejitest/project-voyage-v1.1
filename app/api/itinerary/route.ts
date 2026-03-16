import { NextRequest, NextResponse } from "next/server";
import type { ItineraryRequest, ItineraryResponse, DaySchedule, ItineraryItem } from "@/lib/types";

// 도시별 대표 일정 템플릿
const CITY_TEMPLATES: Record<string, { morning: string[]; afternoon: string[]; evening: string[] }> = {
  도쿄: {
    morning: ["쓰키지 시장 새벽 투어", "아사쿠사 센소지 참배", "신주쿠 교엔 산책", "하라주쿠 다케시타 거리", "우에노 공원 조깅"],
    afternoon: ["도쿄 타워 전망대", "아키하바라 전자거리 탐방", "시부야 스크램블 교차로", "롯폰기 힐즈 쇼핑", "오다이바 팀랩 보더리스"],
    evening: ["신주쿠 이자카야 골목 야식", "기온 시조 야경 산책", "도쿄 스카이트리 야경", "라멘 투어 (쇼유라멘)", "긴자 재즈바"],
  },
  방콕: {
    morning: ["왓 포 새벽 참배", "왓 아룬 일출 감상", "짜뚜짝 주말 시장", "차오프라야 강 보트 투어", "카오산 로드 산책"],
    afternoon: ["그랜드 팰리스 관람", "시암 파라곤 쇼핑몰", "루미니 공원 휴식", "짐 톰슨 하우스 견학", "마담 투소 방콕"],
    evening: ["아시아티크 야시장 투어", "루프탑 바 야경", "팟타이 거리 투어", "카오산 로드 나이트 바자르", "타이 마사지 & 스파"],
  },
  파리: {
    morning: ["에펠탑 일출 포토타임", "루브르 박물관 개관 전 줄서기", "노트르담 대성당 외관 감상", "몽마르트르 언덕 산책", "뤽상부르 공원 아침 산책"],
    afternoon: ["오르세 미술관 관람", "마레 지구 쇼핑", "베르사유 궁전 투어", "샹젤리제 거리 산책", "퐁피두 센터 현대미술"],
    evening: ["세느강 유람선 디너", "몽파르나스 타워 야경", "르 마레 비스트로 저녁", "오페라 가르니에 공연", "생제르맹데프레 카페 투어"],
  },
  발리: {
    morning: ["따나롯 사원 일출", "우붓 라이스 테라스 트레킹", "스미냑 비치 서핑 레슨", "몽키 포레스트 방문", "아융 강 래프팅"],
    afternoon: ["우붓 왕궁 & 시장 탐방", "발리 쿠킹 클래스", "따만 아윤 사원 관람", "짐바란 해변 휴식", "바투르 화산 투어"],
    evening: ["울루와뚜 케착 댄스 공연", "짐바란 씨푸드 바비큐 디너", "스미냑 비치 선셋 바", "우붓 스파 & 발리 마사지", "쿠타 나이트 바자르"],
  },
  바르셀로나: {
    morning: ["사그라다 파밀리아 개관 시간 입장", "구엘 공원 아침 산책", "보케리아 시장 투어", "바르셀로네타 해변 수영", "고딕 지구 골목 탐방"],
    afternoon: ["카사 바트요 가이드 투어", "피카소 미술관 관람", "몬주익 케이블카", "라 발 지구 쇼핑", "캄프 누 FC바르셀로나 투어"],
    evening: ["라 람블라 거리 저녁 산책", "보른 지구 타파스 투어", "해변 바에서 상그리아", "타블라오 플라멩코 공연", "그라시아 지구 레스토랑"],
  },
  뉴욕: {
    morning: ["센트럴 파크 모닝 조깅", "브루클린 브리지 도보 횡단", "하이라인 공원 산책", "첼시 마켓 브런치", "메트로폴리탄 미술관 개관 시간"],
    afternoon: ["자유의 여신상 페리 투어", "맨하탄 스카이라인 관람", "MoMA 현대미술관", "소호 쇼핑", "타임스퀘어 탐방"],
    evening: ["브루클린 루프탑 바 야경", "재즈 클럽 (빌리지 뱅가드)", "딤섬 차이나타운 저녁", "브로드웨이 뮤지컬 관람", "첼시 갤러리 오프닝"],
  },
};

const DEFAULT_TEMPLATE = {
  morning: ["호텔 조식 & 체크인", "현지 시장 투어", "대표 박물관 관람", "도심 산책", "현지 카페 브런치"],
  afternoon: ["주요 랜드마크 방문", "쇼핑 거리 탐방", "현지 투어 참가", "공원 & 자연 명소", "문화 체험 클래스"],
  evening: ["현지 맛집 저녁 투어", "야경 명소 방문", "나이트 마켓 탐방", "호텔 라운지 휴식", "나이트라이프 체험"],
};

function pickRandom<T>(arr: T[], used: Set<string>): T {
  const available = arr.filter((item) => !used.has(String(item)));
  const pool = available.length > 0 ? available : arr;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  used.add(String(pick));
  return pick;
}

function buildMockItinerary(params: ItineraryRequest) {
  const template = CITY_TEMPLATES[params.city] ?? DEFAULT_TEMPLATE;
  const usedMorning = new Set<string>();
  const usedAfternoon = new Set<string>();
  const usedEvening = new Set<string>();

  const checkIn = new Date(params.checkIn);
  const days: DaySchedule[] = [];

  for (let i = 0; i <= params.nights; i++) {
    const date = new Date(checkIn);
    date.setDate(date.getDate() + i);
    const isFirst = i === 0;
    const isLast = i === params.nights;
    const dayNumber = i + 1;

    const items: ItineraryItem[] = [];

    if (isFirst) {
      items.push({ id: `d${dayNumber}-1`, timeSlot: "afternoon", title: "공항 도착 & 호텔 체크인", subtitle: "짐 정리 후 근처 편의점/카페 탐방", durationHint: "약 2시간" });
      items.push({ id: `d${dayNumber}-2`, timeSlot: "evening", title: pickRandom(template.evening, usedEvening), durationHint: "약 2시간" });
    } else if (isLast) {
      items.push({ id: `d${dayNumber}-1`, timeSlot: "morning", title: "호텔 체크아웃 & 짐 보관", subtitle: "마지막 쇼핑 & 기념품 구매", durationHint: "약 1시간" });
      items.push({ id: `d${dayNumber}-2`, timeSlot: "afternoon", title: "공항 이동 & 출국 수속", durationHint: "약 3시간" });
    } else {
      items.push({ id: `d${dayNumber}-1`, timeSlot: "morning", title: pickRandom(template.morning, usedMorning), durationHint: "약 2시간" });
      items.push({ id: `d${dayNumber}-2`, timeSlot: "afternoon", title: pickRandom(template.afternoon, usedAfternoon), durationHint: "약 3시간" });
      items.push({ id: `d${dayNumber}-3`, timeSlot: "afternoon", title: pickRandom(template.afternoon, usedAfternoon), subtitle: "여유롭게 탐방", durationHint: "약 2시간" });
      items.push({ id: `d${dayNumber}-4`, timeSlot: "evening", title: pickRandom(template.evening, usedEvening), durationHint: "약 2시간" });
    }

    days.push({ dayNumber, date, label: `${dayNumber}일차`, items });
  }

  return {
    destination: params.city,
    checkIn: new Date(params.checkIn),
    checkOut: new Date(params.checkOut),
    nights: params.nights,
    days,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  const params = (await req.json()) as ItineraryRequest;

  // 시연용 mock 데이터 — 실제 서비스 시 Gemini API 연동으로 교체 예정
  const itinerary = buildMockItinerary(params);
  const response: ItineraryResponse = { itinerary };
  return NextResponse.json(response);
}
