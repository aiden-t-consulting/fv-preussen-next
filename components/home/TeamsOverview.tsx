import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import type { Team } from "@/types";

type GroupKey = "maenner" | "nachwuchs" | "senioren";

const GROUP_LABELS: Record<GroupKey, string> = {
  maenner: "Männerbereich",
  nachwuchs: "Nachwuchs",
  senioren: "Senioren",
};

const GROUP_ORDER: GroupKey[] = ["maenner", "nachwuchs", "senioren"];

function getGroup(slug: string): GroupKey {
  if (slug.includes("ue50") || slug.includes("ü50") || slug.includes("u50")) {
    return "senioren";
  }
  if (/u\d/.test(slug)) return "nachwuchs";
  return "maenner";
}

const FALLBACK_TEAMS: Array<{
  name: string;
  slug: string;
  division: string;
  group: GroupKey;
}> = [
  { name: "Männer", slug: "herren", division: "Landesliga Nord", group: "maenner" },
  { name: "Männer II", slug: "herren-ii", division: "Kreisliga A Barnim", group: "maenner" },
  { name: "U19", slug: "u19", division: "Landesliga Staffel 1", group: "nachwuchs" },
  { name: "U17", slug: "u17", division: "Kreisliga B Barnim", group: "nachwuchs" },
  { name: "U15", slug: "u15", division: "Kreisklasse", group: "nachwuchs" },
  { name: "U13", slug: "u13", division: "Kreisklasse", group: "nachwuchs" },
  { name: "U11", slug: "u11", division: "Spielbetrieb", group: "nachwuchs" },
  { name: "U9", slug: "u9", division: "Spielbetrieb", group: "nachwuchs" },
  { name: "U7", slug: "u7", division: "Spielbetrieb", group: "nachwuchs" },
  { name: "Ü50", slug: "ue50", division: "Seniorenliga", group: "senioren" },
];

interface DisplayTeam {
  name: string;
  slug: string;
  division?: string;
  badge?: Team["badge"];
  group: GroupKey;
}

function TeamCard({ team }: { team: DisplayTeam }) {
  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group flex flex-col overflow-hidden rounded-[20px] border border-white/8 bg-[#252331] p-6 transition-all duration-200 hover:border-[#039139]/40 hover:bg-[#2a2938]"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#039139]/15">
        {team.badge ? (
          <Image
            src={urlFor(team.badge).width(48).height(48).url()}
            alt={team.badge.alt ?? team.name}
            width={48}
            height={48}
            className="h-10 w-auto object-contain"
          />
        ) : (
          <span className="text-xs font-bold text-[#039139]">FVP</span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-white [font-family:var(--font-club)] group-hover:text-[#039139] transition-colors">
          {team.name}
        </h3>
        {team.division && (
          <p className="mt-1 text-xs text-gray-500">{team.division}</p>
        )}
      </div>
      <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#039139]">
        Zum Team
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function TeamsOverview({ teams }: { teams: Team[] }) {
  const displayTeams: DisplayTeam[] =
    teams.length > 0
      ? teams.map((t) => ({
          name: t.name,
          slug: t.slug.current,
          division: t.division,
          badge: t.badge,
          group: getGroup(t.slug.current),
        }))
      : FALLBACK_TEAMS;

  const grouped = GROUP_ORDER.reduce<Record<GroupKey, DisplayTeam[]>>(
    (acc, key) => {
      acc[key] = displayTeams.filter((t) => t.group === key);
      return acc;
    },
    { maenner: [], nachwuchs: [], senioren: [] }
  );

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#039139]">
              Von der U7 bis zur Ü50
            </p>
            <h2 className="text-3xl font-bold text-gray-900 [font-family:var(--font-club)] lg:text-4xl">
              Unsere Mannschaften
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Nachwuchs, Aktivenbereich und Senioren — Fußball für jeden.
            </p>
          </div>
          <Link
            href="/teams"
            className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[#039139] hover:underline"
          >
            Alle Mannschaften →
          </Link>
        </div>

        {/* Groups */}
        <div className="space-y-12">
          {GROUP_ORDER.map((groupKey) => {
            const groupTeams = grouped[groupKey];
            if (groupTeams.length === 0) return null;
            return (
              <div key={groupKey}>
                <h3 className="mb-5 border-b border-gray-100 pb-2 text-sm font-bold uppercase tracking-widest text-gray-400">
                  {GROUP_LABELS[groupKey]}
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {groupTeams.map((team) => (
                    <TeamCard key={team.slug} team={team} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
