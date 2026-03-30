import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | FV Preussen Eberswalde",
  description: "Impressum und Anbieterkennzeichnung des FV Preussen Eberswalde e.V.",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      <div className="bg-gradient-to-br from-[#111111] to-[#1b5e20] py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#a5d6a7]">
            Rechtliches
          </p>
          <h1 className="text-3xl font-bold text-white [font-family:var(--font-club)] lg:text-4xl">
            Impressum
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[860px] px-4 py-14">
        <div className="rounded-2xl bg-white p-8 shadow-sm space-y-8">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="text-gray-700 space-y-1">
              <p className="font-semibold">FV Preussen Eberswalde e.V.</p>
              <p>Heegermühler Str. 69a</p>
              <p>16225 Eberswalde</p>
              <p>Deutschland</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              Vereinsregister
            </h2>
            <div className="text-gray-700 space-y-1">
              <p>Registergericht: Amtsgericht Frankfurt (Oder)</p>
              <p>Registernummer: VR 5837 FF</p>
              <p>Steuernummer: 065/140/05883</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              Vertreten durch
            </h2>
            <div className="text-gray-700 space-y-1">
              <p className="font-semibold">Danko Jur</p>
              <p>1. Vorsitzender</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              Kontakt
            </h2>
            <div className="text-gray-700 space-y-1">
              <p>
                Telefon:{" "}
                <a href="tel:+4933342358 48" className="text-[#2e7d32] hover:underline">
                  +49 3334 235848
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a href="mailto:info@fvpreussen-eberswalde.de" className="text-[#2e7d32] hover:underline">
                  info@fvpreussen-eberswalde.de
                </a>
              </p>
              <p>
                Website:{" "}
                <a href="https://fvpreussen-eberswalde.de" className="text-[#2e7d32] hover:underline">
                  fvpreussen-eberswalde.de
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV
            </h2>
            <div className="text-gray-700 space-y-1">
              <p className="font-semibold">Danko Jur</p>
              <p>Heegermühler Str. 69a</p>
              <p>16225 Eberswalde</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              Haftungsausschluss
            </h2>
            <div className="text-gray-600 space-y-4 text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                  Tätigkeit hinweisen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
                  übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
                  Betreiber der Seiten verantwortlich.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                  der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
                  Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100 pt-6">
            <Link
              href="/datenschutz"
              className="text-sm text-[#2e7d32] hover:underline"
            >
              → Datenschutzerklärung
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
