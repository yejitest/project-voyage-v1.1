import Header from "@/components/layout/Header";
import Marquee from "@/components/layout/Marquee";
import DateRangePicker from "@/components/calendar/DateRangePicker";
import ResultsSection from "@/components/results/ResultsSection";
import DestinationModal from "@/components/modals/DestinationModal";
import AttractionModal from "@/components/modals/AttractionModal";
import PixelHeroScene from "@/components/hero/PixelHeroScene";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* ① 히어로 */}
        <section className="max-w-[1280px] mx-auto px-6 pt-16 pb-10 flex items-center justify-between gap-8 overflow-hidden">
          {/* 텍스트 (왼쪽) */}
          <div className="max-w-[480px] flex-shrink-0">
            <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-4">
              TRAVEL CURATION
            </p>
            <h1
              className="font-extrabold text-ink tracking-tighter leading-none mb-5"
              style={{ fontSize: "clamp(56px, 8vw, 96px)" }}
            >
              Just
              <br />
              Go.
            </h1>
            <p className="text-base text-gray-500 max-w-[420px] leading-relaxed">
              일정만 고르면 됩니다.
              <br />
              비행 시간 고려해서 진짜 갈 수 있는 여행지만 추려드립니다.
            </p>
          </div>

          {/* 픽셀 씬 (오른쪽 — lg 이상에서만 노출) */}
          <div className="hidden lg:block flex-1 min-w-0">
            <PixelHeroScene />
          </div>
        </section>

        {/* ② Stats */}
        <section className="max-w-[1280px] mx-auto px-6 pb-12">
          <div className="flex items-center gap-8 flex-wrap">
            {[
              { value: "2,400+", label: "여행지" },
              { value: "98%", label: "만족도" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-[28px] font-extrabold text-ink tracking-tight">
                  {value}
                </span>
                <span className="text-sm font-semibold text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ③ 달력 */}
        <section className="max-w-[1280px] mx-auto px-6 pb-10">
          <div className="max-w-[860px]">
            <p className="text-[15px] font-bold text-ink mb-5">
              📅 출발일 — 귀국일 선택
            </p>
            <DateRangePicker />
          </div>
        </section>

        {/* ④ 결과 — 날짜 선택 후 로딩 → 여행지 카드 */}
        <ResultsSection />
      </main>

      {/* ⑤ 마퀴 */}
      <Marquee />

      {/* 모달 레이어 */}
      <DestinationModal />
      <AttractionModal />
    </>
  );
}
