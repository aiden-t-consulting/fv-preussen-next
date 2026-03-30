import type { FuPaMatch, FuPaTableEntry } from "@/types";

// FuPa club identifier for FV Preussen Eberswalde
const FUPA_TEAM_SLUG = process.env.FUPA_TEAM_SLUG ?? "fv-preussen-eberswalde";
const FUPA_BASE_URL = "https://api.fupa.net/v1";

async function fupaFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${FUPA_BASE_URL}${path}`, {
      next: { revalidate: 300 }, // revalidate every 5 minutes
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function getUpcomingMatches(count = 5): Promise<FuPaMatch[]> {
  const data = await fupaFetch<{ data: FuPaMatch[] }>(
    `/teams/${FUPA_TEAM_SLUG}/matches?status=scheduled&limit=${count}`
  );
  return data?.data ?? getMockUpcomingMatches();
}

export async function getRecentResults(count = 5): Promise<FuPaMatch[]> {
  const data = await fupaFetch<{ data: FuPaMatch[] }>(
    `/teams/${FUPA_TEAM_SLUG}/matches?status=finished&limit=${count}`
  );
  return data?.data ?? getMockRecentResults();
}

export async function getLeagueTable(): Promise<FuPaTableEntry[]> {
  const data = await fupaFetch<{ data: FuPaTableEntry[] }>(
    `/teams/${FUPA_TEAM_SLUG}/table`
  );
  return data?.data ?? getMockLeagueTable();
}

export async function getNextMatch(): Promise<FuPaMatch | null> {
  const matches = await getUpcomingMatches(1);
  return matches[0] ?? null;
}

// ─── Mock data (used as fallback when FuPa API is unavailable) ───────────────

function getMockUpcomingMatches(): FuPaMatch[] {
  return [
    {
      id: "1",
      homeTeam: "FV Preussen Eberswalde",
      awayTeam: "FC Energie Cottbus II",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      time: "15:00",
      venue: "Stadion Pfefferwerk",
      competition: "Landesliga Nord",
      status: "scheduled",
    },
    {
      id: "2",
      homeTeam: "SV Tasmania Berlin",
      awayTeam: "FV Preussen Eberswalde",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      time: "14:00",
      venue: "Sportanlage Mariendorf",
      competition: "Landesliga Nord",
      status: "scheduled",
    },
    {
      id: "3",
      homeTeam: "FV Preussen Eberswalde",
      awayTeam: "BSC Marzahn",
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      time: "15:00",
      venue: "Stadion Pfefferwerk",
      competition: "Landesliga Nord",
      status: "scheduled",
    },
  ];
}

function getMockRecentResults(): FuPaMatch[] {
  return [
    {
      id: "r1",
      homeTeam: "FV Preussen Eberswalde",
      awayTeam: "Berliner SC",
      homeScore: 3,
      awayScore: 1,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      competition: "Landesliga Nord",
      status: "finished",
    },
    {
      id: "r2",
      homeTeam: "SV Babelsberg 03",
      awayTeam: "FV Preussen Eberswalde",
      homeScore: 0,
      awayScore: 2,
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      competition: "Landesliga Nord",
      status: "finished",
    },
  ];
}

function getMockLeagueTable(): FuPaTableEntry[] {
  return [
    { position: 1, team: "FC Energie Cottbus II", played: 20, won: 14, drawn: 3, lost: 3, goalsFor: 48, goalsAgainst: 22, goalDifference: 26, points: 45 },
    { position: 2, team: "SV Tasmania Berlin", played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 41, goalsAgainst: 21, goalDifference: 20, points: 43 },
    { position: 3, team: "FV Preussen Eberswalde", played: 20, won: 12, drawn: 2, lost: 6, goalsFor: 38, goalsAgainst: 28, goalDifference: 10, points: 38, isCurrentTeam: true },
    { position: 4, team: "Berliner SC", played: 20, won: 10, drawn: 5, lost: 5, goalsFor: 34, goalsAgainst: 27, goalDifference: 7, points: 35 },
    { position: 5, team: "BSC Marzahn", played: 20, won: 9, drawn: 4, lost: 7, goalsFor: 32, goalsAgainst: 29, goalDifference: 3, points: 31 },
    { position: 6, team: "SV Babelsberg 03", played: 20, won: 8, drawn: 4, lost: 8, goalsFor: 28, goalsAgainst: 31, goalDifference: -3, points: 28 },
    { position: 7, team: "BFC Preussen", played: 20, won: 7, drawn: 5, lost: 8, goalsFor: 25, goalsAgainst: 33, goalDifference: -8, points: 26 },
    { position: 8, team: "Hertha BSC II", played: 20, won: 6, drawn: 4, lost: 10, goalsFor: 24, goalsAgainst: 36, goalDifference: -12, points: 22 },
  ];
}
