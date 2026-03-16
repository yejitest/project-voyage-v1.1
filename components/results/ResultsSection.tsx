"use client";

import { useEffect, useRef, useState } from "react";
import useStore from "@/lib/store/useStore";
import { fetchRecommendations } from "@/lib/api/claude";
import { calcNights, getSeason } from "@/lib/utils/dateUtils";
import AirplaneLoader from "@/components/loading/AirplaneLoader";
import FilterTabs from "@/components/filters/FilterTabs";
import DestinationCardGrid from "@/components/cards/DestinationCardGrid";
import type { Destination } from "@/lib/types";

export default function ResultsSection() {
  const { dateRange, activeRegionFilter } = useStore();
  const { checkIn, checkOut } = dateRange;

  const [phase, setPhase] = useState<"idle" | "loading" | "results" | "error">("idle");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const prevCheckOutRef = useRef<Date | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      checkIn &&
      checkOut &&
      checkOut !== prevCheckOutRef.current
    ) {
      prevCheckOutRef.current = checkOut;
      setPhase("loading");
      setDestinations([]);

      // 결과 섹션으로 부드럽게 스크롤
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      const nights = calcNights(dateRange);
      const season = getSeason(checkIn);

      fetchRecommendations({
        checkIn: checkIn.toISOString().split("T")[0],
        checkOut: checkOut.toISOString().split("T")[0],
        nights,
        season,
      })
        .then((res) => {
          setDestinations(res.destinations);
          setPhase("results");
        })
        .catch(() => {
          setPhase("error");
        });
    }

    // 날짜가 초기화된 경우
    if (!checkIn && !checkOut) {
      prevCheckOutRef.current = null;
      setPhase("idle");
      setDestinations([]);
    }
  }, [checkIn, checkOut, dateRange]);

  const filtered =
    activeRegionFilter === "all"
      ? destinations
      : destinations.filter((d) => d.region === activeRegionFilter);

  if (phase === "idle") return null;

  return (
    <div ref={sectionRef} className="scroll-mt-20">
      {phase === "loading" && checkIn && checkOut && (
        <section className="max-w-[1280px] mx-auto px-6 pb-12">
          <div className="max-w-[860px]">
            <AirplaneLoader checkIn={checkIn} checkOut={checkOut} />
          </div>
        </section>
      )}

      {phase === "error" && (
        <section className="max-w-[1280px] mx-auto px-6 pb-12 text-center py-16">
          <p className="text-4xl mb-4">✈️</p>
          <p className="text-[15px] font-extrabold text-ink mb-2">여행지를 불러오지 못했습니다</p>
          <p className="text-sm text-gray-500">잠시 후 날짜를 다시 선택해 주세요.</p>
        </section>
      )}

      {phase === "results" && (
        <section
          className="max-w-[1280px] mx-auto px-6 pb-16"
          style={{ animation: "fadeInUp 0.5s ease-out both" }}
        >
          <div className="mb-6">
            <FilterTabs />
          </div>
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">
            AI 추천 여행지
          </p>
          <h2 className="text-[22px] font-bold text-ink tracking-tight mb-6">
            지금 떠나기 좋은 곳
          </h2>
          <DestinationCardGrid destinations={filtered} isLoading={false} />
        </section>
      )}
    </div>
  );
}
