"use client";

import Image from "next/image";

import { domainTagVariants } from "./shareCard.variants";

import type { IShareCardProps } from "./shareCard.types";

// ── Domain Tag ─────────────────────────────────────────────────────────────────

const DomainTag = ({
  domain,
  isInput,
}: {
  domain: "music" | "movie" | "fashion";
  isInput: boolean;
}) => {
  const variant = domainTagVariants[domain];

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5",
        "px-3 py-1.5 rounded-full",
        "font-body font-semibold text-body-xs uppercase tracking-widest",
        "transition-colors",
        isInput
          ? "bg-primary-container text-white"
          : "bg-surface-container-low text-on-surface-variant border border-outline-variant",
      ].join(" ")}
    >
      <span aria-hidden="true">{variant.icon}</span>
      {variant.label}
    </span>
  );
};

// ── Avatar Fallback ────────────────────────────────────────────────────────────

const AvatarFallback = ({ username }: { username?: string }) => (
  <div className="w-8 h-8 rounded-full bg-on-background flex items-center justify-center">
    <span className="font-body font-bold text-body-xs text-white uppercase">
      {username ? username.charAt(0) : "S"}
    </span>
  </div>
);

// ── Mascot Area ────────────────────────────────────────────────────────────────

const MascotArea = () => (
  <div
    className={[
      "relative w-full rounded-[2.5rem] overflow-hidden",
      "bg-[#e6e6fa]",
      "flex flex-col items-center justify-end",
      "h-[220px]",
    ].join(" ")}
    aria-hidden="true"
  >
    {/* 마스코트 자리 — 실제 마스코트 컴포넌트 연결 전 placeholder */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100px] h-[120px] flex items-end justify-center pb-2">
      <div className="w-[80px] h-[80px] rounded-full bg-on-background/10 flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#1A1C1A" strokeOpacity="0.3" strokeWidth="2" />
          <circle cx="14" cy="18" r="3" fill="#1A1C1A" fillOpacity="0.5" />
          <circle cx="26" cy="18" r="3" fill="#1A1C1A" fillOpacity="0.5" />
          <path
            d="M14 26C14 26 16.5 28.5 20 28.5C23.5 28.5 26 26 26 26"
            stroke="#1A1C1A"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>

    {/* CURATED FEELS 배지 */}
    <div
      className={[
        "absolute top-5 left-1/2 -translate-x-1/2",
        "px-4 py-1.5 rounded-full",
        "bg-primary-container",
        "font-body font-semibold text-body-xs text-white uppercase tracking-widest",
        "whitespace-nowrap",
      ].join(" ")}
    >
      CURATED FEELS
    </div>
  </div>
);

// ── ShareCard ──────────────────────────────────────────────────────────────────

export const ShareCard = ({
  styleLabel = "STYLE IDENTITY",
  styleTitle,
  inputDomain,
  music,
  movie,
  fashion,
  username,
  avatarUrl,
}: IShareCardProps) => {
  const domains: Array<"music" | "movie" | "fashion"> = ["music", "movie", "fashion"];

  return (
    <div
      className={[
        // Layout
        "relative flex overflow-hidden",
        // Size — Figma: 400×680, cornerRadius: 48
        "w-[400px] h-[680px]",
        "rounded-[3rem]",
        // Background
        "bg-background",
        // Shadow
        "editorial-shadow",
      ].join(" ")}
    >
      {/* ── 우측 장식 세로 텍스트 영역 ────────────────────────────────── */}
      <div
        className="absolute top-0 right-0 h-full w-[52px] flex flex-col items-center justify-between py-8 select-none"
        aria-hidden="true"
      >
        {/* ARCHIVIST 세로 텍스트 (Epilogue Black, 5% opacity) */}
        <span
          className="font-headline font-black text-on-background opacity-[0.05] uppercase tracking-widest"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "52px",
            lineHeight: 1,
          }}
        >
          ARCHIVIST
        </span>

        {/* STYLE SYNC PASS 세로 텍스트 (orange) */}
        <span
          className="font-body font-extrabold text-primary-container uppercase tracking-widest"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "10px",
            letterSpacing: "0.2em",
          }}
        >
          STYLE SYNC PASS
        </span>
      </div>

      {/* ── 메인 콘텐츠 영역 ───────────────────────────────────────────── */}
      <div className="flex flex-col w-[348px] h-full px-7 py-7 gap-5">
        {/* 상단: STYLE IDENTITY 레이블 + 스타일 타이틀 */}
        <div className="flex flex-col gap-2">
          <span className="font-body font-semibold text-body-xs text-primary-container uppercase tracking-widest">
            {styleLabel}
          </span>
          <h2
            className={[
              "font-headline font-black tracking-tighter keep-all",
              "text-on-background",
              "whitespace-pre-line",
            ].join(" ")}
            style={{ fontSize: "32px", lineHeight: 1.1 }}
          >
            {styleTitle}
          </h2>
        </div>

        {/* 마스코트 영역 */}
        <MascotArea />

        {/* 도메인 추천 미리보기 */}
        <div className="flex flex-col gap-2">
          {/* 음악 */}
          {music && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-container-low">
              <div className="w-9 h-9 rounded-lg bg-on-background overflow-hidden flex-shrink-0">
                {music.imageUrl ? (
                  <Image
                    src={music.imageUrl}
                    alt={music.title}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M4 12V5l9-2v7"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="4"
                        cy="12"
                        r="1.5"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="13"
                        cy="10"
                        r="1.5"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body font-semibold text-body-sm text-on-background truncate">
                  {music.title}
                </span>
                <span className="font-body text-body-xs text-on-surface-variant truncate">
                  {music.artist}
                </span>
              </div>
              <span className="ml-auto font-body font-semibold text-body-xs text-primary-container uppercase tracking-widest flex-shrink-0">
                MUSIC
              </span>
            </div>
          )}

          {/* 영화 */}
          {movie && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-container-low">
              <div className="w-9 h-9 rounded-lg bg-on-background overflow-hidden flex-shrink-0">
                {movie.imageUrl ? (
                  <Image
                    src={movie.imageUrl}
                    alt={movie.title}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect
                        x="2"
                        y="4"
                        width="12"
                        height="9"
                        rx="1"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5 4V2M11 4V2"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body font-semibold text-body-sm text-on-background truncate">
                  {movie.title}
                </span>
              </div>
              <span className="ml-auto font-body font-semibold text-body-xs text-primary-container uppercase tracking-widest flex-shrink-0">
                MOVIE
              </span>
            </div>
          )}

          {/* 패션 */}
          {fashion && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-container-low">
              <div className="w-9 h-9 rounded-lg bg-on-background overflow-hidden flex-shrink-0">
                {fashion.imageUrl ? (
                  <Image
                    src={fashion.imageUrl}
                    alt={fashion.keyword ?? "fashion"}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M5 2L3 6H6V14H10V6H13L11 2H5Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body font-semibold text-body-sm text-on-background truncate">
                  {fashion.keyword ?? "Fashion Look"}
                </span>
              </div>
              <span className="ml-auto font-body font-semibold text-body-xs text-primary-container uppercase tracking-widest flex-shrink-0">
                FASHION
              </span>
            </div>
          )}
        </div>

        {/* 하단 도메인 태그 + 브랜딩 */}
        <div className="mt-auto flex flex-col gap-3">
          {/* 도메인 태그 3개 */}
          <div className="flex gap-2 flex-wrap">
            {domains.map((domain) => (
              <DomainTag key={domain} domain={domain} isInput={domain === inputDomain} />
            ))}
          </div>

          {/* StyleSync 브랜딩 바 */}
          <div className="flex items-center justify-between pt-3 border-t border-outline-variant">
            {/* 유저 정보 */}
            <div className="flex items-center gap-2">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={username ?? "user"}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <AvatarFallback username={username} />
              )}
              {username && (
                <span className="font-body font-medium text-body-xs text-on-surface-variant">
                  @{username}
                </span>
              )}
            </div>

            {/* 브랜드 */}
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-headline font-black text-body-sm text-on-background tracking-tighter uppercase">
                STYLE SYNC
              </span>
              <span className="font-body text-body-xs text-on-surface-variant uppercase tracking-widest">
                DIGITAL LOOKBOOK V2.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
