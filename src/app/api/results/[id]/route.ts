import { NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("results")
    .select("result_payload")
    .eq("id", params.id)
    .single();

  if (error || !data?.result_payload) {
    return NextResponse.json({ error: "결과를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ result: data.result_payload });
}
