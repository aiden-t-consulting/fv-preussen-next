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
  const us = isHome(match)
    ? (match.homeScore ?? 0)
    : (match.awayScore ?? 0);
  const them = isHome(match)
    ? (match.awayScore ?? 0)
    : (match.homeScore ?? 0);
  if (us > them) return { label: "SIEG", cls: "bg-emerald-500 text-white" };
  if (us < them) return { label: "NIEDERLAGE", cls: "bg-red-500 text-white" };
  return { label: "UNENTSCHIEDEN", cls: "bg-gray-500 text-white" };
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

// ── ClubBadge ────────────────────────────────────────────────────────────────

function ClubBadge({
  label,
  featured = false,
}: {
  label: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold transition-transform group-hover:scale-105 ${
        featured
          ? "border-2 border-[#4caf50]/60 bg-[#2e7d32]/30 text-[#4caf50] shadow-[0_0_20px_rgba(76,175,80,0.3)]"
          : "border border-white/20 bg-white/10 text-white/60"
      }`}
    >
      {label}
    </div>
  );
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
            <span className="mb-3 px-1 text-xl font-bold text-[#2e7d32]">:</span>
          )}
          <div className="flex flex-col items-center">
            <span className="min-w-[2.5rem] text-center text-3xl font-bold tabular-nums text-white">
              {mounted ? pad(v) : "--"}
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-gray-500">
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
    <section className="relative overflow-hidden bg-[#0d1a0e]">
      {/* top accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#1b5e20] via-[#4caf50] to-[#1b5e20]" />

      <div className="mx-auto max-w-[1280px] px-4 py-10 lg:py-14">
        {/* section header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-5 w-1 rounded-full bg-[#4caf50]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4caf50]">
              Saison 2024/25
            </span>
          </div>
          <Link
            href="/berichte"
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/60 transition-colors hover:border-[#4caf50]/60 hover:text-[#4caf50]"
          >
            Spielplan
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* ── LETZTES ERGEBNIS ───────────────────────────────────── */}
          <div className="group flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.04] p-6 transition-colors hover:border-white/15">
            <div className="flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-[#4caf50]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4caf50]">
                Letztes Ergebnis
              </span>
            </div>

            {lastResult ? (
              <>
                {/* competition */}
                <p className="text-[10px] uppercase tracking-wider text-gray-500">
                  {lastResult.competition}
                </p>

                {/* teams + score */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-1 flex-col items-center gap-2">
                    <ClubBadge label="FVP" />
                    <span className="text-[9px] text-center leading-tight text-gray-400">
                      FV Preussen
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-4xl font-bold tabular-nums text-white">
                      {lastResult.homeScore}:{lastResult.awayScore}
                    </span>
                    {resultMeta && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold ${resultMeta.cls}`}
                      >
                        {resultMeta.label}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-2">
                    <ClubBadge label={getOpponent(lastResult).charAt(0)} />
                    <span className="line-clamp-2 text-center text-[9px] leading-tight text-gray-400">
                      {getOpponent(lastResult)}
                    </span>
                  </div>
                </div>

                {/* date */}
                <p className="text-[10px] text-gray-600">
                  {new Date(lastResult.date).toLocaleDateString("de-DE", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </p>
              </>
            ) : (
              <p className="flex-1 py-8 text-center text-sm text-gray-500">
                Noch kein Ergebnis
              </p>
            )}

            <Link
              href="/berichte"
              className="mt-auto text-[10px] font-semibold uppercase tracking-wider text-[#4caf50] hover:underline"
            >
              Alle Ergebnisse →
            </Link>
          </div>

          {/* ── NÄCHSTES SPIEL (featured) ──────────────────────────── */}
          <div className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border-2 border-[#2e7d32] bg-gradient-to-br from-[#1b5e20]/30 via-[#0d1a0e] to-[#0d1a0e] p-6 shadow-[0_0_50px_-10px_rgba(46,125,50,0.5)]">
            {/* subtle inner glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(76,175,80,0.08),transparent_70%)]" />

            {/* header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#4caf50]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4caf50]">
                  Nächstes Spiel
                </span>
              </div>
              {nextMatch && (
                <span className="rounded-full border border-[#2e7d32]/60 bg-[#2e7d32]/25 px-2.5 py-0.5 text-[9px] font-bold text-[#a5d6a7]">
                  {isHome(nextMatch) ? "HEIM" : "AUSWÄRTS"}
                </span>
              )}
            </div>

            {nextMatch ? (
              <>
                {/* countdown */}
                <CountdownDisplay diff={diff} mounted={mounted} />

                {/* teams */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-1 flex-col items-center gap-2">
                    <ClubBadge label="FVP" featured />
                    <span className="text-center text-[9px] text-gray-300">
                      FV Preussen
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-base font-bold text-white/25">VS</span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-600">
                      {nextMatch.competition}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-2">
                    <ClubBadge label={getOpponent(nextMatch).charAt(0)} />
                    <span className="line-clamp-2 text-center text-[9px] leading-tight text-gray-300">
                      {getOpponent(nextMatch)}
                    </span>
                  </div>
                </div>

                {/* date/time pill */}
                <div className="flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/5 px-4 py-3">
                  <Calendar className="h-3.5 w-3.5 text-[#4caf50]" />
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
              <p className="flex-1 py-8 text-center text-sm text-gray-500">
                Keine Spiele geplant
              </p>
            )}

            <Link
              href="/berichte"
              className="mt-auto text-center text-[10px] font-semibold uppercase tracking-wider text-[#4caf50] hover:underline"
            >
              Zur Spielübersicht →
            </Link>
          </div>

          {/* ── TABELLENPLATZ ──────────────────────────────────────── */}
          <div className="group flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.04] p-6 transition-colors hover:border-white/15">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-3.5 w-3.5 text-[#4caf50]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4caf50]">
                Tabellenplatz
              </span>
            </div>

            {tableEntry ? (
              <>
                {/* position */}
                <div className="flex items-baseline gap-1 leading-none">
                  <span className="text-[64px] font-bold tabular-nums text-white">
                    {tableEntry.position}
                  </span>
                  <span className="pb-2 text-3xl font-light text-white/20">.</span>
                  <span className="pb-2 text-sm text-gray-500">Platz</span>
                </div>

                {/* stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Punkte", value: String(tableEntry.points), accent: true },
                    { label: "Spiele", value: String(tableEntry.played), accent: false },
                    {
                      label: "Tore",
                      value: `${tableEntry.goalsFor}:${tableEntry.goalsAgainst}`,
                      accent: false,
                    },
                  ].map(({ label, value, accent }) => (
                    <div
                      key={label}
                      className={`rounded-xl border p-3 text-center ${
                        accent
                          ? "border-[#2e7d32]/40 bg-[#2e7d32]/15"
                          : "border-white/8 bg-white/5"
                      }`}
                    >
                      <div
                        className={`text-lg font-bold leading-none ${
                          accent ? "text-[#4caf50]" : "text-white"
                        }`}
                      >
                        {value}
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-wider text-gray-500">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* W/D/L bar */}
                <div>
                  <div className="flex h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="bg-emerald-500"
                      style={{ width: `${wonPct}%` }}
                    />
                    <div
                      className="bg-gray-500"
                      style={{ width: `${drawnPct}%` }}
                    />
                    <div
                      className="bg-red-500"
                      style={{ width: `${lostPct}%` }}
                    />
                  </div>
                  <div className="mt-2 flex gap-4 text-[9px]">
                    <span className="text-emerald-400">
                      <span className="font-bold">{tableEntry.won}</span> S
                    </span>
                    <span className="text-gray-400">
                      <span className="font-bold">{tableEntry.drawn}</span> U
                    </span>
                    <span className="text-red-400">
                      <span className="font-bold">{tableEntry.lost}</span> N
                    </span>
                    <span className="ml-auto text-gray-600">
                      {tableEntry.goalDifference > 0 ? "+" : ""}
                      {tableEntry.goalDifference} TD
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="flex-1 py-8 text-center text-sm text-gray-500">
                Keine Tabellendaten
              </p>
            )}

            <Link
              href="/berichte"
              className="mt-auto text-[10px] font-semibold uppercase tracking-wider text-[#4caf50] hover:underline"
            >
              Zur Tabelle →
            </Link>
          </div>
        </div>
      </div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none h-8 bg-gradient-to-b from-[#0d1a0e] to-transparent" />
    </section>
  );
}
