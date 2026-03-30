"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import { formatDate, categoryLabel, categoryColor } from "@/lib/utils";
import type { Article } from "@/types";

// ── fallback cards shown before Sanity is configured ─────────────────────────
const FALLBACK: Article[] = [
  {
    _id: "f1",
    _type: "article",
    title: "Starker Auftritt beim Derby gegen Berliner SC",
    slug: { current: "starker-auftritt-derby-berliner-sc" },
    category: "bericht",
    publishedAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
  },
  {
    _id: "f2",
    _type: "article",
    title: "U13 gewinnt Frühjahrsturnier in Bernau",
    slug: { current: "u13-gewinnt-fruehjahrsturnier-bernau" },
    category: "jugend",
    publishedAt: new Date(Date.now() - 7 * 86_400_000).toISOString(),
  },
  {
    _id: "f3",
    _type: "article",
    title: "Neue Trainingsplatzbeleuchtung eingeweiht",
    slug: { current: "neue-trainingsplatzbeleuchtung" },
    category: "verein",
    publishedAt: new Date(Date.now() - 14 * 86_400_000).toISOString(),
  },
  {
    _id: "f4",
    _type: "article",
    title: "Saisonstart der Herren — Vorschau auf die Rückrunde",
    slug: { current: "saisonstart-herren-rueckrunde" },
    category: "news",
    publishedAt: new Date(Date.now() - 21 * 86_400_000).toISOString(),
  },
  {
    _id: "f5",
    _type: "article",
    title: "U17 holt Kreispokal nach Eberswalde",
    slug: { current: "u17-kreispokal-eberswalde" },
    category: "jugend",
    publishedAt: new Date(Date.now() - 28 * 86_400_000).toISOString(),
  },
  {
    _id: "f6",
    _type: "article",
    title: "Sponsoren und Partner für neue Saison bestätigt",
    slug: { current: "sponsoren-neue-saison" },
    category: "verein",
    publishedAt: new Date(Date.now() - 35 * 86_400_000).toISOString(),
  },
];

// ── single carousel card ──────────────────────────────────────────────────────

function NewsCard({
  article,
  active,
}: {
  article: Article;
  active: boolean;
}) {
  return (
    <Link
      href={`/aktuelles/${article.slug.current}`}
      className={`group flex h-full min-w-0 flex-col gap-3 rounded-xl border p-3 transition-all duration-300 ${
        active
          ? "border-l-4 border-l-[#4caf50] border-t border-r border-b border-white/15 bg-white/10"
          : "border border-white/8 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
      }`}
    >
      {/* thumbnail */}
      <div className="relative h-16 w-full overflow-hidden rounded-lg bg-[#1a2e1a]">
        {article.coverImage ? (
          <Image
            src={urlFor(article.coverImage).width(280).height(128).url()}
            alt={article.coverImage.alt ?? article.title}
            fill
            className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            sizes="280px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#2e7d32]/40 [font-family:var(--font-club)]">
              FVP
            </span>
          </div>
        )}
        {/* category overlay */}
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold ${categoryColor(article.category)}`}
        >
          {categoryLabel(article.category)}
        </span>
      </div>

      {/* title */}
      <p className="line-clamp-3 flex-1 text-[13px] font-semibold leading-snug text-gray-200 transition-colors group-hover:text-white">
        {article.title}
      </p>

      {/* date */}
      <p className="text-[10px] text-gray-500">{formatDate(article.publishedAt)}</p>
    </Link>
  );
}

// ── carousel ─────────────────────────────────────────────────────────────────

export function HeroEditorialRail({ articles }: { articles?: Article[] }) {
  const items = articles && articles.length > 0 ? articles : FALLBACK;
  // duplicate so we always have enough for infinite feel
  const extended = items.length < 6 ? [...items, ...items] : items;

  const [offset, setOffset] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = () => {
    setTransitioning(true);
    setOffset((prev) => {
      const next = prev + 1;
      if (next >= extended.length) return 0;
      return next;
    });
    setActiveIdx((prev) => (prev + 1) % items.length);
  };

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, 4_500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, extended.length, items.length]);

  // show 4 on lg, 3 on md, 2 on sm, 1 on xs (handled via Tailwind grid cols)
  // We render a sliding window using translate

  return (
    <section
      className="bg-[#111111] py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1280px] px-4">
        {/* header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-4 w-1 rounded-full bg-[#4caf50]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4caf50]">
              Aktuelles
            </span>
          </div>
          <Link
            href="/aktuelles"
            className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:text-[#4caf50]"
          >
            Alle News →
          </Link>
        </div>

        {/* sliding window */}
        <div className="overflow-hidden">
          <div
            className="flex gap-3"
            style={{
              transform: `translateX(calc(-${offset} * (100% / var(--visible) + 12px / var(--visible))))`,
              transition: transitioning ? "transform 0.55s cubic-bezier(0.4,0,0.2,1)" : "none",
              // CSS variable trick for responsive count
            }}
          >
            {extended.map((article, i) => (
              <div
                key={`${article._id}-${i}`}
                className="w-[calc(100%-0px)] shrink-0 sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]"
              >
                <NewsCard
                  article={article}
                  active={i % items.length === activeIdx}
                />
              </div>
            ))}
          </div>
        </div>

        {/* dot indicators */}
        <div className="mt-4 flex justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setTransitioning(true);
                setOffset(i);
                setActiveIdx(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "w-6 bg-[#4caf50]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Artikel ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
