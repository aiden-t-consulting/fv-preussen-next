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
      { label: "Premium Partner", href: "/sponsoren" },
      { label: "Exklusiv Partner", href: "/sponsoren" },
      { label: "Business Partner", href: "/sponsoren" },
    ],
  },
  {
    label: "FANS",
    href: "/fan-shop",
    children: [{ label: "Fanshop", href: "/fan-shop" }],
  },
  { label: "KONTAKT", href: "/kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          "border-b bg-white/95 backdrop-blur-sm transition-all duration-300",
          scrolled ? "border-gray-200 shadow-md" : "border-gray-100"
        )}
      >
        <div className="mx-auto max-w-[1280px] px-4">
          <div
            className={cn(
              "relative flex items-center justify-between transition-all duration-300",
              scrolled ? "h-[64px] lg:h-[72px]" : "h-[72px] lg:h-[88px]"
            )}
          >
            {/* Mobile logo */}
            <Link
              href="/"
              className="flex-shrink-0 lg:hidden"
              aria-label="FV Preussen Eberswalde – Startseite"
            >
              <Image
                src="/logo.png"
                alt="FV Preussen Eberswalde"
                width={56}
                height={56}
                className="h-11 w-auto"
                priority
              />
            </Link>

            {/* Desktop left nav */}
            <div className="hidden flex-1 items-center gap-0 pr-16 lg:flex">
              {nav.slice(0, 4).map((item, index) => (
                <div key={item.href} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-0.5 text-[10px] text-gray-300">·</span>
                  )}
                  <NavItem item={item} isActive={isActive} />
                </div>
              ))}
            </div>

            {/* Desktop centered logo */}
            <Link
              href="/"
              className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
              aria-label="FV Preussen Eberswalde – Startseite"
            >
              <Image
                src="/logo.png"
                alt="FV Preussen Eberswalde"
                width={96}
                height={96}
                className={cn(
                  "w-auto drop-shadow-sm transition-all duration-300",
                  scrolled ? "h-[56px]" : "h-[72px]"
                )}
                priority
              />
            </Link>

            {/* Desktop right nav + CTAs */}
            <div className="hidden flex-1 items-center justify-end gap-0 pl-16 lg:flex">
              {nav.slice(4).map((item, index) => (
                <div key={item.href} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-0.5 text-[10px] text-gray-300">·</span>
                  )}
                  <NavItem item={item} isActive={isActive} />
                </div>
              ))}
              <div className="ml-4 flex items-center gap-2 border-l border-gray-200 pl-4">
                <Link
                  href="/verein/dokumente"
                  className="whitespace-nowrap rounded-full border border-gray-300 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-700 transition-colors hover:border-[#039139] hover:text-[#039139] [font-family:var(--font-club)]"
                >
                  Mitglied werden
                </Link>
                <Link
                  href="/sponsoren"
                  className="whitespace-nowrap rounded-full bg-[#039139] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#026b29] [font-family:var(--font-club)]"
                >
                  Sponsor werden
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className="ml-auto rounded border border-gray-200 p-2 text-gray-700 transition-colors hover:border-[#039139]/50 hover:text-[#039139] lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Menü öffnen"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[90vh] overflow-y-auto" : "max-h-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="space-y-1 px-4 py-4">
          {nav.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.href ? null : item.href)
                    }
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-widest text-gray-800 transition-colors hover:text-[#039139]"
                    aria-expanded={openDropdown === item.href}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openDropdown === item.href && "rotate-180"
                      )}
                    />
                  </button>
                  {openDropdown === item.href && (
                    <div className="ml-4 space-y-1 border-l-2 border-[#039139]/30 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobileMenu}
                          className="block py-2 text-sm text-gray-500 transition-colors hover:text-[#039139]"
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
                  onClick={closeMobileMenu}
                  className={cn(
                    "block px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors",
                    isActive(item.href)
                      ? "text-[#039139]"
                      : "text-gray-800 hover:text-[#039139]"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTAs */}
          <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
            <Link
              href="/verein/dokumente"
              onClick={closeMobileMenu}
              className="block rounded-full border border-gray-300 px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-gray-700 transition-colors hover:border-[#039139] hover:text-[#039139]"
            >
              Mitglied werden
            </Link>
            <Link
              href="/sponsoren"
              onClick={closeMobileMenu}
              className="block rounded-full bg-[#039139] px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#026b29]"
            >
              Sponsor werden
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  item,
  isActive,
}: Readonly<{
  item: Readonly<(typeof nav)[0]>;
  isActive: (href: string) => boolean;
}>) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "relative whitespace-nowrap px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors [font-family:var(--font-club)]",
          "after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-[#039139] after:opacity-0 after:transition-opacity",
          isActive(item.href)
            ? "text-[#039139] after:opacity-100"
            : "text-gray-700 hover:text-[#039139] hover:after:opacity-100"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <button
        className={cn(
          "relative flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors [font-family:var(--font-club)]",
          "after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-[#039139] after:opacity-0 after:transition-opacity",
          isActive(item.href)
            ? "text-[#039139] after:opacity-100"
            : "text-gray-700 hover:text-[#039139] hover:after:opacity-100"
        )}
      >
        {item.label}
        <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-[200px] pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="rounded-xl border border-gray-100 bg-white shadow-lg">
          <div className="h-0.5 rounded-t-xl bg-[#039139]" />
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block border-b border-gray-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#039139] last:border-0"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
