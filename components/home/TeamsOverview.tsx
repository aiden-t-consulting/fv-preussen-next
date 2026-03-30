import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import type { Team } from "@/types";

const MAENNER_TEAMS = [
  { name: "Männer", slug: "herren", division: "Landesliga Nord" },
  { name: "Männer II", slug: "herren-ii", division: "Kreisliga A Barnim" },
  { name: "Männer Ü50", slug: "ue50", division: "Seniorenliga" },
];

const NACHWUCHS_TEAMS = [
  { name: "U19", slug: "u19", division: "Landesliga Staffel 1" },
  { name: "U17", slug: "u17", division: "Kreisliga B Barnim" },
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
  badge?: Team["badge"];
}

function MaennerCard({ team }: { team: DisplayTeam }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-[#2e7d32]/50 hover:bg-white/[0.08]"
    >
      <div className="flex-1">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#2e7d32]/20">
          {team.badge ? (
            <Image
              src={urlFor(team.badge).width(32).height(32).url()}
              alt={team.badge.alt ?? team.name}
              width={32}
              height={32}
              className="h-6 w-auto object-contain"
            />
          ) : (
            <span className="text-[9px] font-bold text-[#a5d6a7]">FVP</span>
          )}
        </div>
        <h3 className="mt-2 font-bold text-white [font-family:var(--font-club)]">{team.name}</h3>
        {team.division && (
          <p className="mt-0.5 text-xs text-gray-400">{team.division}</p>
        )}
      </div>
      <div className="mt-4 text-[11px] font-semibold text-[#a5d6a7] transition-colors group-hover:text-white">
        Zum Team &rarr;
      </div>
    </Link>
  );
}

function NachwuchsItem({ team }: { team: DisplayTeam }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group flex items-center gap-3 py-2.5 transition-colors"
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-[#2e7d32]" />
      <span className="flex-1 font-semibold text-white group-hover:text-[#a5d6a7] transition-colors">
        {team.name}
      </span>
      {team.division && (
        <span className="text-xs text-gray-400">{team.division}</span>
      )}
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

    if (sanityMaenner.length > 0 || sanityUe50.length > 0) {
      maenner = [...sanityMaenner, ...sanityUe50];
    }
    if (sanityNachwuchs.length > 0) {
      nachwuchs = sanityNachwuchs;
    }
  }

  return (
    <section className="bg-[#111111] py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#a5d6a7]">
            Unsere Mannschaften
          </p>
          <h2 className="text-3xl font-bold text-white [font-family:var(--font-club)] lg:text-4xl">
            Alle Teams
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT — Männer */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                M&auml;nner
              </h3>
              <div className="flex-1 border-t border-[#2e7d32]/40" />
            </div>
            <div className="flex flex-col gap-3">
              {maenner.map((team) => (
                <MaennerCard key={team.slug} team={team} />
              ))}
            </div>
          </div>

          {/* RIGHT — Nachwuchs */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Nachwuchs
              </h3>
              <div className="flex-1 border-t border-[#2e7d32]/40" />
            </div>
            <div className="divide-y divide-white/5">
              {nachwuchs.map((team) => (
                <NachwuchsItem key={team.slug} team={team} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 rounded-full border border-[#2e7d32] px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-[#a5d6a7] transition-all duration-200 hover:bg-[#2e7d32] hover:text-white"
          >
            Alle Mannschaften &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
