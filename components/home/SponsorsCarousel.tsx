"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Real sponsors from the original site assets
const SPONSORS = [
  {
    id: "spk-barnim",
    name: "Sparkasse Barnim",
    logo: "/images/sponsors/spk-barnim.png",
    url: "https://www.spk-barnim.de/de/home.html",
    tier: "Hauptsponsor",
  },
  {
    id: "sponsor-01",
    name: "Partner 1",
    logo: "/images/sponsors/sponsor-01.png",
    url: "#",
    tier: "Partner",
  },
  {
    id: "sponsor-02",
    name: "Partner 2",
    logo: "/images/sponsors/sponsor-02.png",
    url: "#",
    tier: "Partner",
  },
  {
    id: "sponsor-03",
    name: "Partner 3",
    logo: "/images/sponsors/sponsor-03.png",
    url: "#",
    tier: "Partner",
  },
];

// Duplicate the list for seamless infinite loop
const LOOP_SPONSORS = [...SPONSORS, ...SPONSORS, ...SPONSORS];

export function SponsorsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-16 bg-[#f5f5f5] border-t-4 border-[#039139]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#039139] text-xs font-bold uppercase tracking-[0.25em] block mb-1">
              Unsere Partner
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase tracking-wide">
              Sponsoren
            </h2>
          </div>
          <Link
            href="/sponsoren"
            className="relative hidden sm:inline-flex items-center px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white border-2 border-[#039139] overflow-hidden group"
          >
            <span className="absolute inset-0 bg-[#039139] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative">Alle Sponsoren</span>
          </Link>
        </div>

        {/* Carousel track */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className={cn(
              "flex gap-6 w-max",
              paused ? "" : "animate-sponsors-scroll"
            )}
            style={{ willChange: "transform" }}
          >
            {LOOP_SPONSORS.map((sponsor, i) => (
              <a
                key={`${sponsor.id}-${i}`}
                href={sponsor.url}
                target={sponsor.url !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={sponsor.name}
                className="group flex-shrink-0 w-48 h-24 bg-white border border-gray-200 hover:border-[#039139] flex items-center justify-center px-6 py-4 transition-all duration-200 hover:shadow-md"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={160}
                  height={64}
                  className="object-contain max-h-14 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f5f5f5] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f5f5f5] to-transparent z-10 pointer-events-none" />
        </div>

        {/* Become a sponsor CTA */}
        <div className="mt-12 border-l-4 border-[#039139] bg-white px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-[#1a1a1a] text-lg uppercase tracking-wide">
              Werden Sie unser Partner!
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Unterstützen Sie den Fußball im Barnim und profitieren Sie von attraktiven Werbemöglichkeiten.
            </p>
          </div>
          <Link
            href="/kontakt?betreff=sponsoring"
            className="relative inline-flex items-center px-7 py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#039139] border-2 border-[#039139] overflow-hidden group hover:bg-[#026b29] transition-colors whitespace-nowrap"
          >
            Jetzt anfragen
          </Link>
        </div>
      </div>

      {/* Keyframe animation injected via style tag */}
      <style>{`
        @keyframes sponsors-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-216px * ${SPONSORS.length})); }
        }
        .animate-sponsors-scroll {
          animation: sponsors-scroll ${SPONSORS.length * 4}s linear infinite;
        }
      `}</style>
    </section>
  );
}
