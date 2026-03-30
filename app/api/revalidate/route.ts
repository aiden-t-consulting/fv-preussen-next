import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Called by Sanity webhooks after content is published
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current: string } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    switch (body._type) {
      case "article":
        revalidatePath("/aktuelles");
        revalidatePath("/berichte");
        if (body.slug?.current) {
          revalidatePath(`/aktuelles/${body.slug.current}`);
        }
        revalidatePath("/"); // homepage news feed
        break;
      case "team":
        revalidatePath("/teams");
        if (body.slug?.current) {
          revalidatePath(`/teams/${body.slug.current}`);
        }
        break;
      case "sponsor":
        revalidatePath("/sponsoren");
        revalidatePath("/");
        break;
      case "siteSettings":
        revalidatePath("/", "layout");
        break;
      default:
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
