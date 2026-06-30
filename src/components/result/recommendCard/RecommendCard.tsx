"use client";

import { useState } from "react";

import Image from "next/image";

import { Icon } from "@/components/ui/Icon";

import { EqualizerBars } from "./EqualizerBars";
import { recommendCardVariants } from "./recommendCard.variants";

import type { IRecommendCardProps } from "./recommendCard.types";

// ── Music Card ────────────────────────────────────────────────────────────────

const MusicCardContent = ({
  title,
  subtitle,
  imageUrl,
  previewUrl,
  onPreviewClick,
  isPlaying,
}: Pick<
  IRecommendCardProps,
  "title" | "subtitle" | "imageUrl" | "previewUrl" | "onPreviewClick" | "isPlaying"
>) => {
  const hasPreview = Boolean(previewUrl);

  return (
    <>
      {/* ── 이미지 영역 ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-4 px-5 pt-5 pb-2 lg:px-10 lg:pt-10 lg:pb-4">
        {/* 앨범아트 */}
        {/* rounded = DEFAULT = 1rem = 16px (design system token) */}
        <div className="relative w-40 h-40 rounded overflow-hidden bg-on-background shrink-0">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill sizes="160px" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="music" className="text-white/50" size={48} />
            </div>
          )}

          {/* 재생 중 overlay + equalizer */}
          {isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[2px] text-white"
              aria-hidden="true"
            >
              <EqualizerBars size="lg" />
            </div>
          )}
        </div>

        {/* 곡명 */}
        <div className="text-center px-2">
          <p className="font-korean font-bold text-title-lg text-on-background keep-all leading-tight">
            {title}
          </p>
          {subtitle && (
            <p className="mt-1 font-korean text-body-sm text-on-surface-variant keep-all">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── PREVIEW / Spotify fallback 버튼 ───────────────────────────────── */}
      <div className="px-5 pb-5 lg:px-10 lg:pb-10">
        {hasPreview ? (
          <button
            type="button"
            onClick={onPreviewClick}
            aria-label={`${title} 30초 미리듣기`}
            className={[
              "w-full h-[33px] lg:h-[57px] rounded",
              "flex items-center justify-center gap-3",
              "font-korean font-medium text-body-sm text-on-background",
              "transition-all duration-200",
              "bg-surface hover:bg-surface/80 active:scale-[0.98]",
            ].join(" ")}
          >
            {isPlaying ? (
              <EqualizerBars size="sm" className="text-on-background" />
            ) : (
              <Icon name="play" size={12} />
            )}
            <span className="tracking-widest uppercase">
              {isPlaying ? "PLAYING" : "30S PREVIEW"}
            </span>
          </button>
        ) : (
          // #76 — iTunes preview 없을 시 Spotify 검색 페이지로 fallback (FT-002 명세)
          <a
            href={`https://open.spotify.com/search/${encodeURIComponent(`${subtitle ?? ""} ${title}`.trim())}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title}을(를) Spotify에서 듣기`}
            className={[
              "w-full h-[33px] lg:h-[57px] rounded",
              "flex items-center justify-center gap-3",
              "font-korean font-medium text-body-sm text-on-background",
              "transition-all duration-200",
              "bg-surface hover:bg-surface/80 active:scale-[0.98]",
            ].join(" ")}
          >
            <Icon name="play" size={12} />
            <span className="tracking-widest uppercase">OPEN IN SPOTIFY</span>
          </a>
        )}
      </div>
    </>
  );
};

// ── Movie / Fashion Card ──────────────────────────────────────────────────────

const DarkCardContent = ({
  title,
  subtitle,
  imageUrl,
  domain,
}: Pick<IRecommendCardProps, "title" | "subtitle" | "imageUrl" | "domain">) => {
  // #82 — imageUrl이 falsy거나 로딩 실패 시 fallback Icon 표시
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(imageUrl) && !hasError;

  return (
    <>
      {/* ── Full-bleed 이미지 ────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {showImage ? (
          <Image
            src={imageUrl as string}
            alt={title}
            fill
            sizes="315px"
            // #79 — hover 시 이미지 강조 (scale-up). article의 group hover 사용.
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-on-background">
            <Icon
              name={domain === "movie" ? "movie" : "hanger"}
              className="text-white/40"
              size={64}
            />
          </div>
        )}
      </div>

      {/* ── Scrim 그라디언트 ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 scrim-gradient" aria-hidden="true" />

      {/* ── 하단 텍스트 오버레이 ─────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 flex flex-col gap-2">
        <h3 className="font-headline font-black text-[24px] lg:text-[30px] text-white keep-all leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="font-korean font-medium text-body-sm text-white/80 keep-all line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>
    </>
  );
};

// ── RecommendCard ─────────────────────────────────────────────────────────────

export const RecommendCard = ({
  domain,
  title,
  subtitle,
  imageUrl,
  previewUrl,
  onPreviewClick,
  isPlaying,
}: IRecommendCardProps) => {
  const variant = recommendCardVariants[domain];
  const isDark = domain === "movie" || domain === "fashion";

  return (
    <article
      className={[
        // group — DarkCardContent 내부 이미지의 hover scale에 사용 (#79)
        "group relative flex flex-col overflow-hidden",
        "w-full",
        variant.height,
        "rounded-[2.5rem]",
        variant.cardBg,
        "editorial-shadow",
        "transition-transform duration-300 hover:scale-[1.02]",
      ].join(" ")}
    >
      {isDark ? (
        <DarkCardContent domain={domain} title={title} subtitle={subtitle} imageUrl={imageUrl} />
      ) : (
        <MusicCardContent
          title={title}
          subtitle={subtitle}
          imageUrl={imageUrl}
          previewUrl={previewUrl}
          onPreviewClick={onPreviewClick}
          isPlaying={isPlaying}
        />
      )}
    </article>
  );
};
