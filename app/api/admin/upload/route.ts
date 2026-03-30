import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/admin/auth";
import { uploadImage } from "@/lib/admin/sanity-write";

export async function POST(request: NextRequest) {
  if (!(await getSessionFromCookies())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "Keine Datei übermittelt" }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const ref = await uploadImage(buffer, file.name, file.type);
  if (!ref) {
    return NextResponse.json(
      { error: "Upload fehlgeschlagen. Ist SANITY_WRITE_TOKEN gesetzt?" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ref });
}
