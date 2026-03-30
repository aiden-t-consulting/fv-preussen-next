import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/admin/auth";
import { getContentStats } from "@/lib/admin/sanity-stats";

export async function GET() {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getContentStats();
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
