import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/admin/auth";
import { createArticle } from "@/lib/admin/sanity-write";
import { sanityClient } from "@/lib/sanity/client";

export async function GET() {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const articles = await sanityClient.fetch(
      `*[_type == "article"] | order(publishedAt desc) {
        _id, title, "slug": slug.current, category, publishedAt, author, _updatedAt
      }`
    );
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const result = await createArticle(body);
  if (!result) {
    return NextResponse.json(
      { error: "Fehler beim Erstellen. Ist SANITY_WRITE_TOKEN gesetzt?" },
      { status: 500 }
    );
  }
  return NextResponse.json(result, { status: 201 });
}
