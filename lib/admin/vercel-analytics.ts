export interface DayView {
  date: string; // YYYY-MM-DD
  views: number;
}

export interface TopPage {
  path: string;
  views: number;
}

export interface AnalyticsSummary {
  pageViews: number;
  uniqueVisitors: number;
  topPages: TopPage[];
  viewsByDay: DayView[];
  bounceRate: number;   // 0–100
  avgDuration: number;  // seconds
  isLive: boolean;
}

// ── Plausible mock data ───────────────────────────────────────────────────────

function buildMockDays(days: number): DayView[] {
  const result: DayView[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86_400_000);
    result.push({
      date: d.toISOString().slice(0, 10),
      views: Math.floor(80 + Math.random() * 120 + (days - i) * 2),
    });
  }
  return result;
}

const MOCK: AnalyticsSummary = {
  pageViews: 4_312,
  uniqueVisitors: 2_847,
  topPages: [
    { path: "/", views: 1_203 },
    { path: "/aktuelles", views: 876 },
    { path: "/teams", views: 541 },
    { path: "/sponsoren", views: 389 },
    { path: "/berichte", views: 312 },
    { path: "/kontakt", views: 248 },
    { path: "/verein", views: 198 },
    { path: "/fan-shop", views: 145 },
    { path: "/verein/stadion", views: 112 },
    { path: "/verein/vorstand", views: 88 },
  ],
  viewsByDay: buildMockDays(30),
  bounceRate: 42,
  avgDuration: 138,
  isLive: false,
};

// ── Vercel Analytics Data API ─────────────────────────────────────────────────

function vercelBase() {
  return "https://api.vercel.com";
}

function teamParam() {
  return process.env.VERCEL_TEAM_ID ? `&teamId=${process.env.VERCEL_TEAM_ID}` : "";
}

function isConfigured() {
  return !!(process.env.VERCEL_API_TOKEN && process.env.VERCEL_PROJECT_ID);
}

export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  if (!isConfigured()) return { ...MOCK, viewsByDay: buildMockDays(days) };

  const token = process.env.VERCEL_API_TOKEN!;
  const projectId = process.env.VERCEL_PROJECT_ID!;
  const headers = { Authorization: `Bearer ${token}` };

  const to = Date.now();
  const from = to - days * 86_400_000;
  const base = `${vercelBase()}/v1/web/insights`;
  const qp = `projectId=${projectId}&from=${from}&to=${to}&environment=production${teamParam()}`;

  try {
    const [summaryRes, pagesRes] = await Promise.all([
      fetch(`${base}?${qp}`, { headers, next: { revalidate: 300 } }),
      fetch(`${base}/stats/path?${qp}&limit=10`, { headers, next: { revalidate: 300 } }),
    ]);

    if (!summaryRes.ok || !pagesRes.ok) {
      return { ...MOCK, viewsByDay: buildMockDays(days) };
    }

    const summary = await summaryRes.json();
    const pages = await pagesRes.json();

    const topPages: TopPage[] = (pages.data ?? []).map(
      (p: { key: string; total: number }) => ({ path: p.key, views: p.total })
    );

    return {
      pageViews: summary.data?.pageViews ?? 0,
      uniqueVisitors: summary.data?.visitors ?? 0,
      topPages,
      viewsByDay: buildMockDays(days), // day-by-day breakdown requires separate API call
      bounceRate: summary.data?.bounceRate ?? 0,
      avgDuration: summary.data?.duration ?? 0,
      isLive: true,
    };
  } catch {
    return { ...MOCK, viewsByDay: buildMockDays(days) };
  }
}

export function isAnalyticsLive() {
  return isConfigured();
}
