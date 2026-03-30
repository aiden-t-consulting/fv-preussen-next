import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PortableText } from "@/components/news/PortableText";
import { getArticleBySlug, getArticleSlugs, getLatestArticles } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { formatDate, categoryLabel, categoryColor } from "@/lib/utils";
import { ArticleCard } from "@/components/news/ArticleCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.coverImage
        ? [{ url: urlFor(article.coverImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

export const revalidate = 60;

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, related] = await Promise.all([
    getArticleBySlug(slug),
    getLatestArticles(4),
  ]);

  if (!article) notFound();

  const relatedArticles = related.filter((a) => a._id !== article._id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Back link */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/aktuelles"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#21a530] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu Aktuelles
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <Badge className={`${categoryColor(article.category)} mb-4`}>
            {categoryLabel(article.category)}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#21a530]" />
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </div>
            {article.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#21a530]" />
                {article.author}
              </div>
            )}
          </div>

          {/* Structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                headline: article.title,
                datePublished: article.publishedAt,
                description: article.excerpt,
                publisher: {
                  "@type": "Organization",
                  name: "FV Preussen Eberswalde e.V.",
                  url: "https://fvpreussen-eberswalde.de",
                },
                author: article.author
                  ? { "@type": "Person", name: article.author }
                  : undefined,
              }),
            }}
          />
        </header>

        {/* Cover image */}
        {article.coverImage && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-md">
            <Image
              src={urlFor(article.coverImage).width(1200).height(675).url()}
              alt={article.coverImage.alt ?? article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        {/* Excerpt */}
        {article.excerpt && (
          <div className="bg-[#e8f5e9] border-l-4 border-[#21a530] rounded-r-xl px-6 py-5 mb-8">
            <p className="text-[#15540a] font-semibold text-lg leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Body */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          {article.body ? (
            <PortableText value={article.body} />
          ) : (
            <p className="text-gray-400 italic">Kein Inhalt vorhanden.</p>
          )}
        </div>
      </article>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weitere Artikel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedArticles.map((a) => (
              <ArticleCard key={a._id} article={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
