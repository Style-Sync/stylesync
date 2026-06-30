import type { StyleLabel } from "@/types/result";

import type { InferenceRequest, InferenceResult } from "./inference.schema";

export type {
  MusicRecommendation,
  MovieRecommendation,
  FashionRecommendation,
  InferenceRequest,
  InferenceResponse,
  InferenceResult,
} from "./inference.schema";

// ─── Utility types ────────────────────────────────────────────────────────────

export type { StyleLabel };

// ─── Service interface ────────────────────────────────────────────────────────

export interface IInferenceService {
  call(request: InferenceRequest): Promise<InferenceResult>;
}
