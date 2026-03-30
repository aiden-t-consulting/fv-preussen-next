import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, ChevronRight } from "lucide-react";
import type { FuPaMatch } from "@/types";
import { formatShortDate } from "@/lib/utils";

interface HeroProps {
  nextMatch?: FuPaMatch | null;
}

export function Hero({ nextMatch }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-stadium.jpg')" }}
        aria-hidden="true"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0e3a07]/95 via-[#15540a]/80 to-[#21a530]/30"
        aria-hidden="true"
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#81d742] animate-pulse" />
            <span className="text-[#81d742] text-sm font-semibold tracking-wide">
              Landesliga Nord – Saison 2024/25
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Motor des{" "}
            <span className="text-[#81d742]">Barnim</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
            Fußball ist unsere Zukunft. Seit über 100 Jahren stehen wir für
            Leidenschaft, Zusammenhalt und Tradition in Eberswalde.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-10">
            <Button size="lg" asChild>
              <Link href="/aktuelles">
                Aktuelle News
                <ChevronRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="white" size="lg" asChild>
              <Link href="/teams">
                Unsere Teams
              </Link>
            </Button>
          </div>

          {/* Next match pill */}
          {nextMatch && (
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4">
              <div className="flex items-center gap-2 text-[#81d742]">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Nächstes Spiel
                </span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="text-white text-sm font-semibold">
                {nextMatch.homeTeam} vs {nextMatch.awayTeam}
              </div>
              <div className="text-gray-300 text-sm">
                {formatShortDate(nextMatch.date)}
                {nextMatch.time && ` · ${nextMatch.time} Uhr`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>
    </section>
  );
}
