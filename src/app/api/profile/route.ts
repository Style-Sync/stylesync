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
