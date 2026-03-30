import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

const footerLinks = {
  verein: [
    { label: "Über uns", href: "/verein" },
    { label: "Geschichte", href: "/verein/geschichte" },
    { label: "Präsidium", href: "/verein/vorstand" },
    { label: "Satzung & Dokumente", href: "/verein/dokumente" },
    { label: "Stadion", href: "/verein/stadion" },
  ],
  teams: [
    { label: "Männer (Landesliga Nord)", href: "/teams/herren" },
    { label: "Männer II", href: "/teams/herren-ii" },
    { label: "A-Junioren U19", href: "/teams/u19" },
    { label: "B-Junioren U17", href: "/teams/u17" },
    { label: "Alle Mannschaften", href: "/teams" },
    { label: "Männer Ü50", href: "/teams/ue50" },
  ],
  fans: [
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
    <footer className="bg-[#111111] text-gray-400">
      {/* Green top border */}
      <div className="h-1 bg-[#039139]" />

      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand block */}
          <div>
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="FV Preussen Eberswalde"
                width={80}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-1">
              FV Preussen Eberswalde e.V.
            </p>
            <p className="text-xs text-gray-500 mb-1">Registernummer: VR 5837 FF</p>
            <p className="text-xs text-gray-500 mb-5">USt-IdNr.: 065/140/05883</p>

            {/* Social */}
            <div className="flex gap-2">
              {[
                { Icon: FacebookIcon, href: "https://www.facebook.com/fvpreusseneberswalde", label: "Facebook" },
                { Icon: InstagramIcon, href: "https://www.instagram.com/fvpreusseneberswalde", label: "Instagram" },
                { Icon: YoutubeIcon, href: "https://www.youtube.com/@fvpreusseneberswalde", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-[#039139]/40 hover:border-[#039139] hover:bg-[#039139] flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Verein links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] border-b border-[#039139]/30 pb-3 mb-5">
              Verein
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.verein.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-[#039139] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#039139] rounded-full shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] border-b border-[#039139]/30 pb-3 mb-5">
              Teams
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.teams.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-[#039139] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#039139] rounded-full shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] border-b border-[#039139]/30 pb-3 mb-5">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#039139] shrink-0 mt-0.5" />
                <address className="not-italic text-gray-400 leading-relaxed">
                  Heegermühler Str. 69a<br />
                  16225 Eberswalde
                </address>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone className="w-4 h-4 text-[#039139] shrink-0 mt-0.5" />
                <a href="tel:+4933342358 48" className="hover:text-[#039139] transition-colors">
                  +49 3334 235848
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail className="w-4 h-4 text-[#039139] shrink-0 mt-0.5" />
                <a href="mailto:info@fvpreussen-eberswalde.de" className="hover:text-[#039139] transition-colors break-all">
                  info@fvpreussen-eberswalde.de
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/kontakt"
                className="relative inline-flex items-center px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white border border-[#039139] overflow-hidden group"
              >
                <span className="absolute inset-0 bg-[#039139] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative">Nachricht senden</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© {year} FV Preussen Eberswalde e.V. Alle Rechte vorbehalten.</p>
          <div className="flex gap-5">
            <Link href="/impressum" className="hover:text-gray-400 transition-colors uppercase tracking-wider">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gray-400 transition-colors uppercase tracking-wider">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
