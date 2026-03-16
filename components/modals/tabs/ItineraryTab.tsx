"use client";

import type { Itinerary } from "@/lib/types";
import DayCard from "@/components/itinerary/DayCard";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { CalendarIcon } from "@/components/icons/PixelIcons";

interface ItineraryTabProps {
  itinerary: Itinerary | null;
  isLoading: boolean;
  onRegenerate: () => void;
}

function ItinerarySkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="bg-gray-100 px-5 py-3.5">
            <SkeletonLoader height="h-4" width="w-32" />
          </div>
          <div className="px-5 py-4 space-y-3">
            <SkeletonLoader height="h-4" width="w-full" />
            <SkeletonLoader height="h-4" width="w-5/6" />
            <SkeletonLoader height="h-4" width="w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ItineraryTab({ itinerary, isLoading, onRegenerate }: ItineraryTabProps) {
  if (isLoading) {
    return (
      <div className="p-5" style={{ animation: "fadeInUp 0.2s ease-out both" }}>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-sm text-gray-500">AI가 맞춤 일정을 생성하고 있습니다...</span>
        </div>
        <ItinerarySkeleton />
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div
        className="py-16 text-center px-5"
        style={{ animation: "fadeInUp 0.2s ease-out both" }}
      >
        <div className="mb-4 flex justify-center"><CalendarIcon size={48} /></div>
        <p className="text-[15px] font-extrabold text-ink mb-2">일정을 불러오지 못했습니다</p>
        <p className="text-sm text-gray-500 mb-6">다시 시도해 보세요.</p>
        <button
          onClick={onRegenerate}
          className="px-5 py-2.5 bg-ink text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors"
        >
          다시 생성
        </button>
      </div>
    );
  }

  return (
    <div className="p-5" style={{ animation: "fadeInUp 0.2s ease-out both" }}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
            Day-by-Day 일정
          </p>
          <h3 className="text-[17px] font-extrabold text-ink tracking-tight">
            {itinerary.destination} · {itinerary.nights}박 {itinerary.nights + 1}일
          </h3>
        </div>
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-[13px] font-semibold text-gray-700 rounded-xl hover:border-ink hover:text-ink transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.49 15a9 9 0 1 1-.08-4.92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>다른 일정 추천</span>
        </button>
      </div>

      {/* Day 카드 목록 */}
      <div>
        {itinerary.days.map((day) => (
          <DayCard
            key={day.dayNumber}
            day={day}
            totalDays={itinerary.days.length}
          />
        ))}
      </div>
    </div>
  );
}
