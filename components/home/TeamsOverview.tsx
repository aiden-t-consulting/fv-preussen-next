import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import type { Team } from "@/types";

const MAENNER_TEAMS = [
  { name: "1. Männer", slug: "herren", division: "Landesliga Nord", label: "Herren" },
  { name: "2. Männer", slug: "herren-ii", division: "Kreisliga A Barnim", label: "Reserve" },
  { name: "Männer Ü50", slug: "ue50", division: "Seniorenliga", label: "Senioren" },
];

const NACHWUCHS_TEAMS = [
  { name: "U19", slug: "u19", division: "Landesliga Staffel 1" },
  { name: "U17", slug: "u17", division: "Kreisliga B" },
  { name: "U15", slug: "u15", division: "Kreisklasse" },
  { name: "U13", slug: "u13", division: "Kreisklasse" },
  { name: "U11", slug: "u11", division: "Spielbetrieb" },
  { name: "U9", slug: "u9", division: "Spielbetrieb" },
  { name: "U7", slug: "u7", division: "Spielbetrieb" },
];

interface DisplayTeam {
  name: string;
  slug: string;
  division?: string;
  label?: string;
  badge?: Team["badge"];
}

// ── Large card for Männer ─────────────────────────────────────────────────────

function MaennerCard({ team }: { team: DisplayTeam }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* card header — green gradient */}
      <div className="relative flex h-44 flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#1b5e20] to-[#2e7d32]">
        {/* subtle pattern */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "12px 12px",
          }}
        />
        {/* badge */}
        {team.badge ? (
          <Image
            src={urlFor(team.badge).width(80).height(80).url()}
            alt={team.badge.alt ?? team.name}
            width={80}
            height={80}
            className="relative z-10 h-20 w-auto drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-white/15 text-xl font-bold text-white transition-transform duration-300 group-hover:scale-110 [font-family:var(--font-club)]">
            FVP
          </div>
        )}
        {/* season badge */}
        <span className="relative z-10 rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/90">
          {team.label ?? "Team"}
        </span>
      </div>

      {/* card body */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-[#2e7d32] [font-family:var(--font-club)]">
          {team.name}
        </h3>
        {team.division && (
          <p className="text-sm text-gray-400">{team.division}</p>
        )}
        <div className="mt-auto flex items-center gap-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-[#2e7d32] transition-all duration-200 group-hover:gap-2">
          Zum Team
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#2e7d32] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

// ── Compact card for Nachwuchs ────────────────────────────────────────────────

function NachwuchsCard({ team }: { team: DisplayTeam }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:border-[#2e7d32]/40 hover:shadow-md"
    >
      {/* age badge */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f8f1] text-base font-bold text-[#2e7d32] transition-colors duration-200 group-hover:bg-[#2e7d32] group-hover:text-white [font-family:var(--font-club)]">
        {team.name}
      </div>
      {team.division && (
        <p className="text-[10px] leading-tight text-gray-400">{team.division}</p>
      )}
    </Link>
  );
}

// ── main export ───────────────────────────────────────────────────────────────

export function TeamsOverview({ teams }: { teams: Team[] }) {
  let maenner: DisplayTeam[] = MAENNER_TEAMS;
  let nachwuchs: DisplayTeam[] = NACHWUCHS_TEAMS;

  if (teams.length > 0) {
    const isNachwuchs = (slug: string) => /^u\d/.test(slug);
    const isUe50 = (slug: string) =>
      slug.includes("ue50") || slug.includes("ü50") || slug.includes("u50");

    const sanityMaenner = teams
      .filter((t) => !isNachwuchs(t.slug.current) && !isUe50(t.slug.current))
      .map((t) => ({ name: t.name, slug: t.slug.current, division: t.division, badge: t.badge }));
    const sanityUe50 = teams
      .filter((t) => isUe50(t.slug.current))
      .map((t) => ({ name: t.name, slug: t.slug.current, division: t.division, badge: t.badge }));
    const sanityNachwuchs = teams
      .filter((t) => isNachwuchs(t.slug.current))
      .map((t) => ({ name: t.name, slug: t.slug.current, division: t.division, badge: t.badge }));

    if (sanityMaenner.length > 0 || sanityUe50.length > 0)
      maenner = [...sanityMaenner, ...sanityUe50];
    if (sanityNachwuchs.length > 0) nachwuchs = sanityNachwuchs;
  }

  return (
    <section className="bg-[#f8f7f5] py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4">

        {/* Section header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2e7d32]">
              Unsere Mannschaften
            </p>
            <h2 className="text-3xl font-bold text-gray-900 [font-family:var(--font-club)] lg:text-4xl">
              Alle Teams
            </h2>
          </div>
          <Link
            href="/teams"
            className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-[#2e7d32]/40 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#2e7d32] transition-all hover:bg-[#2e7d32] hover:text-white sm:mt-0"
          >
            Alle Mannschaften
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* ── Männer ── */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-full bg-[#2e7d32] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Herren
            </span>
            <div className="flex-1 border-t border-gray-200" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {maenner.map((team) => (
              <MaennerCard key={team.slug} team={team} />
            ))}
          </div>
        </div>

        {/* ── Nachwuchs ── */}
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-full border border-[#2e7d32] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2e7d32]">
              Nachwuchs & Jugend
            </span>
            <div className="flex-1 border-t border-gray-200" />
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {nachwuchs.map((team) => (
              <NachwuchsCard key={team.slug} team={team} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
