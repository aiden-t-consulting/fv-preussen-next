import { sanityClient } from "./client";
import type { Article, Team, Sponsor, SiteSettings } from "@/types";

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
