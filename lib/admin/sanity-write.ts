import { createClient } from "@sanity/client";

function getWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!projectId || projectId === "your-project-id" || !token) return null;
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });
}

export function isWriteConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id" &&
    process.env.SANITY_WRITE_TOKEN
  );
}

// ── Portable Text helpers ─────────────────────────────────────────────────────

export function portableTextToPlainText(blocks: unknown[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((b): b is { _type: string; children?: { text: string }[] } =>
      typeof b === "object" && b !== null && (b as { _type: string })._type === "block"
    )
    .map((b) => (b.children ?? []).map((c) => c.text).join(""))
    .join("\n\n");
}

function textToPortableText(text: string) {
  if (!text.trim()) return [];
  return text
    .split("\n\n")
    .filter(Boolean)
    .map((para, i) => ({
      _type: "block",
      _key: `b${i}${Date.now()}`,
      style: "normal",
      markDefs: [] as unknown[],
      children: [
        {
          _type: "span",
          _key: `s${i}`,
          text: para.trim(),
          marks: [] as string[],
        },
      ],
    }));
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ArticleInput {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  author?: string;
  excerpt?: string;
  body?: string;
  coverImageRef?: string;
  coverImageAlt?: string;
}

// ── CRUD ──────────────────────────────────────────────────────────────────────

export async function createArticle(input: ArticleInput): Promise<{ _id: string } | null> {
  const client = getWriteClient();
  if (!client) return null;

  const doc: Record<string, unknown> = {
    _type: "article",
    title: input.title,
    slug: { _type: "slug", current: input.slug },
    category: input.category,
    publishedAt: input.publishedAt,
  };
  if (input.author) doc.author = input.author;
  if (input.excerpt) doc.excerpt = input.excerpt;
  if (input.body) doc.body = textToPortableText(input.body);
  if (input.coverImageRef) {
    doc.coverImage = {
      _type: "image",
      asset: { _type: "reference", _ref: input.coverImageRef },
      alt: input.coverImageAlt ?? "",
    };
  }

  return client.create(doc as Parameters<typeof client.create>[0]);
}

export async function updateArticle(
  id: string,
  input: Partial<ArticleInput>
): Promise<{ _id: string } | null> {
  const client = getWriteClient();
  if (!client) return null;

  const patch: Record<string, unknown> = {};
  if (input.title !== undefined) patch.title = input.title;
  if (input.slug !== undefined) patch.slug = { _type: "slug", current: input.slug };
  if (input.category !== undefined) patch.category = input.category;
  if (input.publishedAt !== undefined) patch.publishedAt = input.publishedAt;
  if (input.author !== undefined) patch.author = input.author;
  if (input.excerpt !== undefined) patch.excerpt = input.excerpt;
  if (input.body !== undefined) patch.body = textToPortableText(input.body);
  if (input.coverImageRef !== undefined) {
    patch.coverImage = {
      _type: "image",
      asset: { _type: "reference", _ref: input.coverImageRef },
      alt: input.coverImageAlt ?? "",
    };
  }

  return client.patch(id).set(patch).commit();
}

export async function deleteArticle(id: string): Promise<boolean> {
  const client = getWriteClient();
  if (!client) return false;
  await client.delete(id);
  return true;
}

// ── Image upload ──────────────────────────────────────────────────────────────

export async function uploadImage(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!projectId || projectId === "your-project-id" || !token) return null;

  const url = `https://${projectId}.api.sanity.io/v2021-03-25/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": contentType },
    body: buffer as unknown as BodyInit,
  });
  if (!res.ok) return null;
  const data = await res.json();
  return (data.document?._id as string) ?? null;
}
