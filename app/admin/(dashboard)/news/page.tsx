import type { Metadata } from "next";
import Link from "next/link";
import { Plus, FileText, Pencil, ExternalLink } from "lucide-react";
import { sanityClient } from "@/lib/sanity/client";
import { isWriteConfigured } from "@/lib/admin/sanity-write";
import { DeleteArticleButton } from "@/components/admin/DeleteArticleButton";

export const metadata: Metadata = { title: "Beiträge" };
export const dynamic = "force-dynamic";

const CAT_COLOR: Record<string, string> = {
  news: "bg-blue-500/20 text-blue-300",
  bericht: "bg-emerald-500/20 text-emerald-300",
  jugend: "bg-orange-500/20 text-orange-300",
  verein: "bg-purple-500/20 text-purple-300",
};
const CAT_LABEL: Record<string, string> = {
  news: "News",
  bericht: "Spielbericht",
  jugend: "Jugend",
  verein: "Verein",
};

async function getArticles() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "your-project-id") return [];
  try {
    return await sanityClient.fetch<
      { _id: string; title: string; slug: string; category: string; publishedAt: string; author?: string }[]
    >(
      `*[_type == "article"] | order(publishedAt desc) {
        _id, title, "slug": slug.current, category, publishedAt, author
      }`
    );
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const [articles, writeOk] = await Promise.all([getArticles(), Promise.resolve(isWriteConfigured())]);
  const sanityOk = !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Beiträge</h1>
          <p className="mt-0.5 text-sm text-gray-500">{articles.length} Artikel</p>
        </div>
        <div className="flex items-center gap-3">
          {!writeOk && (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              SANITY_WRITE_TOKEN fehlt
            </span>
          )}
          {writeOk && (
            <Link
              href="/admin/news/new"
              className="flex items-center gap-2 rounded-lg bg-[#2e7d32] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1b5e20]"
            >
              <Plus className="h-4 w-4" /> Neuer Artikel
            </Link>
          )}
        </div>
      </div>

      {/* Sanity not configured */}
      {!sanityOk && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 text-sm text-amber-400/80">
          Sanity ist nicht konfiguriert. Setze{" "}
          <code className="rounded bg-black/30 px-1 font-mono text-[11px]">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          in .env.local.
        </div>
      )}

      {/* Write token hint */}
      {sanityOk && !writeOk && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-[12px] text-amber-400/80">
          Erstelle einen <strong>Write-Token</strong> in Sanity (sanity.io → Project → API → Tokens → Add API Token → Editor) und setze{" "}
          <code className="rounded bg-black/30 px-1 font-mono text-[11px]">SANITY_WRITE_TOKEN</code> in .env.local.
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] overflow-hidden">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <FileText className="h-8 w-8 text-gray-700" />
            <p className="text-sm text-gray-500">Keine Artikel vorhanden</p>
            {writeOk && (
              <Link
                href="/admin/news/new"
                className="mt-1 rounded-lg bg-[#2e7d32] px-4 py-2 text-sm font-bold text-white hover:bg-[#1b5e20]"
              >
                Ersten Artikel erstellen
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Titel
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Kategorie
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Datum
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Autor
                  </th>
                  <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, i) => (
                  <tr
                    key={article._id}
                    className={`transition-colors hover:bg-white/[0.02] ${
                      i < articles.length - 1 ? "border-b border-white/[0.04]" : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <p className="max-w-xs truncate text-[13px] font-medium text-white">
                        {article.title}
                      </p>
                      <p className="font-mono text-[10px] text-gray-600">/{article.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          CAT_COLOR[article.category] ?? "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {CAT_LABEL[article.category] ?? article.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] tabular-nums text-gray-400">
                      {new Date(article.publishedAt).toLocaleDateString("de-DE")}
                    </td>
                    <td className="px-4 py-3 text-[12px] text-gray-400">{article.author ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/aktuelles/${article.slug}`}
                          target="_blank"
                          className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-gray-600 hover:text-white"
                        >
                          <ExternalLink className="h-3 w-3" /> Ansehen
                        </Link>
                        <Link
                          href={`/admin/news/${encodeURIComponent(article._id)}/edit`}
                          className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[11px] text-gray-400 transition-all hover:border-[#2e7d32]/50 hover:text-[#4caf50]"
                        >
                          <Pencil className="h-3 w-3" /> Bearbeiten
                        </Link>
                        <DeleteArticleButton id={article._id} title={article.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
