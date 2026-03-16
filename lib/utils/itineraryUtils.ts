import type { DaySchedule, Itinerary, TimeSlot } from "@/lib/types";
import { formatKoreanDateFull } from "./dateUtils";

export function getDayLabel(dayNumber: number, nights: number): string {
  if (dayNumber === 1) return "입국일";
  if (dayNumber === nights + 1) return "출국일";
  return `${dayNumber}일차`;
}

export function buildDayDates(checkIn: Date, nights: number): Date[] {
  return Array.from({ length: nights + 1 }, (_, i) => {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export function getTimeSlotLabel(slot: TimeSlot): string {
  const labels: Record<TimeSlot, string> = {
    morning: "오전",
    afternoon: "오후",
    evening: "저녁",
  };
  return labels[slot];
}

export function getTimeSlotBadgeClass(slot: TimeSlot): string {
  const classes: Record<TimeSlot, string> = {
    morning: "bg-purple-50 text-purple-600",
    afternoon: "bg-orange-50 text-orange-600",
    evening: "bg-[#1A1A2E] text-white/80",
  };
  return classes[slot];
}

export function formatItineraryHeader(itinerary: Itinerary): string {
  const start = formatKoreanDateFull(itinerary.checkIn);
  const end = formatKoreanDateFull(itinerary.checkOut);
  return `${start} ~ ${end} · ${itinerary.nights}박 ${itinerary.nights + 1}일 · ${itinerary.destination}`;
}

export function copyItineraryAsText(days: DaySchedule[]): string {
  return days
    .map((day) => {
      const header = `[ Day ${day.dayNumber} · ${formatKoreanDateFull(day.date)} · ${day.label} ]`;
      const items = day.items
        .map((item) => `  ${getTimeSlotLabel(item.timeSlot)}  ${item.title}${item.subtitle ? `\n        ${item.subtitle}` : ""}`)
        .join("\n");
      return `${header}\n${items}`;
    })
    .join("\n\n");
}
