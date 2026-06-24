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
  styleLabel: StyleLabel;
  music: MusicRecommendation[];
  movie: MovieRecommendation[];
  fashion: FashionRecommendation[];
};

export type { Domain };

// ─── Utility types ────────────────────────────────────────────────────────────

export type { StyleLabel };

export type InferenceResult = InferenceResponse & {
  id: string;
  createdAt: string;
};

// ─── Service interface ────────────────────────────────────────────────────────

export interface IInferenceService {
  call(request: InferenceRequest): Promise<InferenceResult>;
}
