import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LatestNews } from "@/components/home/LatestNews";
import { MatchSection } from "@/components/home/MatchSection";
import { StatsCounter } from "@/components/home/StatsCounter";
import { SponsorsStrip } from "@/components/home/SponsorsStrip";
import { getLatestArticles, getAllSponsors } from "@/lib/sanity/queries";
import {
  getNextMatch,
  getUpcomingMatches,
  getRecentResults,
  getLeagueTable,
} from "@/lib/fupa/client";

export const metadata: Metadata = {
  title: "FV Preussen Eberswalde | Motor des Barnim",
  description:
    "Offizielle Website des FV Preussen Eberswalde e.V. – Aktuelles, Spielberichte, Teams, Sponsoren und Vereinsinformationen.",
  openGraph: {
    title: "FV Preussen Eberswalde | Motor des Barnim",
    description:
      "Fußball im Barnim. Leidenschaft, Zusammenhalt und Tradition seit über 100 Jahren.",
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const [articles, sponsors, nextMatch, upcoming, results, table] =
    await Promise.allSettled([
      getLatestArticles(3),
      getAllSponsors(),
      getNextMatch(),
      getUpcomingMatches(5),
      getRecentResults(5),
      getLeagueTable(),
    ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: "FV Preussen Eberswalde e.V.",
            url: "https://fvpreussen-eberswalde.de",
            sport: "Fußball",
            foundingDate: "1919",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Pfefferwerkerstraße 9",
              addressLocality: "Eberswalde",
              postalCode: "16225",
              addressCountry: "DE",
            },
            sameAs: [
              "https://www.facebook.com/fvpreusseneberswalde",
              "https://www.instagram.com/fvpreusseneberswalde",
            ],
          }),
        }}
      />

      <Hero nextMatch={nextMatch.status === "fulfilled" ? nextMatch.value : null} />
      <LatestNews articles={articles.status === "fulfilled" ? articles.value : undefined} />
      <MatchSection
        upcoming={upcoming.status === "fulfilled" ? upcoming.value : []}
        results={results.status === "fulfilled" ? results.value : []}
        table={table.status === "fulfilled" ? table.value : []}
      />
      <StatsCounter />
      <SponsorsStrip sponsors={sponsors.status === "fulfilled" ? sponsors.value : []} />
    </>
  );
}
