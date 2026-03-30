import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { urlFor } from "@/lib/sanity/client";
import type { Sponsor } from "@/types";

interface SponsorsStripProps {
  sponsors?: Sponsor[];
}

interface FallbackSponsor {
  _id: string;
  name: string;
  tier: "hauptsponsor" | "premiumsponsor" | "partner";
  src: string;
  url?: string;
}

const FALLBACK_SPONSORS: FallbackSponsor[] = [
  {
    _id: "sparkasse-barnim",
    name: "Sparkasse Barnim",
    tier: "hauptsponsor" as const,
    src: "/images/sponsors/sparkasse-barnim.jpg",
    url: "https://www.spk-barnim.de/",
  },
  {
    _id: "fielmann",
    name: "Fielmann",
    tier: "premiumsponsor" as const,
    src: "/images/legacy/sponsors/fielmann.png",
  },
  {
    _id: "sportstiftung",
    name: "Sportstiftung der Sparkasse Barnim",
    tier: "premiumsponsor" as const,
    src: "/images/legacy/sponsors/sportstiftung.jpg",
  },
  {
    _id: "hotel-am-markt",
    name: "Hotel Am Markt",
    tier: "premiumsponsor" as const,
    src: "/images/legacy/sponsors/hotel-am-markt.png",
  },
  {
    _id: "fitolino",
    name: "Fitolino",
    tier: "partner" as const,
    src: "/images/legacy/sponsors/fitolino.png",
  },
  {
    _id: "ksb",
    name: "Kreissportbund Barnim",
    tier: "partner" as const,
    src: "/images/legacy/sponsors/ksb.jpg",
  },
  {
    _id: "twe",
    name: "TWE",
    tier: "partner" as const,
    src: "/images/legacy/sponsors/twe.jpg",
  },
  {
    _id: "glg",
    name: "GLG",
    tier: "partner" as const,
    src: "/images/legacy/sponsors/glg.jpg",
  },
];

export function SponsorsStrip({ sponsors = [] }: SponsorsStripProps) {
  const items = sponsors.length > 0 ? sponsors : FALLBACK_SPONSORS;
  const hauptsponsors = items.filter((s) => s.tier === "hauptsponsor");
  const premiumsponsors = items.filter((s) => s.tier === "premiumsponsor");
  const partners = items.filter((s) => s.tier === "partner");

  return (
    <section className="py-20 lg:py-28 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Unsere Partner"
          title="Sponsoren & Partner"
          subtitle="Wir danken unseren Sponsoren für ihre wertvolle Unterstützung."
        />

        {/* Hauptsponsor */}
        {hauptsponsors.length > 0 && (
          <div className="mb-10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              Hauptsponsor
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {hauptsponsors.map((sponsor) => (
                <SponsorCard key={sponsor._id} sponsor={sponsor} size="lg" />
              ))}
            </div>
          </div>
        )}

        {/* Premium */}
        {premiumsponsors.length > 0 && (
          <div className="mb-10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              Premium Partner
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {premiumsponsors.map((sponsor) => (
                <SponsorCard key={sponsor._id} sponsor={sponsor} size="md" />
              ))}
            </div>
          </div>
        )}

        {/* Partners */}
        {partners.length > 0 && (
          <div className="mb-10">
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
              Partner
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((sponsor) => (
                <SponsorCard key={sponsor._id} sponsor={sponsor} size="sm" />
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/sponsoren"
            className="inline-flex items-center gap-2 text-[#21a530] font-semibold hover:text-[#15540a] transition-colors"
          >
            Alle Sponsoren ansehen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Become a sponsor CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#15540a] to-[#21a530] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Werden Sie unser Partner!
          </h3>
          <p className="text-gray-200 mb-6 max-w-xl mx-auto">
            Unterstützen Sie den Fußball im Barnim und profitieren Sie von attraktiven
            Werbemöglichkeiten bei unserem Verein.
          </p>
          <Link
            href="/kontakt?betreff=sponsoring"
            className="inline-flex items-center gap-2 bg-white text-[#15540a] px-6 py-3 rounded-xl font-semibold hover:bg-[#f0faf0] transition-colors"
          >
            Jetzt Kontakt aufnehmen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function SponsorCard({
  sponsor,
  size,
}: {
  sponsor: Sponsor | FallbackSponsor;
  size: "sm" | "md" | "lg";
}) {
  const dimensions = {
    lg: { w: 200, h: 80, className: "w-48 h-20" },
    md: { w: 160, h: 64, className: "w-40 h-16" },
    sm: { w: 120, h: 48, className: "w-28 h-12" },
  }[size];

  const content = (
    <div
      className={`${dimensions.className} flex items-center justify-center bg-white rounded-xl border border-gray-200 hover:border-[#21a530] hover:shadow-md transition-all duration-200 px-4 py-2`}
    >
      {"logo" in sponsor && sponsor.logo ? (
        <Image
          src={urlFor(sponsor.logo).width(dimensions.w).height(dimensions.h).url()}
          alt={sponsor.name}
          width={dimensions.w}
          height={dimensions.h}
          className="object-contain max-h-full"
        />
      ) : "src" in sponsor ? (
        <Image
          src={sponsor.src}
          alt={sponsor.name}
          width={dimensions.w}
          height={dimensions.h}
          className="object-contain max-h-full"
        />
      ) : (
        <span className="text-gray-400 text-sm font-semibold text-center line-clamp-2">
          {sponsor.name}
        </span>
      )}
    </div>
  );

  if (sponsor.url) {
    return (
      <a href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={sponsor.name}>
        {content}
      </a>
    );
  }
  return content;
}
