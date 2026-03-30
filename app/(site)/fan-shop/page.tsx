import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Fan Shop",
  description: "FV Preussen Eberswalde Fan Shop – Trikots, Fankleidung und mehr.",
};

export default function FanShopPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <div className="bg-[#15540a] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#81d742] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Fanware
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">Fan Shop</h1>
          <p className="mt-4 text-gray-300 max-w-xl">
            Zeige deine Vereinstreue mit offizieller FV Preussen Eberswalde Fanware.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-2xl bg-[#e8f5e9] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-[#21a530]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Unser Fan Shop
          </h2>
          <p className="text-gray-500 mb-8">
            Unser Fan Shop wird von ClubSolution betrieben. Klicken Sie auf den Button
            unten, um zum Shop zu gelangen.
          </p>
          <a
            href="https://www.clubsolution.de/shop/fvpreusseneberswalde"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#21a530] text-white px-7 py-3.5 rounded-xl font-bold hover:bg-[#1a8f28] transition-colors text-base"
          >
            <ShoppingBag className="w-5 h-5" />
            Zum Fan Shop
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
