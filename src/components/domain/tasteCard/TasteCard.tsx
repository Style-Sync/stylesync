"use client";

import Image from "next/image";

import { tasteCardVariants } from "./tasteCard.variants";

import type { ITasteCardProps } from "./tasteCard.types";

// ── Check Icon ────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3 8L6.5 11.5L13 5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Fallback Icons ────────────────────────────────────────────────────────────

const MusicFallback = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <circle cx="14" cy="42" r="7" stroke="white" strokeOpacity="0.4" strokeWidth="3" />
    <circle cx="42" cy="36" r="7" stroke="white" strokeOpacity="0.4" strokeWidth="3" />
    <path
      d="M21 42V14L49 6V34"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MovieFallback = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <rect
      x="5"
      y="14"
      width="46"
      height="32"
      rx="3"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="3"
    />
    <path d="M5 23H51" stroke="white" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M5 37H51" stroke="white" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
    <path
      d="M17 14L11 6M30 14L24 6M43 14L37 6"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M5 6H51" stroke="white" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 패션 취향 선택은 리스트+프리뷰 UI → TasteCard 미사용
const fallbackIcons: Record<"music" | "movie", React.FC> = {
  music: MusicFallback,
  movie: MovieFallback,
};

// ── TasteCard ─────────────────────────────────────────────────────────────────

export const TasteCard = ({
  domain,
  title,
  genre,
  imageUrl,
  selected = false,
  onClick,
}: ITasteCardProps) => {
  const variant = tasteCardVariants[domain];
  const FallbackIcon = fallbackIcons[domain];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`${title} ${variant.ariaLabel}`}
      className={[
        // Layout
        "relative overflow-hidden text-left",
        // Size — sm:348px / md:390px / lg:453px
        "w-full h-[348px] md:h-[390px] lg:h-[453px]",
        // Shape — rounded-xl = 3rem(48px)에 가장 가깝지만 Figma는 40px
        "rounded-[2.5rem]",
        // Border — selected 시 primary-container stroke
        "transition-all duration-300",
        selected ? "ring-2 ring-primary-container" : "ring-0",
        // Hover
        "hover:scale-[1.02]",
        "editorial-shadow",
      ].join(" ")}
    >
      {/* ── Full-bleed 이미지 ──────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-on-background">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 363px"
            className="object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${variant.fallbackBg}`}>
            <FallbackIcon />
          </div>
        )}
      </div>

      {/* ── Scrim 그라디언트 ───────────────────────────────────────────── */}
      <div className="absolute inset-0 scrim-gradient" aria-hidden="true" />

      {/* ── 선택 체크 서클 (우상단) ────────────────────────────────────── */}
      <div
        className={[
          "absolute top-8 right-7 w-10 h-10 rounded-full",
          "flex items-center justify-center",
          "transition-all duration-200",
          selected
            ? "bg-primary-container opacity-100 scale-100"
            : "bg-white/20 opacity-0 scale-75",
        ].join(" ")}
        aria-hidden="true"
      >
        <CheckIcon />
      </div>

      {/* ── 하단 텍스트 오버레이 ───────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 flex flex-col gap-3">
        {/* 제목 */}
        <h3 className="font-headline font-black text-headline-sm md:text-headline-md text-white keep-all leading-tight uppercase">
          {title}
        </h3>

        {/* 장르 배지 */}
        {genre && (
          <span
            className={[
              "self-start px-3 py-1 rounded-full",
              "font-korean font-medium text-body-sm text-white",
              "transition-colors duration-200",
              selected ? "bg-primary-container" : "bg-white/10",
            ].join(" ")}
          >
            {genre}
          </span>
        )}
      </div>
    </button>
  );
};
