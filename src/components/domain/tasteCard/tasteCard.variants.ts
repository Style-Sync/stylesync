// 패션 취향 선택은 리스트+프리뷰 UI → TasteCard 미사용
export const tasteCardVariants = {
  music: {
    fallbackBg: "bg-on-background",
    ariaLabel: "음악 취향 선택 카드",
  },
  movie: {
    fallbackBg: "bg-on-background",
    ariaLabel: "영화 취향 선택 카드",
  },
} as const;
