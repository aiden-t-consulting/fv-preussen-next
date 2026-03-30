import type { Metadata } from "next";
import { Eye, Users, FileText, Handshake, Clock, TrendingUp } from "lucide-react";
import { getAnalyticsSummary } from "@/lib/admin/vercel-analytics";
import { getContentStats } from "@/lib/admin/sanity-stats";
import { StatCard } from "@/components/admin/StatCard";
import { TrafficChart } from "@/components/admin/TrafficChart";
import { TopPagesTable } from "@/components/admin/TopPagesTable";
import { RecentActivityFeed } from "@/components/admin/RecentActivityFeed";
import { QuickActions } from "@/components/admin/QuickActions";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [analytics, content] = await Promise.all([
    getAnalyticsSummary(30),
    getContentStats(),
  ]);

  function fmtDuration(secs: number) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <p className="mt-0.5 text-sm text-gray-500">Übersicht der letzten 30 Tage</p>
        </div>
        {!analytics.isLive && (
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Demo-Daten · Vercel Analytics verbinden
          </span>
        )}
      </div>

      {/* Traffic stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Seitenaufrufe"
          value={analytics.pageViews}
          icon={Eye}
          accent
          sub="Letzte 30 Tage"
        />
        <StatCard
          label="Unique Visitors"
          value={analytics.uniqueVisitors}
          icon={Users}
          sub="Letzte 30 Tage"
        />
        <StatCard
          label="Absprungrate"
          value={`${analytics.bounceRate}%`}
          icon={TrendingUp}
        />
        <StatCard
          label="Ø Sitzungsdauer"
          value={fmtDuration(analytics.avgDuration)}
          icon={Clock}
        />
      </div>

      {/* Traffic chart */}
      <TrafficChart data={analytics.viewsByDay} />

      {/* Bottom 3-column */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TopPagesTable pages={analytics.topPages.slice(0, 8)} />

        <RecentActivityFeed items={content.articles.recent} />

        {/* Content summary */}
        <div className="space-y-3">
          <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Inhalte
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Artikel", value: content.articles.total, icon: FileText, color: "text-blue-400 bg-blue-400/10" },
                { label: "Teams", value: content.teams.total, icon: Users, color: "text-emerald-400 bg-emerald-400/10" },
                { label: "Sponsoren", value: content.sponsors.total, icon: Handshake, color: "text-amber-400 bg-amber-400/10" },
                { label: "Spieler", value: content.players.total, icon: Users, color: "text-purple-400 bg-purple-400/10" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className="flex flex-col gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3"
                >
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md ${color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-lg font-bold tabular-nums text-white">
                      {content.isSanityConfigured ? value : "—"}
                    </p>
                    <p className="text-[10px] text-gray-600">{label}</p>
                  </div>
                </div>
              ))}
            </div>
            {!content.isSanityConfigured && (
              <p className="mt-3 text-[10px] text-gray-600">
                Sanity konfigurieren um Inhalte zu sehen
              </p>
            )}
          </div>

          <QuickActions />
        </div>
      </div>
    </div>
  );
}
