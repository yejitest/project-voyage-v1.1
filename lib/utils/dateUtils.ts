import type { DateRange, Season } from "@/lib/types";

export function calcNights(range: DateRange): number {
  if (!range.checkIn || !range.checkOut) return 0;
  const diff = range.checkOut.getTime() - range.checkIn.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function getSeason(date: Date): Season {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export function formatKoreanDate(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatKoreanDateFull(date: Date): string {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}(${days[date.getDay()]})`;
}

export function formatNightsLabel(nights: number): string {
  if (nights === 0) return "날짜를 선택해 주세요";
  return `${nights}박 ${nights + 1}일`;
}

export function isDateInRange(date: Date, range: DateRange): boolean {
  if (!range.checkIn || !range.checkOut) return false;
  return date >= range.checkIn && date <= range.checkOut;
}

export function isRangeStart(date: Date, range: DateRange): boolean {
  if (!range.checkIn) return false;
  return date.toDateString() === range.checkIn.toDateString();
}

export function isRangeEnd(date: Date, range: DateRange): boolean {
  if (!range.checkOut) return false;
  return date.toDateString() === range.checkOut.toDateString();
}
