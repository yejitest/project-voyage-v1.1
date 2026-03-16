"use client";

import type { ComponentType } from "react";
import useStore from "@/lib/store/useStore";
import type { Region } from "@/lib/types";
import {
  AsiaIcon,
  EuropeIcon,
  AmericasIcon,
  OceaniaIcon,
} from "@/components/icons/PixelIcons";

const FILTERS: { value: Region | "all"; label: string; Icon: ComponentType<{ size?: number }> }[] = [
  { value: "asia", label: "아시아", Icon: AsiaIcon },
  { value: "europe", label: "유럽", Icon: EuropeIcon },
  { value: "americas", label: "아메리카", Icon: AmericasIcon },
  { value: "oceania", label: "오세아니아", Icon: OceaniaIcon },
];

export default function FilterTabs() {
  const { activeRegionFilter, setRegionFilter } = useStore();

  return (
    <div className="flex overflow-x-auto border-b border-gray-200 px-6 -mx-6">
      {FILTERS.map(({ value, label, Icon }) => {
        const isActive = activeRegionFilter === value;
        return (
          <button
            key={value}
            onClick={() => setRegionFilter(isActive ? "all" : value)}
            className={`flex flex-col items-center gap-1.5 px-5 py-3 flex-shrink-0 text-xs font-semibold border-b-2 transition-all duration-150 ${
              isActive
                ? "text-ink border-ink"
                : "text-gray-500 border-transparent hover:text-ink"
            }`}
          >
            <Icon size={24} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
