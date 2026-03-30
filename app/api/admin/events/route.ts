import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/admin/auth";
import { createEvent } from "@/lib/admin/sanity-write";
import { sanityClient } from "@/lib/sanity/client";

export async function GET() {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const events = await sanityClient.fetch(
      `*[_type == "event"] | order(date asc) {
        _id, title, "slug": slug.current, category, date, endDate, location
      }`
    );
    return NextResponse.json(events);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const result = await createEvent(body);
  if (!result) {
    return NextResponse.json(
      { error: "Fehler beim Erstellen. Ist SANITY_WRITE_TOKEN gesetzt?" },
      { status: 500 }
    );
  }
  return NextResponse.json(result, { status: 201 });
}
