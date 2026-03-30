import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  History,
  Users,
  FileText,
  MapPin,
  ChevronRight,
  Calendar,
  Trophy,
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
    name: "Marcus Buelow",
    email: "marcus.buelow@fvpreussen-eberswalde.de",
    photo: "",
  },
  {
    role: "Schatzmeister",
    name: "Christian Mertinkat",
    email: "",
    photo: "/images/legacy/board/christian-melchert.jpg",
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

export default function VereinPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0e3a07] to-[#21a530] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
            <span className="text-white font-bold text-3xl font-['Playfair_Display',serif]">FVP</span>
          </div>
          <p className="text-[#81d742] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Seit 1919
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">FV Preussen Eberswalde</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Motor des Barnim – Fußball ist unsere Zukunft.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 space-y-16">
        {/* Quick nav */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {subPages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-[#21a530]/40 hover:shadow-md transition-all duration-200 p-5 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] flex items-center justify-center mb-3 group-hover:bg-[#21a530] transition-colors">
                  <Icon className="w-5 h-5 text-[#21a530] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{page.label}</h3>
                <p className="text-xs text-gray-500">{page.desc}</p>
                <ChevronRight className="w-4 h-4 text-[#21a530] mt-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            );
          })}
        </div>

        {/* About section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#21a530] text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Über uns
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Mehr als nur Fußball
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
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
                Als "Motor des Barnim" steht der Verein für Nachwuchsförderung,
                gesellschaftliches Engagement und eine starke lokale Gemeinschaft.
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-[#21a530] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#1a8f28] transition-colors text-sm"
              >
                Mitglied werden
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Calendar, value: "1919", label: "Gründungsjahr" },
              { icon: Users, value: "600+", label: "Mitglieder" },
              { icon: Trophy, value: "16", label: "Mannschaften" },
              { icon: MapPin, value: "Barnim", label: "Heimat" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                  <Icon className="w-6 h-6 text-[#21a530] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{item.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* History timeline */}
        <section>
          <SectionHeading
            label="Geschichte"
            title="Unsere Geschichte"
            align="left"
          />
          <div className="relative pl-6 border-l-2 border-[#21a530]/30 space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-[#21a530] border-2 border-white shadow" />
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <span className="text-[#21a530] font-bold text-sm">{m.year}</span>
                  <p className="text-gray-700 mt-1">{m.event}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {boardMembers.map((member) => (
              <div key={member.role} className="bg-white rounded-xl border border-gray-100 p-5">
                {member.photo ? (
                  <div className="mb-3 overflow-hidden rounded-xl border border-gray-100">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={360}
                      height={220}
                      className="h-28 w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="mb-3 flex h-28 items-center justify-center rounded-xl border border-gray-100 bg-[#e8f5e9]">
                    <Users className="h-8 w-8 text-[#21a530]" />
                  </div>
                )}
                <p className="text-xs font-bold text-[#21a530] uppercase tracking-wide mb-0.5">{member.role}</p>
                <p className="font-bold text-gray-900">{member.name}</p>
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-xs text-gray-400 hover:text-[#21a530] transition-colors mt-1 block">
                    {member.email}
                  </a>
                )}
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
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Stadion Pfefferwerk</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-[#21a530] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">Adresse</p>
                    <p>Pfefferwerkerstraße 9<br />16225 Eberswalde</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-4 h-4 text-[#21a530] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">Kapazität</p>
                    <p>4.500 Zuschauer, davon 300 überdachte Sitzplätze</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-64">
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
