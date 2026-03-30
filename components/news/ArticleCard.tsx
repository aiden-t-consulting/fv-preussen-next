import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate, categoryLabel, categoryColor } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/client";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "horizontal") {
    return (
      <Link
        href={`/aktuelles/${article.slug.current}`}
        className="group flex gap-4 bg-white rounded-xl border border-gray-100 hover:border-[#2e7d32]/30 hover:shadow-md transition-all duration-200 overflow-hidden p-4"
      >
        <div className="relative w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-[#f1f8e9]">
          {article.coverImage ? (
            <Image
              src={urlFor(article.coverImage).width(200).height(160).url()}
              alt={article.coverImage.alt ?? article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="96px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#2e7d32]/30 font-bold font-['Playfair_Display',serif]">
              FVP
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <Badge className={`${categoryColor(article.category)} mb-1.5`}>
            {categoryLabel(article.category)}
          </Badge>
          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#2e7d32] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            {formatDate(article.publishedAt)}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/aktuelles/${article.slug.current}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-[#2e7d32]/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/10] bg-[#f1f8e9] overflow-hidden">
        {article.coverImage ? (
          <Image
            src={urlFor(article.coverImage).width(600).height(375).url()}
            alt={article.coverImage.alt ?? article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl font-bold text-[#2e7d32]/15 font-['Playfair_Display',serif]">FVP</div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className={categoryColor(article.category)}>
            {categoryLabel(article.category)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-[#2e7d32] transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1 mb-4">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(article.publishedAt)}
          </div>
          {article.author && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
