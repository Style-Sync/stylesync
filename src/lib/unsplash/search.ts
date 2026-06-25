import "server-only";

import { unsplashFetch } from "./client";
import { withFashionFallback } from "./image";

import type { FashionImage, UnsplashSearchResponse } from "./types";

const buildSearchPath = (query: string, perPage: number) =>
  `/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=portrait&content_filter=high`;

const normalize = (res: UnsplashSearchResponse): FashionImage[] =>
  res.results.map((photo) => ({
    id: photo.id,
    url: photo.urls.regular,
    thumbUrl: photo.urls.small,
    alt: photo.alt_description ?? photo.description ?? "fashion image",
    authorName: photo.user.name,
    authorUrl: photo.user.links.html,
  }));

// 패션 키워드로 이미지 검색 → 정규화 + 빈 결과 fallback 보장 (#49 + #50)
export const searchFashionImages = async (
  keyword: string,
  perPage = 12
): Promise<FashionImage[]> => {
  const data = await unsplashFetch<UnsplashSearchResponse>(buildSearchPath(keyword, perPage));
  return withFashionFallback(normalize(data));
};
