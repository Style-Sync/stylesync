import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("results")
    .select("result_payload, profile_id, is_public")
    .eq("id", params.id)
    .single();

  if (error || !data?.result_payload) {
    return NextResponse.json({ error: "결과를 찾을 수 없습니다." }, { status: 404 });
  }

  // 접근 제어: 공개 결과가 아니면 본인 소유일 때만 반환한다.
  // (RLS와 별개로 앱 레벨에서도 명시적으로 차단 — 존재 노출 방지를 위해 403 대신 404)
  if (!data.is_public) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || user.id !== data.profile_id) {
      return NextResponse.json({ error: "결과를 찾을 수 없습니다." }, { status: 404 });
    }
  }

  return NextResponse.json({ result: data.result_payload });
}
