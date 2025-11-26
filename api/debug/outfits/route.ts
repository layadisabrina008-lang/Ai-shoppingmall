// api/debug/outfits/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_req: NextRequest) {
  return NextResponse.json({
    ok: true,
    message: "Debug outfits endpoint disabled for now.",
  });
}
