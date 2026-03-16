"use client";

import { useState, useCallback } from "react";
import type { CSSProperties, MouseEvent } from "react";
import Image from "next/image";
import type { Destination } from "@/lib/types";
import { StarIcon, HeartPixelIcon } from "@/components/icons/PixelIcons";
import useStore from "@/lib/store/useStore";

// 8방향 파티클 — 각각 방향벡터(px)
const PARTICLES: { tx: number; ty: number; color: string }[] = [
  { tx: -14, ty: -14, color: "#EA580C" },
  { tx:   0, ty: -18, color: "#FCD34D" },
  { tx:  14, ty: -14, color: "#EA580C" },
  { tx: -18, ty:   0, color: "#FCA5A5" },
  { tx:  18, ty:   0, color: "#FCA5A5" },
  { tx: -12, ty:  12, color: "#FCD34D" },
  { tx:   0, ty:  16, color: "#EA580C" },
  { tx:  12, ty:  12, color: "#FCD34D" },
];

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const { openDestinationModal } = useStore();
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(false);

  const handleLike = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
    setBurst(true);
    setTimeout(() => setBurst(false), 500);
  }, []);

  return (
    <div
      className="cursor-pointer group"
      onClick={() => openDestinationModal(destination)}
    >
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-[10px]">
        <Image
          src={destination.heroImage}
          alt={destination.city}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />

        {/* 찜하기 버튼 */}
        <button
          className="absolute top-[10px] right-[10px] w-[34px] h-[34px] flex items-center justify-center bg-transparent border-none"
          style={{ overflow: "visible" }}
          onClick={handleLike}
          aria-label={liked ? "찜 해제" : "찜하기"}
        >
          {/* 파티클 */}
          {burst && PARTICLES.map((p, i) => (
            <span
              key={i}
              className="pixel-particle"
              style={{
                background: p.color,
                "--px-tx": `${p.tx}px`,
                "--px-ty": `${p.ty}px`,
                animationDelay: `${i * 18}ms`,
              } as CSSProperties}
            />
          ))}

          {/* 하트 아이콘 */}
          <span className={burst ? "pixel-heart-pop" : "inline-flex"}>
            <HeartPixelIcon size={20} filled={liked} />
          </span>
        </button>

        {/* 게스트 추천 배지 */}
        <div className="absolute top-[10px] left-[10px] bg-white rounded px-[9px] py-1 text-[11px] font-bold text-ink flex items-center gap-1 shadow-sm">
          <StarIcon size={10} />
          게스트 추천
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="px-0.5">
        <div className="flex justify-between items-start">
          <span className="text-sm font-bold text-ink">
            {destination.city}, {destination.country}
          </span>
          <span className="text-[13px] font-medium flex items-center gap-1">
            ★ {destination.rating.toFixed(2)}
          </span>
        </div>
        <p className="text-[13px] text-gray-500 mt-0.5">
          {destination.tags.map((t) => `${t.emoji} ${t.label}`).join(" · ")}
        </p>
        <p className="text-[13px] text-gray-500">{destination.reasonOneLiner}</p>
        <p className="text-sm mt-1">
          <strong className="font-bold text-ink">
            ₩{destination.estimatedPricePerNight.toLocaleString()}
          </strong>
          <span className="text-ink font-normal"> / 박 예상</span>
        </p>
      </div>
    </div>
  );
}
