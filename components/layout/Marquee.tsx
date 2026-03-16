const px: React.CSSProperties = { imageRendering: "pixelated" };
const SZ = 20; // display px

/** ✈️ 비행기 */
function IconAirplane() {
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 14 14" style={px}>
      <rect x="1" y="5" width="10" height="3" fill="#6C3FD6" />
      <rect x="11" y="6" width="2" height="1" fill="#4A2499" />
      <rect x="4" y="3" width="5" height="2" fill="#6C3FD6" />
      <rect x="5" y="2" width="2" height="1" fill="#4A2499" />
      <rect x="4" y="8" width="5" height="2" fill="#6C3FD6" />
      <rect x="5" y="10" width="2" height="1" fill="#4A2499" />
      <rect x="0" y="4" width="2" height="1" fill="#4A2499" />
      <rect x="0" y="8" width="2" height="1" fill="#4A2499" />
      <rect x="8" y="6" width="2" height="1" fill="#F3EDFF" />
      <rect x="6" y="6" width="1" height="1" fill="#C4A8F8" />
      <rect x="5" y="5" width="2" height="1" fill="#22C55E" />
      <rect x="5" y="8" width="2" height="1" fill="#22C55E" />
    </svg>
  );
}

/** 🧳 여행가방 */
function IconSuitcase() {
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 14 14" style={px}>
      {/* 손잡이 */}
      <rect x="4" y="0" width="6" height="1" fill="#4A2499" />
      <rect x="3" y="1" width="1" height="2" fill="#4A2499" />
      <rect x="10" y="1" width="1" height="2" fill="#4A2499" />
      {/* 본체 */}
      <rect x="1" y="3" width="12" height="9" fill="#6C3FD6" />
      {/* 중간 띠 */}
      <rect x="1" y="6" width="12" height="2" fill="#4A2499" />
      {/* 자물쇠 */}
      <rect x="6" y="6" width="2" height="2" fill="#22C55E" />
      {/* 바퀴 */}
      <rect x="2" y="12" width="2" height="2" fill="#4A2499" />
      <rect x="10" y="12" width="2" height="2" fill="#4A2499" />
    </svg>
  );
}

/** 📷 카메라 */
function IconCamera() {
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 14 14" style={px}>
      {/* 플래시 */}
      <rect x="9" y="1" width="3" height="2" fill="#6C3FD6" />
      {/* 본체 */}
      <rect x="0" y="3" width="14" height="9" fill="#6C3FD6" />
      {/* 상단 바 */}
      <rect x="0" y="3" width="14" height="2" fill="#4A2499" />
      {/* 셔터 버튼 */}
      <rect x="2" y="3" width="3" height="1" fill="#22C55E" />
      {/* 렌즈 외곽 */}
      <rect x="4" y="5" width="6" height="6" fill="#4A2499" />
      {/* 렌즈 중간 */}
      <rect x="5" y="6" width="4" height="4" fill="#22C55E" />
      {/* 렌즈 하이라이트 */}
      <rect x="6" y="7" width="2" height="2" fill="#F3EDFF" />
      <rect x="5" y="6" width="1" height="1" fill="#86EFAC" />
    </svg>
  );
}

/** ☀️ 태양 */
function IconSun() {
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 14 14" style={px}>
      {/* 중심 */}
      <rect x="4" y="4" width="6" height="6" fill="#EA580C" />
      <rect x="5" y="5" width="4" height="4" fill="#F97316" />
      {/* 광선 */}
      <rect x="6" y="0" width="2" height="3" fill="#EA580C" />
      <rect x="6" y="11" width="2" height="3" fill="#EA580C" />
      <rect x="0" y="6" width="3" height="2" fill="#EA580C" />
      <rect x="11" y="6" width="3" height="2" fill="#EA580C" />
      <rect x="1" y="1" width="2" height="2" fill="#EA580C" />
      <rect x="11" y="1" width="2" height="2" fill="#EA580C" />
      <rect x="1" y="11" width="2" height="2" fill="#EA580C" />
      <rect x="11" y="11" width="2" height="2" fill="#EA580C" />
    </svg>
  );
}

/** 🏔 산 */
function IconMountain() {
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 14 14" style={px}>
      {/* 눈 덮인 봉우리 */}
      <rect x="6" y="0" width="2" height="2" fill="#F3EDFF" />
      <rect x="5" y="2" width="4" height="2" fill="#F3EDFF" />
      {/* 산 몸통 */}
      <rect x="4" y="4" width="6" height="2" fill="#6C3FD6" />
      <rect x="3" y="6" width="8" height="2" fill="#6C3FD6" />
      <rect x="2" y="8" width="10" height="2" fill="#4A2499" />
      <rect x="1" y="10" width="12" height="2" fill="#4A2499" />
      {/* 초록 기슭 */}
      <rect x="0" y="12" width="14" height="2" fill="#22C55E" />
    </svg>
  );
}

/** 🗺 위치핀 */
function IconMapPin() {
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 14 14" style={px}>
      {/* 핀 헤드 */}
      <rect x="4" y="0" width="6" height="2" fill="#6C3FD6" />
      <rect x="2" y="2" width="10" height="4" fill="#6C3FD6" />
      <rect x="2" y="6" width="10" height="2" fill="#6C3FD6" />
      <rect x="4" y="8" width="6" height="2" fill="#6C3FD6" />
      {/* 구멍 */}
      <rect x="5" y="2" width="4" height="5" fill="#F3EDFF" />
      <rect x="6" y="3" width="2" height="3" fill="#4A2499" />
      {/* 꼬리 */}
      <rect x="6" y="10" width="2" height="3" fill="#6C3FD6" />
      <rect x="6" y="13" width="2" height="1" fill="#4A2499" />
    </svg>
  );
}

/** ⛵ 배 */
function IconBoat() {
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 14 14" style={px}>
      {/* 돛대 */}
      <rect x="6" y="0" width="2" height="7" fill="#4A2499" />
      {/* 돛 */}
      <rect x="4" y="1" width="4" height="5" fill="#F3EDFF" />
      <rect x="3" y="3" width="3" height="3" fill="#F3EDFF" />
      {/* 선체 */}
      <rect x="1" y="7" width="12" height="3" fill="#6C3FD6" />
      <rect x="2" y="10" width="10" height="2" fill="#4A2499" />
      <rect x="4" y="12" width="6" height="2" fill="#4A2499" />
      {/* 선창 */}
      <rect x="3" y="8" width="2" height="2" fill="#C4A8F8" />
      <rect x="9" y="8" width="2" height="2" fill="#C4A8F8" />
    </svg>
  );
}

/** 🌴 야자수 */
function IconPalm() {
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 14 14" style={px}>
      {/* 나뭇잎 */}
      <rect x="6" y="0" width="2" height="2" fill="#16A34A" />
      <rect x="4" y="1" width="3" height="2" fill="#22C55E" />
      <rect x="8" y="1" width="3" height="2" fill="#22C55E" />
      <rect x="2" y="2" width="4" height="2" fill="#22C55E" />
      <rect x="9" y="2" width="4" height="2" fill="#22C55E" />
      <rect x="1" y="3" width="3" height="2" fill="#16A34A" />
      <rect x="11" y="3" width="3" height="2" fill="#16A34A" />
      <rect x="5" y="3" width="4" height="2" fill="#86EFAC" />
      {/* 코코넛 */}
      <rect x="5" y="5" width="2" height="2" fill="#92400E" />
      <rect x="8" y="4" width="2" height="2" fill="#92400E" />
      {/* 기둥 */}
      <rect x="6" y="5" width="2" height="9" fill="#D97706" />
      <rect x="5" y="9" width="1" height="3" fill="#B45309" />
      <rect x="8" y="7" width="1" height="3" fill="#B45309" />
      {/* 바닥 */}
      <rect x="4" y="13" width="6" height="1" fill="#D97706" />
    </svg>
  );
}

/** 🧭 나침반 */
function IconCompass() {
  return (
    <svg width={SZ} height={SZ} viewBox="0 0 14 14" style={px}>
      {/* 원 테두리 */}
      <rect x="4" y="0" width="6" height="2" fill="#6C3FD6" />
      <rect x="2" y="2" width="2" height="2" fill="#6C3FD6" />
      <rect x="10" y="2" width="2" height="2" fill="#6C3FD6" />
      <rect x="0" y="4" width="2" height="6" fill="#6C3FD6" />
      <rect x="12" y="4" width="2" height="6" fill="#6C3FD6" />
      <rect x="2" y="10" width="2" height="2" fill="#6C3FD6" />
      <rect x="10" y="10" width="2" height="2" fill="#6C3FD6" />
      <rect x="4" y="12" width="6" height="2" fill="#6C3FD6" />
      {/* 배경 */}
      <rect x="2" y="4" width="10" height="6" fill="#F3EDFF" />
      <rect x="4" y="2" width="6" height="10" fill="#F3EDFF" />
      {/* N 포인터 */}
      <rect x="6" y="2" width="2" height="4" fill="#EA580C" />
      {/* S 포인터 */}
      <rect x="6" y="8" width="2" height="4" fill="#4A2499" />
      {/* 중심 */}
      <rect x="6" y="6" width="2" height="2" fill="#222222" />
    </svg>
  );
}

const ICONS = [
  { key: "airplane", el: <IconAirplane />, label: "TAKE OFF" },
  { key: "suitcase", el: <IconSuitcase />, label: "PACK IT" },
  { key: "camera",   el: <IconCamera />,   label: "CAPTURE" },
  { key: "sun",      el: <IconSun />,      label: "SUNNY DAYS" },
  { key: "mountain", el: <IconMountain />, label: "ADVENTURE" },
  { key: "mappin",   el: <IconMapPin />,   label: "EXPLORE" },
  { key: "boat",     el: <IconBoat />,     label: "SET SAIL" },
  { key: "palm",     el: <IconPalm />,     label: "BEACH VIBES" },
  { key: "compass",  el: <IconCompass />,  label: "NAVIGATE" },
];

export default function Marquee() {
  const track = [...ICONS, ...ICONS].map(({ key, el, label }, i) => (
    <span
      key={`${key}-${i}`}
      className="inline-flex items-center gap-2 pr-10"
    >
      <span className="pixel-hop">{el}</span>
      <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-[0.18em] select-none">
        {label}
      </span>
    </span>
  ));

  return (
    <div className="marquee-wrap fixed bottom-0 left-0 right-0 z-50 overflow-hidden border-t border-gray-200 py-2 bg-white">
      {/* 좌우 fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="marquee-track flex whitespace-nowrap">
        {track}
      </div>
    </div>
  );
}
