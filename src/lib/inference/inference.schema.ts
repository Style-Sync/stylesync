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

// ─── Recommendations ──────────────────────────────────────────────────────────

const MusicRecommendationSchema = z.object({
  id: z.string(),
  name: z.string(),
  artist: z.string(),
  image: z.string(),
  previewUrl: z.string().nullable(),
});

const MovieRecommendationSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  posterPath: z.string(),
  genres: z.array(z.string()),
});

const FashionRecommendationSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number().min(0, { message: "가격은 0 이상이어야 합니다" }),
  link: z.string().url(),
});

// ─── Response ─────────────────────────────────────────────────────────────────

export const InferenceResponseSchema = z.object({
  styleLabel: z
    .string()
    .min(1, { message: "스타일 레이블은 비어있을 수 없습니다" })
    .max(40, { message: "스타일 레이블은 최대 40자까지 입력 가능합니다" }),
  description: z.string().min(1, { message: "설명은 비어있을 수 없습니다" }),
  music: z
    .array(MusicRecommendationSchema)
    .max(10, { message: "음악 추천은 최대 10개까지 가능합니다" }),
  movie: z
    .array(MovieRecommendationSchema)
    .max(10, { message: "영화 추천은 최대 10개까지 가능합니다" }),
  fashion: z
    .array(FashionRecommendationSchema)
    .max(10, { message: "패션 추천은 최대 10개까지 가능합니다" }),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function safeParseRequest(input: unknown) {
  return InferenceRequestSchema.safeParse(input);
}
