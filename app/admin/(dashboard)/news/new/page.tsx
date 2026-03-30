import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const metadata: Metadata = { title: "Neuer Artikel" };

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/news"
          className="mb-4 flex items-center gap-1.5 text-[12px] text-gray-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Zurück zu Beiträge
        </Link>
        <h1 className="text-xl font-bold text-white">Neuer Artikel</h1>
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-6">
        <ArticleForm />
      </div>
    </div>
  );
}
