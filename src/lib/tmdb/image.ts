const IMAGE_BASE = "https://image.tmdb.org/t/p";

export type TmdbPosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
export type TmdbBackdropSize = "w300" | "w780" | "w1280" | "original";

// TMDB 경로("/abc.jpg") → 전체 이미지 URL. 경로 없으면 빈 문자열(fallback)
export const getTmdbImageUrl = (
  path: string | null | undefined,
  size: TmdbPosterSize | TmdbBackdropSize = "w500"
): string => {
  if (!path) return "";
  return `${IMAGE_BASE}/${size}${path}`;
};

export const getPosterUrl = (path: string | null | undefined, size: TmdbPosterSize = "w500") =>
  getTmdbImageUrl(path, size);

export const getBackdropUrl = (path: string | null | undefined, size: TmdbBackdropSize = "w1280") =>
  getTmdbImageUrl(path, size);
