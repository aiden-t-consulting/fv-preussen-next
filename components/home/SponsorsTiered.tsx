import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/client";
import type { Sponsor } from "@/types";

type TierKey = "hauptsponsor" | "premiumsponsor" | "partner";

interface DisplaySponsor {
  id: string;
  name: string;
  logoUrl: string;
  url: string;
  tier: TierKey;
}

// Static fallback mirrors the legacy site's sponsor data
const FALLBACK_SPONSORS: DisplaySponsor[] = [
  {
    id: "sparkasse-barnim",
    name: "Sparkasse Barnim",
    logoUrl: "/images/sponsors/sparkasse-barnim.jpg",
    url: "https://www.spk-barnim.de/de/home.html",
    tier: "hauptsponsor",
  },
  {
    id: "fielmann",
    name: "Fielmann",
    logoUrl: "/images/legacy/sponsors/fielmann.png",
    url: "#",
    tier: "premiumsponsor",
  },
  {
    id: "sportstiftung",
    name: "Sportstiftung der Sparkasse Barnim",
    logoUrl: "/images/legacy/sponsors/sportstiftung.jpg",
    url: "#",
    tier: "premiumsponsor",
  },
  {
    id: "hotel-am-markt",
    name: "Hotel Am Markt",
    logoUrl: "/images/legacy/sponsors/hotel-am-markt.png",
    url: "#",
    tier: "premiumsponsor",
  },
  {
    id: "fitolino",
    name: "Fitolino",
    logoUrl: "/images/legacy/sponsors/fitolino.png",
    url: "#",
    tier: "partner",
  },
  {
    id: "ksb",
    name: "Kreissportbund Barnim",
    logoUrl: "/images/legacy/sponsors/ksb.jpg",
    url: "#",
    tier: "partner",
  },
  {
    id: "twe",
    name: "TWE",
    logoUrl: "/images/legacy/sponsors/twe.jpg",
    url: "#",
    tier: "partner",
  },
  {
    id: "glg",
    name: "GLG",
    logoUrl: "/images/legacy/sponsors/glg.jpg",
    url: "#",
    tier: "partner",
  },
];

function SponsorCard({
  sponsor,
  variant,
}: {
  sponsor: DisplaySponsor;
  variant: "featured" | "premium" | "partner";
}) {
  const sizeClasses = {
    featured: "h-20 w-auto max-w-[260px]",
    premium: "h-14 w-auto max-w-[160px]",
    partner: "h-10 w-auto max-w-[120px]",
  };

  const wrapClasses = {
    featured:
      "h-32 px-10 py-6 rounded-2xl border-2 border-[#039139]/20 bg-white shadow-md hover:shadow-xl hover:border-[#039139]/50 hover:scale-[1.02]",
    premium:
      "h-24 px-8 py-4 rounded-xl border-t-4 border-t-[#039139] border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-t-[#026b29]",
    partner:
      "h-16 px-6 py-3 rounded-lg border-l-4 border-l-[#039139]/60 border border-gray-100 bg-white hover:border-l-[#039139] hover:shadow-sm",
  };

  const imgClasses = {
    featured: "opacity-90 group-hover:opacity-100",
    premium:
      "opacity-75 grayscale group-hover:opacity-100 group-hover:grayscale-0",
    partner:
      "opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0",
  };

  const inner = (
    <div
      className={`group flex items-center justify-center transition-all duration-300 ${wrapClasses[variant]}`}
    >
      <Image
        src={sponsor.logoUrl}
        alt={sponsor.name}
        width={260}
        height={104}
        className={`object-contain transition-all duration-300 ${sizeClasses[variant]} ${imgClasses[variant]}`}
      />
    </div>
  );

  if (sponsor.url !== "#") {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={sponsor.name}
      >
        {inner}
      </a>
    );
  }
  return <div aria-label={sponsor.name}>{inner}</div>;
}

export function SponsorsTiered({ sponsors }: { sponsors: Sponsor[] }) {
  const display: DisplaySponsor[] =
    sponsors.length > 0
      ? sponsors.map((s) => ({
          id: s._id,
          name: s.name,
          logoUrl: urlFor(s.logo).width(320).height(128).url(),
          url: s.url ?? "#",
          tier: s.tier,
        }))
      : FALLBACK_SPONSORS;

  const hauptsponsor = display.filter((s) => s.tier === "hauptsponsor");
  const premium = display.filter((s) => s.tier === "premiumsponsor");
  const partner = display.filter((s) => s.tier === "partner");

  return (
    <section className="overflow-hidden bg-white">
      {/* Colorful header strip */}
      <div className="bg-gradient-to-r from-[#039139] via-[#026b29] to-[#1e2030] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#7de8a0]">
                Partner des Vereins
              </p>
              <h2 className="text-3xl font-bold text-white [font-family:var(--font-club)] lg:text-4xl">
                Unsere Sponsoren
              </h2>
            </div>
            <Link
              href="/sponsoren"
              className="shrink-0 rounded-full border border-white/40 px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Alle Sponsoren →
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-12 lg:py-16">
        {/* Hauptsponsor */}
        {hauptsponsor.length > 0 && (
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-amber-700">
                Hauptsponsor
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-6">
              {hauptsponsor.map((s) => (
                <SponsorCard key={s.id} sponsor={s} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {/* Premium Partner */}
        {premium.length > 0 && (
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-[#039139]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#039139]">
                Premium Partner
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#039139]/30 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-4">
              {premium.map((s) => (
                <SponsorCard key={s.id} sponsor={s} variant="premium" />
              ))}
            </div>
          </div>
        )}

        {/* Business Partner */}
        {partner.length > 0 && (
          <div className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">
                Business Partner
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-3">
              {partner.map((s) => (
                <SponsorCard key={s.id} sponsor={s} variant="partner" />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#039139] to-[#026b29] px-8 py-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-white">
              Werden Sie Partner des FV Preussen Eberswalde
            </h3>
            <p className="mt-1 text-sm text-white/75">
              Unterstützen Sie den Fußball in Eberswalde und profitieren Sie von
              sichtbarer Präsenz in einem traditionsreichen Vereinsumfeld.
            </p>
          </div>
          <Link
            href="/kontakt?betreff=sponsoring"
            className="shrink-0 rounded-full bg-white px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-[#039139] transition-colors hover:bg-gray-100"
          >
            Partnerschaft anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
