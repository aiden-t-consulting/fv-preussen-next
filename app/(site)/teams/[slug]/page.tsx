import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Users, User, Trophy } from "lucide-react";
import { PlayerCard } from "@/components/teams/PlayerCard";
import { MatchSection } from "@/components/home/MatchSection";
import { getTeamBySlug, getTeamSlugs } from "@/lib/sanity/queries";
import { getUpcomingMatches, getRecentResults, getLeagueTable } from "@/lib/fupa/client";
import { urlFor } from "@/lib/sanity/client";
import { LEGACY_TEAMS, getLegacyTeamBySlug } from "@/lib/legacy/teams";

interface Props {
  params: Promise<{ slug: string }>;
}

type TeamPageProps = Readonly<Props>;

export async function generateStaticParams() {
  const slugs = await getTeamSlugs();
  const fallbackSlugs = LEGACY_TEAMS.map((team) => team.slug?.current).filter(Boolean) as string[];
  return Array.from(new Set([...slugs, ...fallbackSlugs])).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = (await getTeamBySlug(slug)) ?? getLegacyTeamBySlug(slug);
  if (!team?.name) return {};
  return {
    title: team.name,
    description: `Kader, Spielplan und Infos zu ${team.name} – FV Preussen Eberswalde.`,
  };
}

export const revalidate = 300;

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;
  const team = (await getTeamBySlug(slug)) ?? getLegacyTeamBySlug(slug);
  if (!team) notFound();

  const [upcoming, results, table] = await Promise.all([
    getUpcomingMatches(5),
    getRecentResults(5),
    getLeagueTable(),
  ]);

  const playersByPosition = {
    Torwart: (team.players ?? []).filter((p) => p.position === "Torwart"),
    Abwehr: (team.players ?? []).filter((p) => p.position === "Abwehr"),
    Mittelfeld: (team.players ?? []).filter((p) => p.position === "Mittelfeld"),
    Angriff: (team.players ?? []).filter((p) => p.position === "Angriff"),
  };

  let heroBadgeContent = <Trophy className="w-12 h-12 text-white/60" />;
  if (team.badge) {
    heroBadgeContent = (
      <Image
        src={urlFor(team.badge).width(100).height(100).url()}
        alt={`${team.name} Wappen`}
        width={80}
        height={80}
        className="object-contain"
      />
    );
  } else if ("photo" in team && team.photo) {
    heroBadgeContent = (
      <Image
        src={team.photo}
        alt={team.name ?? "Teamfoto"}
        width={112}
        height={112}
        className="object-cover w-28 h-28 rounded-xl"
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Back */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#21a530] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle Teams
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-linear-to-br from-[#0e3a07] to-[#21a530] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Badge */}
          <div className="w-28 h-28 shrink-0 bg-white/20 rounded-2xl flex items-center justify-center">
            {heroBadgeContent}
          </div>
          <div>
            <p className="text-[#81d742] text-sm font-bold uppercase tracking-[0.2em] mb-2">
              {team.division}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{team.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              {team.coach && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Trainer: {team.coach}
                </span>
              )}
              {team.season && (
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  Saison {team.season}
                </span>
              )}
              {team.players && team.players.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {team.players.length} Spieler
                </span>
              )}
            </div>
            {team.description && (
              <p className="mt-4 text-gray-300 max-w-2xl">{team.description}</p>
            )}
            {"legacyNote" in team && team.legacyNote && (
              <p className="mt-4 text-sm text-green-100 max-w-2xl">{team.legacyNote}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">
        {/* Kader (roster) */}
        {team.players && team.players.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#21a530]" />
              Kader
            </h2>
            {Object.entries(playersByPosition).map(([position, players]) => {
              if (players.length === 0) return null;
              return (
                <div key={position} className="mb-10">
                  <h3 className="text-base font-bold text-[#15540a] uppercase tracking-wider mb-4 pb-2 border-b border-[#21a530]/20">
                    {position}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {players.map((player) => (
                      <PlayerCard key={player._id} player={player} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Match data */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#21a530]" />
            Spielplan & Tabelle
          </h2>
          <MatchSection upcoming={upcoming} results={results} table={table} />
        </section>

        {/* FuPa embed fallback */}
        {team.fupaTeamId && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">FuPa Profil</h2>
            <a
              href={`https://www.fupa.net/team/${team.fupaTeamId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#21a530] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#1a8f28] transition-colors"
            >
              Vollständiges FuPa-Profil öffnen →
            </a>
          </section>
        )}
      </div>
    </div>
  );
}
