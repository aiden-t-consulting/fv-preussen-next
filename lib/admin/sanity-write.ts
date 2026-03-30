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

// ── Site Settings / Hero ──────────────────────────────────────────────────────

export interface HeroSlideInput {
  eyebrow: string;
  title?: string;
  subtitle?: string;
  isDynamic?: boolean;
  imageRef?: string;
  imageAlt?: string;
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
}

export interface SiteSettingsInput {
  clubName?: string;
  tagline?: string;
  contactEmail?: string;
  phone?: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  heroSlides?: HeroSlideInput[];
}

export async function updateSiteSettings(input: SiteSettingsInput): Promise<boolean> {
  const client = getWriteClient();
  if (!client) return false;

  const patch: Record<string, unknown> = {};
  if (input.clubName !== undefined) patch.clubName = input.clubName;
  if (input.tagline !== undefined) patch.tagline = input.tagline;
  if (input.contactEmail !== undefined) patch.contactEmail = input.contactEmail;
  if (input.phone !== undefined) patch.phone = input.phone;
  if (input.address !== undefined) patch.address = input.address;
  if (
    input.facebookUrl !== undefined ||
    input.instagramUrl !== undefined ||
    input.youtubeUrl !== undefined
  ) {
    patch.socialLinks = {
      facebook: input.facebookUrl ?? "",
      instagram: input.instagramUrl ?? "",
      youtube: input.youtubeUrl ?? "",
    };
  }
  if (input.heroSlides !== undefined) {
    patch.heroSlides = input.heroSlides.map((s, i) => ({
      _type: "object",
      _key: `slide_${i}`,
      eyebrow: s.eyebrow,
      title: s.title ?? "",
      subtitle: s.subtitle ?? "",
      isDynamic: s.isDynamic ?? false,
      cta1Label: s.cta1Label,
      cta1Href: s.cta1Href,
      cta2Label: s.cta2Label,
      cta2Href: s.cta2Href,
      ...(s.imageRef
        ? {
            image: {
              _type: "image",
              asset: { _type: "reference", _ref: s.imageRef },
              alt: s.imageAlt ?? "",
            },
          }
        : {}),
    }));
  }

  try {
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "siteSettings"][0]{ _id }`
    );
    if (existing) {
      await client.patch(existing._id).set(patch).commit();
    } else {
      await client.create({ _type: "siteSettings", ...patch } as Parameters<typeof client.create>[0]);
    }
    return true;
  } catch {
    return false;
  }
}

export async function getSiteSettingsForAdmin() {
  const client = getWriteClient();
  if (!client) return null;
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      _id, clubName, tagline, contactEmail, phone, address,
      socialLinks,
      "heroSlides": heroSlides[]{
        eyebrow, title, subtitle, isDynamic,
        "imageRef": image.asset._ref,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        cta1Label, cta1Href, cta2Label, cta2Href
      }
    }`
  );
}

// ── Events ────────────────────────────────────────────────────────────────────

export interface EventInput {
  title: string;
  slug: string;
  category: string;
  date: string;
  endDate?: string;
  location?: string;
  description?: string;
  coverImageRef?: string;
  coverImageAlt?: string;
}

function buildEventDoc(input: EventInput | Partial<EventInput>) {
  const doc: Record<string, unknown> = {};
  if (input.title !== undefined) doc.title = input.title;
  if (input.slug !== undefined) doc.slug = { _type: "slug", current: input.slug };
  if (input.category !== undefined) doc.category = input.category;
  if (input.date !== undefined) doc.date = input.date;
  if (input.endDate !== undefined) doc.endDate = input.endDate || null;
  if (input.location !== undefined) doc.location = input.location;
  if (input.description !== undefined) doc.description = input.description;
  if (input.coverImageRef !== undefined) {
    doc.coverImage = {
      _type: "image",
      asset: { _type: "reference", _ref: input.coverImageRef },
      alt: input.coverImageAlt ?? "",
    };
  }
  return doc;
}

export async function createEvent(input: EventInput): Promise<{ _id: string } | null> {
  const client = getWriteClient();
  if (!client) return null;
  return client.create({ _type: "event", ...buildEventDoc(input) } as Parameters<typeof client.create>[0]);
}

export async function updateEvent(id: string, input: Partial<EventInput>): Promise<{ _id: string } | null> {
  const client = getWriteClient();
  if (!client) return null;
  return client.patch(id).set(buildEventDoc(input)).commit();
}

export async function deleteEvent(id: string): Promise<boolean> {
  const client = getWriteClient();
  if (!client) return false;
  await client.delete(id);
  return true;
}

// ── Galleries ─────────────────────────────────────────────────────────────────

export interface GalleryPhotoInput {
  assetRef: string;
  alt?: string;
  caption?: string;
}

export interface GalleryInput {
  title: string;
  slug: string;
  date?: string;
  description?: string;
  photos: GalleryPhotoInput[];
}

function buildGalleryPhotos(photos: GalleryPhotoInput[]) {
  return photos.map((p, i) => ({
    _type: "image",
    _key: `photo_${Date.now()}_${i}`,
    asset: { _type: "reference", _ref: p.assetRef },
    alt: p.alt ?? "",
    caption: p.caption ?? "",
  }));
}

function buildGalleryDoc(input: GalleryInput | Partial<GalleryInput>) {
  const doc: Record<string, unknown> = {};
  if (input.title !== undefined) doc.title = input.title;
  if (input.slug !== undefined) doc.slug = { _type: "slug", current: input.slug };
  if (input.date !== undefined) doc.date = input.date || null;
  if (input.description !== undefined) doc.description = input.description;
  if (input.photos !== undefined) doc.photos = buildGalleryPhotos(input.photos);
  return doc;
}

export async function createGallery(input: GalleryInput): Promise<{ _id: string } | null> {
  const client = getWriteClient();
  if (!client) return null;
  return client.create({ _type: "gallery", ...buildGalleryDoc(input) } as Parameters<typeof client.create>[0]);
}

export async function updateGallery(id: string, input: Partial<GalleryInput>): Promise<{ _id: string } | null> {
  const client = getWriteClient();
  if (!client) return null;
  return client.patch(id).set(buildGalleryDoc(input)).commit();
}

export async function deleteGallery(id: string): Promise<boolean> {
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
