import "server-only";

import { searchMovies } from "@/lib/tmdb/search";

import type { InferenceResponse } from "./inference.types";

// posterPath가 비어있거나 mock prefix("/mock/")로 시작하면 TMDB 검색 대상
const needsTmdbEnrichment = (posterPath: string): boolean =>
  !posterPath || posterPath.startsWith("/mock/");

// 영화 제목으로 TMDB 검색 → 첫 결과의 posterPath (전체 URL) 반환
const fetchMoviePoster = async (title: string): Promise<string> => {
  try {
    const results = await searchMovies(title, 1);
    return results[0]?.posterPath ?? "";
  } catch {
    return "";
  }
};

// Grok(또는 mock) 응답의 영화 항목에 TMDB 포스터 URL을 채워 넣음 (#78)
export const enrichResponseWithTmdb = async (
  response: InferenceResponse
): Promise<InferenceResponse> => {
  const enrichedMovies = await Promise.all(
    response.movie.map(async (movie) => {
      if (!needsTmdbEnrichment(movie.posterPath)) return movie;
      const posterPath = await fetchMoviePoster(movie.title);
      return posterPath ? { ...movie, posterPath } : movie;
    })
  );

  return { ...response, movie: enrichedMovies };
};
