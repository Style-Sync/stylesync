import { NextRequest, NextResponse } from "next/server";

import { getMockByDomain } from "@/lib/inference/inference.mocks";
import { safeParseRequest, safeParseResponse } from "@/lib/inference/inference.schema";
import type { InferenceResult } from "@/lib/inference/inference.types";

// POST /api/inference — 요청 검증 → (현재) 도메인별 목 응답 반환
// TODO(#58): 실제 Grok 호출로 교체
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const parsedReq = safeParseRequest(body);
  if (!parsedReq.success) {
    const message = parsedReq.error.issues[0]?.message ?? "요청 형식이 올바르지 않습니다.";
    return NextResponse.json({ message }, { status: 400 });
  }

  const mock = getMockByDomain(parsedReq.data.domain);

  const parsedRes = safeParseResponse(mock);
  if (!parsedRes.success) {
    return NextResponse.json({ message: "추론 응답 검증에 실패했습니다." }, { status: 500 });
  }

  const result: InferenceResult = {
    ...parsedRes.data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ result });
}
