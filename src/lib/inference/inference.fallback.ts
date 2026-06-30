import type { Domain } from "@/types/taste";

import { getMockByDomain } from "./inference.mocks";

import type { InferenceResponse } from "./inference.types";

// 빈 추천 배열을 도메인 mock으로 대체 — Grok이 항목을 반환하지 못한 경우 UI 공백 방지
export const applyFallback = (response: InferenceResponse, domain: Domain): InferenceResponse => {
  const mock = getMockByDomain(domain);
  return {
    ...response,
    music: response.music.length > 0 ? response.music : mock.music,
    movie: response.movie.length > 0 ? response.movie : mock.movie,
    fashion: response.fashion.length > 0 ? response.fashion : mock.fashion,
  };
};
