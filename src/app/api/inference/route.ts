import { NextRequest, NextResponse } from "next/server";

import { callGrok } from "@/lib/grok";
import { enrichResponseWithTmdb } from "@/lib/inference/enrichResponse";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/inference/inference.prompts";
import { safeParseRequest, safeParseResponse } from "@/lib/inference/inference.schema";
import type { InferenceResult } from "@/lib/inference/inference.types";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const parsedReq = safeParseRequest(body);
  if (!parsedReq.success) {
    const message = parsedReq.error.issues[0]?.message ?? "요청 형식이 올바르지 않습니다.";
    return NextResponse.json({ message }, { status: 400 });
  }

  let raw: string;
  try {
    const userPrompt = buildUserPrompt(parsedReq.data);
    raw = await callGrok([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ]);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Grok API 호출에 실패했습니다.";
    return NextResponse.json({ message }, { status: 500 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ message: "추론 응답 파싱에 실패했습니다." }, { status: 500 });
  }

  const parsedRes = safeParseResponse(parsed);
  if (!parsedRes.success) {
    return NextResponse.json({ message: "추론 응답 검증에 실패했습니다." }, { status: 500 });
  }

  const enriched = await enrichResponseWithTmdb(parsedRes.data);

  const result: InferenceResult = {
    ...enriched,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ result });
}
