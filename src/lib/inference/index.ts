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
