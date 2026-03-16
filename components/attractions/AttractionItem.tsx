"use client";

import type { Attraction } from "@/lib/types";
import useStore from "@/lib/store/useStore";

interface AttractionItemProps {
  attraction: Attraction;
}

const TIME_LABELS: Record<Attraction["recommendedTimeOfDay"], string> = {
  morning: "오전",
  afternoon: "오후",
  evening: "야간",
  anytime: "종일",
};

export default function AttractionItem({ attraction }: AttractionItemProps) {
  const { openAttractionModal } = useStore();

  return (
    <div
      className="flex items-start justify-between py-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 px-1 rounded-lg transition-colors"
      onClick={() => openAttractionModal(attraction)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-ink">{attraction.name}</span>
          {attraction.isFree && (
            <span className="text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
              무료
            </span>
          )}
        </div>
        <p className="text-[13px] text-gray-500 mt-0.5 line-clamp-2">{attraction.description}</p>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
          <span>⏱ 약 {Math.round(attraction.estimatedDurationMinutes / 60 * 10) / 10}시간</span>
          {!attraction.isFree && attraction.estimatedEntranceFee && (
            <span>💰 {attraction.estimatedEntranceFee}</span>
          )}
          <span>🕐 {TIME_LABELS[attraction.recommendedTimeOfDay]}</span>
        </div>
      </div>
      <a
        href={attraction.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-3 flex-shrink-0 text-purple-600 hover:text-purple-800"
        onClick={(e) => e.stopPropagation()}
        aria-label="Google Maps에서 보기"
      >
        📍
      </a>
    </div>
  );
}
