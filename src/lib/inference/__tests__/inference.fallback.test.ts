import { describe, expect, it } from "vitest";

import { baseResponse, responseWithEmptyArrays } from "../__fixtures__/inferenceResponse.fixture";
import { applyFallback } from "../inference.fallback";
import { getMockByDomain } from "../inference.mocks";

describe("applyFallback", () => {
  it("모든 배열이 채워진 경우 원본 데이터를 그대로 유지한다", () => {
    const result = applyFallback(baseResponse, "music");
    expect(result.music).toEqual(baseResponse.music);
    expect(result.movie).toEqual(baseResponse.movie);
    expect(result.fashion).toEqual(baseResponse.fashion);
  });

  it("빈 music 배열을 해당 domain mock으로 대체한다", () => {
    const mock = getMockByDomain("music");
    const result = applyFallback(responseWithEmptyArrays, "music");
    expect(result.music).toEqual(mock.music);
  });

  it("빈 movie 배열을 해당 domain mock으로 대체한다", () => {
    const mock = getMockByDomain("movie");
    const result = applyFallback(responseWithEmptyArrays, "movie");
    expect(result.movie).toEqual(mock.movie);
  });

  it("빈 fashion 배열을 해당 domain mock으로 대체한다", () => {
    const mock = getMockByDomain("fashion");
    const result = applyFallback(responseWithEmptyArrays, "fashion");
    expect(result.fashion).toEqual(mock.fashion);
  });

  it("domain에 따라 세 배열 모두 동일 mock에서 대체한다", () => {
    const mock = getMockByDomain("movie");
    const result = applyFallback(responseWithEmptyArrays, "movie");
    expect(result.music).toEqual(mock.music);
    expect(result.movie).toEqual(mock.movie);
    expect(result.fashion).toEqual(mock.fashion);
  });

  it("styleLabel은 fallback 대상이 아니므로 원본을 유지한다", () => {
    const result = applyFallback(responseWithEmptyArrays, "music");
    expect(result.styleLabel).toEqual(responseWithEmptyArrays.styleLabel);
  });
});
