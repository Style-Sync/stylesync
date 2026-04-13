import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  // TODO: Spotify 아티스트 검색
  return NextResponse.json({ message: "not implemented" }, { status: 501 });
}
