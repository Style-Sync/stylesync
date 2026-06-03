import { z } from "zod";

// ─── Mood ─────────────────────────────────────────────────────────────────────

const MoodSchema = z.string().min(1, { message: "감성 태그는 비어있을 수 없습니다" });

const MoodsSchema = z
  .array(MoodSchema)
  .min(1, { message: "감성 태그는 최소 1개 이상 선택해주세요" })
  .max(5, { message: "감성 태그는 최대 5개까지 선택 가능합니다" });

// ─── Selections ───────────────────────────────────────────────────────────────

const MusicSelectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  genre: z.array(z.string()),
  previewUrl: z.string().nullable(),
});

const MovieSelectionSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  posterPath: z.string(),
  backdropPath: z.string(),
  genres: z.array(z.string()),
  releaseYear: z.number().int().min(1888, { message: "출시 연도가 유효하지 않습니다" }),
});

const FashionSelectionSchema = z.object({
  styles: z.array(z.string()).min(1, { message: "스타일은 최소 1개 이상 선택해주세요" }),
  moods: z.array(z.string()).min(1, { message: "패션 무드는 최소 1개 이상 선택해주세요" }),
});

// ─── Request ──────────────────────────────────────────────────────────────────

export const InferenceRequestSchema = z.discriminatedUnion("domain", [
  z.object({ domain: z.literal("music"), selections: MusicSelectionSchema, moods: MoodsSchema }),
  z.object({ domain: z.literal("movie"), selections: MovieSelectionSchema, moods: MoodsSchema }),
  z.object({
    domain: z.literal("fashion"),
    selections: FashionSelectionSchema,
    moods: MoodsSchema,
  }),
]);
