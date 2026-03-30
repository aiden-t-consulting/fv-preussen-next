import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, categoryLabel, categoryColor } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/client";
import type { Article } from "@/types";

// Static fallback articles (shown before Sanity is connected)
const FALLBACK_ARTICLES: Article[] = [
  {
    _id: "1",
    _type: "article",
    title: "Starker Auftritt beim Derby gegen Berliner SC",
    slug: { current: "starker-auftritt-derby-berliner-sc" },
    category: "bericht",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt: "In einem packenden Heimspiel konnte die erste Mannschaft mit 3:1 gegen den Berliner SC überzeugen und klettert weiter in der Tabelle.",
  },
  {
    _id: "2",
    _type: "article",
    title: "U13 gewinnt Frühjahrsturnier in Bernau",
    slug: { current: "u13-gewinnt-fruehjahrsturnier-bernau" },
    category: "jugend",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt: "Unsere D-Junioren haben beim Frühjahrsturnier in Bernau alle fünf Spiele gewonnen und den Pokal nach Eberswalde geholt.",
  },
  {
    _id: "3",
    _type: "article",
    title: "Neue Trainingsplatzbeleuchtung eingeweiht",
    slug: { current: "neue-trainingsplatzbeleuchtung-eingeweiht" },
    category: "verein",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    excerpt: "Dank der großzügigen Unterstützung unserer Sponsoren konnte die neue LED-Flutlichtanlage auf dem Trainingsplatz offiziell eingeweiht werden.",
  },
];

interface LatestNewsProps {
  articles?: Article[];
}

export function LatestNews({ articles = FALLBACK_ARTICLES }: LatestNewsProps) {
  const [featured, ...rest] = articles;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeading
            label="Neuigkeiten"
            title="Aktuelles"
            subtitle="Berichte, Vereinsnews und alles rund um den FV Preussen Eberswalde."
            align="left"
            className="mb-0"
          />
          <Button variant="outline" size="sm" asChild className="shrink-0">
            <Link href="/aktuelles">
              Alle News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured article */}
          {featured && (
            <Link
              href={`/aktuelles/${featured.slug.current}`}
              className="lg:col-span-3 group relative flex flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[16/9] bg-[#e8f5e9] overflow-hidden">
                {featured.coverImage ? (
                  <Image
                    src={urlFor(featured.coverImage).width(800).height(450).url()}
                    alt={featured.coverImage.alt ?? featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold text-[#21a530]/20 font-['Playfair_Display',serif]">FVP</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className={categoryColor(featured.category)}>
                    {categoryLabel(featured.category)}
                  </Badge>
                  <h3 className="mt-2 text-white font-bold text-xl md:text-2xl leading-snug group-hover:text-[#81d742] transition-colors">
                    {featured.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 text-gray-300 text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(featured.publishedAt)}
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Side articles */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map((article) => (
              <Link
                key={article._id}
                href={`/aktuelles/${article.slug.current}`}
                className="group flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#21a530]/30 hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className="relative w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-[#e8f5e9]">
                  {article.coverImage ? (
                    <Image
                      src={urlFor(article.coverImage).width(200).height(160).url()}
                      alt={article.coverImage.alt ?? article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="96px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#21a530]/30 font-bold text-lg font-['Playfair_Display',serif]">
                      FVP
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Badge className={`${categoryColor(article.category)} mb-1.5`}>
                    {categoryLabel(article.category)}
                  </Badge>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#21a530] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(article.publishedAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
