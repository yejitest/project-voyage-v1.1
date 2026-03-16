"use client";

import useStore from "@/lib/store/useStore";
import { formatKoreanDate, formatNightsLabel, calcNights } from "@/lib/utils/dateUtils";

export default function SearchPill() {
  const { dateRange } = useStore();
  const nights = calcNights(dateRange);

  return (
    <div className="flex items-center border border-gray-400 rounded-full shadow-search overflow-hidden max-w-[480px] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow cursor-pointer">
      <div className="flex-1 px-[18px] py-[10px] border-r border-gray-200 hover:bg-gray-50">
        <p className="text-[11px] font-bold text-ink">여행지</p>
        <p className="text-xs text-gray-500">어디로 가시나요?</p>
      </div>
      <div className="flex-1 px-[18px] py-[10px] border-r border-gray-200 hover:bg-gray-50">
        <p className="text-[11px] font-bold text-ink">체크인</p>
        <p className="text-xs text-gray-500 whitespace-nowrap">
          {dateRange.checkIn ? formatKoreanDate(dateRange.checkIn) : "날짜 추가"}
        </p>
      </div>
      <div className="flex-1 px-[18px] py-[10px] hover:bg-gray-50">
        <p className="text-[11px] font-bold text-ink">체크아웃</p>
        <p className="text-xs text-gray-500 whitespace-nowrap">
          {dateRange.checkOut ? formatKoreanDate(dateRange.checkOut) : "날짜 추가"}
        </p>
      </div>
      <button className="bg-purple-600 text-white w-9 h-9 rounded-full m-1.5 flex items-center justify-center text-sm flex-shrink-0 hover:bg-purple-800 transition-colors">
        🔍
      </button>
    </div>
  );
}
