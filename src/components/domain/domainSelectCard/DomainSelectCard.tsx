"use client";

import { domainSelectCardVariants } from "./domainSelectCard.variants";

import type { IDomainSelectCardProps } from "./domainSelectCard.types";

// ── Arrow Icon ─────────────────────────────────────────────────────────────────

const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 10H16M16 10L11 5M16 10L11 15"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Mascot Icons ───────────────────────────────────────────────────────────────

const MusicMascot = ({ className }: { className?: string }) => (
  <svg
    viewBox="30 10 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    {/* Vinyl record */}
    <rect x="30" y="10" width="180" height="180" rx="90" fill="#1A1C1A" />
    {/* Concentric grooves */}
    <rect
      x="44.89"
      y="24.89"
      width="150.22"
      height="150.22"
      rx="75.11"
      stroke="white"
      strokeOpacity="0.08"
    />
    <rect
      x="63.8"
      y="43.8"
      width="112.41"
      height="112.41"
      rx="56.205"
      stroke="white"
      strokeOpacity="0.08"
    />
    <rect
      x="83.19"
      y="63.19"
      width="73.63"
      height="73.63"
      rx="36.815"
      stroke="white"
      strokeOpacity="0.08"
    />
    {/* Face */}
    <rect x="80.4" y="60.4" width="79.19" height="79.19" rx="39.595" fill="#1A1C1A" />
    {/* Left eye */}
    <rect x="84" y="85" width="30" height="30" rx="15" fill="white" />
    <rect x="91.5" y="92.5" width="15" height="15" rx="7.5" fill="#1A1C1A" />
    {/* Right eye — wink on hover */}
    <rect
      x="126"
      y="85"
      width="30"
      height="30"
      rx="15"
      fill="white"
      className="group-hover:animate-wink [transform-box:fill-box] [transform-origin:center]"
    />
    <rect
      x="133.5"
      y="92.5"
      width="15"
      height="15"
      rx="7.5"
      fill="#1A1C1A"
      className="group-hover:animate-wink [transform-box:fill-box] [transform-origin:center]"
    />
  </svg>
);

const MovieMascot = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    {/* Film strip body */}
    <rect width="120" height="100" rx="24" fill="#1A1C1A" />
    {/* Perforations — top */}
    <rect x="12" y="12" width="8" height="8" rx="4" fill="#FAF9F6" fillOpacity="0.2" />
    <rect x="41.33" y="12" width="8" height="8" rx="4" fill="#FAF9F6" fillOpacity="0.2" />
    <rect x="70.67" y="12" width="8" height="8" rx="4" fill="#FAF9F6" fillOpacity="0.2" />
    <rect x="100" y="12" width="8" height="8" rx="4" fill="#FAF9F6" fillOpacity="0.2" />
    {/* Perforations — bottom */}
    <rect x="12" y="78" width="8" height="8" rx="4" fill="#FAF9F6" fillOpacity="0.2" />
    <rect x="41.33" y="78" width="8" height="8" rx="4" fill="#FAF9F6" fillOpacity="0.2" />
    <rect x="70.67" y="78" width="8" height="8" rx="4" fill="#FAF9F6" fillOpacity="0.2" />
    <rect x="100" y="78" width="8" height="8" rx="4" fill="#FAF9F6" fillOpacity="0.2" />
    {/* Screen area */}
    <rect x="10" y="24" width="100" height="54" rx="16" fill="#1A1C1A" />
    {/* Left eye */}
    <rect x="36" y="41" width="20" height="20" rx="10" fill="white" />
    <rect x="41" y="46" width="10" height="10" rx="5" fill="#1A1C1A" />
    {/* Right eye — wink on hover */}
    <rect
      x="64"
      y="41"
      width="20"
      height="20"
      rx="10"
      fill="white"
      className="group-hover:animate-wink [transform-box:fill-box] [transform-origin:center]"
    />
    <rect
      x="69"
      y="46"
      width="10"
      height="10"
      rx="5"
      fill="#1A1C1A"
      className="group-hover:animate-wink [transform-box:fill-box] [transform-origin:center]"
    />
  </svg>
);

const FashionMascot = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 106 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    {/* T-shirt body */}
    <path
      d="M28.91 0.5C44.97 9.8 61.03 9.8 77.09 0.5H91.55C99.58 0.5 104.39 5.54 106 15.62V38.87C106 44.3 101.18 47.01 91.55 47.01V97.01C91.55 99.34 89.94 100.5 86.73 100.5H19.27C16.06 100.5 14.45 99.34 14.45 97.01V47.01C4.82 47.01 0 44.3 0 38.87V15.62C1.61 5.54 6.42 0.5 14.45 0.5H28.91Z"
      fill="#1A1C1A"
    />
    {/* Left eye */}
    <rect x="29" y="40" width="20" height="20" rx="10" fill="white" />
    <rect x="34" y="45" width="10" height="10" rx="5" fill="#1A1C1A" />
    {/* Right eye — wink on hover */}
    <rect
      x="57"
      y="40"
      width="20"
      height="20"
      rx="10"
      fill="white"
      className="group-hover:animate-wink [transform-box:fill-box] [transform-origin:center]"
    />
    <rect
      x="62"
      y="45"
      width="10"
      height="10"
      rx="5"
      fill="#1A1C1A"
      className="group-hover:animate-wink [transform-box:fill-box] [transform-origin:center]"
    />
  </svg>
);

const domainMascots: Record<"music" | "movie" | "fashion", React.FC<{ className?: string }>> = {
  music: MusicMascot,
  movie: MovieMascot,
  fashion: FashionMascot,
};

// ── Component ─────────────────────────────────────────────────────────────────

export const DomainSelectCard = ({ domain, onClick }: IDomainSelectCardProps) => {
  const variant = domainSelectCardVariants[domain];
  const Mascot = domainMascots[domain];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${variant.title} 도메인 선택`}
      className={[
        // Layout
        "flex flex-col text-left overflow-hidden",
        // Size — mobile: full-width / tablet: 224px / desktop: 384px
        // Width: 부모 그리드 셀을 채움 (고정 너비 없음)
        // Height: sm 435px / md 320px / lg 512px
        "w-full h-[435px]",
        "md:h-[320px]",
        "lg:h-[512px]",
        // Shape — rounded-lg = 2rem = 32px
        "rounded-lg",
        // Background
        "bg-surface-variant",
        // Group (hover 전파용)
        "group",
        // Shadow
        "editorial-shadow",
        // Transitions & hover
        "transition-all duration-300",
        "hover:scale-[1.02]",
        "hover:shadow-[0_24px_64px_rgba(0,0,0,0.12)]",
        "hover:ring-2 hover:ring-primary-container hover:shadow-[0_0_0_4px_rgba(255,92,0,0.15)]",
      ].join(" ")}
    >
      {/* ── 상단: 레이블 + 타이틀 ────────────────────────────────────────── */}
      <div className="px-10 pt-10 pb-0 md:px-4 md:pt-[22px] lg:px-10 lg:pt-10">
        <span className="block font-body font-medium text-body-sm text-primary-container">
          {variant.label}
        </span>
        <h3 className="font-headline font-black text-headline-md text-on-background leading-tight">
          {variant.title}
        </h3>
      </div>

      {/* ── 중간: 마스코트 아이콘 ─────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center">
        <Mascot
          className={[
            "w-[200px] h-[200px]",
            "md:w-[100px] md:h-[100px]",
            "lg:w-[180px] lg:h-[180px]",
            // hover: 살짝 위로 떠오름
            "transition-transform duration-300 ease-out group-hover:-translate-y-2",
          ].join(" ")}
        />
      </div>

      {/* ── 하단: 설명 + 화살표 버튼 ──────────────────────────────────────── */}
      <div className="flex items-end justify-between px-10 pb-10 md:px-4 md:pb-[22px] lg:px-10 lg:pb-10">
        <p className="font-body text-label-md-regular text-on-surface-variant/60 max-w-[140px] md:max-w-[120px]">
          {variant.description}
        </p>
        <div
          className="shrink-0 flex items-center justify-center rounded-full bg-primary-container w-14 h-14 md:w-9 md:h-9 lg:w-14 lg:h-14"
          aria-hidden="true"
        >
          <ArrowIcon />
        </div>
      </div>
    </button>
  );
};
