import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/admin/auth";
import { updateSiteSettings, getSiteSettingsForAdmin } from "@/lib/admin/sanity-write";

export async function GET() {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getSiteSettingsForAdmin();
  return NextResponse.json(data ?? {});
}

export async function PATCH(request: NextRequest) {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const ok = await updateSiteSettings(body);
  if (!ok) {
    return NextResponse.json(
      { error: "Fehler beim Speichern. Ist SANITY_WRITE_TOKEN gesetzt?" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
