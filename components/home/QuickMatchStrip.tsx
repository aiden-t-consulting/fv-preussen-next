import type { FuPaMatch, FuPaTableEntry } from "@/types";
import Link from "next/link";
import { Calendar, Trophy, BarChart3 } from "lucide-react";

function formatMatchDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isPreussen(name: string) {
  return (
    name.toLowerCase().includes("preussen") ||
    name.toLowerCase().includes("eberswalde")
  );
}

function getOpponent(match: FuPaMatch) {
  return isPreussen(match.homeTeam) ? match.awayTeam : match.homeTeam;
}

function getMatchType(match: FuPaMatch) {
  return isPreussen(match.homeTeam) ? "Heimspiel" : "Auswärtsspiel";
}

export function QuickMatchStrip({
  nextMatch,
  lastResult,
  tableEntry,
}: {
  nextMatch: FuPaMatch | null;
  lastResult: FuPaMatch | null;
  tableEntry: FuPaTableEntry | null;
}) {
  return (
    <section className="bg-[#1c1b2a] py-8 lg:py-10">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Next match */}
          <div className="flex flex-col gap-3 rounded-[20px] bg-[#252331] p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#039139]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#039139]">
                Nächstes Spiel
              </span>
            </div>
            {nextMatch ? (
              <>
                <div className="text-lg font-bold leading-tight text-white">
                  {getOpponent(nextMatch)}
                </div>
                <div className="text-sm text-gray-400">
                  {formatMatchDate(nextMatch.date)}
                  {nextMatch.time ? ` · ${nextMatch.time} Uhr` : ""}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-white/60">{nextMatch.competition}</span>
                  <span className="rounded-full bg-[#039139]/20 px-2 py-0.5 text-[10px] font-semibold text-[#039139]">
                    {getMatchType(nextMatch)}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-sm text-gray-500">Keine Spiele geplant</div>
            )}
            <Link
              href="/berichte"
              className="mt-auto text-[11px] font-semibold uppercase tracking-wider text-[#039139] hover:underline"
            >
              Alle Spiele →
            </Link>
          </div>

          {/* Last result */}
          <div className="flex flex-col gap-3 rounded-[20px] bg-[#252331] p-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-[#039139]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#039139]">
                Letztes Ergebnis
              </span>
            </div>
            {lastResult ? (
              <>
                <div className="text-3xl font-bold tracking-tight text-white">
                  {lastResult.homeScore ?? 0}:{lastResult.awayScore ?? 0}
                </div>
                <div className="text-sm text-gray-400">{getOpponent(lastResult)}</div>
                <div className="text-xs text-white/60">{lastResult.competition}</div>
              </>
            ) : (
              <div className="text-sm text-gray-500">Noch kein Ergebnis</div>
            )}
            <Link
              href="/berichte"
              className="mt-auto text-[11px] font-semibold uppercase tracking-wider text-[#039139] hover:underline"
            >
              Alle Ergebnisse →
            </Link>
          </div>

          {/* Table position */}
          <div className="flex flex-col gap-3 rounded-[20px] bg-[#252331] p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#039139]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#039139]">
                Tabellenplatz
              </span>
            </div>
            {tableEntry ? (
              <>
                <div className="text-3xl font-bold tracking-tight text-white">
                  {tableEntry.position}.
                </div>
                <div className="text-sm text-gray-400">
                  {tableEntry.points} Punkte · {tableEntry.played} Spiele
                </div>
                <div className="text-xs text-white/60">{tableEntry.team}</div>
              </>
            ) : (
              <div className="text-sm text-gray-500">Keine Tabellendaten</div>
            )}
            <Link
              href="/berichte"
              className="mt-auto text-[11px] font-semibold uppercase tracking-wider text-[#039139] hover:underline"
            >
              Zur Tabelle →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
