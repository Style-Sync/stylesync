import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let followingId: string | undefined;
  try {
    const body = await req.json();
    followingId = body.following_id;
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (!followingId) {
    return NextResponse.json({ error: "following_id가 필요합니다." }, { status: 400 });
  }

  if (followingId === user.id) {
    return NextResponse.json({ error: "자기 자신은 팔로우할 수 없습니다." }, { status: 400 });
  }

  const { error } = await supabase
    .from("follows")
    .insert({ follower_id: user.id, following_id: followingId });

  if (error) {
    // 이미 팔로우 중 (unique violation) — 멱등 처리
    if (error.code === "23505") return new NextResponse(null, { status: 204 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const followingId = new URL(req.url).searchParams.get("following_id");
  if (!followingId) {
    return NextResponse.json({ error: "following_id가 필요합니다." }, { status: 400 });
  }

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", followingId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
