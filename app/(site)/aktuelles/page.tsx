import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/news/ArticleCard";
import { getAllArticles } from "@/lib/sanity/queries";
import { categoryLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Aktuelles",
  description:
    "Alle News, Spielberichte und Meldungen des FV Preussen Eberswalde.",
};

export const revalidate = 60;

const CATEGORIES = [
  { value: "", label: "Alle" },
  { value: "news", label: "News" },
  { value: "bericht", label: "Spielberichte" },
  { value: "jugend", label: "Jugend" },
  { value: "verein", label: "Verein" },
];

interface Props {
  searchParams: Promise<{ kategorie?: string }>;
}

export default async function AktuellesPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.kategorie ?? "";
  const articles = await getAllArticles(category || undefined);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-[#1b5e20] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#a5d6a7] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Neuigkeiten
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">Aktuelles</h1>
          <p className="mt-4 text-gray-300 max-w-xl">
            Alle News, Spielberichte und Meldungen aus dem Vereinsleben des FV
            Preussen Eberswalde.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value ? `/aktuelles?kategorie=${cat.value}` : "/aktuelles"}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                category === cat.value
                  ? "bg-[#2e7d32] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-[#f1f8e9] hover:text-[#2e7d32]"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Keine Artikel gefunden.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
