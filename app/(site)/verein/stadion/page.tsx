import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Bus,
  Car,
  Clock,
  Phone,
  Mail,
  Navigation,
  ParkingCircle,
  BookOpen,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Stadion & Anfahrt | FV Preussen Eberswalde",
  description:
    "Stadion Pfefferwerk in Eberswalde – Adresse, Anfahrt mit Bus, Bahn und Auto sowie alle wichtigen Informationen.",
};

export const revalidate = 3600;

const facilities = [
  { label: "Hauptrasenplatz", desc: "Naturgrasplatz für Meisterschaftsspiele der 1. Herren" },
  { label: "Kunstrasenplatz", desc: "Modernisierter Kunstrasen für Training und Jugendspiele" },
  { label: "Nebenplatz", desc: "Weiterer Trainingsplatz für alle Mannschaften" },
  { label: "Vereinsgaststätte", desc: "Geselliger Treffpunkt direkt am Stadion" },
  { label: "Umkleidekabinen", desc: "Moderne Kabinen für Heim- und Gastmannschaften" },
  { label: "Tribüne", desc: "Überdachte Sitzplatztribüne für 300 Zuschauer" },
];

const publicTransport = [
  {
    icon: Bus,
    title: "Bus",
    lines: [
      "Linie 862 – Haltestelle «Westend»",
      "Linie 901 – Haltestelle «Pfefferwerkerstraße»",
    ],
  },
];

const stadionhefte = [
  {
    title: "Preussen Stadionheft 2018/19",
    image: "/images/legacy/stadion/stadionheft-18-19.jpg",
    source: "https://fvpreussen-eberswalde.de/wp-content/uploads/2018/10/PreussenStadionheft-18-19.jpg",
  },
  {
    title: "Preussen Stadionheft 2017/18",
    image: "/images/legacy/stadion/stadionheft-17-18.jpg",
    source: "https://fvpreussen-eberswalde.de/wp-content/uploads/2018/10/PreussenStadionheft-17-18.jpg",
  },
];

export default function StadionPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0e3a07] to-[#21a530] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/verein"
            className="inline-flex items-center gap-2 text-[#81d742] hover:text-white transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Verein
          </Link>
          <p className="text-[#81d742] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Heimstätte
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Stadion Pfefferwerk</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Pfefferwerkerstraße 9 · 16225 Eberswalde – das Herzstück unseres Vereins.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 space-y-16">
        {/* Map + Info */}
        <section className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-80 lg:h-full lg:min-h-[420px]">
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

          {/* Details */}
          <div className="space-y-5">
            {/* Address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#21a530]" />
                Adresse
              </h2>
              <address className="not-italic text-gray-600 leading-relaxed">
                Stadion Pfefferwerk
                <br />
                Pfefferwerkerstraße 9
                <br />
                16225 Eberswalde
              </address>
              <a
                href="https://maps.google.com/?q=Pfefferwerkerstra%C3%9Fe+9,+16225+Eberswalde"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#21a530] text-sm font-semibold mt-4 hover:underline"
              >
                <Navigation className="w-4 h-4" />
                In Google Maps öffnen
              </a>
            </div>

            {/* Capacity */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Kapazität & Zeiten</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <dt className="text-gray-500 w-40 shrink-0">Gesamtkapazität</dt>
                  <dd className="font-semibold text-gray-900">4.500 Zuschauer</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-gray-500 w-40 shrink-0">Sitzplätze (überdacht)</dt>
                  <dd className="font-semibold text-gray-900">300</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="text-gray-500 w-40 shrink-0">Einlass Heimspiele</dt>
                  <dd className="font-semibold text-gray-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#21a530]" />
                    60 min vor Anpfiff
                  </dd>
                </div>
              </dl>
            </div>

            {/* Contact at stadium */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Kontakt</h2>
              <div className="space-y-2.5 text-sm">
                <a
                  href="mailto:info@fvpreussen-eberswalde.de"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#21a530] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#21a530] shrink-0" />
                  info@fvpreussen-eberswalde.de
                </a>
                <a
                  href="tel:+493334"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#21a530] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#21a530] shrink-0" />
                  Telefon auf Anfrage
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section>
          <SectionHeading label="Anlagen" title="Unsere Sportanlagen" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((f) => (
              <div key={f.label} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="w-9 h-9 rounded-lg bg-[#e8f5e9] flex items-center justify-center mb-3">
                  <MapPin className="w-4 h-4 text-[#21a530]" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{f.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Legacy stadium magazine */}
        <section>
          <SectionHeading label="Archiv" title="Stadionheft" align="left" />
          <div className="grid sm:grid-cols-2 gap-6">
            {stadionhefte.map((item) => (
              <a
                key={item.title}
                href={item.source}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#21a530]/40 hover:shadow-md transition-all"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={640}
                  height={420}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4 flex items-center justify-between gap-3">
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#21a530] font-semibold">
                    <BookOpen className="w-4 h-4" />
                    Offnen
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Getting there */}
        <section>
          <SectionHeading label="Anfahrt" title="So kommen Sie zu uns" align="left" />
          <div className="grid md:grid-cols-3 gap-6">
            {/* By car */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center mb-4">
                <Car className="w-5 h-5 text-[#21a530]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Mit dem Auto</h3>
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>
                  Über die <strong>B167</strong> bis Eberswalde, dann Richtung Stadtmitte.
                  Pfefferwerkerstraße folgen.
                </p>
                <p>Aus Berlin: A11 Ausfahrt Finowfurt, weiter auf B167 Richtung Eberswalde.</p>
              </div>
            </div>

            {/* By public transport */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center mb-4">
                <Bus className="w-5 h-5 text-[#21a530]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Mit Bus & Bahn</h3>
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>
                  <strong>RE3 / RB63</strong> bis Bahnhof Eberswalde.
                </p>
                {publicTransport[0].lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                <p>Ca. 10 Min. Fußweg vom Bahnhof.</p>
              </div>
            </div>

            {/* Parking */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center mb-4">
                <ParkingCircle className="w-5 h-5 text-[#21a530]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Parken</h3>
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>Kostenfreie Parkplätze direkt am Stadion (begrenzte Anzahl).</p>
                <p>Weitere Parkflächen in der Pfefferwerkerstraße und den umliegenden Straßen verfügbar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-1">Kommen Sie zu uns ins Stadion!</h3>
            <p className="text-gray-500 text-sm max-w-md">
              Erleben Sie unsere Heimspiele live und unterstützen Sie den FV Preussen Eberswalde.
              Alle Spieltermine finden Sie in unserem Spielplan.
            </p>
          </div>
          <Link
            href="/berichte"
            className="shrink-0 inline-flex items-center gap-2 bg-[#21a530] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1a8f28] transition-colors text-sm"
          >
            <MapPin className="w-4 h-4" />
            Zu den Spielberichten
          </Link>
        </section>
      </div>
    </div>
  );
}

