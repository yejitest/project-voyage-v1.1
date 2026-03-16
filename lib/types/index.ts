// ── 날짜 범위 ──────────────────────────────────────────────

export interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

export type Season = "spring" | "summer" | "autumn" | "winter";

export type Region = "asia" | "europe" | "americas" | "oceania";

// ── 여행지 추천 카드 ────────────────────────────────────────

export interface DestinationTag {
  label: string;
  emoji: string;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  cityEn: string;
  heroImage: string;
  rating: number;
  reviewCount: number;
  tags: DestinationTag[];
  reasonOneLiner: string;
  estimatedPricePerNight: number;
  region: Region;
  isVisaFree: boolean;
  avgTempCelsius: number;
  currencyCode: string;
}

// ── 기본 정보 탭 (탭1) ──────────────────────────────────────

export interface ExchangeRate {
  currencyCode: string;
  currencySymbol: string;
  rateToKRW: number;
}

export interface WeatherInfo {
  currentTempCelsius: number;
  minTempCelsius: number;
  maxTempCelsius: number;
  condition: string;
  conditionKey: "sunny" | "partly-cloudy" | "cloudy" | "rainy" | "thunder" | "snowy" | "foggy";
  isRainySeason: boolean;
  timezoneOffsetHours: number;
}

export interface DestinationInfo {
  exchangeRate: ExchangeRate;
  weather: WeatherInfo;
  timezoneOffsetHours: number;
  visaType: "visa-free" | "arrival-visa" | "required";
  difficultyLevel: "beginner" | "intermediate" | "backpacker";
  travelTips: string[];
}

// ── 관광지 리스트 탭 (탭2) ──────────────────────────────────

export type AttractionCategory =
  | "history-culture"
  | "nature-relaxation"
  | "food-market"
  | "shopping-lifestyle";

export interface NearbyRecommendation {
  name: string;
  type: "restaurant" | "cafe";
  description: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: AttractionCategory;
  estimatedDurationMinutes: number;
  isFree: boolean;
  estimatedEntranceFee?: string;
  recommendedTimeOfDay: "morning" | "afternoon" | "evening" | "anytime";
  googleMapsUrl: string;
  imageUrl?: string;
  detailedDescription?: string;
  nearby?: NearbyRecommendation[];
}

// ── 일정표 탭 (탭3) ─────────────────────────────────────────

export type TimeSlot = "morning" | "afternoon" | "evening";

export interface ItineraryItem {
  id: string;
  timeSlot: TimeSlot;
  title: string;
  subtitle?: string;
  durationHint?: string;
}

export interface DaySchedule {
  dayNumber: number;
  date: Date;
  label: string;
  items: ItineraryItem[];
}

export interface Itinerary {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  days: DaySchedule[];
}

// ── Zustand 스토어 상태 ──────────────────────────────────────

export interface StoreState {
  dateRange: DateRange;
  selectedDestination: Destination | null;
  selectedAttraction: Attraction | null;
  isDestinationModalOpen: boolean;
  isAttractionModalOpen: boolean;
  activeRegionFilter: Region | "all";
  activeModalTab: 0 | 1 | 2;
}

export interface StoreActions {
  setDateRange: (range: DateRange) => void;
  openDestinationModal: (destination: Destination) => void;
  closeDestinationModal: () => void;
  openAttractionModal: (attraction: Attraction) => void;
  closeAttractionModal: () => void;
  setRegionFilter: (region: Region | "all") => void;
  setActiveModalTab: (tab: 0 | 1 | 2) => void;
}

// ── API 응답 타입 ────────────────────────────────────────────

export interface RecommendRequest {
  checkIn: string;
  checkOut: string;
  nights: number;
  season: Season;
  region?: Region;
}

export interface RecommendResponse {
  destinations: Destination[];
}

export interface ItineraryRequest {
  city: string;
  country: string;
  checkIn: string;
  checkOut: string;
  nights: number;
}

export interface ItineraryResponse {
  itinerary: Itinerary;
}
