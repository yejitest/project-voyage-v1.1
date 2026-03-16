"use client";

import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import useStore from "@/lib/store/useStore";
import { fetchItinerary } from "@/lib/api/claude";
import { fetchAttractions } from "@/lib/api/places";
import InfoTab from "@/components/modals/tabs/InfoTab";
import AttractionsTab from "@/components/modals/tabs/AttractionsTab";
import ItineraryTab from "@/components/modals/tabs/ItineraryTab";
import type { Itinerary, Attraction } from "@/lib/types";
import { calcNights } from "@/lib/utils/dateUtils";
import {
  StarIcon,
  ThermometerIcon,
  PassportIcon,
  HotelIcon,
  TagPixelIcon,
} from "@/components/icons/PixelIcons";

const TABS = ["기본 정보", "추천 관광지", "Day-by-Day 일정"] as const;

export default function DestinationModal() {
  const {
    isDestinationModalOpen,
    selectedDestination,
    activeModalTab,
    dateRange,
    closeDestinationModal,
    setActiveModalTab,
  } = useStore();

  const [attractions, setAttractions] = useState<Attraction[] | null>(null);
  const [attractionsLoading, setAttractionsLoading] = useState(false);

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [itineraryLoading, setItineraryLoading] = useState(false);

  // 관광지 탭 진입 시 API 호출
  const loadAttractions = useCallback(async () => {
    if (!selectedDestination) return;

    setAttractionsLoading(true);

    try {
      const data = await fetchAttractions({
        city: selectedDestination.city,
        cityEn: selectedDestination.cityEn,
      });
      setAttractions(data);
    } catch {
      setAttractions([]);
    } finally {
      setAttractionsLoading(false);
    }
  }, [selectedDestination]);

  // 일정 탭 진입 시 API 호출
  const loadItinerary = useCallback(async () => {
    if (!selectedDestination || !dateRange.checkIn || !dateRange.checkOut) return;

    const nights = calcNights(dateRange);
    if (nights <= 0) return;

    setItineraryLoading(true);
    setItinerary(null);

    try {
      const res = await fetchItinerary({
        city: selectedDestination.city,
        country: selectedDestination.country,
        checkIn: dateRange.checkIn.toISOString().split("T")[0],
        checkOut: dateRange.checkOut.toISOString().split("T")[0],
        nights,
      });

      // date 문자열 → Date 객체 변환 (JSON 직렬화 복원)
      const itineraryWithDates: Itinerary = {
        ...res.itinerary,
        checkIn: new Date(res.itinerary.checkIn),
        checkOut: new Date(res.itinerary.checkOut),
        days: res.itinerary.days.map((day) => ({
          ...day,
          date: new Date(day.date),
        })),
      };

      setItinerary(itineraryWithDates);
    } catch {
      setItinerary(null);
    } finally {
      setItineraryLoading(false);
    }
  }, [selectedDestination, dateRange]);

  // 탭 1 활성화 시 관광지 로드 (아직 없을 때만)
  useEffect(() => {
    if (activeModalTab === 1 && attractions === null && !attractionsLoading) {
      loadAttractions();
    }
  }, [activeModalTab, attractions, attractionsLoading, loadAttractions]);

  // 탭 2 활성화 시 일정 로드 (아직 없을 때만)
  useEffect(() => {
    if (activeModalTab === 2 && !itinerary && !itineraryLoading) {
      loadItinerary();
    }
  }, [activeModalTab, itinerary, itineraryLoading, loadItinerary]);

  // 모달 열릴 때 상태 초기화
  useEffect(() => {
    if (isDestinationModalOpen) {
      setAttractions(null);
      setAttractionsLoading(false);
      setItinerary(null);
      setItineraryLoading(false);
    }
  }, [isDestinationModalOpen]);

  // ESC 키 닫기 + 배경 스크롤 잠금
  useEffect(() => {
    if (!isDestinationModalOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDestinationModal();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isDestinationModalOpen, closeDestinationModal]);

  if (!isDestinationModalOpen || !selectedDestination) return null;

  const {
    city,
    country,
    cityEn,
    heroImage,
    rating,
    reviewCount,
    tags,
    isVisaFree,
    avgTempCelsius,
    estimatedPricePerNight,
    reasonOneLiner,
  } = selectedDestination;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      style={{ animation: "fadeIn 0.2s ease-out both" }}
    >
      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeDestinationModal}
      />

      {/* 모달 컨테이너 */}
      <div
        className="relative z-10 bg-white w-full md:max-w-[860px] rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col"
        style={{
          maxHeight: "92vh",
          animation: "slideUp 0.25s ease-out both",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── 히어로 이미지 ── */}
        <div className="relative flex-shrink-0" style={{ height: 240 }}>
          <Image
            src={heroImage}
            alt={city}
            fill
            className="object-cover"
            priority
          />
          {/* 그라디언트 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          {/* 닫기 버튼 */}
          <button
            onClick={closeDestinationModal}
            aria-label="닫기"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-ink font-bold text-base transition-colors shadow-sm z-10"
          >
            ✕
          </button>

          {/* 도시명 + 배지 */}
          <div className="absolute bottom-5 left-5 right-14">
            <h2 className="text-[26px] font-extrabold text-white tracking-tight leading-tight">
              {city}
              <span className="text-white/60 font-normal text-lg ml-2">{cityEn}</span>
            </h2>
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <span className="text-sm text-white/90 flex items-center gap-1">
                <StarIcon size={12} /> {rating.toFixed(2)} · {country}
              </span>
              {isVisaFree && (
                <span className="text-[11px] font-bold text-green-300 bg-green-900/50 rounded-full px-2.5 py-0.5">
                  무비자 ✓
                </span>
              )}
              <span className="text-[11px] font-bold text-white/75 bg-white/15 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                <ThermometerIcon size={12} /> 평균 {avgTempCelsius}°C
              </span>
            </div>
          </div>
        </div>

        {/* ── 탭 바 ── */}
        <div className="flex border-b border-gray-200 bg-white flex-shrink-0 px-5">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveModalTab(i as 0 | 1 | 2)}
              className={`text-[13px] px-4 py-3.5 whitespace-nowrap border-b-2 transition-all ${
                activeModalTab === i
                  ? "font-extrabold text-ink border-ink"
                  : "font-medium text-gray-500 border-transparent hover:text-ink"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── 탭 콘텐츠 ── */}
        <div className="flex-1 overflow-y-auto">

          {/* ① 기본 정보 */}
          {activeModalTab === 0 && (
            <div style={{ animation: "fadeInUp 0.2s ease-out both" }}>
              {/* 요약 카드 */}
              <div className="px-5 pt-5">
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{reasonOneLiner}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="text-xs font-semibold text-gray-700 border border-gray-200 rounded-full px-3 py-1 bg-gray-50 flex items-center gap-1.5"
                    >
                      <TagPixelIcon emoji={tag.emoji} size={12} />
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* 정보 그리드 */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {(
                    [
                      {
                        icon: <PassportIcon size={13} />,
                        label: "비자",
                        value: isVisaFree ? "무비자 ✓" : "비자 필요",
                        highlight: isVisaFree,
                      },
                      {
                        icon: <ThermometerIcon size={13} />,
                        label: "평균 기온",
                        value: `${avgTempCelsius}°C`,
                        highlight: false,
                      },
                      {
                        icon: <HotelIcon size={13} />,
                        label: "예상 숙박비",
                        value: `₩${estimatedPricePerNight.toLocaleString()} / 박`,
                        highlight: false,
                      },
                      {
                        icon: <StarIcon size={13} />,
                        label: "평점",
                        value: `${rating.toFixed(2)} (${reviewCount.toLocaleString()}개)`,
                        highlight: false,
                      },
                    ] as { icon: React.ReactNode; label: string; value: string; highlight: boolean }[]
                  ).map(({ icon, label, value, highlight }) => (
                    <div key={label} className="border border-gray-200 rounded-2xl p-4 bg-white">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        {icon} {label}
                      </p>
                      <p className={`text-sm font-bold ${highlight ? "text-green-700" : "text-ink"}`}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 환율 · 날씨 · 여행 팁 */}
              <InfoTab destination={selectedDestination} />
            </div>
          )}

          {/* ② 추천 관광지 */}
          {activeModalTab === 1 && (
            <AttractionsTab
              attractions={attractions}
              isLoading={attractionsLoading}
              onReload={loadAttractions}
            />
          )}

          {/* ③ Day-by-Day 일정 */}
          {activeModalTab === 2 && (
            <ItineraryTab
              itinerary={itinerary}
              isLoading={itineraryLoading}
              onRegenerate={loadItinerary}
            />
          )}
        </div>
      </div>
    </div>
  );
}
