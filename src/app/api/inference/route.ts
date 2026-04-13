import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  // TODO: AI 크로스 추론 로직
  return NextResponse.json({ message: "not implemented" }, { status: 501 });
}
