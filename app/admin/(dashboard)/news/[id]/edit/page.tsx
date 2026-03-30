import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { portableTextToPlainText } from "@/lib/admin/sanity-write";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const metadata: Metadata = { title: "Artikel bearbeiten" };
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  let article = null;
  try {
    article = await sanityClient.fetch(
      `*[_type == "article" && _id == $id][0]{
        _id,
        title,
        "slug": slug.current,
        category,
        publishedAt,
        author,
        excerpt,
        body,
        "coverImageRef": coverImage.asset._ref,
        "coverImageUrl": coverImage.asset->url,
        "coverImageAlt": coverImage.alt
      }`,
      { id: decodedId }
    );
  } catch {
    // fall through
  }

  if (!article) notFound();

  const plainBody = portableTextToPlainText(article.body ?? []);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/news"
          className="mb-4 flex items-center gap-1.5 text-[12px] text-gray-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Zurück zu Beiträge
        </Link>
        <h1 className="text-xl font-bold text-white">Artikel bearbeiten</h1>
        <p className="mt-0.5 font-mono text-sm text-gray-500">{article.title}</p>
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-6">
        <ArticleForm article={{ ...article, body: plainBody }} />
      </div>
    </div>
  );
}
