import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  // TODO: 패션 이미지 검색 (네이버 쇼핑)
  return NextResponse.json({ message: "not implemented" }, { status: 501 });
}
