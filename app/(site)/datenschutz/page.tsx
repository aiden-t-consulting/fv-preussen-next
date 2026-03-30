import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | FV Preussen Eberswalde",
  description:
    "Datenschutzerklärung des FV Preussen Eberswalde e.V. gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      <div className="bg-gradient-to-br from-[#111111] to-[#1b5e20] py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#a5d6a7]">
            Rechtliches
          </p>
          <h1 className="text-3xl font-bold text-white [font-family:var(--font-club)] lg:text-4xl">
            Datenschutzerklärung
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[860px] px-4 py-14">
        <div className="rounded-2xl bg-white p-8 shadow-sm space-y-8 text-sm leading-relaxed text-gray-700">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="font-semibold text-gray-800 mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              2. Verantwortlicher
            </h2>
            <div className="space-y-1">
              <p className="font-semibold">FV Preussen Eberswalde e.V.</p>
              <p>Heegermühler Str. 69a, 16225 Eberswalde</p>
              <p>
                E-Mail:{" "}
                <a href="mailto:info@fvpreussen-eberswalde.de" className="text-[#2e7d32] hover:underline">
                  info@fvpreussen-eberswalde.de
                </a>
              </p>
              <p>
                Telefon:{" "}
                <a href="tel:+4933342358 48" className="text-[#2e7d32] hover:underline">
                  +49 3334 235848
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              3. Datenerfassung auf dieser Website
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Server-Log-Dateien</h3>
                <p>
                  Der Provider dieser Website erhebt und speichert automatisch Informationen in
                  sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
                  Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL,
                  Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage sowie IP-Adresse.
                  Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Kontaktformular</h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
                  aus dem Anfrageformular inklusive der von Ihnen angegebenen Kontaktdaten zwecks
                  Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist
                  Art. 6 Abs. 1 lit. b DSGVO.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              4. Externe Dienste
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Google Fonts</h3>
                <p>
                  Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten sogenannte
                  Google Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt
                  Ihr Browser die benötigten Fonts in Ihren Browser-Cache. Weitere Informationen
                  zu Google Fonts finden Sie unter{" "}
                  <a href="https://developers.google.com/fonts/faq" className="text-[#2e7d32] hover:underline" target="_blank" rel="noopener noreferrer">
                    https://developers.google.com/fonts/faq
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Google Maps</h3>
                <p>
                  Auf dieser Website nutzen wir Google Maps. Anbieter ist die Google Ireland Limited,
                  Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung von Google Maps ist es
                  notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel
                  an einen Server von Google in den USA übertragen und dort gespeichert.
                  Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">FuPa / fussball.de</h3>
                <p>
                  Für Spielpläne, Ergebnisse und Tabellendaten werden Daten von fussball.de
                  (Deutscher Fußball-Bund) und FuPa eingebunden. Es werden dabei keine
                  personenbezogenen Daten der Nutzer übermittelt.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Vercel (Hosting)</h3>
                <p>
                  Diese Website wird bei Vercel Inc., 340 Pine Street Suite 701, San Francisco,
                  CA 94104, USA gehostet. Vercel verarbeitet beim Aufruf der Website Server-Logs
                  inkl. IP-Adressen. Weitere Informationen finden Sie in der Datenschutzerklärung
                  von Vercel:{" "}
                  <a href="https://vercel.com/legal/privacy-policy" className="text-[#2e7d32] hover:underline" target="_blank" rel="noopener noreferrer">
                    vercel.com/legal/privacy-policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              5. Ihre Rechte
            </h2>
            <p className="mb-3">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
              Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
              Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich
              jederzeit an uns wenden.
            </p>
            <p>
              Außerdem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der
              Landesdatenschutzbeauftragte des Landes Brandenburg.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 [font-family:var(--font-club)]">
              6. Cookies
            </h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies oder Analyse-Cookies. Es werden
              ausschließlich technisch notwendige Session-Informationen genutzt, die für den
              ordnungsgemäßen Betrieb der Website erforderlich sind.
            </p>
          </section>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400 mb-3">Stand: März 2025</p>
            <Link href="/impressum" className="text-sm text-[#2e7d32] hover:underline">
              → Impressum
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
