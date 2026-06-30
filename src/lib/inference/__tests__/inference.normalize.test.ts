import { describe, expect, it } from "vitest";

import {
  baseResponse,
  responseWithDuplicates,
  responseWithLongFields,
  responseWithWhitespace,
} from "../__fixtures__/inferenceResponse.fixture";
import { normalizeInferenceResponse } from "../inference.normalize";

describe("normalizeInferenceResponse", () => {
  it("중복 music 항목을 id 기준 첫 번째만 남긴다", () => {
    const result = normalizeInferenceResponse(responseWithDuplicates);
    expect(result.music).toHaveLength(2);
    expect(result.music[0].name).toBe("Cherry Wine");
  });

  it("중복 movie 항목을 id 기준 첫 번째만 남긴다", () => {
    const result = normalizeInferenceResponse(responseWithDuplicates);
    expect(result.movie).toHaveLength(1);
    expect(result.movie[0].title).toBe("비포 선라이즈");
  });

  it("중복 fashion 항목을 keyword 기준 첫 번째만 남긴다", () => {
    const result = normalizeInferenceResponse(responseWithDuplicates);
    expect(result.fashion).toHaveLength(1);
  });

  it("title을 30자 이하로 절단한다", () => {
    const result = normalizeInferenceResponse(responseWithLongFields);
    expect(result.styleLabel.title.length).toBeLessThanOrEqual(30);
  });

  it("description을 80자 이하로 절단한다", () => {
    const result = normalizeInferenceResponse(responseWithLongFields);
    expect(result.styleLabel.description.length).toBeLessThanOrEqual(80);
  });

  it("music name과 artist의 앞뒤 공백을 제거한다", () => {
    const result = normalizeInferenceResponse(responseWithWhitespace);
    expect(result.music[0].name).toBe("Cherry Wine");
    expect(result.music[0].artist).toBe("Hozier");
  });

  it("movie title의 앞뒤 공백을 제거한다", () => {
    const result = normalizeInferenceResponse(responseWithWhitespace);
    expect(result.movie[0].title).toBe("비포 선라이즈");
  });

  it("fashion keyword의 앞뒤 공백을 제거한다", () => {
    const result = normalizeInferenceResponse(responseWithWhitespace);
    expect(result.fashion[0].keyword).toBe("oversized denim jacket");
  });

  it("정상 응답의 배열 길이를 유지한다", () => {
    const result = normalizeInferenceResponse(baseResponse);
    expect(result.music).toHaveLength(baseResponse.music.length);
    expect(result.movie).toHaveLength(baseResponse.movie.length);
    expect(result.fashion).toHaveLength(baseResponse.fashion.length);
  });

  it("styleLabel의 나머지 필드(themeColor, mood)는 변경하지 않는다", () => {
    const result = normalizeInferenceResponse(baseResponse);
    expect(result.styleLabel.themeColor).toBe(baseResponse.styleLabel.themeColor);
    expect(result.styleLabel.mood).toEqual(baseResponse.styleLabel.mood);
  });
});
