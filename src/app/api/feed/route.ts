import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 30;

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor"); // ISO timestamp
  const limit = Math.min(Number(searchParams.get("limit") ?? DEFAULT_LIMIT), MAX_LIMIT);

  // 팔로잉 목록 조회
  const { data: followingData } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user.id);

  const followingIds = (followingData ?? []).map((f: { following_id: string }) => f.following_id);

  if (followingIds.length === 0) {
    return NextResponse.json({ items: [], nextCursor: null });
  }

  // 팔로잉 사용자들의 공개 결과 최신순 조회.
  // 작성자가 프로필을 'private'으로 설정한 경우 팔로워 피드에서도 제외한다.
  // ('public'/'followers'는 뷰어가 팔로워이므로 노출 정상 — 피드 자체가 팔로잉 대상.)
  // profiles!inner + 임베드 컬럼 필터라 부모(results) 행까지 함께 걸러진다.
  let query = supabase
    .from("results")
    .select(
      `
      id,
      style_label,
      start_domain,
      created_at,
      profiles!inner (
        username,
        display_name,
        visibility
      )
    `
    )
    .eq("is_public", true)
    .in("profile_id", followingIds)
    .neq("profiles.visibility", "private")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = data ?? [];
  const nextCursor = items.length === limit ? items[items.length - 1].created_at : null;

  return NextResponse.json({ items, nextCursor });
}
