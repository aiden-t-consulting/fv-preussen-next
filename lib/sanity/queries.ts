import { sanityClient } from "./client";
import type { Article, Event, HeroSlideData, Team, Sponsor, SiteSettings } from "@/types";

function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return !!(projectId && projectId !== "your-project-id");
}

async function safeFetch<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  if (!isSanityConfigured()) return fallback;
  try {
    return await query();
  } catch {
    return fallback;
  }
}

// ─── Articles ────────────────────────────────────────────────────────────────

export async function getLatestArticles(count = 3): Promise<Article[]> {
  return safeFetch(
    () => sanityClient.fetch(
      `*[_type == "article"] | order(publishedAt desc) [0...$count] {
        _id, title, slug, category, publishedAt, excerpt,
        coverImage { asset, alt, hotspot }
      }`,
      { count }
    ),
    []
  );
}

export async function getAllArticles(category?: string): Promise<Article[]> {
  const filter = category
    ? `*[_type == "article" && category == $category]`
    : `*[_type == "article"]`;
  return safeFetch(
    () => sanityClient.fetch(
      `${filter} | order(publishedAt desc) {
        _id, title, slug, category, publishedAt, excerpt,
        coverImage { asset, alt, hotspot }
      }`,
      { category }
    ),
    []
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return safeFetch(
    () => sanityClient.fetch(
      `*[_type == "article" && slug.current == $slug][0] {
        _id, title, slug, category, publishedAt, excerpt, author, body,
        coverImage { asset, alt, hotspot }
      }`,
      { slug }
    ),
    null
  );
}

export async function getArticleSlugs(): Promise<string[]> {
  const results = await safeFetch(
    () => sanityClient.fetch<{ slug: { current: string } }[]>(
      `*[_type == "article"] { slug }`
    ),
    []
  );
  return results.map((r) => r.slug.current);
}

// ─── Teams ───────────────────────────────────────────────────────────────────

export async function getAllTeams(): Promise<Team[]> {
  return safeFetch(
    () => sanityClient.fetch(
      `*[_type == "team"] | order(name asc) {
        _id, name, slug, division, coach, season, fupaTeamId,
        badge { asset, alt }
      }`
    ),
    []
  );
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  return safeFetch(
    () => sanityClient.fetch(
      `*[_type == "team" && slug.current == $slug][0] {
        _id, name, slug, division, coach, season, fupaTeamId, description,
        badge { asset, alt },
        players[]-> {
          _id, name, position, shirtNumber, nationality,
          photo { asset, alt }
        }
      }`,
      { slug }
    ),
    null
  );
}

export async function getTeamSlugs(): Promise<string[]> {
  const results = await safeFetch(
    () => sanityClient.fetch<{ slug: { current: string } }[]>(
      `*[_type == "team"] { slug }`
    ),
    []
  );
  return results.map((r) => r.slug.current);
}

// ─── Sponsors ────────────────────────────────────────────────────────────────

export async function getAllSponsors(): Promise<Sponsor[]> {
  return safeFetch(
    () => sanityClient.fetch(
      `*[_type == "sponsor"] | order(tier asc, name asc) {
        _id, name, tier, url, description,
        logo { asset, alt }
      }`
    ),
    []
  );
}

// ─── Hero Slides ─────────────────────────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlideData[]> {
  return safeFetch(async () => {
    const settings = await sanityClient.fetch<{
      heroSlides?: {
        eyebrow: string;
        title?: string;
        subtitle?: string;
        isDynamic?: boolean;
        imageUrl?: string;
        cta1Label?: string;
        cta1Href?: string;
        cta2Label?: string;
        cta2Href?: string;
      }[];
    }>(
      `*[_type == "siteSettings"][0]{
        "heroSlides": heroSlides[]{
          eyebrow, title, subtitle, isDynamic,
          "imageUrl": image.asset->url,
          cta1Label, cta1Href, cta2Label, cta2Href
        }
      }`
    );
    if (!settings?.heroSlides?.length) return [];
    return settings.heroSlides.map((s) => ({
      eyebrow: s.eyebrow ?? "",
      title: s.title,
      subtitle: s.subtitle,
      isDynamic: s.isDynamic,
      imageUrl: s.imageUrl ?? "",
      cta1: { label: s.cta1Label ?? "", href: s.cta1Href ?? "/" },
      cta2: { label: s.cta2Label ?? "", href: s.cta2Href ?? "/" },
    }));
  }, []);
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function getUpcomingEvents(count = 10): Promise<Event[]> {
  const now = new Date().toISOString();
  return safeFetch(
    () =>
      sanityClient.fetch(
        `*[_type == "event" && date >= $now] | order(date asc) [0...$count] {
          _id, title, slug, category, date, endDate, location, description,
          coverImage { asset, alt }
        }`,
        { now, count }
      ),
    []
  );
}

export async function getAllEvents(): Promise<Event[]> {
  return safeFetch(
    () =>
      sanityClient.fetch(
        `*[_type == "event"] | order(date asc) {
          _id, title, slug, category, date, endDate, location, description,
          coverImage { asset, alt }
        }`
      ),
    []
  );
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch(
    () => sanityClient.fetch(
      `*[_type == "siteSettings"][0] {
        _id, clubName, tagline, contactEmail, phone, address,
        socialLinks,
        badge { asset, alt }
      }`
    ),
    null
  );
}
