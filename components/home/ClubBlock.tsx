"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/lib/hooks/useInView";

const STATS = [
  { value: 1909, suffix: "", label: "Gegründet", fixed: true },
  { value: 600, suffix: "+", label: "Mitglieder", fixed: false },
  { value: 16, suffix: "", label: "Mannschaften", fixed: false },
  { value: 100, suffix: "+", label: "Jahre", fixed: false },
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

function StatItem({
  value,
  suffix,
  label,
  fixed,
  animate,
}: (typeof STATS)[0] & { animate: boolean }) {
  const count = useCountUp(value, 2000, animate && !fixed);
  const display = fixed ? value : animate ? count : "—";
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-5xl font-bold text-white [font-family:var(--font-club)] lg:text-6xl">
        {display}
        {suffix}
      </div>
      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </div>
    </div>
  );
}

export function ClubBlock() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { threshold: 0.2 });

  return (
    <section ref={ref} className="relative bg-[#111111] py-20 lg:py-28 overflow-hidden">
      {/* Stadium background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/legacy/stadion/stadionheft-18-19.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4">
        {/* Stats row */}
        <div className="mb-16 grid grid-cols-2 gap-10 sm:grid-cols-4">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} animate={visible} />
          ))}
        </div>

        {/* Text block + CTAs */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left heading */}
          <div>
            <h2 className="text-3xl font-bold text-white [font-family:var(--font-club)] lg:text-4xl">
              Tradition mit Perspektive
            </h2>
          </div>

          {/* Right body + buttons */}
          <div>
            <p className="mb-8 text-sm leading-relaxed text-gray-300">
              Seit Generationen steht FV Preussen Eberswalde für Fußball, Nachwuchsarbeit und
              Vereinsleben im Barnim. Von den Bambini bis zur Ü50 bieten wir jedem einen
              Platz auf dem Platz — regional verwurzelt, sportlich ambitioniert und auf die
              Zukunft ausgerichtet. Das Westendstadion ist dabei Heimat, Treffpunkt und Symbol
              für über 100 Jahre Vereinsgeschichte.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center rounded-full bg-[#2e7d32] px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1b5e20]"
              >
                Mitglied werden
              </Link>
              <Link
                href="/verein"
                className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
