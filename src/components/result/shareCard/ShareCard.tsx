"use client";

import { Icon } from "@/components/ui/Icon";

import { domainTagVariants } from "./shareCard.variants";

import type { IShareCardProps } from "./shareCard.types";

// ── Eye Mascot (검은 원 + 흰 글레어) ─────────────────────────────────────────
// Figma 487:2420 기준: 128×128 white circle
// left eye: black 24×24 at (44,52), glare 6×6 at (54,59)
// right eye: black 24×24 at (76,52), glare 6×6 at (86,59)
// mouth: 24×2 at (52,86), 20% opacity

const MascotFace = () => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    <rect x="44" y="52" width="24" height="24" rx="12" fill="#1A1C1A" />
    <rect x="54" y="59" width="6" height="6" rx="3" fill="white" />
    <rect x="76" y="52" width="24" height="24" rx="12" fill="#1A1C1A" />
    <rect x="86" y="59" width="6" height="6" rx="3" fill="white" />
    <rect x="52" y="86" width="24" height="2" rx="1" fill="rgba(26,28,26,0.2)" />
  </svg>
);

// ── ShareCard ──────────────────────────────────────────────────────────────────

export const ShareCard = ({ styleLabel, themeColor, music, movie, fashion }: IShareCardProps) => {
  // 배경 수직 텍스트: styleLabel.title 두 번째 단어 uppercase
  // 예: "Cyberpunk Archivist" → "ARCHIVIST"
  const titleWords = styleLabel.title.split(" ");
  const bgText = (titleWords[1] ?? titleWords[0]).toUpperCase();

  // 도메인 태그 텍스트
  const tagText = {
    music: music?.artist ?? domainTagVariants.music.label,
    movie: movie?.title ?? domainTagVariants.movie.label,
    fashion: fashion?.keyword ?? domainTagVariants.fashion.label,
  };

  return (
    <div className="relative w-full md:w-[400px] h-[554px] md:h-[680px] bg-white rounded-[3rem] overflow-hidden">
      {/* ── 배경 수직 텍스트 ─────────────────────────────────────────── */}
      {/* ARCHIVIST: Epilogue Black 72px, 5% opacity, top-[68px] right-[22px] */}
      <div
        className="absolute top-[68px] right-[22px] pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-headline font-black text-[72px] leading-none text-on-background/5"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {bgText}
        </span>
      </div>

      {/* STYLE SYNC PASS: Plus Jakarta Sans ExtraBold 12px, orange
            Figma 768px 기준 top=343px right=36px → sm 비율 보정 */}
      <div
        className="absolute top-[280px] md:top-[343px] right-[30px] md:right-[36px] pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-body font-extrabold text-[12px] leading-none text-primary-container"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          STYLE SYNC PASS
        </span>
      </div>

      {/* ── 콘텐츠 레이어 ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col h-full p-10">
        {/* ① 상단: STYLE IDENTITY 레이블 + 타이틀 (높이 ~115px) */}
        <div className="pb-4">
          {/* "STYLE IDENTITY": NotoSansKR Medium 14px, 30% opacity */}
          <span className="block font-korean font-medium text-[14px] leading-[1.2] text-on-background/30">
            STYLE IDENTITY
          </span>
          {/* Headline: Epilogue Black 36px */}
          <h2
            className="font-headline font-black text-on-background whitespace-pre-line mt-2"
            style={{ fontSize: "36px", lineHeight: "36.9px" }}
          >
            {styleLabel.title}
          </h2>
        </div>

        {/* ② 마스코트 영역 (flex-1) */}
        <div className="flex-1 flex items-start">
          {/* 라벤더 배경
              Figma 390px: 184.5×230 / Figma 768px+: 240×300
              overflow-visible: CURATED FEELS 배지 우측 overflow 허용 */}
          <div
            className="relative shrink-0 overflow-visible w-[185px] h-[230px] md:w-[240px] md:h-[300px]"
            style={{ backgroundColor: themeColor, borderRadius: "48px" }}
          >
            {/* 마스코트 원 128×128
                Figma 390px: top 51px left 28px / Figma 768px+: top 86px left 56px */}
            <div
              className="absolute bg-white rounded-full overflow-hidden
                         top-[51px] left-[28px]
                         md:top-[86px] md:left-[56px]"
              style={{ width: "128px", height: "128px" }}
            >
              <MascotFace />
            </div>

            {/* CURATED FEELS 배지
                Figma 390px: bottom 40px left 90px / Figma 768px+: bottom 40px left 145px */}
            <div
              className="absolute bg-primary-container rounded-full
                         bottom-[40px] left-[90px]
                         md:bottom-[40px] md:left-[145px]"
              style={{ padding: "8px 20px" }}
            >
              <span
                className="font-body font-extrabold text-white tracking-widest whitespace-nowrap"
                style={{ fontSize: "10px", lineHeight: "12.6px" }}
              >
                CURATED FEELS
              </span>
            </div>
          </div>
        </div>

        {/* ③ 하단: 도메인 태그 + StyleSync 브랜딩 (~125px) */}
        <div className="pt-4 border-t border-on-background/5 flex items-end justify-between gap-4">
          {/* 도메인 태그 3개 (수직 스택) */}
          <div className="flex flex-col gap-[7px]">
            {(["music", "movie", "fashion"] as const).map((d) => {
              const domainIconMap = { music: "music", movie: "movie", fashion: "hanger" } as const;
              const text = tagText[d];

              return (
                <div
                  key={d}
                  className="flex items-center gap-[6px] rounded-full self-start"
                  style={{
                    background: "rgba(26,28,26,0.03)",
                    padding: "4px 10px",
                  }}
                >
                  <Icon
                    name={domainIconMap[d]}
                    className="text-on-background/30 shrink-0"
                    size={10}
                  />
                  {/* 텍스트: Plus Jakarta Sans ExtraBold 10px (music/fashion), Noto Sans Regular 10px (movie) */}
                  <span
                    className={[
                      "text-on-background/70 leading-none",
                      d === "movie" ? "font-korean font-normal" : "font-body font-extrabold",
                    ].join(" ")}
                    style={{ fontSize: "10px" }}
                  >
                    {text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* StyleSync 로고 + DIGITAL LOOKBOOK V2.0 */}
          {/* Figma: "Style"(Epilogue Black 24px, dark) + "Sync"(Epilogue Black 24px, orange) */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-baseline leading-none">
              <span
                className="font-headline font-black text-on-background"
                style={{ fontSize: "24px" }}
              >
                Style
              </span>
              <span
                className="font-headline font-black text-primary-container"
                style={{ fontSize: "24px" }}
              >
                Sync
              </span>
            </div>
            {/* Noto Sans KR Medium 14px, 40% opacity */}
            <span
              className="font-korean font-medium text-on-background/40 whitespace-nowrap"
              style={{ fontSize: "14px", lineHeight: "16.8px" }}
            >
              DIGITAL LOOKBOOK V2.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
