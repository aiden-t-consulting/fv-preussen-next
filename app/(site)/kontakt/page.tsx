import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nehmen Sie Kontakt zum FV Preussen Eberswalde auf – per Formular, Telefon oder E-Mail.",
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-[#15540a] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#81d742] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Schreiben Sie uns
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">Kontakt</h1>
          <p className="mt-4 text-gray-300 max-w-xl">
            Haben Sie Fragen, Anregungen oder möchten Sie Mitglied werden?
            Wir freuen uns auf Ihre Nachricht.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Kontaktinformationen
              </h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#039139]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Adresse</p>
                    <p className="text-gray-600 text-sm mt-0.5">
                      Heegermühler Str. 69a<br />
                      16225 Eberswalde
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#039139]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Telefon</p>
                    <a
                      href="tel:+4933342 35848"
                      className="text-[#039139] text-sm hover:underline mt-0.5 block"
                    >
                      +49 3334 235848
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#039139]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">E-Mail</p>
                    <a
                      href="mailto:info@fvpreussen-eberswalde.de"
                      className="text-[#039139] text-sm hover:underline mt-0.5 block"
                    >
                      info@fvpreussen-eberswalde.de
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#039139]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Bürozeiten</p>
                    <p className="text-gray-600 text-sm mt-0.5">
                      Di & Do: 17:00 – 19:00 Uhr<br />
                      Sa: 10:00 – 12:00 Uhr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2406.6!2d13.8055!3d52.8342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDUwJzAzLjEiTiAxM8KwNDgnMTkuOCJF!5e0!3m2!1sde!2sde!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FV Preussen Eberswalde Standort"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Nachricht senden
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
