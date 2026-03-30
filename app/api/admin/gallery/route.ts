import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/admin/auth";
import { createGallery } from "@/lib/admin/sanity-write";
import { sanityClient } from "@/lib/sanity/client";

export async function GET() {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const galleries = await sanityClient.fetch(
      `*[_type == "gallery"] | order(date desc) {
        _id, title, "slug": slug.current, date,
        "photoCount": count(photos)
      }`
    );
    return NextResponse.json(galleries);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const result = await createGallery(body);
  if (!result) {
    return NextResponse.json(
      { error: "Fehler beim Erstellen. Ist SANITY_WRITE_TOKEN gesetzt?" },
      { status: 500 }
    );
  }
  return NextResponse.json(result, { status: 201 });
}
