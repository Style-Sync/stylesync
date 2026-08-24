import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ isFollowing: false });
  }

  const followingId = new URL(req.url).searchParams.get("following_id");
  if (!followingId) {
    return NextResponse.json({ error: "following_id가 필요합니다." }, { status: 400 });
  }

  const { data } = await supabase
    .from("follows")
    .select("follower_id")
    .eq("follower_id", user.id)
    .eq("following_id", followingId)
    .maybeSingle();

  return NextResponse.json({ isFollowing: data !== null });
}
