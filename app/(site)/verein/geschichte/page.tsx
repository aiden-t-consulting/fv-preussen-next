import type { Metadata } from "next";
import Link from "next/link";
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
    period: "1909 – 1933",
    title: "Die Gründerjahre",
    description:
      "Am 1. Mai 1909 wurde der Fußball-Club Preussen 09 in Eberswalde ins Leben gerufen. Eine Handvoll fußballbegeisterter junger Männer legten den Grundstein für einen Verein, der die sportliche Geschichte der Stadt nachhaltig prägen sollte. In den ersten Jahren spielte der Club im städtischen Ligenbetrieb und erwarb sich schnell einen guten Ruf.",
    milestones: [
      { year: "1909", event: "Gründung als FC Preussen 09 Eberswalde" },
      { year: "1912", event: "Erste Teilnahme an der Kreismeisterschaft" },
      { year: "1920", event: "Aufstieg in die Bezirksklasse" },
    ],
  },
  {
    period: "1933 – 1945",
    title: "Die Kriegsjahre",
    description:
      "Wie viele Vereine litt auch FC Preussen 09 unter den Folgen des Zweiten Weltkriegs. Der Spielbetrieb wurde durch Einberufungen und Kriegswirren stark eingeschränkt. Zahlreiche Mitglieder mussten an die Front; ein geregelter Trainingsbetrieb war kaum möglich.",
    milestones: [
      { year: "1939", event: "Stark eingeschränkter Spielbetrieb durch Kriegsbeginn" },
      { year: "1945", event: "Kriegsende – Vereinsaktivitäten vollständig eingestellt" },
    ],
  },
  {
    period: "1945 – 1989",
    title: "Neustart in der DDR",
    description:
      "Nach Kriegsende wurde der Verein 1946 als ZSG Eberswalde Nord neu gegründet. In der DDR-Zeit durchlief der Club mehrere Umbenennungen und Strukturveränderungen. Mit dem Aufstieg in die DDR-Liga 1972 erreichte der Verein den sportlichen Höhepunkt dieser Epoche.",
    milestones: [
      { year: "1946", event: "Neustart als ZSG Eberswalde Nord" },
      { year: "1950", event: "Umbenennung zur BSG Motor Eberswalde" },
      { year: "1972", event: "Historischer Aufstieg in die DDR-Liga" },
      { year: "1985", event: "Rückkehr in den Landesligabetrieb" },
    ],
  },
  {
    period: "1990 – 2010",
    title: "Wende und Neuausrichtung",
    description:
      "Nach der Wende wurde der Verein 1990 in FC Preussen Eberswalde umbenannt und kehrte zu seinen Wurzeln zurück. Die Neunziger Jahre brachten sportliche Erfolge: 1994 errang der Verein die Landesmeisterschaft Brandenburg und kämpfte um den Aufstieg in den überregionalen Fußball.",
    milestones: [
      { year: "1990", event: "Umbenennung in FC Preussen Eberswalde" },
      { year: "1994", event: "Landesmeisterschaft Brandenburg" },
      { year: "2001", event: "Gründung der Nachwuchsabteilung mit eigenem Konzept" },
      { year: "2008", event: "Erneuerung der Vereinsinfrastruktur am Westendstadion" },
    ],
  },
  {
    period: "2011 – heute",
    title: "Der FV Preussen Eberswalde",
    description:
      "2011 fusionierten FC Preussen Eberswalde und weitere lokale Vereine zum heutigen FV Preussen Eberswalde e.V. Seitdem wächst der Club kontinuierlich – mit modernen Strukturen, einem starken Nachwuchsbereich und dem Westendstadion als sportlichem Herzstück. Als «Motor des Barnim» ist der FVP heute einer der mitgliederstärksten Vereine in der Region.",
    milestones: [
      { year: "2011", event: "Fusion zum FV Preussen Eberswalde e.V." },
      { year: "2016", event: "Modernisierung des Kunstrasenplatzes im Westendstadion" },
      { year: "2020", event: "Über 500 Mitglieder – neuer Vereinsrekord" },
      { year: "2024", event: "Weiterentwicklung des Jugendleistungszentrums" },
    ],
  },
];

export default function GeschichtePage() {
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
            Der FV Preussen Eberswalde blickt auf eine bewegte Geschichte zurück, die eng mit der
            Geschichte der Stadt Eberswalde verwoben ist. Kriege, politische Systeme und gesellschaftliche
            Umbrüche haben den Verein geprägt – und doch steht er heute stärker denn je.
          </p>
        </div>

        {/* Eras */}
        <div className="space-y-14">
          {eras.map((era) => (
            <section key={era.period}>
              <SectionHeading label={era.period} title={era.title} align="left" />
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <p className="text-gray-600 leading-relaxed">{era.description}</p>
                </div>
                <div className="relative pl-5 border-l-2 border-[#21a530]/30 space-y-5">
                  {era.milestones.map((m) => (
                    <div key={m.year} className="relative">
                      <div className="absolute -left-5.25 w-4 h-4 rounded-full bg-[#21a530] border-2 border-white shadow" />
                      <div className="bg-white rounded-xl border border-gray-100 p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-3.5 h-3.5 text-[#21a530]" />
                          <span className="text-[#21a530] font-bold text-sm">{m.year}</span>
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
        <div className="mt-16 bg-linear-to-br from-[#0e3a07] to-[#21a530] rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Teil unserer Geschichte werden</h2>
          <p className="text-gray-200 mb-6 max-w-xl mx-auto">
            Schreibe mit uns die nächsten Kapitel. Werde Mitglied oder Sponsor des FV Preussen Eberswalde.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-[#21a530] px-6 py-3 rounded-xl font-semibold hover:bg-[#e8f5e9] transition-colors text-sm"
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





