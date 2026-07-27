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

  // 팔로잉 사용자들의 공개 결과 최신순 조회
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
        display_name
      )
    `
    )
    .eq("is_public", true)
    .in("profile_id", followingIds)
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
