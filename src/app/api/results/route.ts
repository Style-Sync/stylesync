import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { StyleResult } from "@/types/result";
import type { Domain } from "@/types/taste";

type SaveResultBody = {
  result: StyleResult;
  startDomain: Domain;
  requestPayload: unknown;
};

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let body: SaveResultBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const { result, startDomain, requestPayload } = body;

  if (!result?.id || !startDomain) {
    return NextResponse.json({ error: "필수 필드가 누락됐습니다." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("results")
    .insert({
      id: result.id,
      profile_id: user.id,
      start_domain: startDomain,
      request_payload: requestPayload ?? {},
      result_payload: result,
      style_label: result.styleLabel,
      music_recommendations: result.music,
      movie_recommendations: result.movie,
      fashion_recommendations: result.fashion,
      // 기본 비공개 — 저장 시점엔 본인만 볼 수 있고, 공유는 별도 액션에서 명시적으로 공개 전환한다.
      // (#97 "저장 데이터는 해당 사용자만 볼 수 있다")
      is_public: false,
    })
    .select("id")
    .single();

  if (error) {
    // 이미 저장된 결과 (unique violation) — 멱등 처리
    if (error.code === "23505") {
      return NextResponse.json({ id: result.id });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
