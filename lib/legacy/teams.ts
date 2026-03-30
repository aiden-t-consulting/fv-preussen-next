import type { Team } from "@/types";

export type LegacyTeam = Partial<Team> & {
  photo?: string;
  source?: string;
  legacyNote?: string;
};

// Legacy fallback teams sourced from the old FV Preussen website.
export const LEGACY_TEAMS: LegacyTeam[] = [
  {
    _id: "legacy-1-herren",
    name: "1. Manner",
    slug: { current: "herren" },
    division: "Grossfeld",
    coach: "N.N.",
    photo: "/images/legacy/teams/1-mannschaft.jpg",
    source: "https://fvpreussen-eberswalde.de/grossfeld/",
    legacyNote: "Teamfoto aus dem Bereich Grossfeld der Bestandsseite.",
  },
  {
    _id: "legacy-2-herren",
    name: "2. Manner",
    slug: { current: "herren-ii" },
    division: "Grossfeld",
    coach: "N.N.",
    photo: "/images/legacy/teams/2-mannschaft.jpg",
    source: "https://fvpreussen-eberswalde.de/grossfeld/",
    legacyNote: "Teamfoto aus dem Bereich Grossfeld der Bestandsseite.",
  },
  {
    _id: "legacy-u19",
    name: "A-Junioren (U19)",
    slug: { current: "u19" },
    division: "Nachwuchs",
    coach: "N.N.",
  },
  {
    _id: "legacy-u17",
    name: "B-Junioren (U17)",
    slug: { current: "u17" },
    division: "Nachwuchs",
    coach: "N.N.",
  },
  {
    _id: "legacy-u15",
    name: "C-Junioren (U15)",
    slug: { current: "u15" },
    division: "Nachwuchs",
    coach: "N.N.",
  },
  {
    _id: "legacy-u13",
    name: "D-Junioren (U13)",
    slug: { current: "u13" },
    division: "Nachwuchs",
    coach: "N.N.",
  },
  {
    _id: "legacy-u11",
    name: "E-Junioren (U11)",
    slug: { current: "u11" },
    division: "Nachwuchs",
    coach: "N.N.",
  },
  {
    _id: "legacy-u9",
    name: "F-Junioren (U9)",
    slug: { current: "u9" },
    division: "Nachwuchs",
    coach: "N.N.",
  },
  {
    _id: "legacy-u7",
    name: "G-Junioren (U7)",
    slug: { current: "u7" },
    division: "Nachwuchs",
    coach: "N.N.",
  },
  {
    _id: "legacy-ue35",
    name: "U35",
    slug: { current: "u35" },
    division: "Altherren",
    coach: "N.N.",
  },
  {
    _id: "legacy-ue45",
    name: "U45",
    slug: { current: "u45" },
    division: "Altherren",
    coach: "N.N.",
  },
  {
    _id: "legacy-ue50",
    name: "U50",
    slug: { current: "u50" },
    division: "Altherren",
    coach: "N.N.",
  },
];

export function getLegacyTeamBySlug(slug: string): LegacyTeam | undefined {
  return LEGACY_TEAMS.find((team) => team.slug?.current === slug);
}

