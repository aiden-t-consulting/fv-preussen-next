import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Article, FuPaMatch } from "@/types";
import { formatDate } from "@/lib/utils";

type TagColor = "green" | "navy" | "gray";

const TAG_COLORS: Record<TagColor, string> = {
  green: "bg-[#039139]/10 text-[#039139]",
  navy: "bg-[#1a1a2e]/10 text-[#1a1a2e]",
  gray: "bg-gray-100 text-gray-600",
};

function RailCard({
  tag,
  tagColor,
  headline,
  meta,
  cta,
  href,
}: {
  tag: string;
  tagColor: TagColor;
  headline: string;
  meta: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-[#039139]/30 hover:shadow-md"
    >
      <span
        className={cn(
          "self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
          TAG_COLORS[tagColor]
        )}
      >
        {tag}
      </span>
      <h3 className="text-sm font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#039139] transition-colors [font-family:var(--font-club)]">
        {headline}
      </h3>
      <p className="text-xs text-gray-500">{meta}</p>
      <span className="mt-auto text-[11px] font-semibold uppercase tracking-wider text-[#039139]">
        {cta} →
      </span>
    </Link>
  );
}

function isPreussen(name: string) {
  return (
    name.toLowerCase().includes("preussen") ||
    name.toLowerCase().includes("eberswalde")
  );
}

export function HeroEditorialRail({
  lastArticle,
  nextMatch,
}: {
  lastArticle?: Article | null;
  nextMatch?: FuPaMatch | null;
}) {
  // Rückblick — last article or fallback
  const rueckblickHeadline =
    lastArticle?.title ?? "Starker Auftritt beim letzten Heimspiel";
  const rueckblickMeta = lastArticle
    ? formatDate(lastArticle.publishedAt)
    : "Spielbericht · Landesliga Nord";

  // Demnächst — next match or fallback event
  const homeIsUs = nextMatch ? isPreussen(nextMatch.homeTeam) : true;
  const opponent = nextMatch
    ? homeIsUs
      ? nextMatch.awayTeam
      : nextMatch.homeTeam
    : "Nächster Spieltag";
  const demnachstHeadline = nextMatch
    ? `${homeIsUs ? "Heimspiel" : "Auswärtsspiel"} gegen ${opponent}`
    : "Nächstes Heimspiel — alle Infos";
  const demnachstMeta = nextMatch
    ? new Date(nextMatch.date).toLocaleDateString("de-DE", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }) + (nextMatch.time ? ` · ${nextMatch.time} Uhr` : "")
    : "Termin folgt — im Spielcenter";

  return (
    <div className="relative z-10 mx-auto max-w-[1280px] -translate-y-8 px-4 lg:-translate-y-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <RailCard
          tag="Rückblick"
          tagColor="green"
          headline={rueckblickHeadline}
          meta={rueckblickMeta}
          cta="Mehr lesen"
          href={
            lastArticle
              ? `/aktuelles/${lastArticle.slug.current}`
              : "/aktuelles"
          }
        />
        <RailCard
          tag="Demnächst"
          tagColor="navy"
          headline={demnachstHeadline}
          meta={demnachstMeta}
          cta="Termin ansehen"
          href="/berichte"
        />
        <RailCard
          tag="Verein"
          tagColor="gray"
          headline="Mitglied werden — jetzt Aufnahmeantrag stellen"
          meta="Alle Altersklassen · Aktive & Fördermitglieder"
          cta="Mehr erfahren"
          href="/verein/dokumente"
        />
      </div>
    </div>
  );
}
