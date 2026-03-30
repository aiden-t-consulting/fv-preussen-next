import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  History,
  Users,
  FileText,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Über den Verein",
  description:
    "Geschichte, Vorstand, Satzung und Stadioninformationen des FV Preussen Eberswalde e.V.",
};

const boardMembers = [
  {
    role: "Präsident",
    name: "Danko Jur",
    email: "info@fvpreussen-eberswalde.de",
    photo: "/images/legacy/board/danko-jur.jpg",
  },
  {
    role: "1. Stellvertreter",
    name: "Kristian Stelse",
    email: "",
    photo: "/images/legacy/board/kristian-stelse.jpg",
  },
  {
    role: "2. Stellvertreter / Nachwuchsleiter",
    name: "Marcus Blow",
    email: "",
    photo: "/images/legacy/board/marcus-blow.jpg",
  },
  {
    role: "Schatzmeister",
    name: "Christian Mertinkat",
    email: "",
    photo: "",
  },
  {
    role: "Vorstandsmitglied",
    name: "Christian Melchert",
    email: "",
    photo: "/images/legacy/board/christian-melchert.jpg",
  },
  {
    role: "Vorstandsmitglied",
    name: "Maik Wendland",
    email: "",
    photo: "/images/legacy/board/maik-wendland.jpg",
  },
];

const milestones = [
  { year: "1909", event: "Gründung als Fußballclub Preussen 09" },
  { year: "1946", event: "Neustart nach dem Krieg als ZSG Eberswalde Nord" },
  { year: "1972", event: "Aufstieg in die DDR-Liga" },
  { year: "1994", event: "Landesmeisterschaft Brandenburg" },
  { year: "2011", event: "Fusion zum FV Preussen Eberswalde" },
  { year: "2016", event: "Modernisierung des Kunstrasenplatzes im Westendstadion" },
];

const subPages = [
  { href: "/verein/geschichte", icon: History, label: "Geschichte", desc: "Über 100 Jahre Vereinsgeschichte" },
  { href: "/verein/vorstand", icon: Users, label: "Vorstand", desc: "Unsere Verantwortlichen" },
  { href: "/verein/dokumente", icon: FileText, label: "Satzung & Dokumente", desc: "Offizielle Vereinsdokumente" },
  { href: "/verein/stadion", icon: MapPin, label: "Stadion & Anfahrt", desc: "Pfefferwerkerstraße 9, Eberswalde" },
];

const HERO_STATS = [
  { value: "1909", label: "Gegründet" },
  { value: "600+", label: "Mitglieder" },
  { value: "16", label: "Teams" },
  { value: "1", label: "Stadion" },
];

export default function VereinPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#111111] via-[#1b5e20] to-[#2e7d32] py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          {/* Logo circle */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/30">
            <Image
              src="/images/logo.png"
              alt="FV Preussen Eberswalde Logo"
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
          </div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a5d6a7]">
            Seit 1909
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white [font-family:var(--font-club)] md:text-6xl">
            FV Preussen Eberswalde
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Motor des Barnim &mdash; Fu&szlig;ball ist unsere Zukunft.
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="py-5 text-center">
                <div className="text-2xl font-bold text-white [font-family:var(--font-club)]">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14">
        {/* Quick nav */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {subPages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col items-center rounded-2xl border-2 border-transparent bg-white p-5 text-center transition-all duration-200 hover:border-[#2e7d32] hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f8e9] transition-colors group-hover:bg-[#2e7d32]">
                  <Icon className="h-5 w-5 text-[#2e7d32] transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-gray-900">{page.label}</h3>
                <p className="text-xs text-gray-500">{page.desc}</p>
                <ChevronRight className="mt-2 h-4 w-4 text-[#2e7d32] transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>

        {/* About section */}
        <section className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#2e7d32]">
              Über uns
            </span>
            <h2 className="mb-5 text-3xl font-bold text-gray-900 md:text-4xl">
              Mehr als nur Fu&szlig;ball
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>
                Der Verein wurde 1909 als FC Preussen 09 gegründet und hat sich über
                mehr als ein Jahrhundert hinweg als feste Größe im Barnim entwickelt.
                Nach mehreren historischen Namenswechseln entstand 2011 der heutige
                FV Preussen Eberswalde.
              </p>
              <p>
                Heute vereint der Club Leistungs- und Breitensport: von den Bambini- und
                Nachwuchsteams bis in den Herren- und Altherrenbereich. Das Westendstadion
                mit Hauptplatz, Kunstrasen und Nebenplatz bildet dabei das sportliche Zentrum.
              </p>
              <p>
                Als &quot;Motor des Barnim&quot; steht der Verein für Nachwuchsförderung,
                gesellschaftliches Engagement und eine starke lokale Gemeinschaft.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2e7d32] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1b5e20]"
              >
                Mitglied werden
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Visual block */}
          <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b5e20] to-[#2e7d32] p-12">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                <Image
                  src="/images/logo.png"
                  alt="FV Preussen Eberswalde"
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                />
              </div>
              <p className="text-lg font-bold text-white [font-family:var(--font-club)]">
                FV Preussen Eberswalde
              </p>
              <p className="mt-1 text-sm text-[#a5d6a7]">Gegründet 1909</p>
            </div>
          </div>
        </section>

        {/* History timeline */}
        <section>
          <SectionHeading
            label="Geschichte"
            title="Unsere Geschichte"
            align="left"
          />
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-5">
                {/* Dot + line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2e7d32] text-xs font-bold text-white shadow">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="mt-1 w-0.5 flex-1 bg-[#2e7d32]/20" style={{ minHeight: "1.5rem" }} />
                  )}
                </div>
                {/* Card */}
                <div className="mb-2 flex-1 rounded-xl border border-gray-100 bg-white p-5">
                  <span className="text-sm font-bold text-[#2e7d32]">{m.year}</span>
                  <p className="mt-1 text-gray-700">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Board members */}
        <section>
          <SectionHeading
            label="Vorstand"
            title="Unser Vorstand"
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((member) => (
              <div
                key={`${member.role}-${member.name}`}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white"
              >
                {/* Photo area with role badge */}
                <div className="relative">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={400}
                      height={160}
                      className="h-40 w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-[#f1f8e9]">
                      <Users className="h-10 w-10 text-[#2e7d32]" />
                    </div>
                  )}
                  <div className="absolute left-3 top-3 rounded-full bg-[#2e7d32] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    {member.role}
                  </div>
                </div>
                {/* Name + email */}
                <div className="p-4">
                  <p className="font-bold text-gray-900">{member.name}</p>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-1 block text-xs text-gray-400 transition-colors hover:text-[#2e7d32]"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stadium */}
        <section>
          <SectionHeading
            label="Heimstätte"
            title="Unser Stadion"
            align="left"
          />
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Stadion Pfefferwerk</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2e7d32]" />
                  <div>
                    <p className="font-semibold text-gray-800">Adresse</p>
                    <p>Pfefferwerkerstra&szlig;e 9<br />16225 Eberswalde</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#2e7d32]" />
                  <div>
                    <p className="font-semibold text-gray-800">Kapazität</p>
                    <p>4.500 Zuschauer, davon 300 überdachte Sitzplätze</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-64 overflow-hidden rounded-2xl border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2406.6!2d13.8055!3d52.8342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDUwJzAzLjEiTiAxM8KwNDgnMTkuOCJF!5e0!3m2!1sde!2sde!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Stadion Pfefferwerk Eberswalde"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
