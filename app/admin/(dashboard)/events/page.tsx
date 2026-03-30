import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Calendar, Pencil } from "lucide-react";
import { sanityClient } from "@/lib/sanity/client";
import { isWriteConfigured } from "@/lib/admin/sanity-write";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Veranstaltungen" };
export const dynamic = "force-dynamic";

const CAT_COLOR: Record<string, string> = {
  heimspiel: "bg-emerald-500/20 text-emerald-300",
  auswaertsspiel: "bg-blue-500/20 text-blue-300",
  training: "bg-orange-500/20 text-orange-300",
  veranstaltung: "bg-purple-500/20 text-purple-300",
  sonstiges: "bg-gray-500/20 text-gray-300",
};
const CAT_LABEL: Record<string, string> = {
  heimspiel: "Heimspiel",
  auswaertsspiel: "Auswärtsspiel",
  training: "Training",
  veranstaltung: "Veranstaltung",
  sonstiges: "Sonstiges",
};

type EventRow = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  endDate?: string;
  location?: string;
};

async function getEvents(): Promise<EventRow[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "your-project-id") return [];
  try {
    return await sanityClient.fetch(
      `*[_type == "event"] | order(date asc) {
        _id, title, "slug": slug.current, category, date, endDate, location
      }`
    );
  } catch {
    return [];
  }
}

function EventTable({ rows }: { rows: EventRow[] }) {
  if (rows.length === 0) return null;
  return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-600">Titel</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-600">Kategorie</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-600">Datum</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-gray-600">Ort</th>
              <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-gray-600">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((ev, i) => (
              <tr key={ev._id} className={`transition-colors hover:bg-white/[0.02] ${i < rows.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
                <td className="px-5 py-3">
                  <p className="max-w-xs truncate text-[13px] font-medium text-white">{ev.title}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${CAT_COLOR[ev.category] ?? "bg-gray-500/20 text-gray-300"}`}>
                    {CAT_LABEL[ev.category] ?? ev.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-[12px] tabular-nums text-gray-400">
                  {new Date(ev.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  {" "}
                  {new Date(ev.date).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                </td>
                <td className="px-4 py-3 text-[12px] text-gray-400 max-w-[140px] truncate">{ev.location ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/events/${encodeURIComponent(ev._id)}/edit`}
                      className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[11px] text-gray-400 transition-all hover:border-[#2e7d32]/50 hover:text-[#4caf50]"
                    >
                      <Pencil className="h-3 w-3" /> Bearbeiten
                    </Link>
                    <DeleteButton apiPath="/api/admin/events" id={ev._id} title={ev.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default async function EventsPage() {
  const [events, writeOk] = await Promise.all([getEvents(), Promise.resolve(isWriteConfigured())]);
  const now = new Date();

  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Veranstaltungen</h1>
          <p className="mt-0.5 text-sm text-gray-500">{events.length} Einträge</p>
        </div>
        {writeOk && (
          <Link href="/admin/events/new" className="flex items-center gap-2 rounded-lg bg-[#2e7d32] px-4 py-2 text-sm font-bold text-white hover:bg-[#1b5e20]">
            <Plus className="h-4 w-4" /> Neue Veranstaltung
          </Link>
        )}
        {!writeOk && (
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            SANITY_WRITE_TOKEN fehlt
          </span>
        )}
      </div>

      {/* Upcoming */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] overflow-hidden">
        <div className="border-b border-white/[0.06] px-5 py-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Kommende ({upcoming.length})
          </p>
        </div>
        {upcoming.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10">
            <Calendar className="h-7 w-7 text-gray-700" />
            <p className="text-sm text-gray-500">Keine kommenden Veranstaltungen</p>
            {writeOk && (
              <Link href="/admin/events/new" className="mt-1 rounded-lg bg-[#2e7d32] px-4 py-2 text-sm font-bold text-white hover:bg-[#1b5e20]">
                Erste erstellen
              </Link>
            )}
          </div>
        ) : (
          <EventTable rows={upcoming} />
        )}
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] overflow-hidden">
          <div className="border-b border-white/[0.06] px-5 py-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Vergangen ({past.length})
            </p>
          </div>
          <EventTable rows={past} />
        </div>
      )}
    </div>
  );
}
