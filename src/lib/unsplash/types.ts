// ── Unsplash 원본 응답 (필요한 필드만) ──────────────────────────────
export type UnsplashPhoto = {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: { raw: string; full: string; regular: string; small: string; thumb: string };
  user: { name: string; links: { html: string } };
  links: { html: string };
};

export type UnsplashSearchResponse = {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
};

// ── 앱 내부에서 쓰는 정규화 타입 ────────────────────────────────────
export type FashionImage = {
  id: string;
  url: string; // 카드/배경용 (regular)
  thumbUrl: string; // 썸네일 (small)
  alt: string;
  authorName: string;
  authorUrl: string;
};
