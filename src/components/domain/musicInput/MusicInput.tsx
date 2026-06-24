"use client";

import { StyleSelectList } from "@/components/domain/styleSelectList";
import type { IStyleOption } from "@/components/domain/styleSelectList";

// 1뎁스 뮤직 스타일 옵션
const MUSIC_STYLES: IStyleOption[] = [
  { id: "contemporary-jazz", title: "Contemporary Jazz" },
  { id: "pop-iconic", title: "Pop Iconic" },
  { id: "electronic-pop", title: "Electronic Pop" },
  { id: "moody-indie", title: "Moody Indie" },
  { id: "street-beats", title: "Street Beats" },
];

export const MusicInput = () => {
  return <StyleSelectList domain="music" options={MUSIC_STYLES} />;
};
