import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import type { Team } from "@/types";

const MAENNER_TEAMS = [
  { name: "1. Männer", slug: "herren", division: "Landesliga Nord" },
  { name: "2. Männer", slug: "herren-ii", division: "Kreisliga A Barnim" },
  { name: "Männer Ü50", slug: "ue50", division: "Seniorenliga" },
];

const NACHWUCHS_TEAMS = [
  { name: "U19 Junioren", slug: "u19", division: "Landesliga Staffel 1" },
  { name: "U17 Junioren", slug: "u17", division: "Kreisliga B Barnim" },
  { name: "U15 Junioren", slug: "u15", division: "Kreisklasse" },
  { name: "U13 Junioren", slug: "u13", division: "Kreisklasse" },
  { name: "U11 Junioren", slug: "u11", division: "Spielbetrieb" },
  { name: "U9 Junioren", slug: "u9", division: "Spielbetrieb" },
  { name: "U7 Junioren", slug: "u7", division: "Spielbetrieb" },
];

interface DisplayTeam {
  name: string;
  slug: string;
  division?: string;
  badge?: Team["badge"];
}

function TeamRow({
  team,
  featured = false,
}: {
  team: DisplayTeam;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className={`group flex items-center gap-4 rounded-xl border px-5 py-4 transition-all duration-200 hover:shadow-md ${
        featured
          ? "border-[#2e7d32]/30 bg-[#f1f8f1] hover:border-[#2e7d32]/60 hover:bg-[#e8f5e9]"
          : "border-gray-100 bg-white hover:border-[#2e7d32]/30"
      }`}
    >
      {/* badge / crest */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
          featured
            ? "border-[#2e7d32]/30 bg-[#2e7d32]/15 text-[#2e7d32]"
            : "border-gray-200 bg-gray-50 text-gray-400"
        }`}
      >
        {team.badge ? (
          <Image
            src={urlFor(team.badge).width(44).height(44).url()}
            alt={team.badge.alt ?? team.name}
            width={44}
            height={44}
            className="h-8 w-auto object-contain"
          />
        ) : (
          <span>FVP</span>
        )}
      </div>

      {/* info */}
      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-bold leading-tight transition-colors ${
            featured
              ? "text-[#1b5e20] group-hover:text-[#2e7d32]"
              : "text-gray-900 group-hover:text-[#2e7d32]"
          }`}
        >
          {team.name}
        </p>
        {team.division && (
          <p className="mt-0.5 truncate text-xs text-gray-400">{team.division}</p>
        )}
      </div>

      <ArrowRight
        className={`h-4 w-4 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 ${
          featured ? "text-[#2e7d32]/60" : "text-gray-300 group-hover:text-[#2e7d32]/60"
        }`}
      />
    </Link>
  );
}

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
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4">

        {/* Section header */}
        <div className="mb-12 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
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
            className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-[#2e7d32]/40 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#2e7d32] transition-all hover:bg-[#2e7d32] hover:text-white sm:mt-0 sm:self-auto"
          >
            Alle Mannschaften
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Männer */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2e7d32]/10">
                <Users className="h-4 w-4 text-[#2e7d32]" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-700">
                Männer
              </h3>
              <div className="flex-1 border-t border-gray-100" />
            </div>
            <div className="flex flex-col gap-2">
              {maenner.map((team, i) => (
                <TeamRow key={team.slug} team={team} featured={i === 0} />
              ))}
            </div>
          </div>

          {/* Nachwuchs */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2e7d32]/10">
                <Users className="h-4 w-4 text-[#2e7d32]" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-700">
                Nachwuchs & Jugend
              </h3>
              <div className="flex-1 border-t border-gray-100" />
            </div>
            <div className="flex flex-col gap-2">
              {nachwuchs.map((team) => (
                <TeamRow key={team.slug} team={team} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
