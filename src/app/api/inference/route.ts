import { NextRequest, NextResponse } from "next/server";

import { GrokApiError, GrokTimeoutError, callGrok } from "@/lib/grok";
import { enrichResponseWithTmdb } from "@/lib/inference/enrichResponse";
import { parseInferenceResponse } from "@/lib/inference/inference.parser";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/inference/inference.prompts";
import { safeParseRequest } from "@/lib/inference/inference.schema";
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
    if (e instanceof GrokTimeoutError) {
      return NextResponse.json({ message: e.message }, { status: 504 });
    }
    if (e instanceof GrokApiError) {
      return NextResponse.json({ message: e.message }, { status: 502 });
    }
    return NextResponse.json({ message: "추론 서비스 오류가 발생했습니다." }, { status: 500 });
  }

  const parsed = parseInferenceResponse(raw);
  if (!parsed.ok) {
    return NextResponse.json({ message: parsed.message }, { status: 422 });
  }

  const enriched = await enrichResponseWithTmdb(parsed.data);

  const result: InferenceResult = {
    ...enriched,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ result });
}
