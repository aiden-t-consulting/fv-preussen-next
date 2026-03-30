import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Award,
  Handshake,
  TrendingUp,
  Users,
  Megaphone,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllSponsors } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import type { Sponsor } from "@/types";

export const metadata: Metadata = {
  title: "Sponsoren & Partner | FV Preussen Eberswalde",
  description:
    "Unsere Sponsoren und Partner, die den FV Preussen Eberswalde unterstützen – und wie auch Sie Teil unserer Gemeinschaft werden können.",
};

export const revalidate = 3600;

// ─── Static fallback sponsors (shown when Sanity is not configured) ───────────
const FALLBACK_SPONSORS: Array<{
  id: string;
  name: string;
  tier: "hauptsponsor" | "premiumsponsor" | "partner";
  src: string;
  url?: string;
}> = [
  {
    id: "sparkasse-barnim",
    name: "Sparkasse Barnim",
    tier: "hauptsponsor",
    src: "/images/sponsors/sparkasse-barnim.jpg",
    url: "https://www.spk-barnim.de/",
  },
  {
    id: "fielmann",
    name: "Fielmann",
    tier: "premiumsponsor",
    src: "/images/legacy/sponsors/fielmann.png",
  },
  {
    id: "sportstiftung",
    name: "Sportstiftung der Sparkasse Barnim",
    tier: "premiumsponsor",
    src: "/images/legacy/sponsors/sportstiftung.jpg",
  },
  {
    id: "hotel-am-markt",
    name: "Hotel Am Markt",
    tier: "premiumsponsor",
    src: "/images/legacy/sponsors/hotel-am-markt.png",
  },
  {
    id: "hts",
    name: "HTS",
    tier: "partner",
    src: "/images/legacy/sponsors/hts.jpg",
  },
  {
    id: "accurat",
    name: "ACCURAT",
    tier: "partner",
    src: "/images/legacy/sponsors/accurat.jpg",
  },
  {
    id: "fitolino",
    name: "Fitolino",
    tier: "partner",
    src: "/images/legacy/sponsors/fitolino.png",
  },
  {
    id: "ksb",
    name: "Kreissportbund Barnim",
    tier: "partner",
    src: "/images/legacy/sponsors/ksb.jpg",
  },
  {
    id: "twe",
    name: "TWE",
    tier: "partner",
    src: "/images/legacy/sponsors/twe.jpg",
  },
  {
    id: "glg",
    name: "GLG",
    tier: "partner",
    src: "/images/legacy/sponsors/glg.jpg",
  },
];

// ─── Tier config ──────────────────────────────────────────────────────────────
const TIER_META = {
  hauptsponsor: { label: "Hauptsponsor", icon: Star, logoSize: 220 },
  premiumsponsor: { label: "Premium Partner", icon: Award, logoSize: 180 },
  partner: { label: "Partner", icon: Handshake, logoSize: 140 },
} as const;

// ─── Benefits shown in the "Warum Partner werden?" section ───────────────────
const benefits = [
  {
    icon: Users,
    title: "Reichweite",
    desc: "Erreichen Sie hunderte Zuschauer pro Heimspiel sowie unsere wachsende Online-Community.",
  },
  {
    icon: Megaphone,
    title: "Sichtbarkeit",
    desc: "Logo auf Trikots, Bandenwerbung, Website und Social-Media-Kanälen.",
  },
  {
    icon: TrendingUp,
    title: "Regionale Präsenz",
    desc: "Positionieren Sie Ihr Unternehmen als Teil der Eberswälder Gemeinschaft.",
  },
  {
    icon: Trophy,
    title: "VIP-Vorteile",
    desc: "Exklusive Einladungen zu Spielen und Vereinsveranstaltungen für Ihr Team.",
  },
];

// ─── Sponsor packages ─────────────────────────────────────────────────────────
const packages = [
  {
    name: "Partner",
    price: "ab 500 €",
    highlight: false,
    perks: [
      "Logo auf der Vereinswebsite",
      "Social-Media-Erwähnung",
      "2 Freikarten pro Heimspiel",
    ],
  },
  {
    name: "Premium Partner",
    price: "ab 1.500 €",
    highlight: true,
    perks: [
      "Alle Partner-Vorteile",
      "Bandenwerbung am Hauptplatz",
      "Logo auf Trainingsanzügen",
      "4 Freikarten pro Heimspiel",
      "Nennung in Spieltagsprogrammen",
    ],
  },
  {
    name: "Hauptsponsor",
    price: "auf Anfrage",
    highlight: false,
    perks: [
      "Alle Premium-Vorteile",
      "Trikotsponsor (Brust / Rücken)",
      "Exklusiver VIP-Bereich",
      "Pressekonferenz-Branding",
      "Unbegrenzte Freikarten",
      "Individuelle Vereinbarungen",
    ],
  },
];

// ─── Sanity SponsorCard ───────────────────────────────────────────────────────
function SanityCard({ sponsor }: { sponsor: Sponsor }) {
  const size = TIER_META[sponsor.tier].logoSize;
  const card = (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-[#2e7d32] hover:shadow-md transition-all duration-200 flex items-center justify-center px-8 py-6 h-28 group">
      {sponsor.logo ? (
        <Image
          src={urlFor(sponsor.logo).width(size).height(80).url()}
          alt={sponsor.name}
          width={size}
          height={80}
          className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <span className="text-gray-600 font-semibold text-center text-sm">{sponsor.name}</span>
      )}
    </div>
  );
  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
      {card}
    </a>
  ) : (
    card
  );
}

// ─── Static fallback card ─────────────────────────────────────────────────────
function FallbackCard({
  sponsor,
}: {
  sponsor: (typeof FALLBACK_SPONSORS)[number];
}) {
  const card = (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-[#2e7d32] hover:shadow-md transition-all duration-200 flex items-center justify-center px-8 py-6 h-28 group">
      <Image
        src={sponsor.src}
        alt={sponsor.name}
        width={180}
        height={70}
        className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
      {card}
    </a>
  ) : (
    card
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function SponsorenPage() {
  const sponsors = await getAllSponsors();
  const hasSanityData = sponsors.length > 0;

  const hauptsponsors = sponsors.filter((s) => s.tier === "hauptsponsor");
  const premiumsponsors = sponsors.filter((s) => s.tier === "premiumsponsor");
  const partners = sponsors.filter((s) => s.tier === "partner");

  const fallbackHaupt = FALLBACK_SPONSORS.filter((s) => s.tier === "hauptsponsor");
  const fallbackPremium = FALLBACK_SPONSORS.filter((s) => s.tier === "premiumsponsor");
  const fallbackPartner = FALLBACK_SPONSORS.filter((s) => s.tier === "partner");

  return (
    <div className="min-h-screen bg-[#f9fafb]">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#1b5e20] to-[#2e7d32] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#a5d6a7] hover:text-white transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
          <p className="text-[#a5d6a7] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Unsere Partner
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Sponsoren & Partner</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Ohne unsere Partner wäre das alles nicht möglich. Herzlichen Dank für eure
            Unterstützung – gemeinsam stärken wir den Fußball im Barnim.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 space-y-20">

        {/* ── Sponsor tiers ── */}
        <section className="space-y-14">

          {/* Hauptsponsor */}
          {(hasSanityData ? hauptsponsors.length > 0 : fallbackHaupt.length > 0) && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-[#2e7d32]/15 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#2e7d32]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Hauptsponsor</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {hasSanityData
                  ? hauptsponsors.map((s) => <SanityCard key={s._id} sponsor={s} />)
                  : fallbackHaupt.map((s) => <FallbackCard key={s.id} sponsor={s} />)}
              </div>
            </div>
          )}

          {/* Premium Partner */}
          {(hasSanityData ? premiumsponsors.length > 0 : fallbackPremium.length > 0) && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-[#2e7d32]/15 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#2e7d32]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Premium Partner</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-5">
                {hasSanityData
                  ? premiumsponsors.map((s) => <SanityCard key={s._id} sponsor={s} />)
                  : fallbackPremium.map((s) => <FallbackCard key={s.id} sponsor={s} />)}
              </div>
            </div>
          )}

          {/* Partner */}
          {(hasSanityData ? partners.length > 0 : fallbackPartner.length > 0) && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl bg-[#2e7d32]/15 flex items-center justify-center">
                  <Handshake className="w-5 h-5 text-[#2e7d32]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Partner</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {hasSanityData
                  ? partners.map((s) => <SanityCard key={s._id} sponsor={s} />)
                  : fallbackPartner.map((s) => <FallbackCard key={s.id} sponsor={s} />)}
              </div>
            </div>
          )}

          {hasSanityData && sponsors.length === 0 && (
            <p className="text-center text-gray-400 py-20">
              Sponsoreninformationen werden in Kürze veröffentlicht.
            </p>
          )}
          {!hasSanityData && FALLBACK_SPONSORS.length === 0 && (
            <p className="text-center text-gray-400 py-20">
              Sponsoreninformationen werden in Kurze veroffentlicht.
            </p>
          )}
        </section>

        {/* ── Why become a sponsor ── */}
        <section>
          <SectionHeading
            label="Partnerschaft"
            title="Warum Partner werden?"
            align="left"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="w-10 h-10 rounded-xl bg-[#f1f8e9] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#2e7d32]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Packages ── */}
        <section>
          <SectionHeading
            label="Angebote"
            title="Sponsoring-Pakete"
            align="left"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl border p-7 flex flex-col gap-5 ${
                  pkg.highlight
                    ? "bg-[#2e7d32] border-[#2e7d32] text-white shadow-lg shadow-[#2e7d32]/25"
                    : "bg-white border-gray-100"
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                      pkg.highlight ? "text-[#c5f080]" : "text-[#2e7d32]"
                    }`}
                  >
                    {pkg.name}
                  </p>
                  <p
                    className={`text-3xl font-bold ${
                      pkg.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {pkg.price}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      pkg.highlight ? "text-green-100" : "text-gray-400"
                    }`}
                  >
                    pro Saison
                  </p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          pkg.highlight ? "text-[#c5f080]" : "text-[#2e7d32]"
                        }`}
                      />
                      <span className={pkg.highlight ? "text-green-50" : "text-gray-600"}>
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kontakt?betreff=sponsoring"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-colors ${
                    pkg.highlight
                      ? "bg-white text-[#1b5e20] hover:bg-[#f0faf0]"
                      : "bg-[#2e7d32] text-white hover:bg-[#1b5e20]"
                  }`}
                >
                  Jetzt anfragen
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA band ── */}
        <section className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-1">
              Individuelle Partnerschaft?
            </h3>
            <p className="text-gray-500 text-sm max-w-md">
              Kein Paket passt zu Ihren Vorstellungen? Sprechen Sie uns direkt an –
              wir schnüren gemeinsam ein maßgeschneidertes Angebot.
            </p>
          </div>
          <Link
            href="/kontakt?betreff=sponsoring"
            className="shrink-0 inline-flex items-center gap-2 bg-[#2e7d32] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1b5e20] transition-colors text-sm"
          >
            Kontakt aufnehmen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
