import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  // TODO: TMDB 영화 검색
  return NextResponse.json({ message: "not implemented" }, { status: 501 });
}
