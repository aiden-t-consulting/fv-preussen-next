"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FuPaMatch, FuPaTableEntry } from "@/types";

const TABS = ["Nächste Spiele", "Letzte Spiele", "Tabelle"] as const;
type Tab = (typeof TABS)[number];

function isPreussen(name: string) {
  return (
    name.toLowerCase().includes("preussen") ||
    name.toLowerCase().includes("eberswalde")
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MatchRow({ match }: { match: FuPaMatch }) {
  const homeIsUs = isPreussen(match.homeTeam);
  const resultClass =
    match.status === "finished"
      ? homeIsUs
        ? (match.homeScore ?? 0) > (match.awayScore ?? 0)
          ? "text-[#039139]"
          : (match.homeScore ?? 0) < (match.awayScore ?? 0)
          ? "text-red-400"
          : "text-gray-400"
        : (match.awayScore ?? 0) > (match.homeScore ?? 0)
        ? "text-[#039139]"
        : (match.awayScore ?? 0) < (match.homeScore ?? 0)
        ? "text-red-400"
        : "text-gray-400"
      : "text-gray-400";

  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-gray-900">
          {match.homeTeam} – {match.awayTeam}
        </div>
        <div className="mt-0.5 text-xs text-gray-400">
          {formatDate(match.date)}
          {match.time ? ` · ${match.time} Uhr` : ""}
          {match.competition ? ` · ${match.competition}` : ""}
        </div>
      </div>
      {match.status === "finished" && (
        <div className={cn("ml-4 font-bold tabular-nums", resultClass)}>
          {match.homeScore}:{match.awayScore}
        </div>
      )}
      {match.status === "scheduled" && (
        <div className="ml-4 text-xs font-semibold text-gray-400">
          {match.time ?? "—"}
        </div>
      )}
    </div>
  );
}

function TablePanel({ entries }: { entries: FuPaTableEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400">
            <th className="w-8 py-2 text-left">#</th>
            <th className="py-2 text-left">Verein</th>
            <th className="px-2 py-2 text-right">Sp</th>
            <th className="px-2 py-2 text-right">G</th>
            <th className="px-2 py-2 text-right">U</th>
            <th className="px-2 py-2 text-right">V</th>
            <th className="px-2 py-2 text-right">Tore</th>
            <th className="py-2 text-right">Pkt</th>
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
              <td className="py-2.5 font-mono text-xs text-gray-400">{e.position}</td>
              <td
                className={cn(
                  "py-2.5 font-medium",
                  e.isCurrentTeam ? "text-[#039139]" : "text-gray-800"
                )}
              >
                {e.team}
              </td>
              <td className="px-2 py-2.5 text-right text-gray-500">{e.played}</td>
              <td className="px-2 py-2.5 text-right text-gray-500">{e.won}</td>
              <td className="px-2 py-2.5 text-right text-gray-500">{e.drawn}</td>
              <td className="px-2 py-2.5 text-right text-gray-500">{e.lost}</td>
              <td className="px-2 py-2.5 text-right text-gray-500">
                {e.goalsFor}:{e.goalsAgainst}
              </td>
              <td className="py-2.5 text-right font-bold text-gray-900">{e.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TEAM_FILTERS = ["Alle", "1. Männer", "Nachwuchs"] as const;
type TeamFilter = (typeof TEAM_FILTERS)[number];

export function Spielcenter({
  upcoming,
  results,
  table,
}: {
  upcoming: FuPaMatch[];
  results: FuPaMatch[];
  table: FuPaTableEntry[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Nächste Spiele");
  const [teamFilter, setTeamFilter] = useState<TeamFilter>("Alle");

  return (
    <section className="bg-gray-50 py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Left: intro */}
          <div className="mb-10 shrink-0 lg:mb-0 lg:w-72">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#039139]">
              Offizielle Spielinformationen
            </p>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 [font-family:var(--font-club)] lg:text-4xl">
              Spielcenter
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              Alle wichtigen Spielinformationen auf Basis offizieller Daten — von den
              nächsten Spielen bis zur aktuellen Tabelle.
            </p>
            <Link
              href="https://www.fussball.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#039139] hover:underline"
            >
              Zu FUSSBALL.DE →
            </Link>

            {/* Team filter */}
            <div className="mt-8 flex flex-wrap gap-2">
              {TEAM_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setTeamFilter(f)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                    teamFilter === f
                      ? "border-[#039139] bg-[#039139] text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-[#039139]/50 hover:text-[#039139]"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Right: tabs + content */}
          <div className="min-w-0 flex-1">
            <div className="mb-6 flex gap-1 overflow-x-auto border-b border-gray-200">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "-mb-px shrink-0 border-b-2 px-4 pb-3 text-[12px] font-semibold uppercase tracking-wider transition-colors",
                    activeTab === tab
                      ? "border-[#039139] text-[#039139]"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="rounded-[20px] border border-gray-100 bg-white p-6 shadow-sm">
              {activeTab === "Nächste Spiele" &&
                (upcoming.length > 0 ? (
                  upcoming.slice(0, 5).map((m) => <MatchRow key={m.id} match={m} />)
                ) : (
                  <p className="text-sm text-gray-400">Keine Spiele geplant.</p>
                ))}
              {activeTab === "Letzte Spiele" &&
                (results.length > 0 ? (
                  results.slice(0, 5).map((m) => <MatchRow key={m.id} match={m} />)
                ) : (
                  <p className="text-sm text-gray-400">Keine Ergebnisse vorhanden.</p>
                ))}
              {activeTab === "Tabelle" &&
                (table.length > 0 ? (
                  <TablePanel entries={table} />
                ) : (
                  <p className="text-sm text-gray-400">Keine Tabellendaten verfügbar.</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
