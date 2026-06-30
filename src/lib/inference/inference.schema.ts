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
  genres: z.array(z.string().min(1)),
  previewUrl: z.string().nullable(),
});

const MovieSelectionSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  posterPath: z.string().regex(/^\//, { message: "TMDB 경로는 /로 시작해야 합니다" }),
  backdropPath: z.string().regex(/^\//, { message: "TMDB 경로는 /로 시작해야 합니다" }),
  genres: z.array(z.string()),
  releaseYear: z.number().min(1888, { message: "출시 연도가 유효하지 않습니다" }),
});

const FashionSelectionSchema = z.object({
  styles: z
    .array(z.string().min(1, { message: "스타일 항목은 비어있을 수 없습니다" }))
    .min(1, { message: "스타일은 최소 1개 이상 선택해주세요" }),
  fashionMoods: z.array(MoodSchema).min(1, { message: "패션 무드는 최소 1개 이상 선택해주세요" }),
});

// ─── Request ──────────────────────────────────────────────────────────────────

const SelectionsSchema = {
  music: z
    .array(MusicSelectionSchema)
    .min(3, { message: "취향 카드는 최소 3개 이상 선택해주세요" }),
  movie: z
    .array(MovieSelectionSchema)
    .min(3, { message: "취향 카드는 최소 3개 이상 선택해주세요" }),
  fashion: z
    .array(FashionSelectionSchema)
    .min(1, { message: "취향 카드는 최소 1개 이상 선택해주세요" }),
};

export const InferenceRequestSchema = z.discriminatedUnion("domain", [
  z.object({ domain: z.literal("music"), selections: SelectionsSchema.music, moods: MoodsSchema }),
  z.object({ domain: z.literal("movie"), selections: SelectionsSchema.movie, moods: MoodsSchema }),
  z.object({
    domain: z.literal("fashion"),
    selections: SelectionsSchema.fashion,
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
  id: z.number(),
  title: z.string(),
  posterPath: z.string(),
  genres: z.array(z.string()),
});

const FashionRecommendationSchema = z.object({
  keyword: z.string().min(1, { message: "패션 키워드는 비어있을 수 없습니다" }),
  image: z.string(),
});

// ─── StyleLabel ───────────────────────────────────────────────────────────────

const StyleMoodSchema = z.object({
  energy: z.enum(["low", "mid", "high"]),
  tone: z.enum(["dark", "neutral", "bright"]),
  aesthetic: z.enum(["mainstream", "indie", "artistic", "experimental"]),
});

const StyleLabelSchema = z.object({
  title: z
    .string()
    .min(1, { message: "스타일 제목은 비어있을 수 없습니다" })
    .max(30, { message: "스타일 제목은 최대 30자까지 입력 가능합니다" }),
  description: z
    .string()
    .min(1, { message: "설명은 비어있을 수 없습니다" })
    .max(80, { message: "설명은 최대 80자까지 입력 가능합니다" }),
  themeColor: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
    message: "themeColor는 hex 색상 코드여야 합니다 (예: #e6e6fa, #fff)",
  }),
  mood: StyleMoodSchema,
});

// ─── Response ─────────────────────────────────────────────────────────────────

export const InferenceResponseSchema = z.object({
  styleLabel: StyleLabelSchema,
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

export const InferenceResultSchema = InferenceResponseSchema.extend({
  id: z.string(),
  createdAt: z.string(),
});

// ─── Derived types ────────────────────────────────────────────────────────────

export type MusicRecommendation = z.infer<typeof MusicRecommendationSchema>;
export type MovieRecommendation = z.infer<typeof MovieRecommendationSchema>;
export type FashionRecommendation = z.infer<typeof FashionRecommendationSchema>;
export type InferenceRequest = z.infer<typeof InferenceRequestSchema>;
export type InferenceResponse = z.infer<typeof InferenceResponseSchema>;
export type InferenceResult = z.infer<typeof InferenceResultSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function safeParseRequest(input: unknown) {
  return InferenceRequestSchema.safeParse(input);
}

export function safeParseResponse(input: unknown) {
  return InferenceResponseSchema.safeParse(input);
}

export function safeParseResult(input: unknown) {
  return InferenceResultSchema.safeParse(input);
}
