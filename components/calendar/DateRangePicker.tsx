"use client";

import { useState, useCallback } from "react";
import useStore from "@/lib/store/useStore";
import { formatKoreanDate, calcNights } from "@/lib/utils/dateUtils";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function startOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeDay(a: Date, b: Date): boolean {
  const aD = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bD = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return aD < bD;
}

function isBetween(date: Date, start: Date, end: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return d > s && d < e;
}

interface MonthGridProps {
  year: number;
  month: number;
  checkIn: Date | null;
  checkOut: Date | null;
  hoverDate: Date | null;
  today: Date;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
}

function MonthGrid({
  year,
  month,
  checkIn,
  checkOut,
  hoverDate,
  today,
  onDateClick,
  onDateHover,
}: MonthGridProps) {
  const firstDay = startOfMonth(year, month).getDay();
  const totalDays = daysInMonth(year, month);

  const monthName = new Date(year, month, 1).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });

  const rangeEnd = checkOut ?? (checkIn && hoverDate ? hoverDate : null);

  const getCellClass = (date: Date): string => {
    const isPast = isBeforeDay(date, today);
    if (isPast) return "text-gray-300 cursor-not-allowed";

    const isStart = checkIn && isSameDay(date, checkIn);
    const isEnd = checkOut && isSameDay(date, checkOut);
    const isHoverEnd =
      !checkOut && checkIn && hoverDate && isSameDay(date, hoverDate);
    const inRange =
      checkIn && rangeEnd
        ? isBetween(date, checkIn, rangeEnd)
        : false;

    if (isStart) return "bg-purple-600 text-white rounded-l-full cursor-pointer";
    if (isEnd) return "bg-purple-600 text-white rounded-r-full cursor-pointer";
    if (isHoverEnd) return "bg-purple-200 text-ink rounded-r-full cursor-pointer";
    if (inRange) return "bg-purple-50 text-ink rounded-none cursor-pointer";
    return "hover:bg-gray-50 text-ink cursor-pointer rounded-full";
  };

  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1)),
  ];

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <p className="text-[15px] font-bold text-ink text-center mb-4">{monthName}</p>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-bold text-gray-500 py-1">
            {d}
          </div>
        ))}
      </div>
      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7">
        {cells.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} />;
          const isPast = isBeforeDay(date, today);
          return (
            <div
              key={date.toISOString()}
              className={`aspect-square flex items-center justify-center text-[13px] font-medium select-none transition-colors ${getCellClass(date)}`}
              onClick={() => !isPast && onDateClick(date)}
              onMouseEnter={() => !isPast && onDateHover(date)}
              onMouseLeave={() => onDateHover(null)}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DateRangePicker() {
  const { dateRange, setDateRange } = useStore();
  const { checkIn, checkOut } = dateRange;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [baseYear, setBaseYear] = useState(today.getFullYear());
  const [baseMonth, setBaseMonth] = useState(today.getMonth());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const nextMonth = baseMonth === 11 ? 0 : baseMonth + 1;
  const nextYear = baseMonth === 11 ? baseYear + 1 : baseYear;

  const handleDateClick = useCallback(
    (date: Date) => {
      if (!checkIn || (checkIn && checkOut)) {
        // 첫 번째 클릭 or 리셋
        setDateRange({ checkIn: date, checkOut: null });
      } else {
        // 두 번째 클릭
        if (isBeforeDay(date, checkIn)) {
          setDateRange({ checkIn: date, checkOut: null });
        } else if (isSameDay(date, checkIn)) {
          setDateRange({ checkIn: null, checkOut: null });
        } else {
          const nights = Math.round(
            (date.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (nights > 30) return; // 최대 30박
          setDateRange({ checkIn, checkOut: date });
        }
      }
    },
    [checkIn, checkOut, setDateRange]
  );

  const goToPrev = () => {
    if (baseMonth === 0) {
      setBaseMonth(11);
      setBaseYear((y) => y - 1);
    } else {
      setBaseMonth((m) => m - 1);
    }
  };

  const goToNext = () => {
    if (baseMonth === 11) {
      setBaseMonth(0);
      setBaseYear((y) => y + 1);
    } else {
      setBaseMonth((m) => m + 1);
    }
  };

  const nights = checkIn && checkOut ? calcNights({ checkIn, checkOut }) : 0;

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      {/* 달력 헤더 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <button
          onClick={goToPrev}
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-ink hover:border-ink transition-colors"
          aria-label="이전 달"
        >
          ‹
        </button>
        <span className="text-[13px] text-gray-500 font-medium">
          {checkIn && checkOut
            ? `${nights}박 선택됨 · ${formatKoreanDate(checkIn)} → ${formatKoreanDate(checkOut)}`
            : checkIn
            ? "귀국 날짜를 선택하세요"
            : "출발 날짜를 선택하세요"}
        </span>
        <button
          onClick={goToNext}
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-ink hover:border-ink transition-colors"
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      {/* 2달 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-x divide-gray-100">
        <div className="p-5">
          <MonthGrid
            year={baseYear}
            month={baseMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            hoverDate={hoverDate}
            today={today}
            onDateClick={handleDateClick}
            onDateHover={setHoverDate}
          />
        </div>
        <div className="p-5">
          <MonthGrid
            year={nextYear}
            month={nextMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            hoverDate={hoverDate}
            today={today}
            onDateClick={handleDateClick}
            onDateHover={setHoverDate}
          />
        </div>
      </div>

      {/* 초기화 버튼 */}
      {(checkIn || checkOut) && (
        <div className="px-6 py-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => setDateRange({ checkIn: null, checkOut: null })}
            className="text-xs font-bold text-gray-500 hover:text-ink underline underline-offset-2 transition-colors"
          >
            날짜 초기화
          </button>
        </div>
      )}
    </div>
  );
}
