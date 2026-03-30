import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

// Inline SVG brand icons (lucide-react v1.x removed brand icons)
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

const footerLinks = {
  verein: [
    { label: "Über uns", href: "/verein" },
    { label: "Geschichte", href: "/verein/geschichte" },
    { label: "Vorstand", href: "/verein/vorstand" },
    { label: "Satzung & Dokumente", href: "/verein/dokumente" },
    { label: "Stadion", href: "/verein/stadion" },
  ],
  teams: [
    { label: "Herren (Landesliga Nord)", href: "/teams/herren" },
    { label: "Herren II", href: "/teams/herren-ii" },
    { label: "A-Junioren (U19)", href: "/teams/u19" },
    { label: "B-Junioren (U17)", href: "/teams/u17" },
    { label: "Jugend-Teams", href: "/teams" },
    { label: "Ü50", href: "/teams/ue50" },
  ],
  aktuelles: [
    { label: "Aktuelle News", href: "/aktuelles" },
    { label: "Spielberichte", href: "/berichte" },
    { label: "Sponsoren", href: "/sponsoren" },
    { label: "Fan Shop", href: "/fan-shop" },
    { label: "Kontakt", href: "/kontakt" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0e3a07] text-gray-300">
      {/* Green top bar */}
      <div className="h-1.5 bg-gradient-to-r from-[#81d742] via-[#21a530] to-[#15540a]" />

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#15540a] font-bold text-lg font-['Playfair_Display',serif] shrink-0">
                FVP
              </div>
              <div>
                <div className="text-white font-bold text-base font-['Playfair_Display',serif]">
                  FV Preussen Eberswalde
                </div>
                <div className="text-[#81d742] text-xs">Gegründet 1919</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Motor des Barnim – Fußball ist unsere Zukunft.
              Leidenschaft, Zusammenhalt und Tradition seit über 100 Jahren.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/fvpreusseneberswalde"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#21a530] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.instagram.com/fvpreusseneberswalde"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#21a530] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.youtube.com/@fvpreusseneberswalde"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#21a530] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Verein links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Verein
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.verein.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#81d742] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Teams
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.teams.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#81d742] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#81d742] shrink-0 mt-0.5" />
                <span>
                  Pfefferwerkerstraße 9<br />
                  16225 Eberswalde
                </span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone className="w-4 h-4 text-[#81d742] shrink-0 mt-0.5" />
                <a href="tel:+4933342000" className="hover:text-[#81d742] transition-colors">
                  +49 3334 2000
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail className="w-4 h-4 text-[#81d742] shrink-0 mt-0.5" />
                <a
                  href="mailto:info@fvpreussen-eberswalde.de"
                  className="hover:text-[#81d742] transition-colors break-all"
                >
                  info@fvpreussen-eberswalde.de
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/kontakt"
                className="inline-flex items-center px-4 py-2 bg-[#21a530] text-white text-sm font-semibold rounded-lg hover:bg-[#1a8f28] transition-colors"
              >
                Nachricht senden
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {year} FV Preussen Eberswalde e.V. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-gray-300 transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-gray-300 transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
