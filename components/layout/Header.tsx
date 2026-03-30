"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  {
    label: "NEWS",
    href: "/aktuelles",
    children: [
      { label: "Übersicht", href: "/aktuelles" },
      { label: "Spiele", href: "/berichte" },
    ],
  },
  {
    label: "VEREIN",
    href: "/verein",
    children: [
      { label: "Präsidium", href: "/verein/vorstand" },
      { label: "Stadion", href: "/verein/stadion" },
      { label: "Historie", href: "/verein/geschichte" },
      { label: "DFB-Stützpunkt", href: "/verein" },
      { label: "Die Satzung", href: "/verein/dokumente" },
      { label: "Aufnahmeantrag", href: "/verein/dokumente" },
    ],
  },
  {
    label: "TEAMS",
    href: "/teams",
    children: [
      { label: "Männer", href: "/teams/herren" },
      { label: "Männer II", href: "/teams/herren-ii" },
      { label: "Männer Ü50", href: "/teams/ue50" },
      { label: "A-Junioren U19", href: "/teams/u19" },
      { label: "B-Junioren U17", href: "/teams/u17" },
      { label: "C-Junioren U15", href: "/teams/u15" },
      { label: "D-Junioren U13", href: "/teams/u13" },
      { label: "E-Junioren U11", href: "/teams/u11" },
      { label: "F-Junioren U9", href: "/teams/u9" },
      { label: "G-Junioren U7", href: "/teams/u7" },
    ],
  },
  { label: "SPIELE", href: "/berichte" },
  {
    label: "SPONSOREN",
    href: "/sponsoren",
    children: [
      { label: "Hauptsponsor", href: "/sponsoren" },
      { label: "Premiumsponsoren", href: "/sponsoren" },
      { label: "Exklusivsponsoren", href: "/sponsoren" },
      { label: "Toppartner", href: "/sponsoren" },
      { label: "Businesspartner", href: "/sponsoren" },
    ],
  },
  {
    label: "FANS",
    href: "/fan-shop",
    children: [
      { label: "Fanshop", href: "/fan-shop" },
    ],
  },
  { label: "KONTAKT", href: "/kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        scrolled ? "shadow-lg" : ""
      )}
    >
      {/* Top bar */}
      <div className="bg-[#026b29] text-white text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <span className="tracking-widest uppercase text-[11px] font-semibold">
            Motor des Barnim – Fußball ist unsere Zukunft
          </span>
          <div className="flex items-center gap-5 text-gray-300">
            <span>info@fvpreussen-eberswalde.de</span>
            <span>+49 3334 235848</span>
          </div>
        </div>
      </div>

      {/* Main nav — dark green, center-logo style like original */}
      <nav className="bg-[#1a1a1a] border-b border-[#039139]/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Left nav items (desktop) */}
            <div className="hidden lg:flex items-center gap-0 flex-1">
              {nav.slice(0, 4).map((item) => (
                <NavItem key={item.href} item={item} isActive={isActive} />
              ))}
            </div>

            {/* Center logo */}
            <Link
              href="/"
              className="flex-shrink-0 mx-4 lg:mx-8"
              aria-label="FV Preussen Eberswalde – Startseite"
            >
              <Image
                src="/logo.png"
                alt="FV Preussen Eberswalde"
                width={80}
                height={80}
                className="h-14 lg:h-16 w-auto drop-shadow-md"
                priority
              />
            </Link>

            {/* Right nav items (desktop) */}
            <div className="hidden lg:flex items-center gap-0 flex-1 justify-end">
              {nav.slice(4).map((item) => (
                <NavItem key={item.href} item={item} isActive={isActive} />
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white p-2 rounded hover:bg-white/10 transition-colors ml-auto"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Menü öffnen"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden bg-[#1a1a1a] border-t border-[#039139]/20 overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[90vh] overflow-y-auto" : "max-h-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 py-4 space-y-1">
          {nav.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.href ? null : item.href)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-200 font-bold text-sm uppercase tracking-widest hover:text-[#039139] transition-colors"
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
                    <div className="ml-4 border-l-2 border-[#039139]/40 pl-3 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-gray-400 hover:text-[#039139] transition-colors"
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
                    "block px-4 py-3 font-bold text-sm uppercase tracking-widest transition-colors",
                    isActive(item.href) ? "text-[#039139]" : "text-gray-200 hover:text-[#039139]"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function NavItem({
  item,
  isActive,
}: {
  item: (typeof nav)[0];
  isActive: (href: string) => boolean;
}) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors whitespace-nowrap",
          "relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#039139] after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
          isActive(item.href) ? "text-[#039139] after:scale-x-100" : "text-gray-300 hover:text-[#039139]"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors whitespace-nowrap",
          "relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#039139] after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
          isActive(item.href) ? "text-[#039139] after:scale-x-100" : "text-gray-300 hover:text-[#039139]"
        )}
      >
        {item.label}
        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
      </button>
      {/* Dropdown */}
      <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 min-w-[180px]">
        <div className="bg-[#1a1a1a] border border-[#039139]/30 shadow-xl">
          {/* Green top bar */}
          <div className="h-0.5 bg-[#039139]" />
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2.5 text-xs text-gray-300 uppercase tracking-wider font-semibold hover:text-[#039139] hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
