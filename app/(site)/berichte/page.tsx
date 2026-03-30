import type { Metadata } from "next";
import { ArticleCard } from "@/components/news/ArticleCard";
import { getAllArticles } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Spielberichte",
  description: "Spielberichte und Matchreports des FV Preussen Eberswalde.",
};

export const revalidate = 60;

export default async function BerichtePage() {
  const articles = await getAllArticles("bericht");

  return (
    <div className="min-h-screen">
      <div className="bg-[#15540a] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#81d742] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Matchreports
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">Spielberichte</h1>
          <p className="mt-4 text-gray-300 max-w-xl">
            Ausführliche Berichte zu allen Spielen der ersten Mannschaft und
            unserer Jugendteams.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Noch keine Spielberichte vorhanden.</p>
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
