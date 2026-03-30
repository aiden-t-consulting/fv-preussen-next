"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Trophy, BarChart3, ArrowRight } from "lucide-react";
import type { FuPaMatch, FuPaTableEntry } from "@/types";

// ── helpers ──────────────────────────────────────────────────────────────────

function isPreussen(name: string) {
  return (
    name.toLowerCase().includes("preussen") ||
    name.toLowerCase().includes("eberswalde")
  );
}

function getOpponent(match: FuPaMatch) {
  return isPreussen(match.homeTeam) ? match.awayTeam : match.homeTeam;
}

function isHome(match: FuPaMatch) {
  return isPreussen(match.homeTeam);
}

function getResultMeta(match: FuPaMatch) {
  if (match.status !== "finished") return null;
  const us = isHome(match) ? (match.homeScore ?? 0) : (match.awayScore ?? 0);
  const them = isHome(match) ? (match.awayScore ?? 0) : (match.homeScore ?? 0);
  if (us > them) return { label: "SIEG", cls: "bg-emerald-500 text-white" };
  if (us < them) return { label: "NIEDERLAGE", cls: "bg-red-500 text-white" };
  return { label: "UNENTSCHIEDEN", cls: "bg-gray-400 text-white" };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function useCountdown(iso: string | null) {
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!iso) return;
    const tick = () => {
      const delta = Math.max(0, new Date(iso).getTime() - Date.now());
      setDiff({
        d: Math.floor(delta / 86_400_000),
        h: Math.floor((delta % 86_400_000) / 3_600_000),
        m: Math.floor((delta % 3_600_000) / 60_000),
        s: Math.floor((delta % 60_000) / 1_000),
      });
    };
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [iso]);

  return { diff, mounted };
}

// ── CountdownDisplay ─────────────────────────────────────────────────────────

function CountdownDisplay({
  diff,
  mounted,
}: {
  diff: { d: number; h: number; m: number; s: number };
  mounted: boolean;
}) {
  const units = [
    { v: diff.d, label: "Tage" },
    { v: diff.h, label: "Std" },
    { v: diff.m, label: "Min" },
    { v: diff.s, label: "Sek" },
  ];

  return (
    <div className="flex items-end justify-center gap-1">
      {units.map(({ v, label }, i) => (
        <div key={label} className="flex items-end">
          {i > 0 && (
            <span className="mb-3 px-1 text-xl font-bold text-white/40">:</span>
          )}
          <div className="flex flex-col items-center">
            <span className="min-w-[2.5rem] text-center text-3xl font-bold tabular-nums text-white">
              {mounted ? pad(v) : "--"}
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-white/50">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export function QuickMatchStrip({
  nextMatch,
  lastResult,
  tableEntry,
}: {
  nextMatch: FuPaMatch | null;
  lastResult: FuPaMatch | null;
  tableEntry: FuPaTableEntry | null;
}) {
  const isoTarget =
    nextMatch?.date && nextMatch?.time
      ? `${nextMatch.date}T${nextMatch.time}:00`
      : (nextMatch?.date ?? null);

  const { diff, mounted } = useCountdown(isoTarget);
  const resultMeta = lastResult ? getResultMeta(lastResult) : null;

  const played = tableEntry?.played ?? 0;
  const wonPct = played ? ((tableEntry?.won ?? 0) / played) * 100 : 0;
  const drawnPct = played ? ((tableEntry?.drawn ?? 0) / played) * 100 : 0;
  const lostPct = played ? ((tableEntry?.lost ?? 0) / played) * 100 : 0;

  return (
    <section className="relative overflow-hidden bg-[#dce8dc]">
      {/* top accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#1b5e20] via-[#4caf50] to-[#1b5e20]" />

      <div className="mx-auto max-w-[1280px] px-4 py-10 lg:py-14">
        {/* section header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-5 w-1 rounded-full bg-[#2e7d32]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2e7d32]">
              Saison 2025/26
            </span>
          </div>
          <Link
            href="/berichte"
            className="flex items-center gap-1.5 rounded-full border border-[#2e7d32]/40 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#2e7d32] transition-colors hover:bg-[#2e7d32] hover:text-white"
          >
            Spielplan
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* ── LETZTES ERGEBNIS ─────────────────────────── */}
          <div className="group flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-[#2e7d32]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2e7d32]">
                Letztes Ergebnis
              </span>
            </div>

            {lastResult ? (
              <>
                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                  {lastResult.competition}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2e7d32]/30 bg-[#2e7d32]/10 text-sm font-bold text-[#2e7d32]">
                      FVP
                    </div>
                    <span className="text-center text-[9px] leading-tight text-gray-500">
                      FV Preussen
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-4xl font-bold tabular-nums text-gray-900">
                      {lastResult.homeScore}:{lastResult.awayScore}
                    </span>
                    {resultMeta && (
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold ${resultMeta.cls}`}>
                        {resultMeta.label}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-sm font-bold text-gray-500">
                      {getOpponent(lastResult).charAt(0)}
                    </div>
                    <span className="line-clamp-2 text-center text-[9px] leading-tight text-gray-500">
                      {getOpponent(lastResult)}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400">
                  {new Date(lastResult.date).toLocaleDateString("de-DE", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </p>
              </>
            ) : (
              <p className="flex-1 py-8 text-center text-sm text-gray-400">
                Noch kein Ergebnis
              </p>
            )}

            <Link href="/berichte" className="mt-auto text-[10px] font-semibold uppercase tracking-wider text-[#2e7d32] hover:underline">
              Alle Ergebnisse →
            </Link>
          </div>

          {/* ── NÄCHSTES SPIEL (featured — solid green) ─── */}
          <div className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl bg-[#2e7d32] p-6 shadow-lg shadow-[#2e7d32]/25">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                  Nächstes Spiel
                </span>
              </div>
              {nextMatch && (
                <span className="rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 text-[9px] font-bold text-white">
                  {isHome(nextMatch) ? "HEIM" : "AUSWÄRTS"}
                </span>
              )}
            </div>

            {nextMatch ? (
              <>
                <CountdownDisplay diff={diff} mounted={mounted} />

                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/40 bg-white/20 text-sm font-bold text-white shadow-inner">
                      FVP
                    </div>
                    <span className="text-center text-[9px] text-white/70">FV Preussen</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base font-bold text-white/30">VS</span>
                    <span className="text-[9px] uppercase tracking-wider text-white/40">
                      {nextMatch.competition}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-sm font-bold text-white/60">
                      {getOpponent(nextMatch).charAt(0)}
                    </div>
                    <span className="line-clamp-2 text-center text-[9px] leading-tight text-white/70">
                      {getOpponent(nextMatch)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-3">
                  <Calendar className="h-3.5 w-3.5 text-white/70" />
                  <span className="text-sm font-semibold text-white">
                    {new Date(nextMatch.date).toLocaleDateString("de-DE", {
                      weekday: "short",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                    {nextMatch.time ? ` · ${nextMatch.time} Uhr` : ""}
                  </span>
                </div>
              </>
            ) : (
              <p className="flex-1 py-8 text-center text-sm text-white/50">
                Keine Spiele geplant
              </p>
            )}

            <Link href="/berichte" className="mt-auto text-center text-[10px] font-semibold uppercase tracking-wider text-white/70 hover:text-white hover:underline">
              Zur Spielübersicht →
            </Link>
          </div>

          {/* ── TABELLENPLATZ ────────────────────────────── */}
          <div className="group flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-3.5 w-3.5 text-[#2e7d32]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2e7d32]">
                Tabellenplatz
              </span>
            </div>

            {tableEntry ? (
              <>
                <div className="flex items-baseline gap-1 leading-none">
                  <span className="text-[64px] font-bold tabular-nums text-gray-900">
                    {tableEntry.position}
                  </span>
                  <span className="pb-2 text-3xl font-light text-gray-300">.</span>
                  <span className="pb-2 text-sm text-gray-400">Platz</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Punkte", value: String(tableEntry.points), accent: true },
                    { label: "Spiele", value: String(tableEntry.played), accent: false },
                    { label: "Tore", value: `${tableEntry.goalsFor}:${tableEntry.goalsAgainst}`, accent: false },
                  ].map(({ label, value, accent }) => (
                    <div
                      key={label}
                      className={`rounded-xl border p-3 text-center ${
                        accent ? "border-[#2e7d32]/30 bg-[#f1f8f1]" : "border-gray-100 bg-gray-50"
                      }`}
                    >
                      <div className={`text-lg font-bold leading-none ${accent ? "text-[#2e7d32]" : "text-gray-900"}`}>
                        {value}
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-wider text-gray-400">{label}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className="bg-emerald-500 transition-all" style={{ width: `${wonPct}%` }} />
                    <div className="bg-gray-300 transition-all" style={{ width: `${drawnPct}%` }} />
                    <div className="bg-red-400 transition-all" style={{ width: `${lostPct}%` }} />
                  </div>
                  <div className="mt-2 flex gap-4 text-[9px]">
                    <span className="text-emerald-600"><span className="font-bold">{tableEntry.won}</span> S</span>
                    <span className="text-gray-400"><span className="font-bold">{tableEntry.drawn}</span> U</span>
                    <span className="text-red-400"><span className="font-bold">{tableEntry.lost}</span> N</span>
                    <span className="ml-auto text-gray-400">
                      {tableEntry.goalDifference > 0 ? "+" : ""}{tableEntry.goalDifference} TD
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="flex-1 py-8 text-center text-sm text-gray-400">
                Keine Tabellendaten
              </p>
            )}

            <Link href="/berichte" className="mt-auto text-[10px] font-semibold uppercase tracking-wider text-[#2e7d32] hover:underline">
              Zur Tabelle →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
