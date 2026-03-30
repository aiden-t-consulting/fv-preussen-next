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

function SponsorLogo({
  sponsor,
  size,
}: {
  sponsor: DisplaySponsor;
  size: "large" | "medium" | "small";
}) {
  const sizeClasses = {
    large: "h-20 w-auto max-w-[240px]",
    medium: "h-14 w-auto max-w-[160px]",
    small: "h-10 w-auto max-w-[120px]",
  };

  const wrapClasses = {
    large: "h-28 px-10 py-6",
    medium: "h-20 px-8 py-4",
    small: "h-16 px-6 py-3",
  };

  return (
    <a
      href={sponsor.url !== "#" ? sponsor.url : undefined}
      target={sponsor.url !== "#" ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={sponsor.name}
      className={`group flex items-center justify-center rounded-xl border border-gray-100 bg-white transition-all duration-200 hover:border-[#039139]/40 hover:shadow-md ${wrapClasses[size]}`}
    >
      <Image
        src={sponsor.logoUrl}
        alt={sponsor.name}
        width={240}
        height={96}
        className={`object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 ${sizeClasses[size]}`}
      />
    </a>
  );
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
    <section className="bg-[#f5f5f5] py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#039139]">
              Partner des Vereins
            </p>
            <h2 className="text-3xl font-bold text-gray-900 [font-family:var(--font-club)] lg:text-4xl">
              Unsere Sponsoren
            </h2>
          </div>
          <Link
            href="/sponsoren"
            className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[#039139] hover:underline"
          >
            Alle Sponsoren →
          </Link>
        </div>

        {/* Hauptsponsor */}
        {hauptsponsor.length > 0 && (
          <div className="mb-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Hauptsponsor
            </p>
            <div className="flex flex-wrap gap-4">
              {hauptsponsor.map((s) => (
                <SponsorLogo key={s.id} sponsor={s} size="large" />
              ))}
            </div>
          </div>
        )}

        {/* Premium */}
        {premium.length > 0 && (
          <div className="mb-8 border-t border-gray-200 pt-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Premium Partner
            </p>
            <div className="flex flex-wrap gap-4">
              {premium.map((s) => (
                <SponsorLogo key={s.id} sponsor={s} size="medium" />
              ))}
            </div>
          </div>
        )}

        {/* Partner */}
        {partner.length > 0 && (
          <div className="mb-10 border-t border-gray-200 pt-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Business Partner
            </p>
            <div className="flex flex-wrap gap-3">
              {partner.map((s) => (
                <SponsorLogo key={s.id} sponsor={s} size="small" />
              ))}
            </div>
          </div>
        )}

        {/* CTA card */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-[20px] border-l-4 border-[#039139] bg-white px-8 py-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-bold uppercase tracking-wide text-gray-900">
              Werden Sie Partner des FV Preussen Eberswalde
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Unterstützen Sie den Fußball in Eberswalde und profitieren Sie von sichtbarer
              Präsenz in einem traditionsreichen Vereinsumfeld.
            </p>
          </div>
          <Link
            href="/kontakt?betreff=sponsoring"
            className="shrink-0 rounded-full bg-[#039139] px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#026b29]"
          >
            Partnerschaft anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
