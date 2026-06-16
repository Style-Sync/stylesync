"use client";

import { StyleSelectList } from "@/components/domain/styleSelectList";
import type { IStyleOption } from "@/components/domain/styleSelectList";

// 1뎁스 패션 스타일 옵션 (TODO: 실제 피그마 데이터로 교체)
const FASHION_STYLES: IStyleOption[] = [
  { id: "minimal", title: "Minimal" },
  { id: "street", title: "Street" },
  { id: "vintage", title: "Vintage" },
  { id: "sporty", title: "Sporty" },
  { id: "romantic", title: "Romantic" },
];

export const FashionInput = () => {
  return <StyleSelectList domain="fashion" options={FASHION_STYLES} />;
};
