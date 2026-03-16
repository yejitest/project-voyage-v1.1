"use client";

import useStore from "@/lib/store/useStore";

export default function AttractionModal() {
  const { isAttractionModalOpen, selectedAttraction, closeAttractionModal } =
    useStore();

  if (!isAttractionModalOpen || !selectedAttraction) return null;

  return (
    // TODO: 관광지 서브모달 구현
    // - 상위 DestinationModal 위에 중첩 레이어 (z-60)
    // - max-w-[560px], 중앙 정렬
    // - 대표 사진 / 상세 설명 (3~5문장) / Google Maps embed / 인근 맛집 2~3곳
    // - ESC 키 / X 버튼 닫기 (상위 모달은 유지)
    null
  );
}
