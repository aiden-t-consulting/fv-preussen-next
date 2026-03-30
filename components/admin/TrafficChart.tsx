import type { DayView } from "@/lib/admin/vercel-analytics";

interface TrafficChartProps {
  data: DayView[];
  label?: string;
}

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

export function TrafficChart({ data, label = "Seitenaufrufe" }: TrafficChartProps) {
  const max = Math.max(...data.map((d) => d.views), 1);
  // show at most 30 bars, evenly sampled
  const visible = data.length > 30 ? data.slice(-30) : data;
  const step = visible.length > 14 ? Math.ceil(visible.length / 7) : 2;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
        {label}
      </p>

      {/* Bars */}
      <div className="flex h-36 items-end gap-[3px]">
        {visible.map((d, i) => {
          const pct = Math.round((d.views / max) * 100);
          const isToday = i === visible.length - 1;
          return (
            <div
              key={d.date}
              className="group relative flex flex-1 flex-col items-center justify-end"
            >
              <div
                className={`w-full rounded-t-sm transition-opacity ${
                  isToday ? "bg-[#4caf50]" : "bg-[#2e7d32]/60 group-hover:bg-[#4caf50]/80"
                }`}
                style={{ height: `${Math.max(pct, 2)}%` }}
              />
              {/* tooltip */}
              <div className="pointer-events-none absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-[10px] text-white group-hover:block">
                {d.views} · {shortDate(d.date)}
              </div>
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex items-center justify-between">
        {visible
          .filter((_, i) => i % step === 0 || i === visible.length - 1)
          .map((d) => (
            <span key={d.date} className="text-[9px] text-gray-600">
              {shortDate(d.date)}
            </span>
          ))}
      </div>
    </div>
  );
}
