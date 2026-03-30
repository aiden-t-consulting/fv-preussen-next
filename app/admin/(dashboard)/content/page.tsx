import type { Metadata } from "next";
import { FileText, Users, Handshake, Heart, ExternalLink } from "lucide-react";
import { getContentStats } from "@/lib/admin/sanity-stats";

export const metadata: Metadata = { title: "Inhalte" };
export const dynamic = "force-dynamic";

const SANITY_STUDIO_URL = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "https://fvpreussen.sanity.studio";

function CategoryPill({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${color}`}>
      {label}
      <span className="rounded-full bg-black/20 px-1.5 py-px text-[10px] tabular-nums">
        {count}
      </span>
    </span>
  );
}

function SectionHeader({ title, total, icon: Icon, sanityType }: {
  title: string;
  total: number;
  icon: React.ElementType;
  sanityType: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-gray-400" />
        <h2 className="text-[13px] font-bold text-white">{title}</h2>
        <span className="rounded-full bg-white/[0.06] px-2 py-px text-[11px] text-gray-400 tabular-nums">
          {total}
        </span>
      </div>
      <a
        href={`${SANITY_STUDIO_URL}/structure/${sanityType}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-3 py-1.5 text-[11px] text-gray-400 transition-all hover:border-[#2e7d32]/50 hover:text-[#4caf50]"
      >
        In Sanity bearbeiten <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}

export default async function ContentPage() {
  const content = await getContentStats();

  const TIER_META = [
    { key: "hauptsponsor", label: "Exklusivpartner", color: "bg-amber-500/20 text-amber-300" },
    { key: "premiumsponsor", label: "Premium", color: "bg-blue-500/20 text-blue-300" },
    { key: "partner", label: "Top-Partner", color: "bg-purple-500/20 text-purple-300" },
    { key: "foerderer", label: "Förderer", color: "bg-emerald-500/20 text-emerald-300" },
  ] as const;

  const ARTICLE_CATS = [
    { key: "news", label: "News", color: "bg-blue-500/20 text-blue-300" },
    { key: "bericht", label: "Spielbericht", color: "bg-emerald-500/20 text-emerald-300" },
    { key: "jugend", label: "Jugend", color: "bg-orange-500/20 text-orange-300" },
    { key: "verein", label: "Verein", color: "bg-purple-500/20 text-purple-300" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Inhalte</h1>
          <p className="mt-0.5 text-sm text-gray-500">Übersicht aller CMS-Inhalte</p>
        </div>
        {!content.isSanityConfigured && (
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Sanity nicht verbunden
          </span>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Artikel", value: content.articles.total, icon: FileText, color: "text-blue-400 bg-blue-400/10" },
          { label: "Teams", value: content.teams.total, icon: Users, color: "text-emerald-400 bg-emerald-400/10" },
          { label: "Sponsoren", value: content.sponsors.total, icon: Handshake, color: "text-amber-400 bg-amber-400/10" },
          { label: "Spieler", value: content.players.total, icon: Users, color: "text-purple-400 bg-purple-400/10" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-4"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-lg font-bold tabular-nums text-white">
                {content.isSanityConfigured ? value : "—"}
              </p>
              <p className="text-[11px] text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Articles section */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
        <SectionHeader
          title="Artikel"
          total={content.articles.total}
          icon={FileText}
          sanityType="article"
        />

        {/* Category breakdown */}
        {content.isSanityConfigured && (
          <div className="mt-4 flex flex-wrap gap-2">
            {ARTICLE_CATS.map(({ key, label, color }) => (
              <CategoryPill
                key={key}
                label={label}
                count={content.articles[key]}
                color={color}
              />
            ))}
          </div>
        )}

        {/* Recent articles */}
        <div className="mt-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            Zuletzt aktualisiert
          </p>
          {content.isSanityConfigured && content.articles.recent.filter(i => i._type === "article").length > 0 ? (
            <div className="space-y-1">
              {content.articles.recent
                .filter((item) => item._type === "article")
                .slice(0, 5)
                .map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/[0.03]"
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0 text-blue-400" />
                    <span className="flex-1 truncate text-[12px] text-gray-300">{item.title}</span>
                    {item.category && (
                      <span className="shrink-0 rounded bg-white/[0.06] px-1.5 py-px text-[10px] text-gray-500">
                        {item.category}
                      </span>
                    )}
                    <span className="shrink-0 text-[10px] text-gray-600">
                      {new Date(item._updatedAt).toLocaleDateString("de-DE")}
                    </span>
                    {item.slug && (
                      <a
                        href={`/aktuelles/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-gray-600 hover:text-[#4caf50]"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-[12px] text-gray-600">
              {content.isSanityConfigured ? "Keine Artikel vorhanden" : "Sanity konfigurieren um Artikel zu sehen"}
            </p>
          )}
        </div>
      </div>

      {/* Teams section */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
        <SectionHeader
          title="Teams"
          total={content.teams.total}
          icon={Users}
          sanityType="team"
        />

        <div className="mt-4">
          {content.isSanityConfigured && content.articles.recent.filter(i => i._type === "team").length > 0 ? (
            <div className="space-y-1">
              {content.articles.recent
                .filter((item) => item._type === "team")
                .map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/[0.03]"
                  >
                    <Users className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span className="flex-1 truncate text-[12px] text-gray-300">{item.title}</span>
                    <span className="shrink-0 text-[10px] text-gray-600">
                      {new Date(item._updatedAt).toLocaleDateString("de-DE")}
                    </span>
                    {item.slug && (
                      <a
                        href={`/teams/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-gray-600 hover:text-[#4caf50]"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <p className="mt-3 text-[12px] text-gray-600">
              {content.isSanityConfigured ? "Keine Teams vorhanden" : "Sanity konfigurieren um Teams zu sehen"}
            </p>
          )}
        </div>
      </div>

      {/* Sponsors section */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
        <SectionHeader
          title="Sponsoren"
          total={content.sponsors.total}
          icon={Handshake}
          sanityType="sponsor"
        />

        {content.isSanityConfigured && (
          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {TIER_META.map(({ key, label, color }) => (
              <div
                key={key}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center"
              >
                <p className="text-lg font-bold tabular-nums text-white">
                  {content.sponsors[key]}
                </p>
                <span className={`mt-1 inline-block rounded-full px-2 py-px text-[10px] font-semibold ${color}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {!content.isSanityConfigured && (
          <p className="mt-3 text-[12px] text-gray-600">Sanity konfigurieren um Sponsoren zu sehen</p>
        )}
      </div>

      {/* Players section */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
        <SectionHeader
          title="Spieler"
          total={content.players.total}
          icon={Users}
          sanityType="player"
        />

        <div className="mt-4">
          {content.isSanityConfigured && content.articles.recent.filter(i => i._type === "player").length > 0 ? (
            <div className="space-y-1">
              {content.articles.recent
                .filter((item) => item._type === "player")
                .map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/[0.03]"
                  >
                    <Users className="h-3.5 w-3.5 shrink-0 text-purple-400" />
                    <span className="flex-1 truncate text-[12px] text-gray-300">{item.title}</span>
                    <span className="shrink-0 text-[10px] text-gray-600">
                      {new Date(item._updatedAt).toLocaleDateString("de-DE")}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="mt-3 text-[12px] text-gray-600">
              {content.isSanityConfigured ? "Keine Spieler vorhanden" : "Sanity konfigurieren um Spieler zu sehen"}
            </p>
          )}
        </div>
      </div>

      {/* Sanity setup hint */}
      {!content.isSanityConfigured && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <Heart className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <div>
              <p className="text-[13px] font-semibold text-amber-300">Sanity CMS verbinden</p>
              <p className="mt-1 text-[12px] text-amber-400/70">
                Setze <code className="rounded bg-black/30 px-1 font-mono text-[11px]">NEXT_PUBLIC_SANITY_PROJECT_ID</code>,{" "}
                <code className="rounded bg-black/30 px-1 font-mono text-[11px]">NEXT_PUBLIC_SANITY_DATASET</code> und{" "}
                <code className="rounded bg-black/30 px-1 font-mono text-[11px]">SANITY_API_TOKEN</code> in{" "}
                <code className="rounded bg-black/30 px-1 font-mono text-[11px]">.env.local</code> um Inhalte zu verwalten.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
