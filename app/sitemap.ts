import type { MetadataRoute } from "next";
import { getAllArticles, getAllTeams } from "@/lib/sanity/queries";

const BASE_URL = "https://fvpreussen-eberswalde.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, teams] = await Promise.allSettled([
    getAllArticles(),
    getAllTeams(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/aktuelles`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/berichte`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/teams`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/verein`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/verein/geschichte`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/verein/vorstand`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/verein/stadion`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/verein/dokumente`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/sponsoren`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/fan-shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/impressum`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/datenschutz`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap =
    articles.status === "fulfilled"
      ? articles.value.map((a) => ({
          url: `${BASE_URL}/aktuelles/${a.slug.current}`,
          lastModified: new Date(a.publishedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))
      : [];

  const teamRoutes: MetadataRoute.Sitemap =
    teams.status === "fulfilled"
      ? teams.value.map((t) => ({
          url: `${BASE_URL}/teams/${t.slug.current}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))
      : [];

  return [...staticRoutes, ...articleRoutes, ...teamRoutes];
}
