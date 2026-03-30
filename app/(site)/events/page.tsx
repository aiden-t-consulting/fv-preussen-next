import type { Metadata } from "next";
import { Calendar, MapPin, Clock } from "lucide-react";
import { getAllEvents } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import type { Event } from "@/types";

export const metadata: Metadata = {
  title: "Veranstaltungen | FV Preussen Eberswalde",
  description: "Alle Termine und Veranstaltungen des FV Preussen Eberswalde.",
};

export const revalidate = 300;

const CAT_COLOR: Record<string, string> = {
  heimspiel: "bg-emerald-500/20 text-emerald-700 border-emerald-200",
  auswaertsspiel: "bg-blue-500/20 text-blue-700 border-blue-200",
  training: "bg-orange-500/20 text-orange-700 border-orange-200",
  veranstaltung: "bg-purple-500/20 text-purple-700 border-purple-200",
  sonstiges: "bg-gray-100 text-gray-600 border-gray-200",
};
const CAT_LABEL: Record<string, string> = {
  heimspiel: "Heimspiel",
  auswaertsspiel: "Auswärtsspiel",
  training: "Training",
  veranstaltung: "Veranstaltung",
  sonstiges: "Sonstiges",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EventCard({ event }: { event: Event }) {
  const isPast = new Date(event.date) < new Date();
  const coverUrl = event.coverImage ? urlFor(event.coverImage).width(800).url() : null;

  return (
    <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${isPast ? "opacity-60" : ""}`}>
      {coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={coverUrl} alt={event.coverImage?.alt ?? event.title} className="h-44 w-full object-cover" />
      )}
      <div className="p-5">
        {/* Category + past badge */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${CAT_COLOR[event.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
            {CAT_LABEL[event.category] ?? event.category}
          </span>
          {isPast && (
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-400">
              Vergangen
            </span>
          )}
        </div>

        <h2 className="mb-3 text-lg font-bold leading-snug text-gray-900 [font-family:var(--font-club)]">
          {event.title}
        </h2>

        <div className="space-y-1.5 text-[13px] text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-[#039139]" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 shrink-0 text-[#039139]" />
            <span>
              {formatTime(event.date)}
              {event.endDate && ` – ${formatTime(event.endDate)}`} Uhr
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#039139]" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {event.description && (
          <p className="mt-3 text-[13px] leading-relaxed text-gray-600 line-clamp-3">
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const events = await getAllEvents();
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now).slice(0, 12);

  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      {/* Hero */}
      <div className="bg-[#1b3a1f] py-14 text-center">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4caf50]">
          Termine
        </p>
        <h1 className="text-4xl font-bold text-white [font-family:var(--font-club)]">
          Veranstaltungen
        </h1>
        <p className="mt-2 text-sm text-white/60">Aktuelle Termine des FV Preussen Eberswalde</p>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 py-12">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Kommende Veranstaltungen ({upcoming.length})
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </section>
        )}

        {upcoming.length === 0 && (
          <div className="mb-14 rounded-2xl border border-dashed border-gray-300 py-16 text-center">
            <Calendar className="mx-auto mb-3 h-8 w-8 text-gray-300" />
            <p className="text-sm text-gray-400">Aktuell keine bevorstehenden Veranstaltungen</p>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <section>
            <h2 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Vergangene Veranstaltungen
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
