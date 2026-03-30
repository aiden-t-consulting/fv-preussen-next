"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Aktuelles", href: "/aktuelles" },
  { label: "Berichte", href: "/berichte" },
  {
    label: "Teams",
    href: "/teams",
    children: [
      { label: "Herren (Landesliga Nord)", href: "/teams/herren" },
      { label: "Herren II (Kreisliga)", href: "/teams/herren-ii" },
      { label: "A-Junioren (U19)", href: "/teams/u19" },
      { label: "B-Junioren (U17)", href: "/teams/u17" },
      { label: "C-Junioren (U15)", href: "/teams/u15" },
      { label: "D-Junioren (U13)", href: "/teams/u13" },
      { label: "E-Junioren (U11)", href: "/teams/u11" },
      { label: "F-Junioren (U9)", href: "/teams/u9" },
      { label: "G-Junioren (U7)", href: "/teams/u7" },
      { label: "Ü50", href: "/teams/ue50" },
    ],
  },
  {
    label: "Verein",
    href: "/verein",
    children: [
      { label: "Über uns", href: "/verein" },
      { label: "Geschichte", href: "/verein/geschichte" },
      { label: "Vorstand", href: "/verein/vorstand" },
      { label: "Satzung & Dokumente", href: "/verein/dokumente" },
      { label: "Stadion", href: "/verein/stadion" },
    ],
  },
  { label: "Sponsoren", href: "/sponsoren" },
  { label: "Fan Shop", href: "/fan-shop" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#15540a] shadow-lg"
          : "bg-[#15540a]/95 backdrop-blur-sm"
      )}
    >
      {/* Top bar */}
      <div className="bg-[#0e3a07] text-xs text-gray-300 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <span>Motor des Barnim – Fußball ist unsere Zukunft</span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/fvpreusseneberswalde"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#81d742] transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/fvpreusseneberswalde"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#81d742] transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="FV Preussen Eberswalde – Startseite"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center text-[#15540a] font-bold text-lg font-['Playfair_Display',serif] shadow">
              FVP
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm lg:text-base leading-tight font-['Playfair_Display',serif]">
                FV Preussen
              </div>
              <div className="text-[#81d742] text-xs">Eberswalde</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation">
            {nav.map((item) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-semibold transition-colors",
                        isActive(item.href)
                          ? "text-[#81d742]"
                          : "text-gray-200 hover:text-[#81d742]"
                      )}
                      aria-expanded={openDropdown === item.href}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2.5 text-sm transition-colors",
                              isActive(child.href)
                                ? "text-[#21a530] font-semibold bg-[#e8f5e9]"
                                : "text-gray-700 hover:text-[#21a530] hover:bg-[#e8f5e9]"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-semibold transition-colors",
                      isActive(item.href)
                        ? "text-[#81d742]"
                        : "text-gray-200 hover:text-[#81d742]"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Menü öffnen"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        className={cn(
          "lg:hidden bg-[#15540a] border-t border-[#21a530]/30 overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[90vh] overflow-y-auto" : "max-h-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="px-4 py-4 space-y-1" role="navigation">
          {nav.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.href ? null : item.href)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-200 font-semibold hover:bg-white/10 transition-colors"
                    aria-expanded={openDropdown === item.href}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        openDropdown === item.href && "rotate-180"
                      )}
                    />
                  </button>
                  {openDropdown === item.href && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                            isActive(child.href)
                              ? "text-[#81d742] font-semibold"
                              : "text-gray-300 hover:text-[#81d742]"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg font-semibold transition-colors",
                    isActive(item.href)
                      ? "text-[#81d742]"
                      : "text-gray-200 hover:bg-white/10 hover:text-[#81d742]"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
