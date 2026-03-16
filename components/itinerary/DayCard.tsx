"use client";

import type { DaySchedule } from "@/lib/types";
import { DayMarkerIcon } from "@/components/icons/PixelIcons";
import { formatKoreanDateFull } from "@/lib/utils/dateUtils";
import {
  getTimeSlotLabel,
  getTimeSlotBadgeClass,
} from "@/lib/utils/itineraryUtils";

function getDayLabel(dayNumber: number, total: number): string {
  if (dayNumber === 1) return "입국일";
  if (dayNumber === total) return "출국일";
  return `${dayNumber}일차`;
}

interface DayCardProps {
  day: DaySchedule;
  totalDays: number;
}

export default function DayCard({ day, totalDays }: DayCardProps) {
  // TODO: @dnd-kit 드래그 앤 드롭 순서 변경 구현
  // TODO: 항목 삭제 / 직접 메모 추가 기능 구현
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-3">
      {/* 헤더 */}
      <div className="bg-gray-100 px-5 py-3.5 flex justify-between items-center">
        <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <DayMarkerIcon size={16} />
          Day {day.dayNumber}
        </span>
        <span className="font-mono text-xs text-gray-500">
          {formatKoreanDateFull(day.date)} · {getDayLabel(day.dayNumber, totalDays)}
        </span>
      </div>

      {/* 일정 행 */}
      {day.items.map((item, idx) => (
        <div
          key={item.id}
          className={`flex gap-3.5 px-5 py-3.5 items-start ${
            idx < day.items.length - 1 ? "border-b border-gray-50" : ""
          }`}
        >
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${getTimeSlotBadgeClass(item.timeSlot)}`}
          >
            {getTimeSlotLabel(item.timeSlot)}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{item.title}</p>
            {item.subtitle && (
              <p className="text-[13px] text-gray-500 mt-0.5">{item.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
