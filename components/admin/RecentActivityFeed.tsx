import { FileText, Users, Handshake, User } from "lucide-react";
import type { RecentItem } from "@/lib/admin/sanity-stats";

const TYPE_META = {
  article: { icon: FileText, label: "Artikel", color: "text-blue-400 bg-blue-400/10" },
  team: { icon: Users, label: "Team", color: "text-emerald-400 bg-emerald-400/10" },
  sponsor: { icon: Handshake, label: "Sponsor", color: "text-amber-400 bg-amber-400/10" },
  player: { icon: User, label: "Spieler", color: "text-purple-400 bg-purple-400/10" },
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (mins < 1) return "gerade eben";
  if (mins < 60) return `vor ${mins} Min.`;
  if (hours < 24) return `vor ${hours} Std.`;
  if (days < 30) return `vor ${days} Tag${days > 1 ? "en" : ""}`;
  return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
}

export function RecentActivityFeed({ items }: { items: RecentItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          Letzte Aktivität
        </p>
        <p className="py-6 text-center text-sm text-gray-600">
          Noch keine Aktivität — Sanity verbinden
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
        Letzte Aktivität
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const meta = TYPE_META[item._type] ?? TYPE_META.article;
          const Icon = meta.icon;
          return (
            <div
              key={item._id}
              className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/[0.03]"
            >
              <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${meta.color}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-gray-200">{item.title}</p>
                <p className="text-[10px] text-gray-600">
                  {meta.label}
                  {item.category ? ` · ${item.category}` : ""} · {relativeTime(item._updatedAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
