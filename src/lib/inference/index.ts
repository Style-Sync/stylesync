export type {
  InferenceRequest,
  InferenceResponse,
  InferenceResult,
  MusicRecommendation,
  MovieRecommendation,
  FashionRecommendation,
  StyleLabel,
  Domain,
  IInferenceService,
} from "./inference.types";

export {
  InferenceRequestSchema,
  InferenceResponseSchema,
  InferenceResultSchema,
  safeParseRequest,
  safeParseResponse,
  safeParseResult,
} from "./inference.schema";

export {
  mockMusicInferenceResponse,
  mockMovieInferenceResponse,
  mockFashionInferenceResponse,
  getMockByDomain,
} from "./inference.mocks";

export { SYSTEM_PROMPT, buildUserPrompt } from "./inference.prompts";

export { parseInferenceResponse } from "./inference.parser";

export { callGrok } from "@/lib/grok";
export type { GrokMessage } from "@/lib/grok";
