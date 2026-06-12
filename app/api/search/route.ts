import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

/** GET /api/search?q=term → { software: [...], articles: [...] } */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  if (!q.trim()) {
    return NextResponse.json({ software: [], articles: [] });
  }
  const results = await searchContent(q);
  return NextResponse.json(results, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
