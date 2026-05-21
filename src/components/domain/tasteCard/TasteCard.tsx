"use client";

import Image from "next/image";

import { Icon } from "@/components/ui/Icon";

import { tasteCardVariants } from "./tasteCard.variants";

import type { ITasteCardProps } from "./tasteCard.types";

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
            <Icon name={domain} className="text-white/40" size={56} />
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
        <Icon name="check" className="text-white" size={16} />
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
