export const recommendCardVariants = {
  music: {
    /** 카드 배경 — 밝은 surface */
    cardBg: "bg-surface-variant",
    /** 이미지 영역 배경 (이미지 없을 때 fallback) */
    imageFallbackBg: "bg-on-background",
    /** 텍스트 컬러 */
    titleColor: "text-on-background",
    subtitleColor: "text-on-surface-variant",
    /** 카드 높이 */
    height: "h-[439px]",
  },
  movie: {
    cardBg: "bg-on-background",
    imageFallbackBg: "bg-[#111]",
    titleColor: "text-white",
    subtitleColor: "text-white/80",
    height: "h-[453px]",
  },
  fashion: {
    cardBg: "bg-on-background",
    imageFallbackBg: "bg-[#111]",
    titleColor: "text-white",
    subtitleColor: "text-white/80",
    height: "h-[453px]",
  },
} as const;
