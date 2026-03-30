import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/admin/auth";
import { getAnalyticsSummary } from "@/lib/admin/vercel-analytics";

export async function GET(request: NextRequest) {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const days = Number(request.nextUrl.searchParams.get("days") ?? "30");
  const data = await getAnalyticsSummary(Math.min(Math.max(days, 1), 90));
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
