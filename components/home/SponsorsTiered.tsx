import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/client";
import type { Sponsor } from "@/types";

type TierKey = "hauptsponsor" | "premiumsponsor" | "partner" | "foerderer";

interface DisplaySponsor {
  id: string;
  name: string;
  logoUrl: string;
  url: string;
  tier: TierKey;
}

// Static fallback — sourced from public/images/sponsors/ folder structure
const FALLBACK_SPONSORS: DisplaySponsor[] = [
  // ── Exclusivsponsor ──────────────────────────────────────────────────────────
  {
    id: "sparkasse-barnim",
    name: "Sparkasse Barnim",
    logoUrl: "/images/sponsors/Exclusivsponsor/Sparkasse_big.jpg",
    url: "https://www.spk-barnim.de/",
    tier: "hauptsponsor",
  },

  // ── Premiumsponsoren ─────────────────────────────────────────────────────────
  {
    id: "glg",
    name: "GLG – Gesellschaft für Leben und Gesundheit",
    logoUrl: "/images/sponsors/Premiumsponsoren/GLG_big.jpg",
    url: "#",
    tier: "premiumsponsor",
  },
  {
    id: "ck-wrensch",
    name: "CK Wrensch Containerdienst und Recycling",
    logoUrl: "/images/sponsors/Premiumsponsoren/IMG_8931.jpg",
    url: "#",
    tier: "premiumsponsor",
  },
  {
    id: "finow-rohrsysteme",
    name: "FINOW Rohrsysteme GmbH",
    logoUrl: "/images/sponsors/Premiumsponsoren/IMG_8932.jpg",
    url: "#",
    tier: "premiumsponsor",
  },
  {
    id: "koha",
    name: "KOHA Bauausführungen und Immobilien GmbH",
    logoUrl: "/images/sponsors/Premiumsponsoren/IMG_8933.png",
    url: "#",
    tier: "premiumsponsor",
  },
  {
    id: "e-dis",
    name: "e.dis",
    logoUrl: "/images/sponsors/Premiumsponsoren/IMG_8934-1.jpg",
    url: "#",
    tier: "premiumsponsor",
  },
  {
    id: "structure",
    name: "structure Bauträgergesellschaft",
    logoUrl: "/images/sponsors/Premiumsponsoren/IMG_8935.jpg",
    url: "#",
    tier: "premiumsponsor",
  },

  // ── Top-Partner ──────────────────────────────────────────────────────────────
  {
    id: "arxes",
    name: "arxes engineering",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8937.png",
    url: "#",
    tier: "partner",
  },
  {
    id: "autohaus-schley",
    name: "Autohaus Schley Eberswalde GmbH",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8939.png",
    url: "#",
    tier: "partner",
  },
  {
    id: "hoffmann-transport",
    name: "Hoffmann Transport & Recycling GmbH",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8940.png",
    url: "#",
    tier: "partner",
  },
  {
    id: "medimax",
    name: "MEDIMAX",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8941-300x59.png",
    url: "#",
    tier: "partner",
  },
  {
    id: "fgm-automobil",
    name: "FGM Automobil GmbH – Franz Graf Mettchen",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8942.png",
    url: "#",
    tier: "partner",
  },
  {
    id: "chorona",
    name: "CHORONA Immobilien GmbH",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8943-300x113.jpg",
    url: "#",
    tier: "partner",
  },
  {
    id: "eberswalder-wurst",
    name: "Eberswalder Wurst",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8944.png",
    url: "#",
    tier: "partner",
  },
  {
    id: "autohaus-zemike",
    name: "Autohaus Zemike",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8945-768x1014.jpg",
    url: "#",
    tier: "partner",
  },
  {
    id: "forth-elektrotechnik",
    name: "FORTH Elektrotechnik GmbH",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8946-300x211.jpg",
    url: "#",
    tier: "partner",
  },
  {
    id: "ewe",
    name: "EWE",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_8948-300x179.webp",
    url: "#",
    tier: "partner",
  },
  {
    id: "iev",
    name: "IEV Industrieservice & Elektroinstallation Valkat",
    logoUrl: "/images/sponsors/Sponsoren/TOPPARTNER/IMG_9769-300x151.jpg",
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
      "h-32 px-10 py-6 rounded-2xl border-2 border-[#2e7d32]/20 bg-white shadow-md hover:shadow-xl hover:border-[#2e7d32]/50 hover:scale-[1.02]",
    premium:
      "h-24 px-8 py-4 rounded-xl border-t-4 border-t-[#2e7d32] border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-t-[#1b5e20]",
    partner:
      "h-16 px-6 py-3 rounded-lg border-l-4 border-l-[#2e7d32]/60 border border-gray-100 bg-white hover:border-l-[#2e7d32] hover:shadow-sm",
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
      <div className="bg-gradient-to-r from-[#2e7d32] via-[#1b5e20] to-[#1e2030] py-10 lg:py-14">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#a5d6a7]">
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
              <span className="rounded-full bg-[#2e7d32]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#2e7d32]">
                Premium Partner
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#2e7d32]/30 to-transparent" />
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
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] px-8 py-8 sm:flex-row sm:items-center">
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
            className="shrink-0 rounded-full bg-white px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-[#2e7d32] transition-colors hover:bg-gray-100"
          >
            Partnerschaft anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
