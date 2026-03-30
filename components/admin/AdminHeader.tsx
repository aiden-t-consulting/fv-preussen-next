import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0a0a0a] px-6">
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4caf50]" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
          Live
        </span>
      </div>
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[11px] font-semibold text-gray-400 transition-colors hover:border-white/20 hover:text-white"
      >
        <ExternalLink className="h-3 w-3" />
        Website
      </Link>
    </header>
  );
}
