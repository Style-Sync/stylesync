import { NextRequest, NextResponse } from "next/server";

import { searchMovies } from "@/lib/tmdb/search";

// GET /api/tmdb?q=기생충
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ message: "검색어(q)가 필요합니다." }, { status: 400 });
  }

  try {
    const results = await searchMovies(query);
    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "TMDB 검색 실패";
    return NextResponse.json({ message }, { status: 500 });
  }
}
