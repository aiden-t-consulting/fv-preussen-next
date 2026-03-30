"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "@/lib/hooks/useInView";

const STATS = [
  { value: 100, suffix: "+", label: "Jahre", description: "Vereinsgeschichte" },
  { value: 10, suffix: "+", label: "Teams", description: "Von der U7 bis zur Ü50" },
  { value: 600, suffix: "+", label: "Mitglieder", description: "Aktiv im Verein" },
  { value: 12, suffix: "+", label: "Titel", description: "Regionale Erfolge" },
];

function useCountUp(target: number, duration: number, enabled: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, enabled]);

  return count;
}

function StatCard({
  value,
  suffix,
  label,
  description,
  animate,
}: (typeof STATS)[0] & { animate: boolean }) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div className="rounded-[20px] bg-[#1c1b2a] p-6">
      <div className="mb-1 text-4xl font-bold text-white lg:text-5xl">
        {animate ? count : "—"}
        {suffix}
      </div>
      <div className="mb-0.5 text-sm font-bold uppercase tracking-widest text-[#039139]">
        {label}
      </div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  );
}

export function ClubBlock() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { threshold: 0.2 });

  return (
    <section ref={ref} className="bg-[#252331] py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Left: narrative */}
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#039139]">
              Motor des Barnim
            </p>
            <h2 className="mb-6 text-3xl font-bold text-white [font-family:var(--font-club)] lg:text-4xl">
              Tradition mit Blick nach vorn
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-400">
              Seit Generationen steht FV Preussen Eberswalde für Fußball, Nachwuchsarbeit und
              Vereinsleben in der Region. Von der Bambini bis zur Ü50 bieten wir jedem einen
              Platz auf dem Platz — regional verwurzelt, sportlich ambitioniert, auf die Zukunft
              ausgerichtet.
            </p>
            <Link
              href="/verein"
              className="inline-flex items-center rounded-full border border-[#039139] px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-[#039139] transition-colors hover:bg-[#039139] hover:text-white"
            >
              Mehr über den Verein
            </Link>
          </div>

          {/* Right: stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} animate={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
