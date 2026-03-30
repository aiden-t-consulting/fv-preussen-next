"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import type { FuPaMatch } from "@/types";

interface Slide {
  id: number;
  player: string;
  eyebrow: string;
  isDynamic?: true;
  title?: string;
  subtitle?: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
}

const SLIDES: Slide[] = [
  {
    id: 1,
    player: "/images/slider/img-01.png",
    eyebrow: "Nächstes Spiel",
    isDynamic: true,
    cta1: { label: "Zum Spielplan", href: "/berichte" },
    cta2: { label: "Alle Spiele", href: "/berichte" },
  },
  {
    id: 2,
    player: "/images/slider/img-02.png",
    eyebrow: "Verein & Nachwuchs",
    title: "Tradition. Nachwuchs.\nLeidenschaft.",
    subtitle:
      "Mehr als Fußball — regional verwurzelt, sportlich ambitioniert, auf die Zukunft ausgerichtet.",
    cta1: { label: "Unsere Teams", href: "/teams" },
    cta2: { label: "Mitglied werden", href: "/verein/dokumente" },
  },
  {
    id: 3,
    player: "/images/slider/img-03.jpg",
    eyebrow: "Aktuelles",
    title: "Aktuelles aus\ndem Verein",
    subtitle:
      "Spielberichte, Nachwuchsnews und alles rund um den Motor des Barnim.",
    cta1: { label: "Mehr erfahren", href: "/aktuelles" },
    cta2: { label: "Alle News", href: "/aktuelles" },
  },
];

function isPreussen(name: string) {
  return (
    name.toLowerCase().includes("preussen") ||
    name.toLowerCase().includes("eberswalde")
  );
}

function formatMatchDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface HeroProps {
  nextMatch?: FuPaMatch | null;
}

export function Hero({ nextMatch }: Readonly<HeroProps>) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning || idx === current) return;
      setDirection(
        idx > current || (current === SLIDES.length - 1 && idx === 0) ? 1 : -1
      );
      setTransitioning(true);
      setTimeout(() => setCurrent(idx), 220);
      setTimeout(() => setTransitioning(false), 560);
    },
    [current, transitioning]
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo]
  );
  const prev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length),
    [current, goTo]
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, paused]);

  const slide = SLIDES[current];

  // Resolve dynamic slide 1 content
  const isDynamic = slide.isDynamic && nextMatch;
  const homeIsUs = nextMatch ? isPreussen(nextMatch.homeTeam) : true;
  const opponent = nextMatch
    ? homeIsUs
      ? nextMatch.awayTeam
      : nextMatch.homeTeam
    : "Nächster Gegner";
  const matchInfo = nextMatch
    ? [
        formatMatchDate(nextMatch.date),
        nextMatch.time ? `${nextMatch.time} Uhr` : null,
        nextMatch.competition,
        homeIsUs ? "Heimspiel" : "Auswärtsspiel",
      ]
        .filter(Boolean)
        .join(" · ")
    : "Alle Spielinfos im Spielcenter";

  const displayTitle = isDynamic ? opponent : slide.title ?? "";
  const displaySubtitle = isDynamic ? matchInfo : slide.subtitle ?? "";

  return (
    <section
      className="hero-classic relative -mt-[72px] flex min-h-[68vh] items-center overflow-hidden bg-[#373542] pt-[72px] lg:-mt-[88px] lg:min-h-[74vh] lg:pt-[88px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background pattern */}
      <div
        className="hero-pattern-motion absolute inset-0 bg-repeat bg-center opacity-35"
        style={{ backgroundImage: "url('/bg-pattern.png')" }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#252331]/85 via-[#373542]/60 to-[#373542]/20"
        aria-hidden="true"
      />
      <div className="hero-vignette absolute inset-0" aria-hidden="true" />

      {/* Player image — right side */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 right-0 hidden h-[420px] w-[420px] transition-all duration-700 ease-out lg:block lg:h-[500px] lg:w-[500px]",
          transitioning
            ? cn(
                "opacity-0",
                direction === 1 ? "translate-x-4 translate-y-2" : "-translate-x-4 translate-y-2"
              )
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
          sizes="500px"
        />
      </div>

      {/* Content — left aligned */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-12 lg:py-16">
        <div
          className={cn(
            "max-w-[600px] transition-all duration-500 ease-out",
            transitioning
              ? cn(
                  "opacity-0",
                  direction === 1 ? "translate-x-4" : "-translate-x-4"
                )
              : "opacity-100 translate-x-0"
          )}
        >
          {/* Eyebrow */}
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2e7d32]">
            {slide.eyebrow}
          </p>

          {/* H1 */}
          <h1 className="mb-4 whitespace-pre-line text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white [font-family:var(--font-club)]">
            {displayTitle}
          </h1>

          {/* Supporting line */}
          {displaySubtitle && (
            <p className="mb-8 text-sm leading-relaxed text-white/75 lg:text-base lg:max-w-[480px]">
              {displaySubtitle}
            </p>
          )}

          {/* Home/Away badge for dynamic slide */}
          {isDynamic && (
            <div className="mb-6 inline-flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                  homeIsUs
                    ? "bg-[#2e7d32] text-white"
                    : "border border-white/40 text-white/80"
                )}
              >
                {homeIsUs ? "Heimspiel" : "Auswärtsspiel"}
              </span>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={slide.cta1.href}
              className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-[#2e7d32] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#1b5e20] [font-family:var(--font-club)]"
            >
              {slide.cta1.label}
            </Link>
            <Link
              href={slide.cta2.href}
              className="inline-flex min-w-[160px] items-center justify-center rounded-full border border-white/50 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white/10 [font-family:var(--font-club)]"
            >
              {slide.cta2.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((item, i) => (
          <button
            key={item.id}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "transition-all duration-300",
              i === current
                ? "h-2 w-8 rounded-full bg-[#2e7d32]"
                : "h-2 w-2 rounded-full bg-white/30 hover:bg-white/60"
            )}
          />
        ))}
      </div>

      {/* Desktop arrow controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2.5 text-white/70 transition-all hover:border-white/50 hover:bg-black/40 hover:text-white lg:block"
        aria-label="Vorheriger Slide"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2.5 text-white/70 transition-all hover:border-white/50 hover:bg-black/40 hover:text-white lg:block"
        aria-label="Nächster Slide"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Hero bottom fade — connects to editorial rail */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#373542] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
