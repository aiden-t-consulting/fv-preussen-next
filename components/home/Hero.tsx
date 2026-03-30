"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { cn, formatShortDate } from "@/lib/utils";
import type { FuPaMatch } from "@/types";

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

export function Hero({ nextMatch }: Readonly<HeroProps>) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === current) return;
    const isForward = idx > current || (current === slides.length - 1 && idx === 0);
    setDirection(isForward ? 1 : -1);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
    }, 220);
    setTimeout(() => {
      setTransitioning(false);
    }, 560);
  }, [current, transitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      className="hero-classic relative -mt-16 flex min-h-[92vh] items-center overflow-hidden bg-[#373542] pt-16 lg:-mt-[120px] lg:min-h-screen lg:pt-[120px]"
    >
      <div
        className="hero-pattern-motion absolute inset-0 bg-repeat bg-center opacity-35"
        style={{ backgroundImage: "url('/bg-pattern.png')" }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-[#252331]/60 via-[#373542]/35 to-[#373542]/90"
        aria-hidden="true"
      />
      <div className="hero-vignette absolute inset-0" aria-hidden="true" />

      <div className="absolute inset-x-0 top-0 h-px bg-white/30" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-14 lg:py-16">
        <div className="relative flex min-h-[540px] items-center justify-center lg:min-h-[640px]">
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 mx-auto hidden h-[520px] max-w-[620px] transition-all duration-700 ease-out lg:block",
              transitioning
                ? cn("opacity-0", direction === 1 ? "translate-x-5 translate-y-2" : "-translate-x-5 translate-y-2")
                : "opacity-100 translate-x-0 translate-y-0"
            )}
            aria-hidden="true"
          >
            <Image
              src={slide.player}
              alt=""
              fill
              className="hero-player-float object-contain object-bottom drop-shadow-2xl"
              priority
              sizes="640px"
            />
          </div>

          <div
            className={cn(
              "relative z-10 w-full max-w-[980px] text-center transition-all duration-500 ease-out",
              transitioning
                ? cn("opacity-0", direction === 1 ? "translate-x-4" : "-translate-x-4")
                : "opacity-100 translate-x-0"
            )}
          >
            <h1 className="hero-title-glow mb-1 text-[clamp(2.6rem,8.8vw,8.8rem)] font-bold uppercase leading-[0.86] tracking-[0.01em] text-[#039139] [font-family:var(--font-club)] lg:mb-0">
              {slide.title}
            </h1>
            <h1 className="mb-8 text-[clamp(2.9rem,9.2vw,9.3rem)] font-bold uppercase leading-[0.86] tracking-[0.01em] text-white [font-family:var(--font-club)] lg:mb-10">
              {slide.titleSpan}
            </h1>

            <div className="flex flex-col items-center justify-center gap-5 lg:flex-row lg:gap-10">
              <p className="text-3xl font-bold uppercase tracking-[0.03em] text-white [font-family:var(--font-club)] lg:text-[2.9rem] lg:leading-none">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={slide.cta1.href}
                  className="inline-flex min-w-[180px] items-center justify-center border border-[#039139] bg-transparent px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#039139] transition-all duration-300 [font-family:var(--font-club)] hover:bg-[#039139]/20 hover:text-white"
                >
                  {slide.cta1.label}
                </Link>
                <Link
                  href={slide.cta2.href}
                  className="inline-flex min-w-[180px] items-center justify-center border border-[#039139] bg-transparent px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#039139] transition-all duration-300 [font-family:var(--font-club)] hover:bg-[#039139]/20 hover:text-white"
                >
                  {slide.cta2.label}
                </Link>
              </div>
            </div>

            {nextMatch && (
              <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-4 border border-[#039139]/40 bg-black/20 px-5 py-3 backdrop-blur-sm">
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
        </div>
      </div>

      <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <button
          onClick={prev}
          className="group flex flex-col items-center gap-3 text-[#039139] transition-all duration-300 hover:text-white hover:-translate-x-0.5"
          aria-label="Vorheriger Slide"
        >
          <span className="h-14 w-px bg-current/70" aria-hidden="true" />
          <span className="rotate-180 text-[11px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
            prev
          </span>
          <span className="h-14 w-px bg-current/70" aria-hidden="true" />
        </button>
      </div>

      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <button
          onClick={next}
          className="group flex flex-col items-center gap-3 text-[#039139] transition-all duration-300 hover:text-white hover:translate-x-0.5"
          aria-label="Nächster Slide"
        >
          <span className="h-14 w-px bg-current/70" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
            next
          </span>
          <span className="h-14 w-px bg-current/70" aria-hidden="true" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((item, i) => (
          <button
            key={item.id}
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

      <div className="absolute bottom-6 left-4 right-4 z-20 flex items-center justify-between lg:hidden">
        <button
          onClick={prev}
          className="border border-[#039139]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#039139]"
          aria-label="Vorheriger Slide"
        >
          Prev
        </button>
        <button
          onClick={next}
          className="border border-[#039139]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#039139]"
          aria-label="Nächster Slide"
        >
          Next
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#373542] to-transparent" aria-hidden="true" />
    </section>
  );
}
