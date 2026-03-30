import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, ExternalLink, Star, Truck, RotateCcw, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Fan Shop | FV Preussen Eberswalde",
  description:
    "Offizieller Fan Shop des FV Preussen Eberswalde – Trikots, Fanwear, Training und mehr.",
};

const SHOP_URL = "https://www.clubsolution.de/shop/fvpreusseneberswalde";

const CATEGORIES = [
  { label: "Alle", slug: "alle", active: true },
  { label: "Trikots", slug: "trikots" },
  { label: "Fanwear", slug: "fanwear" },
  { label: "Training", slug: "training" },
  { label: "Kinder", slug: "kinder" },
  { label: "Accessoires", slug: "accessoires" },
];

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  badge?: "Neu" | "Bestseller" | "Sale";
  bg: string;
  accent: string;
  icon: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Heimtrikot 2024/25",
    category: "Trikots",
    price: "69,95 €",
    badge: "Neu",
    bg: "from-[#039139]/80 to-[#026b29]",
    accent: "#7de8a0",
    icon: "👕",
  },
  {
    id: "2",
    name: "Auswärtstrikot 2024/25",
    category: "Trikots",
    price: "69,95 €",
    badge: "Neu",
    bg: "from-[#1e2030] to-[#373542]",
    accent: "#a5b4fc",
    icon: "👕",
  },
  {
    id: "3",
    name: "Fanschal Preussen",
    category: "Fanwear",
    price: "14,95 €",
    badge: "Bestseller",
    bg: "from-[#039139]/60 to-[#1e2030]",
    accent: "#7de8a0",
    icon: "🧣",
  },
  {
    id: "4",
    name: "Hoodie FV Preussen",
    category: "Fanwear",
    price: "44,95 €",
    bg: "from-[#373542] to-[#1e2030]",
    accent: "#d1d5db",
    icon: "🧥",
  },
  {
    id: "5",
    name: "Snapback Cap",
    category: "Fanwear",
    price: "19,95 €",
    bg: "from-[#026b29] to-[#014d1e]",
    accent: "#7de8a0",
    icon: "🧢",
  },
  {
    id: "6",
    name: "Trainingsjacke",
    category: "Training",
    price: "54,95 €",
    badge: "Neu",
    bg: "from-[#039139]/70 to-[#026b29]/80",
    accent: "#bbf7d0",
    icon: "🥋",
  },
  {
    id: "7",
    name: "Kindertrikot Heim",
    category: "Kinder",
    price: "49,95 €",
    bg: "from-[#039139]/50 to-[#7de8a0]/30",
    accent: "#039139",
    icon: "👕",
  },
  {
    id: "8",
    name: "Sporttasche",
    category: "Accessoires",
    price: "29,95 €",
    bg: "from-[#374151] to-[#1f2937]",
    accent: "#9ca3af",
    icon: "👜",
  },
  {
    id: "9",
    name: "Polo Shirt",
    category: "Fanwear",
    price: "34,95 €",
    badge: "Sale",
    bg: "from-[#1e3a2a] to-[#026b29]",
    accent: "#a7f3d0",
    icon: "👔",
  },
  {
    id: "10",
    name: "Kaffeebecher FVP",
    category: "Accessoires",
    price: "12,95 €",
    badge: "Bestseller",
    bg: "from-[#1e2030] to-[#374151]",
    accent: "#fbbf24",
    icon: "☕",
  },
  {
    id: "11",
    name: "Schlüsselanhänger",
    category: "Accessoires",
    price: "4,95 €",
    bg: "from-[#039139]/40 to-[#026b29]/60",
    accent: "#7de8a0",
    icon: "🔑",
  },
  {
    id: "12",
    name: "Trainingshose",
    category: "Training",
    price: "39,95 €",
    bg: "from-[#1e2030] to-[#039139]/50",
    accent: "#a3e635",
    icon: "👖",
  },
];

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Kostenloser Versand",
    desc: "Ab 50 € Bestellwert",
  },
  {
    icon: RotateCcw,
    title: "30 Tage Rückgabe",
    desc: "Einfach & unkompliziert",
  },
  {
    icon: Shield,
    title: "Offizieller Shop",
    desc: "Lizenzierte Fanware",
  },
  {
    icon: Star,
    title: "Qualitätsgarantie",
    desc: "Geprüfte Produkte",
  },
];

function ProductCard({ product }: { product: Product }) {
  const badgeColors: Record<string, string> = {
    Neu: "bg-[#039139] text-white",
    Bestseller: "bg-amber-400 text-amber-900",
    Sale: "bg-red-500 text-white",
  };

  return (
    <a
      href={SHOP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Product image placeholder */}
      <div
        className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${product.bg}`}
      >
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeColors[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <div className="flex flex-col items-center gap-2 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-5xl">{product.icon}</span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: product.accent }}
          >
            FV Preussen
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-900">
            <ShoppingBag className="h-3.5 w-3.5" />
            Jetzt kaufen
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {product.category}
        </p>
        <h3 className="flex-1 text-sm font-bold text-gray-900 group-hover:text-[#039139]">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-[#039139]">
            {product.price}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400 group-hover:text-[#039139]">
            <ExternalLink className="h-3 w-3" />
            Shop
          </span>
        </div>
      </div>
    </a>
  );
}

export default function FanShopPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1e2030] via-[#1a2a1a] to-[#026b29]">
        {/* Background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="mx-auto max-w-[1280px] px-4 py-20 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left: text */}
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#7de8a0]">
                Offizieller Fanshop
              </p>
              <h1 className="mb-5 text-5xl font-bold text-white [font-family:var(--font-club)] lg:text-6xl">
                FV Preussen
                <span className="block text-[#7de8a0]">Fan Shop</span>
              </h1>
              <p className="mb-8 max-w-md text-base leading-relaxed text-gray-300">
                Trikots, Fanwear, Training und Accessoires — zeig deine Farben
                für den Motor des Barnim.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#039139] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#026b29]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Zum Shop
                </a>
                <a
                  href="#produkte"
                  className="flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Produkte entdecken
                </a>
              </div>
            </div>

            {/* Right: jersey preview card */}
            <div className="hidden lg:flex lg:justify-end">
              <div className="relative">
                <div className="flex h-72 w-72 items-center justify-center rounded-3xl bg-gradient-to-br from-[#039139]/40 to-[#026b29]/60 backdrop-blur-sm border border-white/10 shadow-2xl">
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-8xl">👕</span>
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7de8a0]">
                        Heimtrikot
                      </p>
                      <p className="text-sm text-gray-300">Saison 2024/25</p>
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="absolute -right-3 -top-3 rounded-full bg-[#039139] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
                    NEU
                  </div>
                </div>
                {/* Floating price tag */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl bg-white px-6 py-3 shadow-xl">
                  <p className="text-center text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Ab
                  </p>
                  <p className="text-center text-2xl font-bold text-[#039139]">
                    49,95 €
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust bar ─────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-2 divide-x divide-gray-100 lg:grid-cols-4">
            {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-3 px-6 py-4 lg:px-8 lg:py-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#039139]/10">
                  <Icon className="h-4 w-4 text-[#039139]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{title}</p>
                  <p className="text-[11px] text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Promotional banner ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-4 py-10 lg:py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#039139] to-[#026b29] p-8 lg:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 40%)",
              backgroundSize: "12px 12px",
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#7de8a0]">
                Neue Saison
              </p>
              <h2 className="text-3xl font-bold text-white [font-family:var(--font-club)] lg:text-4xl">
                Neue Kollektion 2024/25
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Heimtrikot, Auswärtstrikot und komplette Fanwear-Linie — jetzt
                im Shop erhältlich.
              </p>
            </div>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#039139] transition-colors hover:bg-gray-100"
            >
              <ShoppingBag className="h-4 w-4" />
              Jetzt shoppen
            </a>
          </div>
        </div>
      </div>

      {/* ── Category navigation ───────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm lg:top-[88px]">
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="flex gap-1 overflow-x-auto py-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={cat.active ? "#produkte" : SHOP_URL}
                target={cat.active ? undefined : "_blank"}
                rel={cat.active ? undefined : "noopener noreferrer"}
                className={
                  cat.active
                    ? "shrink-0 rounded-full bg-[#039139] px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-white"
                    : "shrink-0 rounded-full border border-gray-200 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:border-[#039139] hover:text-[#039139]"
                }
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product grid ──────────────────────────────────────────────────── */}
      <div id="produkte" className="mx-auto max-w-[1280px] px-4 py-12 lg:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#039139]">
              Fanware
            </p>
            <h2 className="text-3xl font-bold text-gray-900 [font-family:var(--font-club)]">
              Unsere Produkte
            </h2>
          </div>
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#039139] hover:underline"
          >
            Alle Produkte
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ── Category spotlight banners ────────────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-4 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Trikots */}
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-48 items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#039139] to-[#026b29] p-6"
          >
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-30 transition-transform duration-500 group-hover:scale-110">
              👕
            </span>
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7de8a0]">
                Kollektion
              </p>
              <h3 className="text-xl font-bold text-white [font-family:var(--font-club)]">
                Trikots
              </h3>
              <p className="mt-1 text-xs text-white/70">
                Heimtrikot · Auswärts · Torhüter
              </p>
            </div>
          </a>

          {/* Fanwear */}
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-48 items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e2030] to-[#373542] p-6"
          >
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-30 transition-transform duration-500 group-hover:scale-110">
              🧣
            </span>
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a5b4fc]">
                Lifestyle
              </p>
              <h3 className="text-xl font-bold text-white [font-family:var(--font-club)]">
                Fanwear
              </h3>
              <p className="mt-1 text-xs text-white/70">
                Schals · Caps · Hoodies
              </p>
            </div>
          </a>

          {/* Kinder */}
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-48 items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#7de8a0]/40 to-[#039139]/60 p-6"
          >
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-30 transition-transform duration-500 group-hover:scale-110">
              ⭐
            </span>
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#026b29]">
                Nachwuchs
              </p>
              <h3 className="text-xl font-bold text-white [font-family:var(--font-club)]">
                Kinder
              </h3>
              <p className="mt-1 text-xs text-white/80">
                Trikots · Schals · Accessoires
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* ── Shop CTA footer ───────────────────────────────────────────────── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#039139]/10 mb-4">
            <ShoppingBag className="h-8 w-8 text-[#039139]" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            Alle Produkte im offiziellen Shop
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Unser Fan Shop wird von ClubSolution betrieben. Klicke auf den Button
            um zum vollständigen Sortiment zu gelangen.
          </p>
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#039139] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#026b29]"
          >
            <ShoppingBag className="h-4 w-4" />
            Zum offiziellen Fan Shop
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
