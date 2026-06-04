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
  id: string;
  name: string;
  image: string;
  price: number;
  link: string;
};

export type InferenceResponse = {
  styleLabel: string;
  description: string;
  music: MusicRecommendation[];
  movie: MovieRecommendation[];
  fashion: FashionRecommendation[];
};

export type { Domain };
