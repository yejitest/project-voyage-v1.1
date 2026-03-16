"use client";

import type { DaySchedule } from "@/lib/types";
import Button from "@/components/ui/Button";
import { copyItineraryAsText } from "@/lib/utils/itineraryUtils";

interface ItineraryExportProps {
  days: DaySchedule[];
}

export default function ItineraryExport({ days }: ItineraryExportProps) {
  const handleCopyText = async () => {
    const text = copyItineraryAsText(days);
    await navigator.clipboard.writeText(text);
  };

  const handlePrint = () => {
    // TODO: react-to-print 연동
    window.print();
  };

  return (
    <div className="flex gap-3 mt-4">
      <Button variant="text" onClick={handleCopyText}>
        📋 텍스트 복사
      </Button>
      <Button variant="text" onClick={handlePrint}>
        🖨️ PDF 인쇄 →
      </Button>
    </div>
  );
}
