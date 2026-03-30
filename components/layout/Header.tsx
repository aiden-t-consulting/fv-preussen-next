"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 shadow-2xl"
    >
      <nav
        className="border-b border-[#039139]/35 bg-[#252331]/95 backdrop-blur-md transition-all duration-300"
      >
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="hidden h-12 items-end justify-center pb-2 lg:flex">
            <ul className="flex items-center gap-5 text-white/80">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#039139]"
                >
                  FB
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#039139]"
                >
                  IG
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#039139]"
                >
                  YT
                </a>
              </li>
            </ul>
          </div>

          <div className="relative flex h-16 items-center justify-between lg:h-[86px]">
            <Link
              href="/"
              className="flex-shrink-0 lg:hidden"
              aria-label="FV Preussen Eberswalde – Startseite"
            >
              <Image
                src="/logo.png"
                alt="FV Preussen Eberswalde"
                width={60}
                height={60}
                className="h-12 w-auto drop-shadow-md"
                priority
              />
            </Link>

            <div className="hidden flex-1 items-center gap-0 pr-20 lg:flex">
              {nav.slice(0, 4).map((item) => (
                <NavItem key={item.href} item={item} isActive={isActive} />
              ))}
            </div>

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
                className="h-[92px] w-auto -translate-y-1 drop-shadow-lg"
                priority
              />
            </Link>

            <div className="hidden flex-1 items-center justify-end gap-0 pl-20 lg:flex">
              {nav.slice(4).map((item) => (
                <NavItem key={item.href} item={item} isActive={isActive} />
              ))}
            </div>

            <button
              className="ml-auto rounded border border-white/15 p-2 text-white transition-colors hover:border-[#039139]/60 hover:text-[#039139] lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Menü öffnen"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[#252331] transition-all duration-300 lg:hidden",
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
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-widest text-gray-200 transition-colors hover:text-[#039139]"
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
                    <div className="ml-4 space-y-1 border-l-2 border-[#039139]/40 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMobileMenu}
                          className="block py-2 text-sm text-gray-400 transition-colors hover:text-[#039139]"
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
}: Readonly<{
  item: Readonly<(typeof nav)[0]>;
  isActive: (href: string) => boolean;
}>) {
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "relative whitespace-nowrap px-3 py-2 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors",
          "after:absolute after:-bottom-0.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#039139] after:opacity-0 after:transition-opacity",
          isActive(item.href)
            ? "text-white after:opacity-100"
            : "text-white/85 hover:text-white hover:after:opacity-100"
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
          "relative flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors",
          "after:absolute after:-bottom-0.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#039139] after:opacity-0 after:transition-opacity",
          isActive(item.href)
            ? "text-white after:opacity-100"
            : "text-white/85 hover:text-white hover:after:opacity-100"
        )}
      >
        {item.label}
        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-[220px] pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="border border-[#039139]/30 bg-[#2a2835] shadow-xl">
          <div className="h-0.5 bg-[#039139]" />
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block border-b border-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-200 transition-colors hover:bg-white/5 hover:text-[#039139] last:border-0"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
