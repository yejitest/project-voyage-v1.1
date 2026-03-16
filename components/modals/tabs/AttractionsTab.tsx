"use client";

import type { Attraction } from "@/lib/types";
import AttractionList from "@/components/attractions/AttractionList";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { MapPinIcon } from "@/components/icons/PixelIcons";

interface AttractionsTabProps {
  attractions: Attraction[] | null;
  isLoading: boolean;
  onReload: () => void;
}

function AttractionsSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2].map((section) => (
        <div key={section}>
          <div className="flex items-center gap-2 mb-4">
            <SkeletonLoader height="h-5" width="w-5" rounded="rounded-md" />
            <SkeletonLoader height="h-5" width="w-24" />
          </div>
          <div className="space-y-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-4 border-b border-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <SkeletonLoader height="h-4" width="w-40" />
                    <SkeletonLoader height="h-3" width="w-full" />
                    <SkeletonLoader height="h-3" width="w-5/6" />
                    <div className="flex gap-3 pt-0.5">
                      <SkeletonLoader height="h-3" width="w-16" />
                      <SkeletonLoader height="h-3" width="w-12" />
                    </div>
                  </div>
                  <SkeletonLoader height="h-6" width="w-6" rounded="rounded-full" className="ml-3 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AttractionsTab({ attractions, isLoading, onReload }: AttractionsTabProps) {
  if (isLoading) {
    return (
      <div className="p-5" style={{ animation: "fadeInUp 0.2s ease-out both" }}>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-sm text-gray-500">AI가 추천 관광지를 불러오고 있습니다...</span>
        </div>
        <AttractionsSkeleton />
      </div>
    );
  }

  if (!attractions || attractions.length === 0) {
    return (
      <div
        className="py-16 text-center px-5"
        style={{ animation: "fadeInUp 0.2s ease-out both" }}
      >
        <div className="mb-4 flex justify-center"><MapPinIcon size={48} /></div>
        <p className="text-[15px] font-extrabold text-ink mb-2">관광지를 불러오지 못했습니다</p>
        <p className="text-sm text-gray-500 mb-6">다시 시도해 보세요.</p>
        <button
          onClick={onReload}
          className="px-5 py-2.5 bg-ink text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors"
        >
          다시 불러오기
        </button>
      </div>
    );
  }

  return (
    <div className="p-5" style={{ animation: "fadeInUp 0.2s ease-out both" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
            추천 관광지
          </p>
          <h3 className="text-[17px] font-extrabold text-ink tracking-tight">
            카테고리별 {attractions.length}곳
          </h3>
        </div>
        <button
          onClick={onReload}
          className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-[13px] font-semibold text-gray-700 rounded-xl hover:border-ink hover:text-ink transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.49 15a9 9 0 1 1-.08-4.92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>다시 추천</span>
        </button>
      </div>
      <AttractionList attractions={attractions} />
    </div>
  );
}
