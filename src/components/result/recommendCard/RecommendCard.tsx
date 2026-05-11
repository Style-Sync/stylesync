"use client";

import Image from "next/image";

import { recommendCardVariants } from "./recommendCard.variants";

import type { IRecommendCardProps } from "./recommendCard.types";

// ── Play Icon ─────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M0 0L10 6L0 12V0Z" fill="currentColor" />
  </svg>
);

// ── Music Card ────────────────────────────────────────────────────────────────

const MusicCardContent = ({
  title,
  subtitle,
  imageUrl,
  previewUrl,
  onPreviewClick,
}: Pick<
  IRecommendCardProps,
  "title" | "subtitle" | "imageUrl" | "previewUrl" | "onPreviewClick"
>) => {
  const hasPreview = Boolean(previewUrl);

  return (
    <>
      {/* ── 이미지 영역 ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-4 px-10 pt-10 pb-4">
        {/* 앨범아트 */}
        {/* rounded = DEFAULT = 1rem = 16px (design system token) */}
        <div className="relative w-40 h-40 rounded overflow-hidden bg-on-background shrink-0">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill sizes="160px" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle cx="16" cy="36" r="6" stroke="white" strokeWidth="3" />
                <circle cx="36" cy="30" r="6" stroke="white" strokeWidth="3" />
                <path
                  d="M22 36V12L42 6V30"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        {/* 곡명 */}
        <div className="text-center px-2">
          <p className="font-body font-bold text-title-lg text-on-background keep-all leading-tight">
            {title}
          </p>
          {subtitle && (
            <p className="mt-1 font-body text-body-sm text-on-surface-variant keep-all">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── 30S PREVIEW 버튼 ─────────────────────────────────────────────── */}
      <div className="px-10 pb-10">
        <button
          type="button"
          onClick={hasPreview ? onPreviewClick : undefined}
          disabled={!hasPreview}
          aria-label={hasPreview ? `${title} 30초 미리듣기` : "미리듣기를 사용할 수 없습니다"}
          className={[
            // rounded = DEFAULT = 1rem = 16px (design system token)
            "w-full h-[57px] rounded",
            "flex items-center justify-center gap-3",
            "font-body font-medium text-body-sm text-on-background",
            "transition-all duration-200",
            hasPreview
              ? "bg-surface hover:bg-surface/80 active:scale-[0.98]"
              : "bg-surface/40 cursor-not-allowed opacity-50",
          ].join(" ")}
        >
          {/* PlayIcon fill="currentColor" → 부모 text-on-background 색상 상속 */}
          <PlayIcon />
          <span className="tracking-widest uppercase">30S PREVIEW</span>
        </button>
      </div>
    </>
  );
};

// ── Movie / Fashion Card ──────────────────────────────────────────────────────

const DarkCardContent = ({
  title,
  subtitle,
  imageUrl,
  label,
  domain,
}: Pick<IRecommendCardProps, "title" | "subtitle" | "imageUrl" | "label" | "domain">) => (
  <>
    {/* ── Full-bleed 이미지 ────────────────────────────────────────────── */}
    <div className="absolute inset-0">
      {imageUrl ? (
        <Image src={imageUrl} alt={title} fill sizes="315px" className="object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-on-background">
          {domain === "movie" ? (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect
                x="6"
                y="16"
                width="52"
                height="36"
                rx="3"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="3"
              />
              <path
                d="M6 26H58"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M6 42H58"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M19 16L13 8"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M32 16L26 8"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M45 16L39 8"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M6 8H58"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M32 8C32 8 22 14 11 17L17 27L21 24V54H43V24L47 27L53 17C42 14 32 8 32 8Z"
                stroke="white"
                strokeOpacity="0.4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      )}
    </div>

    {/* ── Scrim 그라디언트 ─────────────────────────────────────────────── */}
    <div className="absolute inset-0 scrim-gradient" aria-hidden="true" />

    {/* ── 하단 텍스트 오버레이 ─────────────────────────────────────────── */}
    <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 flex flex-col gap-2">
      {label && (
        <span className="font-body font-medium text-body-sm text-white/80 tracking-wide">
          {label}
        </span>
      )}
      <h3 className="font-headline font-black text-headline-md text-white keep-all leading-tight">
        {title}
      </h3>
      {subtitle && (
        <p className="font-body font-medium text-body-sm text-white/80 keep-all line-clamp-2">
          {subtitle}
        </p>
      )}
    </div>
  </>
);

// ── RecommendCard ─────────────────────────────────────────────────────────────

export const RecommendCard = ({
  domain,
  title,
  subtitle,
  imageUrl,
  label,
  previewUrl,
  onPreviewClick,
}: IRecommendCardProps) => {
  const variant = recommendCardVariants[domain];
  const isDark = domain === "movie" || domain === "fashion";

  return (
    <article
      className={[
        "relative flex flex-col overflow-hidden",
        "w-full",
        variant.height,
        "rounded-[2.5rem]",
        variant.cardBg,
        "editorial-shadow",
        "transition-transform duration-300 hover:scale-[1.02]",
      ].join(" ")}
    >
      {isDark ? (
        <DarkCardContent
          domain={domain}
          title={title}
          subtitle={subtitle}
          imageUrl={imageUrl}
          label={label}
        />
      ) : (
        <MusicCardContent
          title={title}
          subtitle={subtitle}
          imageUrl={imageUrl}
          previewUrl={previewUrl}
          onPreviewClick={onPreviewClick}
        />
      )}
    </article>
  );
};
