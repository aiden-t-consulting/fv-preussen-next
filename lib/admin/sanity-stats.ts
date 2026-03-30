import { sanityClient } from "@/lib/sanity/client";

function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return !!(projectId && projectId !== "your-project-id");
}

export interface RecentItem {
  _id: string;
  _type: "article" | "team" | "sponsor" | "player";
  title: string;
  _updatedAt: string;
  slug?: string;
  category?: string;
}

export interface ContentStats {
  articles: {
    total: number;
    news: number;
    bericht: number;
    jugend: number;
    verein: number;
    recent: RecentItem[];
  };
  teams: { total: number };
  sponsors: {
    total: number;
    hauptsponsor: number;
    premiumsponsor: number;
    partner: number;
    foerderer: number;
  };
  players: { total: number };
  isSanityConfigured: boolean;
}

const FALLBACK: ContentStats = {
  articles: { total: 0, news: 0, bericht: 0, jugend: 0, verein: 0, recent: [] },
  teams: { total: 0 },
  sponsors: { total: 0, hauptsponsor: 0, premiumsponsor: 0, partner: 0, foerderer: 0 },
  players: { total: 0 },
  isSanityConfigured: false,
};

export async function getContentStats(): Promise<ContentStats> {
  if (!isSanityConfigured()) return FALLBACK;

  try {
    const [counts, sponsors, recent] = await Promise.all([
      sanityClient.fetch<{
        total: number;
        news: number;
        bericht: number;
        jugend: number;
        verein: number;
        teams: number;
        players: number;
      }>(`{
        "total":   count(*[_type == "article"]),
        "news":    count(*[_type == "article" && category == "news"]),
        "bericht": count(*[_type == "article" && category == "bericht"]),
        "jugend":  count(*[_type == "article" && category == "jugend"]),
        "verein":  count(*[_type == "article" && category == "verein"]),
        "teams":   count(*[_type == "team"]),
        "players": count(*[_type == "player"])
      }`),

      sanityClient.fetch<{ tier: string }[]>(
        `*[_type == "sponsor"]{ tier }`
      ),

      sanityClient.fetch<RecentItem[]>(
        `*[_type in ["article","team","sponsor","player"]]
          | order(_updatedAt desc)[0...8]{
          _id, _type, _updatedAt,
          "title": coalesce(title, name, "Kein Titel"),
          "slug":  slug.current,
          category
        }`
      ),
    ]);

    const tierCount = (tier: string) =>
      sponsors.filter((s) => s.tier === tier).length;

    return {
      articles: {
        total: counts.total,
        news: counts.news,
        bericht: counts.bericht,
        jugend: counts.jugend,
        verein: counts.verein,
        recent,
      },
      teams: { total: counts.teams },
      sponsors: {
        total: sponsors.length,
        hauptsponsor: tierCount("hauptsponsor"),
        premiumsponsor: tierCount("premiumsponsor"),
        partner: tierCount("partner"),
        foerderer: tierCount("foerderer"),
      },
      players: { total: counts.players },
      isSanityConfigured: true,
    };
  } catch {
    return { ...FALLBACK, isSanityConfigured: true };
  }
}
