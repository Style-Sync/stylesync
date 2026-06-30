import type {
  FashionRecommendation,
  MovieRecommendation,
  MusicRecommendation,
} from "./inference.schema";
import type { InferenceResponse } from "./inference.types";

const dedupeById = <T extends { id: string | number }>(items: T[]): T[] =>
  items.filter((v, i, a) => a.findIndex((x) => x.id === v.id) === i);

const dedupeByKeyword = <T extends { keyword: string }>(items: T[]): T[] =>
  items.filter((v, i, a) => a.findIndex((x) => x.keyword === v.keyword) === i);

const normalizeMusic = (items: MusicRecommendation[]): MusicRecommendation[] =>
  dedupeById(items).map((m) => ({ ...m, name: m.name.trim(), artist: m.artist.trim() }));

const normalizeMovie = (items: MovieRecommendation[]): MovieRecommendation[] =>
  dedupeById(items).map((m) => ({ ...m, title: m.title.trim(), posterPath: m.posterPath.trim() }));

const normalizeFashion = (items: FashionRecommendation[]): FashionRecommendation[] =>
  dedupeByKeyword(items).map((f) => ({ ...f, keyword: f.keyword.trim() }));

// Grok 응답 정규화 — 중복 제거, 앞뒤 공백 제거, 스키마 한도 초과 필드 절단
export const normalizeInferenceResponse = (response: InferenceResponse): InferenceResponse => ({
  ...response,
  styleLabel: {
    ...response.styleLabel,
    title: response.styleLabel.title.trim().slice(0, 30),
    description: response.styleLabel.description.trim().slice(0, 80),
  },
  music: normalizeMusic(response.music),
  movie: normalizeMovie(response.movie),
  fashion: normalizeFashion(response.fashion),
});
