import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Calendar, MapPin, Trophy, ChevronRight } from "lucide-react";
import { getAllArticles } from "@/lib/sanity/queries";
import {
  getRecentResults,
  getUpcomingMatches,
  getLeagueTable,
} from "@/lib/fupa/client";
import { ArticleCard } from "@/components/news/ArticleCard";
import { cn } from "@/lib/utils";
import type { FuPaMatch, FuPaTableEntry } from "@/types";

export const metadata: Metadata = {
  title: "Spielberichte | FV Preussen Eberswalde",
  description:
    "Spielberichte, Ergebnisse, Tabelle und nächste Spiele des FV Preussen Eberswalde.",
};

export const revalidate = 60;

function isPreussen(name: string) {
  return (
    name.toLowerCase().includes("preussen") ||
    name.toLowerCase().includes("eberswalde")
  );
}

function formatMatchDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ResultBadge({ match }: { match: FuPaMatch }) {
  const homeIsUs = isPreussen(match.homeTeam);
  const us = homeIsUs ? match.homeScore ?? 0 : match.awayScore ?? 0;
  const them = homeIsUs ? match.awayScore ?? 0 : match.homeScore ?? 0;

  if (us > them)
    return (
      <span className="rounded-full bg-[#039139] px-2.5 py-0.5 text-[11px] font-bold text-white">
        S
      </span>
    );
  if (us < them)
    return (
      <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[11px] font-bold text-white">
        N
      </span>
    );
  return (
    <span className="rounded-full bg-gray-400 px-2.5 py-0.5 text-[11px] font-bold text-white">
      U
    </span>
  );
}

function ResultRow({ match }: { match: FuPaMatch }) {
  const homeIsUs = isPreussen(match.homeTeam);
  const us = homeIsUs ? (match.homeScore ?? 0) : (match.awayScore ?? 0);
  const them = homeIsUs ? (match.awayScore ?? 0) : (match.homeScore ?? 0);
  const outcome = us > them ? "win" : us < them ? "loss" : "draw";

  return (
    <div
      className={cn(
        "flex items-center gap-4 border-b border-gray-100 py-4 last:border-0",
        "border-l-4 pl-4",
        outcome === "win" && "border-l-[#039139]",
        outcome === "loss" && "border-l-red-400",
        outcome === "draw" && "border-l-gray-300"
      )}
    >
      {/* Date */}
      <div className="hidden w-24 shrink-0 text-xs text-gray-400 sm:block">
        {formatMatchDate(match.date)}
      </div>

      {/* Teams + score */}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span
              className={cn(
                "truncate text-sm font-bold",
                isPreussen(match.homeTeam)
                  ? "text-[#039139]"
                  : "text-gray-900"
              )}
            >
              {match.homeTeam}
            </span>
            <span className="text-xs text-gray-400">vs</span>
            <span
              className={cn(
                "truncate text-sm font-bold",
                isPreussen(match.awayTeam)
                  ? "text-[#039139]"
                  : "text-gray-900"
              )}
            >
              {match.awayTeam}
            </span>
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[11px] text-gray-400">
            {match.competition && <span>{match.competition}</span>}
            {match.venue && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {match.venue}
              </span>
            )}
          </div>
        </div>

        {/* Score */}
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              "text-xl font-bold tabular-nums",
              outcome === "win" && "text-[#039139]",
              outcome === "loss" && "text-red-500",
              outcome === "draw" && "text-gray-500"
            )}
          >
            {match.homeScore}:{match.awayScore}
          </span>
          <ResultBadge match={match} />
        </div>
      </div>
    </div>
  );
}

function UpcomingRow({ match, index }: { match: FuPaMatch; index: number }) {
  const isHome = isPreussen(match.homeTeam);
  const opponent = isHome ? match.awayTeam : match.homeTeam;

  return (
    <div className="flex items-center gap-4 border-b border-white/10 py-4 last:border-0">
      {/* Matchday number */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#039139]/20 text-xs font-bold text-[#039139]">
        {index + 1}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-bold text-white">
            {isHome ? (
              <>
                <span className="text-[#7de8a0]">FV Preussen</span>
                <span className="text-white/50"> vs </span>
                {opponent}
              </>
            ) : (
              <>
                {opponent}
                <span className="text-white/50"> vs </span>
                <span className="text-[#7de8a0]">FV Preussen</span>
              </>
            )}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatMatchDate(match.date)}
              {match.time ? ` · ${match.time} Uhr` : ""}
            </span>
            {match.competition && <span>{match.competition}</span>}
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">
          {isHome ? "Heim" : "Auswärts"}
        </span>
      </div>
    </div>
  );
}

function TablePanel({ entries }: { entries: FuPaTableEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-gray-500">
            <th className="w-6 py-2 text-left">#</th>
            <th className="py-2 text-left">Verein</th>
            <th className="px-2 py-2 text-right">Sp</th>
            <th className="hidden px-2 py-2 text-right sm:table-cell">G</th>
            <th className="hidden px-2 py-2 text-right sm:table-cell">U</th>
            <th className="hidden px-2 py-2 text-right sm:table-cell">V</th>
            <th className="hidden px-2 py-2 text-right sm:table-cell">Tore</th>
            <th className="py-2 text-right font-bold">Pkt</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr
              key={e.position}
              className={cn(
                "border-b border-white/5 last:border-0",
                e.isCurrentTeam && "bg-[#039139]/10"
              )}
            >
              <td className="py-2.5 font-mono text-xs text-gray-500">
                {e.position}
              </td>
              <td
                className={cn(
                  "py-2.5 pr-2 text-xs font-semibold",
                  e.isCurrentTeam ? "text-[#7de8a0]" : "text-gray-200"
                )}
              >
                {e.isCurrentTeam ? (
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#039139]" />
                    {e.team}
                  </span>
                ) : (
                  e.team
                )}
              </td>
              <td className="px-2 py-2.5 text-right text-xs text-gray-500">
                {e.played}
              </td>
              <td className="hidden px-2 py-2.5 text-right text-xs text-gray-500 sm:table-cell">
                {e.won}
              </td>
              <td className="hidden px-2 py-2.5 text-right text-xs text-gray-500 sm:table-cell">
                {e.drawn}
              </td>
              <td className="hidden px-2 py-2.5 text-right text-xs text-gray-500 sm:table-cell">
                {e.lost}
              </td>
              <td className="hidden px-2 py-2.5 text-right text-xs text-gray-500 sm:table-cell">
                {e.goalsFor}:{e.goalsAgainst}
              </td>
              <td className="py-2.5 text-right text-sm font-bold text-white">
                {e.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function BerichtePage() {
  const [results, upcoming, table, articles] = await Promise.allSettled([
    getRecentResults(10),
    getUpcomingMatches(5),
    getLeagueTable(),
    getAllArticles("bericht"),
  ]);

  const resultList = results.status === "fulfilled" ? results.value : [];
  const upcomingList = upcoming.status === "fulfilled" ? upcoming.value : [];
  const tableList = table.status === "fulfilled" ? table.value : [];
  const articleList = articles.status === "fulfilled" ? articles.value : [];

  const tableEntry = tableList.find((e) => e.isCurrentTeam);
  const lastResult = resultList[0];

  return (
    <div className="min-h-screen">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#1e2030] via-[#1a2a1a] to-[#026b29] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#7de8a0]">
            Saison 2024/25 · Landesliga Nord
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white [font-family:var(--font-club)] lg:text-5xl">
            Spielberichte
          </h1>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-gray-300">
            Ausführliche Berichte zu allen Spielen der ersten Mannschaft und
            unserer Jugendteams — Ergebnisse, Tabelle und nächste Partien auf
            einen Blick.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4">
            {lastResult && (
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                <span className="text-xs text-gray-400">Letztes Spiel</span>
                <span className="text-lg font-bold text-white tabular-nums">
                  {lastResult.homeScore}:{lastResult.awayScore}
                </span>
                <span className="text-xs text-gray-300">
                  {isPreussen(lastResult.homeTeam)
                    ? lastResult.awayTeam
                    : lastResult.homeTeam}
                </span>
              </div>
            )}
            {tableEntry && (
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                <Trophy className="h-4 w-4 text-[#7de8a0]" />
                <span className="text-xs text-gray-400">Tabellenplatz</span>
                <span className="text-lg font-bold text-[#7de8a0]">
                  {tableEntry.position}.
                </span>
                <span className="text-xs text-gray-300">
                  {tableEntry.points} Pkt
                </span>
              </div>
            )}
            <a
              href="https://www.fussball.de"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs text-gray-400 transition-colors hover:border-[#039139]/40 hover:text-[#7de8a0]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Offizielle Daten auf fussball.de
            </a>
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="bg-[#1e2030]">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left column: results + upcoming */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent results */}
              <div className="rounded-2xl border border-white/8 bg-white/5 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white [font-family:var(--font-club)]">
                    Letzte Ergebnisse
                  </h2>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-[#039139]" />
                      Sieg
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-gray-400" />
                      Unentschieden
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      Niederlage
                    </span>
                  </div>
                </div>

                {resultList.length > 0 ? (
                  <div>
                    {resultList.map((match) => (
                      <ResultRow key={match.id} match={match} />
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-gray-500">
                    Keine Ergebnisse vorhanden.
                  </p>
                )}

                <div className="mt-4 border-t border-white/8 pt-4">
                  <a
                    href="https://www.fussball.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#039139]"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Alle Ergebnisse auf fussball.de
                  </a>
                </div>
              </div>

              {/* Upcoming matches */}
              <div className="rounded-2xl border border-white/8 bg-white/5 p-6">
                <h2 className="mb-6 text-lg font-bold text-white [font-family:var(--font-club)]">
                  Nächste Spiele
                </h2>

                {upcomingList.length > 0 ? (
                  <div>
                    {upcomingList.map((match, i) => (
                      <UpcomingRow key={match.id} match={match} index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-gray-500">
                    Keine kommenden Spiele geplant.
                  </p>
                )}

                <div className="mt-4 border-t border-white/8 pt-4">
                  <a
                    href="https://www.fussball.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#039139]"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Spielplan auf fussball.de
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: table */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/8 bg-white/5 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white [font-family:var(--font-club)]">
                    Tabelle
                  </h2>
                  <span className="rounded-full bg-[#039139]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7de8a0]">
                    Landesliga Nord
                  </span>
                </div>

                {tableList.length > 0 ? (
                  <TablePanel entries={tableList} />
                ) : (
                  <p className="py-8 text-center text-sm text-gray-500">
                    Keine Tabellendaten verfügbar.
                  </p>
                )}

                <div className="mt-4 border-t border-white/8 pt-4">
                  <a
                    href="https://www.fussball.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#039139]"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Gesamttabelle auf fussball.de
                  </a>
                </div>
              </div>

              {/* Quick link card */}
              <div className="rounded-2xl border border-[#039139]/30 bg-[#039139]/10 p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#7de8a0]">
                  Offizielle Daten
                </p>
                <p className="mb-4 text-sm text-gray-300">
                  Alle Spielpläne, Ergebnisse und Statistiken auf dem offiziellen
                  DFB-Portal.
                </p>
                <a
                  href="https://www.fussball.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-[#039139] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#026b29]"
                >
                  Zu fussball.de
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Match report articles from Sanity ───────────────────────────── */}
      {articleList.length > 0 && (
        <div className="bg-[#f8f7f5] py-16 lg:py-20">
          <div className="mx-auto max-w-[1280px] px-4">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#039139]">
                  Matchreports
                </p>
                <h2 className="text-3xl font-bold text-gray-900 [font-family:var(--font-club)]">
                  Spielberichte
                </h2>
              </div>
              <Link
                href="/aktuelles"
                className="text-[11px] font-semibold uppercase tracking-wider text-[#039139] hover:underline"
              >
                Alle News →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articleList.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Empty state when no articles ────────────────────────────────── */}
      {articleList.length === 0 && (
        <div className="bg-[#f8f7f5] py-16">
          <div className="mx-auto max-w-[1280px] px-4 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-400">
              Matchreports
            </p>
            <p className="text-gray-500">
              Ausführliche Spielberichte erscheinen hier nach jedem Spiel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
