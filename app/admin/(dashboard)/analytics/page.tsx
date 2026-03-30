import type { Metadata } from "next";
import { Eye, Users, TrendingUp, Clock, ArrowUp, ArrowDown } from "lucide-react";
import { getAnalyticsSummary } from "@/lib/admin/vercel-analytics";
import { StatCard } from "@/components/admin/StatCard";
import { TrafficChart } from "@/components/admin/TrafficChart";

export const metadata: Metadata = { title: "Traffic & Analytics" };
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ days?: string }>;
}

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const days = Math.min(Math.max(Number(params.days ?? "30"), 7), 90);
  const analytics = await getAnalyticsSummary(days);

  function fmtDuration(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  const maxViews = Math.max(...analytics.topPages.map((p) => p.views), 1);
  const top20 = analytics.topPages.slice(0, 20);

  const PERIOD_OPTIONS = [
    { label: "7 Tage", value: 7 },
    { label: "30 Tage", value: 30 },
    { label: "90 Tage", value: 90 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Traffic & Analytics</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Letzte {days} Tage
            {!analytics.isLive && (
              <span className="ml-2 text-amber-500">· Demo-Daten</span>
            )}
          </p>
        </div>

        {/* Period selector */}
        <div className="flex gap-1 rounded-lg border border-white/[0.08] bg-[#1a1a1a] p-1">
          {PERIOD_OPTIONS.map((opt) => (
            <a
              key={opt.value}
              href={`?days=${opt.value}`}
              className={`rounded-md px-4 py-1.5 text-[12px] font-medium transition-all ${
                days === opt.value
                  ? "bg-[#2e7d32] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {opt.label}
            </a>
          ))}
        </div>

        {!analytics.isLive && (
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Demo-Daten · Vercel Analytics verbinden
          </span>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Seitenaufrufe"
          value={analytics.pageViews.toLocaleString("de-DE")}
          icon={Eye}
          accent
          sub={`Letzte ${days} Tage`}
        />
        <StatCard
          label="Unique Visitors"
          value={analytics.uniqueVisitors.toLocaleString("de-DE")}
          icon={Users}
          sub={`Letzte ${days} Tage`}
        />
        <StatCard
          label="Absprungrate"
          value={`${analytics.bounceRate}%`}
          icon={TrendingUp}
          sub={analytics.bounceRate < 50 ? "Gut" : "Verbesserbar"}
        />
        <StatCard
          label="Ø Sitzungsdauer"
          value={fmtDuration(analytics.avgDuration)}
          icon={Clock}
          sub="Pro Besucher"
        />
      </div>

      {/* Traffic chart — full width, larger */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Tagesverlauf — Seitenaufrufe
          </p>
          <span className="rounded-full bg-[#2e7d32]/20 px-2.5 py-0.5 text-[10px] text-[#4caf50]">
            Letzte {days} Tage
          </span>
        </div>
        <TrafficChart data={analytics.viewsByDay} />
      </div>

      {/* Top pages — full breakdown */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          Top-Seiten (Top {top20.length})
        </p>

        <div className="space-y-2">
          {top20.map((page, i) => {
            const pct = Math.round((page.views / maxViews) * 100);
            const isTop = i === 0;
            return (
              <div key={page.path} className="group">
                <div className="mb-1 flex items-center gap-3">
                  <span
                    className={`w-5 shrink-0 text-center text-[11px] font-bold ${
                      i === 0
                        ? "text-[#4caf50]"
                        : i < 3
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 truncate font-mono text-[12px] text-gray-300">
                    {page.path}
                  </span>
                  <span
                    className={`shrink-0 tabular-nums text-[12px] font-bold ${
                      isTop ? "text-[#4caf50]" : "text-white"
                    }`}
                  >
                    {page.views.toLocaleString("de-DE")}
                  </span>
                  <span className="w-12 shrink-0 text-right text-[11px] text-gray-600">
                    {Math.round((page.views / analytics.pageViews) * 100)}%
                  </span>
                </div>
                <div className="ml-8 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isTop ? "bg-[#4caf50]" : "bg-[#2e7d32]/60"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick insights */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Bounce rate insight */}
        <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Absprungrate
          </p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold tabular-nums text-white">
              {analytics.bounceRate}%
            </span>
            {analytics.bounceRate < 50 ? (
              <span className="mb-1 flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                <ArrowDown className="h-3 w-3" /> Gut
              </span>
            ) : (
              <span className="mb-1 flex items-center gap-1 text-[11px] font-bold text-amber-400">
                <ArrowUp className="h-3 w-3" /> Hoch
              </span>
            )}
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className={`h-full rounded-full ${
                analytics.bounceRate < 50 ? "bg-emerald-500" : "bg-amber-500"
              }`}
              style={{ width: `${analytics.bounceRate}%` }}
            />
          </div>
          <p className="mt-2 text-[10px] text-gray-600">
            Zielwert: unter 50%
          </p>
        </div>

        {/* Session duration insight */}
        <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Ø Sitzungsdauer
          </p>
          <span className="text-3xl font-bold tabular-nums text-white">
            {fmtDuration(analytics.avgDuration)}
          </span>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${Math.min((analytics.avgDuration / 300) * 100, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-[10px] text-gray-600">
            Zielwert: über 2 Minuten
          </p>
        </div>

        {/* Pages per visitor */}
        <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Seiten / Visitor
          </p>
          <span className="text-3xl font-bold tabular-nums text-white">
            {analytics.uniqueVisitors > 0
              ? (analytics.pageViews / analytics.uniqueVisitors).toFixed(1)
              : "—"}
          </span>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full bg-purple-500"
              style={{
                width: `${Math.min(
                  ((analytics.pageViews / Math.max(analytics.uniqueVisitors, 1)) / 5) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <p className="mt-2 text-[10px] text-gray-600">
            Zielwert: über 2,0 Seiten
          </p>
        </div>
      </div>
    </div>
  );
}
