import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HeroEditorialRail } from "@/components/home/HeroEditorialRail";
import { QuickMatchStrip } from "@/components/home/QuickMatchStrip";
import { Spielcenter } from "@/components/home/Spielcenter";
import { LatestNews } from "@/components/home/LatestNews";
import { TeamsOverview } from "@/components/home/TeamsOverview";
import { ClubBlock } from "@/components/home/ClubBlock";
import { SponsorsTiered } from "@/components/home/SponsorsTiered";
import { ConversionBand } from "@/components/home/ConversionBand";
import { getLatestArticles, getAllSponsors, getAllTeams, getHeroSlides } from "@/lib/sanity/queries";
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
  const [articles, sponsors, teams, heroSlides, nextMatch, upcoming, results, table] =
    await Promise.allSettled([
      getLatestArticles(4),
      getAllSponsors(),
      getAllTeams(),
      getHeroSlides(),
      getNextMatch(),
      getUpcomingMatches(5),
      getRecentResults(5),
      getLeagueTable(),
    ]);

  const tableData = table.status === "fulfilled" ? table.value : [];
  const tableEntry =
    tableData.find((e) => e.isCurrentTeam) ??
    tableData.find(
      (e) =>
        e.team.toLowerCase().includes("preussen") ||
        e.team.toLowerCase().includes("eberswalde")
    ) ??
    null;

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

      <Hero
        nextMatch={nextMatch.status === "fulfilled" ? nextMatch.value : null}
        slides={heroSlides.status === "fulfilled" ? heroSlides.value : []}
      />

      <HeroEditorialRail
        articles={articles.status === "fulfilled" ? articles.value : []}
      />

      <QuickMatchStrip
        nextMatch={nextMatch.status === "fulfilled" ? nextMatch.value : null}
        lastResult={
          results.status === "fulfilled" ? results.value[0] ?? null : null
        }
        tableEntry={tableEntry}
      />

      <LatestNews
        articles={articles.status === "fulfilled" ? articles.value : undefined}
      />

      <Spielcenter
        upcoming={upcoming.status === "fulfilled" ? upcoming.value : []}
        results={results.status === "fulfilled" ? results.value : []}
        table={tableData}
      />

      <TeamsOverview teams={teams.status === "fulfilled" ? teams.value : []} />

      <ClubBlock />

      <SponsorsTiered
        sponsors={sponsors.status === "fulfilled" ? sponsors.value : []}
      />

      <ConversionBand />
    </>
  );
}
