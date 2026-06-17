import { NextRequest, NextResponse } from "next/server";

import { searchArtists, searchTracks } from "@/lib/spotify/search";

// GET /api/spotify?q=뉴진스&type=artist  (type: "artist" | "track", 기본 artist)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();
  const type = searchParams.get("type") === "track" ? "track" : "artist";

  if (!query) {
    return NextResponse.json({ message: "검색어(q)가 필요합니다." }, { status: 400 });
  }

  try {
    const results = type === "track" ? await searchTracks(query) : await searchArtists(query);
    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Spotify 검색 실패";
    return NextResponse.json({ message }, { status: 500 });
  }
}
