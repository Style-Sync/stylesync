import type { StyleLabel } from "@/types/result";
import type { Domain, MusicSelection, MovieSelection, FashionSelection } from "@/types/taste";

// ─── Request ──────────────────────────────────────────────────────────────────

export type InferenceRequest =
  | { domain: "music"; selections: MusicSelection[]; moods: string[] }
  | { domain: "movie"; selections: MovieSelection[]; moods: string[] }
  | { domain: "fashion"; selections: FashionSelection[]; moods: string[] };

// ─── Response ─────────────────────────────────────────────────────────────────

export type MusicRecommendation = {
  id: string;
  name: string;
  artist: string;
  image: string;
  previewUrl: string | null;
};

export type MovieRecommendation = {
  id: number;
  title: string;
  posterPath: string;
  genres: string[];
};

export type FashionRecommendation = {
  keyword: string;
  image: string;
};

export type InferenceResponse = {
  /**
   * Grok이 생성한 스타일 레이블
   * title, description, themeColor, mood 포함
   */
  styleLabel: StyleLabel;
  music: MusicRecommendation[];
  movie: MovieRecommendation[];
  fashion: FashionRecommendation[];
};

export type { Domain };
