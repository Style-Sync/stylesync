import "server-only";

import type { MovieSelection } from "@/types/taste";

import { tmdbFetch } from "./client";
import { getBackdropUrl, getPosterUrl } from "./image";

import type { TmdbGenreListResponse, TmdbSearchResponse } from "./types";


// 장르 id→이름 맵 (모듈 캐시 — 매 검색마다 다시 안 부름)
let genreMapCache: Map<number, string> | null = null;

const getGenreMap = async (): Promise<Map<number, string>> => {
  if (genreMapCache) return genreMapCache;
  const data = await tmdbFetch<TmdbGenreListResponse>("/genre/movie/list");
  genreMapCache = new Map(data.genres.map((genre) => [genre.id, genre.name]));
  return genreMapCache;
};

const getReleaseYear = (date: string): number => {
  const year = Number(date?.slice(0, 4));
  return Number.isFinite(year) ? year : 0;
};

export const searchMovies = async (query: string, limit = 12): Promise<MovieSelection[]> => {
  const [data, genreMap] = await Promise.all([
    tmdbFetch<TmdbSearchResponse>("/search/movie", { query, include_adult: "false" }),
    getGenreMap(),
  ]);

  return data.results.slice(0, limit).map((movie) => ({
    id: movie.id,
    title: movie.title,
    posterPath: getPosterUrl(movie.poster_path),
    backdropPath: getBackdropUrl(movie.backdrop_path),
    genres: movie.genre_ids
      .map((id) => genreMap.get(id))
      .filter((name): name is string => Boolean(name)),
    releaseYear: getReleaseYear(movie.release_date),
  }));
};
