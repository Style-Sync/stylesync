import { safeParseResponse } from "./inference.schema";

import type { InferenceResponse } from "./inference.types";

function extractJson(raw: string): unknown {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : raw.trim();

  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new SyntaxError("JSON 객체를 찾을 수 없습니다.");
  }

  return JSON.parse(candidate.slice(start, end + 1));
}

type ParseSuccess = { ok: true; data: InferenceResponse };
type ParseFailure = { ok: false; reason: "json" | "schema"; message: string };

export function parseInferenceResponse(raw: string): ParseSuccess | ParseFailure {
  let parsed: unknown;
  try {
    parsed = extractJson(raw);
  } catch (e) {
    return {
      ok: false,
      reason: "json",
      message: e instanceof Error ? e.message : "JSON 파싱 실패",
    };
  }

  const result = safeParseResponse(parsed);
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "응답 스키마 검증 실패";
    return { ok: false, reason: "schema", message };
  }

  return { ok: true, data: result.data };
}
