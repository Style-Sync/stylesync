"use client";

import { StyleSelectList } from "@/components/domain/styleSelectList";
import type { IStyleOption } from "@/components/domain/styleSelectList";

// 1뎁스 영화 스타일 옵션 (TODO: 실제 피그마 데이터로 교체)
const MOVIE_STYLES: IStyleOption[] = [
  { id: "neo-noir", title: "Neo Noir" },
  { id: "coming-of-age", title: "Coming Of Age" },
  { id: "sci-fi-epic", title: "Sci-Fi Epic" },
  { id: "slow-burn", title: "Slow Burn" },
  { id: "feel-good", title: "Feel Good" },
];

export const MovieInput = () => {
  return <StyleSelectList domain="movie" options={MOVIE_STYLES} />;
};
