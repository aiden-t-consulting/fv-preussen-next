import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Award, Handshake } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllSponsors } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import type { Sponsor } from "@/types";

export const metadata: Metadata = {
  title: "Sponsoren & Partner",
  description:
    "Unsere Sponsoren und Partner, die den FV Preussen Eberswalde unterstützen.",
};

export const revalidate = 3600;

const TIER_META = {
  hauptsponsor: {
    label: "Hauptsponsor",
    icon: Star,
    color: "from-[#15540a] to-[#21a530]",
    logoSize: 220,
  },
  premiumsponsor: {
    label: "Premium Partner",
    icon: Award,
    color: "from-[#21a530] to-[#81d742]",
    logoSize: 180,
  },
  partner: {
    label: "Partner",
    icon: Handshake,
    color: "from-neutral-100 to-neutral-200",
    logoSize: 140,
  },
} as const;

function SponsorCard({ sponsor, size }: { sponsor: Sponsor; size: "lg" | "md" | "sm" }) {
  const dimensions = { lg: "h-28", md: "h-20", sm: "h-16" }[size];
  const content = (
    <div className={`relative ${dimensions} bg-white rounded-xl border border-gray-200 hover:border-[#21a530] hover:shadow-md transition-all duration-200 flex items-center justify-center px-6 py-4 group`}>
      {sponsor.logo ? (
        <Image
          src={urlFor(sponsor.logo).width(TIER_META[sponsor.tier].logoSize).height(80).url()}
          alt={sponsor.name}
          width={TIER_META[sponsor.tier].logoSize}
          height={80}
          className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <span className="text-gray-500 font-semibold text-center">{sponsor.name}</span>
      )}
    </div>
  );

  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
      {content}
    </a>
  ) : (
    content
  );
}

export default async function SponsorenPage() {
  const sponsors = await getAllSponsors();

  const hauptsponsors = sponsors.filter((s) => s.tier === "hauptsponsor");
  const premiumsponsors = sponsors.filter((s) => s.tier === "premiumsponsor");
  const partners = sponsors.filter((s) => s.tier === "partner");

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-[#15540a] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#81d742] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Unsere Partner
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">Sponsoren & Partner</h1>
          <p className="mt-4 text-gray-300 max-w-xl">
            Ohne unsere Partner wäre das alles nicht möglich. Herzlichen Dank für
            eure Unterstützung!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 space-y-14">
        {/* Hauptsponsor */}
        {hauptsponsors.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#21a530]/20 flex items-center justify-center">
                <Star className="w-4 h-4 text-[#21a530]" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Hauptsponsor</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {hauptsponsors.map((s) => (
                <SponsorCard key={s._id} sponsor={s} size="lg" />
              ))}
            </div>
          </section>
        )}

        {/* Premium */}
        {premiumsponsors.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#21a530]/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-[#21a530]" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Premium Partner</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {premiumsponsors.map((s) => (
                <SponsorCard key={s._id} sponsor={s} size="md" />
              ))}
            </div>
          </section>
        )}

        {/* Partners */}
        {partners.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#21a530]/20 flex items-center justify-center">
                <Handshake className="w-4 h-4 text-[#21a530]" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Partner</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((s) => (
                <SponsorCard key={s._id} sponsor={s} size="sm" />
              ))}
            </div>
          </section>
        )}

        {sponsors.length === 0 && (
          <p className="text-center text-gray-400 py-20">
            Sponsoreninformationen werden in Kürze veröffentlicht.
          </p>
        )}

        {/* Become a sponsor */}
        <section className="bg-gradient-to-r from-[#15540a] to-[#21a530] rounded-3xl p-10 lg:p-14 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Werden Sie unser Partner!
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto mb-8 text-lg">
            Unterstützen Sie den Fußball im Barnim und profitieren Sie von attraktiven
            Werbemöglichkeiten. Wir bieten Ihnen individuelle Sponsoring-Pakete.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/kontakt?betreff=sponsoring"
              className="inline-flex items-center gap-2 bg-white text-[#15540a] px-7 py-3.5 rounded-xl font-bold hover:bg-[#f0faf0] transition-colors"
            >
              Jetzt Kontakt aufnehmen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
