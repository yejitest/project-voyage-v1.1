"use client";

import type { CSSProperties } from "react";
import { formatKoreanDate } from "@/lib/utils/dateUtils";

const pixelStyle: CSSProperties = { imageRendering: "pixelated" };

/** 비행기 SVG (컨트레일 내장, viewBox 0 0 34 10) */
function PixelAirplane({ size = 52 }: { size?: number }) {
  const scale = size / 20;
  const w = 34 * scale;
  const h = 10 * scale;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 34 10"
      xmlns="http://www.w3.org/2000/svg"
      style={pixelStyle}
    >
      {/* ── 컨트레일 (왼쪽) ── */}
      <rect x="0" y="4" width="2" height="2" fill="#C4A8F8" opacity="0.2" />
      <rect x="3" y="4" width="2" height="2" fill="#C4A8F8" opacity="0.35" />
      <rect x="6" y="4" width="2" height="2" fill="#C4A8F8" opacity="0.55" />
      <rect x="9" y="3" width="2" height="1" fill="#C4A8F8" opacity="0.4" />
      <rect x="9" y="5" width="2" height="1" fill="#C4A8F8" opacity="0.4" />
      <rect x="11" y="4" width="2" height="2" fill="#C4A8F8" opacity="0.75" />

      {/* ── 비행기 본체 (x+14 offset) ── */}
      {/* 기체 몸통 */}
      <rect x="16" y="3" width="16" height="4" fill="#6C3FD6" />
      {/* 코 */}
      <rect x="32" y="4" width="2" height="2" fill="#4A2499" />
      {/* 위 날개 */}
      <rect x="21" y="1" width="7" height="2" fill="#6C3FD6" />
      <rect x="23" y="0" width="3" height="1" fill="#4A2499" />
      {/* 아래 날개 */}
      <rect x="21" y="7" width="7" height="2" fill="#6C3FD6" />
      <rect x="23" y="9" width="3" height="1" fill="#4A2499" />
      {/* 꼬리 위 */}
      <rect x="15" y="1" width="3" height="2" fill="#4A2499" />
      {/* 꼬리 아래 */}
      <rect x="15" y="7" width="3" height="2" fill="#4A2499" />
      {/* 창문 */}
      <rect x="26" y="4" width="2" height="2" fill="#F3EDFF" />
      <rect x="23" y="4" width="2" height="2" fill="#C4A8F8" />
      {/* 엔진 */}
      <rect x="22" y="3" width="3" height="1" fill="#22C55E" />
      <rect x="22" y="6" width="3" height="1" fill="#22C55E" />
    </svg>
  );
}

/** 픽셀 구름 */
function PixelCloud({ size = 1 }: { size?: number }) {
  const s = size;
  return (
    <svg
      width={28 * s}
      height={14 * s}
      viewBox="0 0 28 14"
      xmlns="http://www.w3.org/2000/svg"
      style={pixelStyle}
    >
      <rect x="6" y="0" width="6" height="2" fill="#EBEBEB" />
      <rect x="4" y="2" width="10" height="4" fill="#EBEBEB" />
      <rect x="2" y="4" width="14" height="4" fill="#F7F7F7" />
      <rect x="0" y="6" width="18" height="4" fill="#F7F7F7" />
      <rect x="0" y="8" width="18" height="2" fill="#EBEBEB" />
      {/* 두 번째 덩어리 */}
      <rect x="14" y="2" width="8" height="2" fill="#EBEBEB" />
      <rect x="14" y="4" width="10" height="4" fill="#F7F7F7" />
      <rect x="18" y="6" width="10" height="4" fill="#F7F7F7" />
      <rect x="18" y="8" width="10" height="2" fill="#EBEBEB" />
    </svg>
  );
}

function TrailDot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-purple-300"
      style={{ animation: `dotPulse 1.2s ease-in-out ${delay}s infinite` }}
    />
  );
}

interface AirplaneLoaderProps {
  checkIn: Date;
  checkOut: Date;
}

export default function AirplaneLoader({ checkIn, checkOut }: AirplaneLoaderProps) {
  const nights = Math.round(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="py-10 flex flex-col items-start gap-6">
      {/* 비행기 트랙 */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          height: 80,
          background: "linear-gradient(180deg, #e8deff 0%, #f3edff 60%, #fff 100%)",
        }}
      >
        {/* 구름 1 — 느리게 */}
        <div
          className="absolute"
          style={{
            top: 8,
            left: "10%",
            animation: "cloudDrift1 18s linear infinite",
            opacity: 0.8,
          }}
        >
          <PixelCloud size={0.9} />
        </div>

        {/* 구름 2 — 중간 */}
        <div
          className="absolute"
          style={{
            top: 28,
            left: "55%",
            animation: "cloudDrift2 12s linear infinite",
            opacity: 0.6,
          }}
        >
          <PixelCloud size={0.65} />
        </div>

        {/* 구름 3 — 빠르게 */}
        <div
          className="absolute"
          style={{
            top: 14,
            left: "80%",
            animation: "cloudDrift1 9s linear infinite",
            opacity: 0.5,
          }}
        >
          <PixelCloud size={0.5} />
        </div>

        {/* 점선 경로 */}
        <div className="absolute left-0 right-0 flex items-center gap-1 px-4" style={{ top: "50%", transform: "translateY(-50%)" }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="flex-1 h-px border-t-2 border-dashed border-purple-200/60" />
          ))}
        </div>

        {/* 비행기 (회전 포함) */}
        <div
          className="absolute"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            animation: "fly 2.8s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        >
          <PixelAirplane size={48} />
        </div>
      </div>

      {/* 로딩 텍스트 */}
      <div style={{ animation: "fadeInUp 0.4s ease-out both" }}>
        <p className="text-[15px] font-bold text-ink mb-1">
          {formatKoreanDate(checkIn)} → {formatKoreanDate(checkOut)}
          <span className="ml-2 text-purple-600">({nights}박 {nights + 1}일)</span>
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          AI가 최적의 여행지를 찾고 있어요
          <span className="inline-flex gap-1 ml-1">
            <TrailDot delay={0} />
            <TrailDot delay={0.2} />
            <TrailDot delay={0.4} />
          </span>
        </p>
      </div>
    </div>
  );
}
