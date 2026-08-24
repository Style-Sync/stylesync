import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const VISIBILITY_VALUES = ["public", "followers", "private"] as const;
type Visibility = (typeof VISIBILITY_VALUES)[number];

type UpdateProfileBody = {
  display_name?: string;
  bio?: string;
  visibility?: Visibility;
};

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, avatar_url, visibility")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "프로필을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ profile: data });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let body: UpdateProfileBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const { display_name, bio, visibility } = body;

  if (visibility !== undefined && !VISIBILITY_VALUES.includes(visibility)) {
    return NextResponse.json(
      { error: "visibility는 public, followers, private 중 하나여야 합니다." },
      { status: 400 }
    );
  }

  const updates: Record<string, string> = {};
  if (display_name !== undefined) updates.display_name = display_name;
  if (bio !== undefined) updates.bio = bio;
  if (visibility !== undefined) updates.visibility = visibility;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "업데이트할 필드가 없습니다." }, { status: 400 });
  }

  // 비공개 전환 시 기존 저장 결과도 공개 목록에서 즉시 숨긴다 (프라이버시 kill-switch).
  // is_public만 보는 이미 배포된 유사도 검색(match_results/match_users)까지 반영하기 위함.
  // 프로필 업데이트보다 먼저 수행 — 실패 시 프로필도 바꾸지 않아 노출 상태로 남지 않게 한다.
  // public/followers 복귀 시 자동 재공개하지 않음(재공개는 결과별 명시적 액션).
  if (visibility === "private") {
    const { error: hideError } = await supabase
      .from("results")
      .update({ is_public: false })
      .eq("profile_id", user.id);
    if (hideError) {
      return NextResponse.json(
        { error: "비공개 전환 중 기존 결과 숨김에 실패했습니다. 다시 시도해주세요." },
        { status: 500 }
      );
    }
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select("id, username, display_name, bio, avatar_url, visibility")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile: data });
}
