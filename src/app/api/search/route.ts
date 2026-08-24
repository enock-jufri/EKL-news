import { NextResponse } from "next/server";

import { fetchByQuery } from "@/lib/news";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ articles: [] });
  }

  const articles = await fetchByQuery(query);
  return NextResponse.json({ articles });
}
