import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Download, ExternalLink, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Satzung & Dokumente | FV Preussen Eberswalde",
  description:
    "Satzung, Beitragsordnung und offizielle Vereinsdokumente des FV Preussen Eberswalde e.V.",
};

export const revalidate = 3600;

const documents = [
  {
    category: "Vereinsdokumente",
    items: [
      {
        title: "DIE SATZUNG",
        description: "Satzung des FV Preussen Eberswalde in der auf der Bestandsseite veroffentlichten Fassung.",
        type: "PDF",
        available: true,
        url: "https://fvpreussen-eberswalde.de/wp-content/uploads/2024/08/Satzung-FVP-16-11-2023.pdf",
      },
      {
        title: "Die Finanz- und Beitragsordnung",
        description: "Regelung zu Beitragen und finanziellen Rahmenbedingungen des Vereins.",
        type: "PDF",
        available: true,
        url: "https://fvpreussen-eberswalde.de/wp-content/uploads/2024/08/Finanz-und-Beitragsordnung-2024-2.pdf",
      },
    ],
  },
  {
    category: "Formulare",
    items: [
      {
        title: "DER AUFNAHMEANTRAG",
        description: "Mitgliedsantrag in der auf der Bestandsseite veroffentlichten Fassung.",
        type: "PDF",
        available: true,
        url: "https://fvpreussen-eberswalde.de/wp-content/uploads/2024/07/FVP-Mitgliedsantrag-Neu-2024.pdf",
      },
      {
        title: "SEPA-Lastschriftmandat",
        description: "Einzugsermächtigung für Mitgliedsbeiträge per Lastschriftverfahren.",
        type: "PDF",
        available: false,
      },
      {
        title: "Abmeldung / Kündigung",
        description: "Formular zur Kündigung der Vereinsmitgliedschaft.",
        type: "PDF",
        available: false,
      },
    ],
  },
  {
    category: "Hinweise",
    items: [
      {
        title: "Weitere Dokumente auf Anfrage",
        description: "Falls ein Dokument nicht direkt verfugbar ist, senden wir es gerne per E-Mail zu.",
        type: "Info",
        available: false,
      },
    ],
  },
];

const membership = [
  { category: "Erwachsene", price: "8,00 €", period: "/ Monat" },
  { category: "Jugendliche (bis 18 Jahre)", price: "4,00 €", period: "/ Monat" },
  { category: "Familienmitgliedschaft", price: "14,00 €", period: "/ Monat" },
  { category: "Passive Mitglieder", price: "3,00 €", period: "/ Monat" },
  { category: "Ehrenmitglieder", price: "beitragsfrei", period: "" },
];

export default function DokumentePage() {
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
            Transparenz
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Satzung & Dokumente</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Offizielle Vereinsdokumente, Formulare und Protokolle zum Download.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 space-y-16">
        {/* Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-blue-700 text-sm">
          Bei dringenden Anfragen wenden Sie sich bitte direkt an{" "}
            <a
              href="mailto:info@fvpreussen-eberswalde.de"
              className="underline hover:text-blue-900"
            >{"info@fvpreussen-eberswalde.de"}</a>.
          </p>
        </div>

        {/* Documents */}
        {documents.map((group) => (
          <section key={group.category}>
            <SectionHeading label={group.category} title={group.category} align="left" />
            <div className="space-y-3">
              {group.items.map((doc) => (
                <div
                  key={doc.title}
                  className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-[#21a530]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 text-sm">{doc.title}</h3>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {doc.type}
                      </span>
                      {!doc.available && (
                        <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                          Demnächst
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{doc.description}</p>
                  </div>
                  {doc.available && doc.url ? (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 bg-[#21a530] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1a8f28] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>
                  ) : (
                    <button
                      disabled
                      className="shrink-0 flex items-center gap-1.5 bg-gray-100 text-gray-400 text-xs font-semibold px-4 py-2 rounded-lg cursor-not-allowed"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Membership fees */}
        <section>
          <SectionHeading label="Beiträge" title="Mitgliedsbeiträge" align="left" />
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f0fdf4] border-b border-gray-100">
                  <th className="text-left p-4 font-bold text-gray-700">Kategorie</th>
                  <th className="text-right p-4 font-bold text-gray-700">Beitrag</th>
                </tr>
              </thead>
              <tbody>
                {membership.map((m) => (
                  <tr
                    key={m.category}
                    className={m.category !== membership[membership.length - 1].category ? "border-b border-gray-50" : ""}
                  >
                    <td className="p-4 text-gray-700">{m.category}</td>
                    <td className="p-4 text-right font-semibold text-gray-900">
                      {m.price}
                      {m.period && (
                        <span className="text-gray-400 font-normal text-xs ml-1">{m.period}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * Alle Beiträge zzgl. einmalige Aufnahmegebühr von 10,00 €. Änderungen vorbehalten.
          </p>
        </section>

        {/* External links */}
        <section>
          <SectionHeading label="Externe Links" title="Weiterführende Informationen" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Vereinsregister",
                desc: "Amtsgericht Eberswalde – Vereinsregistereintrag",
                url: "https://www.handelsregister.de",
              },
              {
                title: "FVBB – Fußballverband",
                desc: "Fußballverband Berlin-Brandenburg e.V.",
                url: "https://www.fvbb.de",
              },
              {
                title: "DOSB",
                desc: "Deutscher Olympischer Sportbund",
                url: "https://www.dosb.de",
              },
            ].map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl border border-gray-100 hover:border-[#21a530]/40 hover:shadow-sm transition-all p-5 flex items-start gap-3"
              >
                <ExternalLink className="w-4 h-4 text-[#21a530] mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 text-sm group-hover:text-[#21a530] transition-colors">
                    {link.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}




