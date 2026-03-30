import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;       // positive = up, negative = down, 0/undefined = neutral
  sub?: string;
  accent?: boolean;
}

export function StatCard({ label, value, icon: Icon, trend, sub, accent }: StatCardProps) {
  const TrendIcon =
    trend === undefined || trend === 0
      ? Minus
      : trend > 0
      ? TrendingUp
      : TrendingDown;

  const trendColor =
    trend === undefined || trend === 0
      ? "text-gray-500"
      : trend > 0
      ? "text-emerald-400"
      : "text-red-400";

  return (
    <div
      className={`relative flex flex-col gap-4 overflow-hidden rounded-xl border p-5 ${
        accent
          ? "border-[#2e7d32]/40 bg-[#1b5e20]/15"
          : "border-white/[0.08] bg-[#1a1a1a]"
      }`}
    >
      {/* Icon */}
      <div className="flex items-start justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            accent ? "bg-[#2e7d32]/30" : "bg-white/[0.06]"
          }`}
        >
          <Icon className={`h-4.5 w-4.5 ${accent ? "text-[#4caf50]" : "text-gray-400"}`} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-[11px] font-semibold ${trendColor}`}>
            <TrendIcon className="h-3 w-3" />
            {trend !== 0 && <span>{Math.abs(trend)}%</span>}
          </div>
        )}
      </div>

      {/* Value */}
      <div>
        <p
          className={`text-3xl font-bold tabular-nums leading-none ${
            accent ? "text-[#4caf50]" : "text-white"
          }`}
          style={{ fontFamily: "var(--font-club, 'Oswald', sans-serif)" }}
        >
          {typeof value === "number" ? value.toLocaleString("de-DE") : value}
        </p>
        <p className="mt-1.5 text-[12px] text-gray-400">{label}</p>
        {sub && <p className="mt-0.5 text-[10px] text-gray-600">{sub}</p>}
      </div>
    </div>
  );
}
