import { z } from "zod";

// ─── Primitives ───────────────────────────────────────────────────────────────

export const MoodSchema = z.string();

export const DomainSchema = z.enum(["music", "movie", "fashion"]);

// ─── Selection schemas (mirror of src/types/taste.ts) ─────────────────────────

export const MusicSelectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  genre: z.array(z.string()),
  previewUrl: z.string().nullable(),
});

export const MovieSelectionSchema = z.object({
  id: z.number(),
  title: z.string(),
  posterPath: z.string(),
  backdropPath: z.string(),
  genres: z.array(z.string()),
  releaseYear: z.number(),
});

export const FashionSelectionSchema = z.object({
  styles: z.array(z.string()),
  moods: z.array(z.string()),
});

// ─── Request ──────────────────────────────────────────────────────────────────

export const InferenceRequestSchema = z.discriminatedUnion("domain", [
  z.object({
    domain: z.literal("music"),
    selections: MusicSelectionSchema,
    moods: z.array(MoodSchema),
  }),
  z.object({
    domain: z.literal("movie"),
    selections: MovieSelectionSchema,
    moods: z.array(MoodSchema),
  }),
  z.object({
    domain: z.literal("fashion"),
    selections: FashionSelectionSchema,
    moods: z.array(MoodSchema),
  }),
]);

// ─── Response ─────────────────────────────────────────────────────────────────

export const MusicRecommendationSchema = z.object({
  id: z.string(),
  name: z.string(),
  artist: z.string(),
  image: z.string(),
  previewUrl: z.string().nullable(),
});

export const MovieRecommendationSchema = z.object({
  id: z.number(),
  title: z.string(),
  posterPath: z.string(),
  genres: z.array(z.string()),
});

export const FashionRecommendationSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  link: z.string(),
});

export const InferenceResponseSchema = z.object({
  styleLabel: z.string(),
  description: z.string(),
  music: z.array(MusicRecommendationSchema),
  movie: z.array(MovieRecommendationSchema),
  fashion: z.array(FashionRecommendationSchema),
});
