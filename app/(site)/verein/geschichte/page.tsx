import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Geschichte | FV Preussen Eberswalde",
  description:
    "Über 100 Jahre Geschichte des FV Preussen Eberswalde – von der Gründung 1909 bis heute.",
};

export const revalidate = 3600;

const eras = [
  {
    period: "1909 - 1945",
    title: "Von Preussen 09 bis zum Kriegsende",
    description:
      "Am 1. Juli 1909 wurde der Fussball-Club Preussen 09 gegrundet und nahm direkt am organisierten Spielbetrieb teil. Bis zum Ersten Weltkrieg arbeitete sich die Mannschaft von der dritten in die erste Kreisklasse vor. In den 1920er Jahren folgte der Aufstieg in die Kreisliga, damals die zweithochste Spielklasse. Mit Beginn des Zweiten Weltkriegs brach der regelmassige Spielbetrieb weitgehend zusammen.",
    milestones: [
      { year: "1909", event: "Gründung als FC Preussen 09 Eberswalde" },
      { year: "1922/23", event: "Aufstieg in die Kreisliga" },
      { year: "1936", event: "Abstieg in die Kreisliga" },
      { year: "1939", event: "Spielbetrieb durch den Krieg stark eingeschrankt" },
    ],
  },
  {
    period: "1946 - 1971",
    title: "Neustart als ZSG und BSG Motor",
    description:
      "1946 wurde der alte Vereinsname abgelegt und der Neustart erfolgte als ZSG Eberswalde Nord. Nach mehreren Umbenennungen spielte der Verein als BSG Motor Eberswalde. In den 1950er und 1960er Jahren gewann Motor zahlreiche Bezirksmeisterschaften und erreichte mehrfach Aufstiegsrunden zur DDR-Liga.",
    milestones: [
      { year: "1946", event: "Neustart als ZSG Eberswalde Nord" },
      { year: "1948", event: "Umbenennung in ZSG Eintracht Eberswalde" },
      { year: "1949", event: "Neuer Name: BSG Stahl, kurz darauf BSG Motor" },
      { year: "1955/56", event: "Bezirksmeisterschaft Frankfurt/Oder" },
      { year: "1960", event: "Wiederaufstieg in die II. DDR-Liga" },
    ],
  },
  {
    period: "1972 - 1990",
    title: "Zwischen DDR-Liga und Bezirksliga",
    description:
      "In der Saison 1971/72 gelang der Aufstieg in die DDR-Liga. In den folgenden Jahren wechselte Motor mehrfach zwischen DDR-Liga und Bezirksliga, blieb aber sportlich eine der pragnenden Mannschaften im Bezirk. 1990 sicherte sich das Team den Verbleib auf NOFV-Ebene.",
    milestones: [
      { year: "1972", event: "Aufstieg in die DDR-Liga" },
      { year: "1975", event: "Direkter Wiederaufstieg nach Bezirksliga-Meistertitel" },
      { year: "1983", event: "Letzter DDR-Liga-Aufstieg der Motor-Phase" },
      { year: "1990", event: "Eingliederung in die NOFV-Liga" },
    ],
  },
  {
    period: "1991 - heute",
    title: "Vom SV Motor zum FV Preussen",
    description:
      "Nach dem Ende der Betriebssportgemeinschaft wurde aus Motor wieder ein eingetragener Sportverein. 1994 gelang die Landesmeisterschaft Brandenburg. 1995 trat die Fussballabteilung als FV Motor Eberswalde eigenstandig an. 2011 wurde die Fusion zum FV Preussen Eberswalde urkundlich besiegelt. Seitdem entwickelt der Verein seine Nachwuchsarbeit, Infrastruktur und Heimstatte im Westendstadion kontinuierlich weiter.",
    milestones: [
      { year: "1994", event: "Landesmeisterschaft Brandenburg" },
      { year: "1995", event: "Neustart als FV Motor Eberswalde" },
      { year: "2011", event: "Fusion zum FV Preussen Eberswalde" },
      { year: "2012/13", event: "Bau und Einweihung des Bernhard-Hensch-Hauses" },
      { year: "2016", event: "Erneuerung des Kunstrasenplatzes im Westendstadion" },
    ],
  },
];

const historyPhotos = [
  { src: "/images/legacy/history/preussen09team.jpg", title: "Preussen 09" },
  { src: "/images/legacy/history/svp09team.jpg", title: "SVP 09" },
  { src: "/images/legacy/history/svp43team.jpg", title: "SVP 43" },
  { src: "/images/legacy/history/ewnordteam.jpg", title: "Eberswalde Nord" },
  { src: "/images/legacy/history/motor52team.jpg", title: "Motor 52" },
];

export default function GeschichtePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-[#1b5e20] to-[#2e7d32] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/verein"
            className="inline-flex items-center gap-2 text-[#a5d6a7] hover:text-white transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Verein
          </Link>
          <p className="text-[#a5d6a7] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Über uns
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Unsere Geschichte</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Über 115 Jahre Leidenschaft, Wandel und Beständigkeit im Herzen des Barnim.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        {/* Intro */}
        <div className="max-w-3xl mb-14">
          <p className="text-gray-600 leading-relaxed text-lg">
            Der Verein wurde am 1. Juli 1909 als Fussballclub Preussen 09 gegrundet.
            Die Historie fuhrt uber ZSG Eberswalde Nord und BSG Motor Eberswalde bis zum
            heutigen FV Preussen Eberswalde. Die Entwicklung des Clubs spiegelt mehr als
            ein Jahrhundert regionaler Fussballgeschichte im Barnim wider.
          </p>
        </div>

        <section className="mb-14">
          <SectionHeading label="Archiv" title="Historische Mannschaftsfotos" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {historyPhotos.map((photo) => (
              <div key={photo.src} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={300}
                  height={220}
                  className="w-full h-32 object-cover"
                />
                <p className="text-xs font-semibold text-gray-600 p-3">{photo.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Eras */}
        <div className="space-y-14">
          {eras.map((era) => (
            <section key={era.period}>
              <SectionHeading label={era.period} title={era.title} align="left" />
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <p className="text-gray-600 leading-relaxed">{era.description}</p>
                </div>
                <div className="relative pl-5 border-l-2 border-[#2e7d32]/30 space-y-5">
                  {era.milestones.map((m) => (
                    <div key={m.year} className="relative">
                      <div className="absolute -left-5.25 w-4 h-4 rounded-full bg-[#2e7d32] border-2 border-white shadow" />
                      <div className="bg-white rounded-xl border border-gray-100 p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-3.5 h-3.5 text-[#2e7d32]" />
                          <span className="text-[#2e7d32] font-bold text-sm">{m.year}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{m.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-linear-to-br from-[#1b5e20] to-[#2e7d32] rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Teil unserer Geschichte werden</h2>
          <p className="text-gray-200 mb-6 max-w-xl mx-auto">
            Schreibe mit uns die nächsten Kapitel. Werde Mitglied oder Sponsor des FV Preussen Eberswalde.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-[#2e7d32] px-6 py-3 rounded-xl font-semibold hover:bg-[#f1f8e9] transition-colors text-sm"
            >
              Mitglied werden
            </Link>
            <Link
              href="/sponsoren"
              className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors text-sm"
            >
              Sponsor werden
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}





