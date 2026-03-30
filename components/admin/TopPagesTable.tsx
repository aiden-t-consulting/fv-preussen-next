import type { TopPage } from "@/lib/admin/vercel-analytics";

interface TopPagesTableProps {
  pages: TopPage[];
}

export function TopPagesTable({ pages }: TopPagesTableProps) {
  const max = Math.max(...pages.map((p) => p.views), 1);

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
        Top Seiten
      </p>
      <div className="space-y-3">
        {pages.map((page, i) => {
          const pct = Math.round((page.views / max) * 100);
          return (
            <div key={page.path} className="group flex flex-col gap-1">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="w-4 shrink-0 text-[11px] text-gray-600">{i + 1}</span>
                  <span
                    className="truncate text-[12px] font-medium text-gray-300"
                    title={page.path}
                  >
                    {page.path}
                  </span>
                </div>
                <span className="shrink-0 tabular-nums text-[12px] font-semibold text-white">
                  {page.views.toLocaleString("de-DE")}
                </span>
              </div>
              <div className="ml-6 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-[#2e7d32] transition-all group-hover:bg-[#4caf50]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
        {pages.length === 0 && (
          <p className="py-4 text-center text-sm text-gray-600">Keine Daten verfügbar</p>
        )}
      </div>
    </div>
  );
}
