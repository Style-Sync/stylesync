import type { FashionImage } from "./types";

// public/ 에 두는 로컬 placeholder
export const FASHION_PLACEHOLDER_URL = "/fashion-placeholder.svg";

export const FASHION_PLACEHOLDER_IMAGE: FashionImage = {
  id: "fashion-placeholder",
  url: FASHION_PLACEHOLDER_URL,
  thumbUrl: FASHION_PLACEHOLDER_URL,
  alt: "이미지를 불러오지 못했어요",
  authorName: "",
  authorUrl: "",
};

// 검색 결과가 비면 placeholder 1장으로 대체 (#50)
export const withFashionFallback = (images: FashionImage[]): FashionImage[] =>
  images.length > 0 ? images : [FASHION_PLACEHOLDER_IMAGE];

// 단일 이미지 URL fallback (깨진/빈 src 대비, 컴포넌트에서 사용)
export const getFashionImageUrl = (url: string | null | undefined): string =>
  url && url.length > 0 ? url : FASHION_PLACEHOLDER_URL;
