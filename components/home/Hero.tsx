"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { FuPaMatch } from "@/types";
import { formatShortDate } from "@/lib/utils";

const slides = [
  {
    id: 1,
    player: "/images/slider/img-01.png",
    title: "FV PREUSSEN",
    titleSpan: "EBERSWALDE",
    subtitle: "Landesliga Nord 2024/25",
    cta1: { label: "Aktuelle News", href: "/aktuelles" },
    cta2: { label: "Alle Teams", href: "/teams" },
  },
  {
    id: 2,
    player: "/images/slider/img-02.png",
    title: "Tradition &",
    titleSpan: "Leidenschaft",
    subtitle: "Seit 1919 im Barnim",
    cta1: { label: "Vereinsgeschichte", href: "/verein/geschichte" },
    cta2: { label: "Mitglied werden", href: "/kontakt" },
  },
  {
    id: 3,
    player: "/images/slider/img-03.jpg",
    title: "Nachwuchs",
    titleSpan: "Förderung",
    subtitle: "DFB-Stützpunkt Eberswalde",
    cta1: { label: "Unsere Teams", href: "/teams" },
    cta2: { label: "Probetraining", href: "/kontakt" },
  },
];

interface HeroProps {
  nextMatch?: FuPaMatch | null;
}

export function Hero({ nextMatch }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 300);
  }, [transitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-[#111] min-h-[85vh] lg:min-h-[90vh] flex items-center">
      {/* Background texture pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat bg-center"
        style={{ backgroundImage: "url('/bg-pattern.png')" }}
        aria-hidden="true"
      />

      {/* Dark gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"
        aria-hidden="true"
      />

      {/* Green accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#039139]" aria-hidden="true" />

      {/* Slide content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Text side */}
          <div
            className={cn(
              "transition-all duration-300",
              transitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            )}
          >
            {/* Top label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#039139]" />
              <span className="text-[#039139] text-xs font-bold uppercase tracking-[0.3em]">
                {slide.subtitle}
              </span>
            </div>

            {/* Main headline — classic all-caps style */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-2 uppercase">
              {slide.title}
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#039139] leading-none mb-10 uppercase">
              {slide.titleSpan}
            </h1>

            {/* CTA buttons — classic bordered style */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href={slide.cta1.href}
                className="relative inline-flex items-center px-8 py-3 text-sm font-bold uppercase tracking-widest text-white border-2 border-[#039139] overflow-hidden group transition-all duration-300 hover:text-white"
              >
                <span className="absolute inset-0 bg-[#039139] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative">{slide.cta1.label}</span>
              </Link>
              <Link
                href={slide.cta2.href}
                className="relative inline-flex items-center px-8 py-3 text-sm font-bold uppercase tracking-widest text-white border-2 border-white/40 overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative">{slide.cta2.label}</span>
              </Link>
            </div>

            {/* Next match ticker */}
            {nextMatch && (
              <div className="border border-[#039139]/40 bg-white/5 backdrop-blur-sm inline-flex items-center gap-4 px-5 py-3">
                <span className="text-[#039139] text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                  Nächstes Spiel
                </span>
                <div className="h-4 w-px bg-white/20" />
                <span className="text-white text-sm font-semibold">
                  {nextMatch.homeTeam} <span className="text-[#039139]">vs</span> {nextMatch.awayTeam}
                </span>
                <span className="text-gray-400 text-sm whitespace-nowrap">
                  {formatShortDate(nextMatch.date)}
                  {nextMatch.time && ` · ${nextMatch.time}`}
                </span>
              </div>
            )}
          </div>

          {/* Floating player image */}
          <div
            className={cn(
              "hidden lg:flex items-end justify-center relative h-[480px]",
              "transition-all duration-300",
              transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            )}
          >
            <Image
              src={slide.player}
              alt="FV Preussen Eberswalde Spieler"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
              sizes="50vw"
            />
          </div>
        </div>
      </div>

      {/* Slide controls — classic NEXT/PREV style */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col">
        <button
          onClick={prev}
          className="group flex flex-col items-center justify-center w-14 py-4 bg-[#1a1a1a] border border-[#039139]/30 hover:bg-[#039139] transition-colors duration-200"
          aria-label="Vorheriger Slide"
        >
          <span className="text-[#039139] group-hover:text-white text-[10px] font-bold uppercase tracking-wider writing-mode-vertical rotate-180 transition-colors">
            prev
          </span>
          <span className="text-[#039139] group-hover:text-white text-lg transition-colors mt-1">‹</span>
        </button>
        <button
          onClick={next}
          className="group flex flex-col items-center justify-center w-14 py-4 bg-[#039139] hover:bg-[#026b29] transition-colors duration-200 border border-[#039139]"
          aria-label="Nächster Slide"
        >
          <span className="text-white text-[10px] font-bold uppercase tracking-wider writing-mode-vertical">
            next
          </span>
          <span className="text-white text-lg mt-1">›</span>
        </button>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "transition-all duration-300",
              i === current
                ? "w-8 h-2 bg-[#039139]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            )}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
    </section>
  );
}
