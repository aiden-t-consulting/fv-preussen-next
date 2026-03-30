"use client";

import Link from "next/link";
import { Calendar, Trophy, ArrowRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { cn, formatShortDate } from "@/lib/utils";
import type { FuPaMatch, FuPaTableEntry } from "@/types";

interface MatchSectionProps {
  upcoming: FuPaMatch[];
  results: FuPaMatch[];
  table: FuPaTableEntry[];
}

function MatchRow({ match, showResult }: { match: FuPaMatch; showResult: boolean }) {
  const isHome = match.homeTeam.includes("Preussen");
  const won =
    showResult &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    ((isHome && match.homeScore > match.awayScore) ||
      (!isHome && match.awayScore > match.homeScore));
  const drew =
    showResult &&
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.homeScore === match.awayScore;

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0">
      <div className="text-center shrink-0 w-12">
        <div className="text-[#a5d6a7] text-xs font-bold">
          {new Date(match.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
        </div>
        {match.time && !showResult && (
          <div className="text-gray-400 text-xs flex items-center justify-center gap-0.5">
            <Clock className="w-2.5 h-2.5" />
            {match.time}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className={cn("text-sm font-semibold truncate", isHome ? "text-white" : "text-gray-300")}>
          {match.homeTeam}
        </div>
        <div className={cn("text-sm truncate", !isHome ? "text-white font-semibold" : "text-gray-400")}>
          {match.awayTeam}
        </div>
      </div>

      <div className="shrink-0 text-center w-16">
        {showResult && match.homeScore !== undefined ? (
          <span
            className={cn(
              "inline-block px-2 py-1 rounded-md text-sm font-bold",
              won
                ? "bg-[#2e7d32] text-white"
                : drew
                ? "bg-gray-600 text-white"
                : "bg-red-800 text-white"
            )}
          >
            {match.homeScore}:{match.awayScore}
          </span>
        ) : (
          <span className="text-gray-500 text-xs">vs</span>
        )}
      </div>
    </div>
  );
}

function TableRow({ entry }: { entry: FuPaTableEntry }) {
  return (
    <tr
      className={cn(
        "text-sm border-b border-white/10",
        entry.isCurrentTeam && "bg-[#2e7d32]/20"
      )}
    >
      <td className={cn("py-2 pl-3 w-8 font-bold", entry.isCurrentTeam ? "text-[#a5d6a7]" : "text-gray-400")}>
        {entry.position}.
      </td>
      <td className={cn("py-2 pr-2 font-semibold", entry.isCurrentTeam ? "text-white" : "text-gray-200")}>
        {entry.team}
      </td>
      <td className="py-2 text-center text-gray-400 w-8">{entry.played}</td>
      <td className="py-2 text-center text-gray-300 w-8">{entry.won}</td>
      <td className="py-2 text-center text-gray-400 w-8">{entry.drawn}</td>
      <td className="py-2 text-center text-gray-400 w-8">{entry.lost}</td>
      <td className={cn("py-2 text-center font-bold w-10 pr-3", entry.isCurrentTeam ? "text-[#a5d6a7]" : "text-white")}>
        {entry.points}
      </td>
    </tr>
  );
}

export function MatchSection({ upcoming, results, table }: MatchSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#1b5e20]">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <SectionHeading
            label="Spielbetrieb"
            title="Spiele & Tabelle"
            subtitle="Landesliga Nord – Saison 2024/25"
            light
          />
        </FadeIn>

        <StaggerContainer stagger={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming matches */}
          <StaggerItem>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Calendar className="w-4 h-4 text-[#a5d6a7]" />
                  Nächste Spiele
                </div>
                <Link href="/teams/herren" className="text-xs text-[#a5d6a7] hover:text-[#a5e068] transition-colors flex items-center gap-1">
                  Alle <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div>
                {upcoming.map((m) => (
                  <MatchRow key={m.id} match={m} showResult={false} />
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Recent results */}
          <StaggerItem>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Trophy className="w-4 h-4 text-[#a5d6a7]" />
                  Letzte Ergebnisse
                </div>
                <Link href="/berichte" className="text-xs text-[#a5d6a7] hover:text-[#a5e068] transition-colors flex items-center gap-1">
                  Berichte <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div>
                {results.map((m) => (
                  <MatchRow key={m.id} match={m} showResult />
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* League table */}
          <StaggerItem>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Trophy className="w-4 h-4 text-[#a5d6a7]" />
                  Tabelle
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-gray-500 border-b border-white/10">
                      <th className="pb-2 pl-3 w-8">#</th>
                      <th className="pb-2">Team</th>
                      <th className="pb-2 text-center w-8">Sp</th>
                      <th className="pb-2 text-center w-8">S</th>
                      <th className="pb-2 text-center w-8">U</th>
                      <th className="pb-2 text-center w-8">N</th>
                      <th className="pb-2 text-center w-10 pr-3">Pkt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.slice(0, 8).map((entry) => (
                      <TableRow key={entry.position} entry={entry} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
