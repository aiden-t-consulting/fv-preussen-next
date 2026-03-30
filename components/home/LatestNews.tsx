"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate, categoryLabel, categoryColor } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/client";
import type { Article } from "@/types";

const FALLBACK_ARTICLES: Article[] = [
  {
    _id: "1",
    _type: "article",
    title: "Starker Auftritt beim Derby gegen Berliner SC",
    slug: { current: "starker-auftritt-derby-berliner-sc" },
    category: "bericht",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt:
      "In einem packenden Heimspiel konnte die erste Mannschaft mit 3:1 gegen den Berliner SC überzeugen und klettert weiter in der Tabelle.",
  },
  {
    _id: "2",
    _type: "article",
    title: "U13 gewinnt Frühjahrsturnier in Bernau",
    slug: { current: "u13-gewinnt-fruehjahrsturnier-bernau" },
    category: "jugend",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt:
      "Unsere D-Junioren haben beim Frühjahrsturnier in Bernau alle fünf Spiele gewonnen und den Pokal nach Eberswalde geholt.",
  },
  {
    _id: "3",
    _type: "article",
    title: "Neue Trainingsplatzbeleuchtung eingeweiht",
    slug: { current: "neue-trainingsplatzbeleuchtung-eingeweiht" },
    category: "verein",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt:
      "Dank der großzügigen Unterstützung unserer Sponsoren konnte die neue LED-Flutlichtanlage auf dem Trainingsplatz offiziell eingeweiht werden.",
  },
  {
    _id: "4",
    _type: "article",
    title: "Saisonstart der Herren — Vorschau auf die Rückrunde",
    slug: { current: "saisonstart-herren-rueckrunde" },
    category: "news",
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt:
      "Mit einem breiten Kader geht die erste Mannschaft in die Rückrunde. Trainer und Team sind optimistisch.",
  },
  {
    _id: "5",
    _type: "article",
    title: "U17 holt Kreispokal nach Eberswalde",
    slug: { current: "u17-kreispokal-eberswalde" },
    category: "jugend",
    publishedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt:
      "Ein unvergesslicher Abend für die B-Junioren: Im Finale setzten sie sich im Elfmeterschießen durch.",
  },
];

const CATEGORIES = [
  { key: "alle", label: "Alle" },
  { key: "bericht", label: "Berichte" },
  { key: "verein", label: "Verein" },
  { key: "jugend", label: "Jugend" },
  { key: "news", label: "News" },
];

interface LatestNewsProps {
  articles?: Article[];
}

export function LatestNews({ articles = FALLBACK_ARTICLES }: LatestNewsProps) {
  const [activeCategory, setActiveCategory] = useState("alle");

  const filtered =
    activeCategory === "alle"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;
  const sideArticles = rest.slice(0, 4);
  const extraArticles = rest.slice(4);

  return (
    <section className="bg-[#f8f7f5] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#2e7d32]">
              Aus dem Verein
            </p>
            <h2 className="text-3xl font-bold text-gray-900 [font-family:var(--font-club)] lg:text-4xl">
              Aktuelles
            </h2>
            <p className="mt-1.5 text-sm text-gray-500">
              Berichte, Vereinsnews und alles rund um den FV Preussen Eberswalde.
            </p>
          </div>
          <Link
            href="/aktuelles"
            className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[#2e7d32] hover:underline"
          >
            Alle News &rarr;
          </Link>
        </div>

        {/* Category filter pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                activeCategory === cat.key
                  ? "bg-[#2e7d32] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#2e7d32]/40 hover:text-[#2e7d32]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main grid */}
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-400">
            Keine Artikel in dieser Kategorie.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              {/* Featured article */}
              {featured && (
                <Link
                  href={`/aktuelles/${featured.slug.current}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl lg:col-span-3"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#f1f8e9]">
                    {featured.coverImage ? (
                      <Image
                        src={urlFor(featured.coverImage).width(800).height(450).url()}
                        alt={featured.coverImage.alt ?? featured.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-[#2e7d32]/20 [font-family:var(--font-logo)]">
                          FVP
                        </span>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <Badge className={categoryColor(featured.category)}>
                        {categoryLabel(featured.category)}
                      </Badge>
                      <h3 className="mt-2 text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#a5d6a7] md:text-2xl">
                        {featured.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-300">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featured.publishedAt)}
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Side articles */}
              <div className="flex flex-col gap-4 lg:col-span-2">
                {sideArticles.map((article) => (
                  <Link
                    key={article._id}
                    href={`/aktuelles/${article.slug.current}`}
                    className="group flex gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-all duration-200 hover:border-[#2e7d32]/30 hover:shadow-md"
                  >
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f1f8e9]">
                      {article.coverImage ? (
                        <Image
                          src={urlFor(article.coverImage).width(160).height(128).url()}
                          alt={article.coverImage.alt ?? article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="80px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-[#2e7d32]/30 [font-family:var(--font-logo)]">
                          FVP
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Badge className={`${categoryColor(article.category)} mb-1`}>
                        {categoryLabel(article.category)}
                      </Badge>
                      <h3 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#2e7d32]">
                        {article.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publishedAt)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Extra articles — headline strip */}
            {extraArticles.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-200 pt-5">
                {extraArticles.map((article, i) => (
                  <span key={article._id} className="flex items-center gap-4">
                    {i > 0 && <span className="text-gray-300">&bull;</span>}
                    <Link
                      href={`/aktuelles/${article.slug.current}`}
                      className="text-sm text-gray-600 transition-colors hover:text-[#2e7d32]"
                    >
                      {article.title}
                    </Link>
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
