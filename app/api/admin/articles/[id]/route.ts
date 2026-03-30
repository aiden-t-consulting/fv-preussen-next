import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/admin/auth";
import { updateArticle, deleteArticle } from "@/lib/admin/sanity-write";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Ctx) {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const result = await updateArticle(decodeURIComponent(id), body);
  if (!result) {
    return NextResponse.json({ error: "Fehler beim Aktualisieren." }, { status: 500 });
  }
  return NextResponse.json(result);
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteArticle(decodeURIComponent(id));
  if (!ok) {
    return NextResponse.json({ error: "Fehler beim Löschen." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
