"use client";

import Link from "next/link";
import { ExternalLink, RefreshCw, Mail, Database } from "lucide-react";
import { useState } from "react";

export function QuickActions() {
  const [revalidating, setRevalidating] = useState(false);
  const [revalidated, setRevalidated] = useState(false);

  async function handleRevalidate() {
    setRevalidating(true);
    try {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: "", path: "/" }),
      });
      setRevalidated(true);
      setTimeout(() => setRevalidated(false), 3000);
    } finally {
      setRevalidating(false);
    }
  }

  const actions = [
    {
      label: "Website besuchen",
      sub: "fvpreussen-eberswalde.de",
      icon: ExternalLink,
      href: "https://fvpreussen-eberswalde.de",
      external: true,
      color: "text-gray-300",
    },
    {
      label: "Sanity Studio",
      sub: "Inhalte bearbeiten",
      icon: Database,
      href: "https://fvpreussen.sanity.studio",
      external: true,
      color: "text-blue-400",
    },
    {
      label: "Kontakt-E-Mails",
      sub: "info@fvpreussen-eberswalde.de",
      icon: Mail,
      href: "mailto:info@fvpreussen-eberswalde.de",
      external: false,
      color: "text-amber-400",
    },
  ] as const;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
        Schnellzugriff
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {actions.map(({ label, sub, icon: Icon, href, external, color }) => (
          <Link
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 transition-all hover:border-white/10 hover:bg-white/[0.06]"
          >
            <Icon className={`h-4 w-4 shrink-0 ${color}`} />
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-gray-200">{label}</p>
              <p className="truncate text-[10px] text-gray-600">{sub}</p>
            </div>
          </Link>
        ))}

        {/* Revalidate cache button */}
        <button
          onClick={handleRevalidate}
          disabled={revalidating}
          className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 transition-all hover:border-white/10 hover:bg-white/[0.06] disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 shrink-0 text-emerald-400 ${revalidating ? "animate-spin" : ""}`}
          />
          <div className="min-w-0 text-left">
            <p className="text-[12px] font-semibold text-gray-200">
              {revalidated ? "Cache geleert ✓" : "Cache leeren"}
            </p>
            <p className="text-[10px] text-gray-600">ISR-Cache neu laden</p>
          </div>
        </button>
      </div>
    </div>
  );
}
