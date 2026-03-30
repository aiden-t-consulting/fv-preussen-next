import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Users, Mail, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Vorstand | FV Preussen Eberswalde",
  description:
    "Der Vorstand des FV Preussen Eberswalde – unsere Verantwortlichen und Ansprechpartner.",
};

export const revalidate = 3600;

const vorstand = [
  {
    role: "Prasident",
    name: "Danko Jur",
    email: "info@fvpreussen-eberswalde.de",
    phone: "",
    bio: "Tragt die Gesamtverantwortung fur den Verein und reprasentiert den FV Preussen Eberswalde nach aussen.",
    photo: "/images/legacy/board/danko-jur.jpg",
  },
  {
    role: "1. Stellvertreter",
    name: "Kristian Stelse",
    email: "",
    phone: "",
    bio: "Unterstutzt den Prasidenten bei allen Vereinsangelegenheiten und leitet den Verein bei dessen Abwesenheit.",
    photo: "/images/legacy/board/kristian-stelse.jpg",
  },
  {
    role: "2. Stellvertreter / Nachwuchsleiter",
    name: "Marcus Blow",
    email: "",
    phone: "",
    bio: "Verantwortet die Nachwuchsarbeit und koordiniert die Jugendarbeit des Vereins.",
    photo: "/images/legacy/board/marcus-blow.jpg",
  },
  {
    role: "Schatzmeister",
    name: "Christian Mertinkat",
    email: "",
    phone: "",
    bio: "Verantwortlich fur die Finanzen des Vereins und die ordnungsgemasse Buchfuhrung.",
    photo: "",
  },
  {
    role: "Vorstandsmitglied",
    name: "Christian Melchert",
    email: "",
    phone: "",
    bio: "Aktives Vorstandsmitglied mit Zustandigkeit fur vereinsinterne Projekte und Veranstaltungen.",
    photo: "/images/legacy/board/christian-melchert.jpg",
  },
  {
    role: "Vorstandsmitglied",
    name: "Maik Wendland",
    email: "",
    phone: "",
    bio: "Aktives Vorstandsmitglied und Ansprechpartner fur Sponsoring und Offentlichkeitsarbeit.",
    photo: "/images/legacy/board/maik-wendland.jpg",
  },
];

const abteilungsleiter = [
  { rolle: "Herrenbereich", name: "N.N.", email: "" },
  { rolle: "Damenbereich", name: "N.N.", email: "" },
  { rolle: "Altherren", name: "N.N.", email: "" },
  { rolle: "Jugend U17/U19", name: "N.N.", email: "" },
  { rolle: "Jugend U13/U15", name: "N.N.", email: "" },
  { rolle: "Jugend U9/U11", name: "N.N.", email: "" },
];

export default function VorstandPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-[#0e3a07] to-[#21a530] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/verein"
            className="inline-flex items-center gap-2 text-[#81d742] hover:text-white transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Verein
          </Link>
          <p className="text-[#81d742] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Führung
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Unser Vorstand</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Die Personen, die den FV Preussen Eberswalde leiten und gestalten.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 space-y-16">
        {/* Board */}
        <section>
          <SectionHeading
            label="Vorstandsmitglieder"
            title="Geschäftsführender Vorstand"
            align="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vorstand.map((member) => (
              <div
                key={`${member.role}-${member.name}`}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {member.photo ? (
                  <div className="overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center bg-[#e8f5e9]">
                    <Users className="h-12 w-12 text-[#21a530]" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs font-bold text-[#21a530] uppercase tracking-wide mb-1">
                    {member.role}
                  </p>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{member.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{member.bio}</p>
                  <div className="space-y-1.5">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#21a530] transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#21a530] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {member.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Abteilungsleiter */}
        <section>
          <SectionHeading
            label="Abteilungen"
            title="Abteilungsleiter"
            align="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {abteilungsleiter.map((a) => (
              <div
                key={a.rolle}
                className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#21a530]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#21a530] uppercase tracking-wide">{a.rolle}</p>
                  <p className="font-semibold text-gray-900 text-sm">{a.name}</p>
                  {a.email && (
                    <a
                      href={`mailto:${a.email}`}
                      className="text-xs text-gray-400 hover:text-[#21a530] transition-colors"
                    >
                      {a.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-1">Haben Sie Fragen?</h3>
            <p className="text-gray-500 text-sm max-w-md">
              Unser Vorstand steht Ihnen gerne für allgemeine Anfragen, Mitgliedschaften oder
              Kooperationen zur Verfügung.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="shrink-0 inline-flex items-center gap-2 bg-[#21a530] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a8f28] transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            Kontakt aufnehmen
          </Link>
        </section>
      </div>
    </div>
  );
}
