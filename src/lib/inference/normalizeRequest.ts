import type { Domain, FashionSelection, MovieSelection, MusicSelection } from "@/types/taste";

import { safeParseRequest } from "./inference.schema";

import type { InferenceRequest } from "./inference.types";

type BuildArgs = {
  domain: Domain;
  musicSelections: MusicSelection[];
  movieSelections: MovieSelection[];
  fashionSelections: FashionSelection[];
  selectedStyles: Partial<Record<Domain, string>>;
};

// TMDB 전체 URL("https://image.tmdb.org/t/p/w500/abc.jpg") 또는 빈 값을
// 스키마가 요구하는 원본 경로("/abc.jpg")로 되돌림 (#47, posterPath 정규화)
const toTmdbPath = (value: string): string => {
  if (!value) return "/placeholder.jpg"; // 빈 값 → 검증 통과용 placeholder
  if (value.startsWith("/")) return value; // 이미 원본 경로
  const match = value.match(/\/t\/p\/[^/]+(\/.+)$/); // 전체 URL → 경로 추출
  return match?.[1] ?? "/placeholder.jpg";
};

const normalizeMovies = (movies: MovieSelection[]): MovieSelection[] =>
  movies.map((m) => ({
    ...m,
    posterPath: toTmdbPath(m.posterPath),
    backdropPath: toTmdbPath(m.backdropPath),
  }));

// store 상태 → InferenceRequest 정규화 + zod 검증 (#47)
export const buildInferenceRequest = (args: BuildArgs): InferenceRequest => {
  const { domain, selectedStyles } = args;

  let candidate: InferenceRequest;

  if (domain === "music") {
    candidate = {
      domain: "music",
      selections: args.musicSelections,
      moods: selectedStyles.music ? [selectedStyles.music] : [],
    };
  } else if (domain === "movie") {
    candidate = {
      domain: "movie",
      selections: normalizeMovies(args.movieSelections),
      moods: selectedStyles.movie ? [selectedStyles.movie] : [],
    };
  } else {
    candidate = {
      domain: "fashion",
      selections: args.fashionSelections,
      moods: selectedStyles.fashion ? [selectedStyles.fashion] : [],
    };
  }

  const parsed = safeParseRequest(candidate);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "추론 요청 데이터가 유효하지 않습니다";
    throw new Error(first);
  }

  return parsed.data;
};
