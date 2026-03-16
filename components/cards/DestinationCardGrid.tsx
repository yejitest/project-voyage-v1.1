"use client";

import type { Destination } from "@/lib/types";
import DestinationCard from "./DestinationCard";
import SkeletonCard from "./SkeletonCard";

interface DestinationCardGridProps {
  destinations: Destination[];
  isLoading?: boolean;
}

const SKELETON_COUNT = 8;

export default function DestinationCardGrid({
  destinations,
  isLoading = false,
}: DestinationCardGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 text-sm">
        <p>날짜를 선택하면 여행지를 추천해 드릴게요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} destination={dest} />
      ))}
    </div>
  );
}
