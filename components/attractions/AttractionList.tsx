"use client";

import type { ComponentType } from "react";
import type { Attraction, AttractionCategory } from "@/lib/types";
import AttractionItem from "./AttractionItem";
import {
  HistoryCultureIcon,
  NatureRelaxIcon,
  FoodMarketIcon,
  ShoppingIcon,
} from "@/components/icons/PixelIcons";

const CATEGORY_CONFIG: Record<
  AttractionCategory,
  { label: string; Icon: ComponentType<{ size?: number }> }
> = {
  "history-culture": { label: "역사·문화", Icon: HistoryCultureIcon },
  "nature-relaxation": { label: "자연·휴양", Icon: NatureRelaxIcon },
  "food-market": { label: "미식·야시장", Icon: FoodMarketIcon },
  "shopping-lifestyle": { label: "쇼핑·라이프스타일", Icon: ShoppingIcon },
};

interface AttractionListProps {
  attractions: Attraction[];
}

export default function AttractionList({ attractions }: AttractionListProps) {
  const categories = Object.keys(CATEGORY_CONFIG) as AttractionCategory[];

  return (
    <div className="flex flex-col gap-8">
      {categories.map((cat) => {
        const items = attractions.filter((a) => a.category === cat);
        if (items.length === 0) return null;

        const { label, Icon } = CATEGORY_CONFIG[cat];
        return (
          <section key={cat}>
            <div className="flex items-center gap-2.5 text-lg font-bold text-ink mb-4">
              <Icon size={22} />
              {label}
            </div>
            <div>
              {items.map((attraction) => (
                <AttractionItem key={attraction.id} attraction={attraction} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
