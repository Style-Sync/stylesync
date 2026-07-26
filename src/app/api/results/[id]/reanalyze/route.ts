import { NextRequest, NextResponse } from "next/server";

import { GrokApiError, GrokTimeoutError, callGrok } from "@/lib/grok";
import { enrichResponseWithTmdb, enrichResponseWithUnsplash } from "@/lib/inference/enrichResponse";
import { applyFallback } from "@/lib/inference/inference.fallback";
import { normalizeInferenceResponse } from "@/lib/inference/inference.normalize";
import { parseInferenceResponse } from "@/lib/inference/inference.parser";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/inference/inference.prompts";
import { safeParseRequest } from "@/lib/inference/inference.schema";
import type { InferenceResult } from "@/lib/inference/inference.types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface IRouteContext {
  params: { id: string };
}

export async function POST(_req: NextRequest, { params }: IRouteContext) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("results")
    .select("request_payload, start_domain")
    .eq("id", params.id)
    .single();

  if (error || !data?.request_payload) {
    return NextResponse.json({ error: "원본 결과를 찾을 수 없습니다." }, { status: 404 });
  }

  const parsedReq = safeParseRequest(data.request_payload);
  if (!parsedReq.success) {
    return NextResponse.json({ error: "저장된 요청 데이터가 올바르지 않습니다." }, { status: 422 });
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
      return NextResponse.json({ error: e.message }, { status: 504 });
    }
    if (e instanceof GrokApiError) {
      return NextResponse.json({ error: e.message }, { status: 502 });
    }
    return NextResponse.json({ error: "추론 서비스 오류가 발생했습니다." }, { status: 500 });
  }

  const parsed = parseInferenceResponse(raw);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.message }, { status: 422 });
  }

  const normalized = normalizeInferenceResponse(parsed.data);
  const fallbacked = applyFallback(normalized, parsedReq.data.domain);
  const tmdbEnriched = await enrichResponseWithTmdb(fallbacked);
  const enriched = await enrichResponseWithUnsplash(tmdbEnriched);

  const result: InferenceResult = {
    ...enriched,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ result });
}
