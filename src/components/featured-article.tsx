import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/bookmark-button";
import { encodeArticleId } from "@/lib/article-id";
import type { Article } from "@/lib/news";

export function FeaturedArticle({
  article,
  from,
}: {
  article: Article;
  from?: string;
}) {
  if (!article) return null;

  return (
    <Link
      href={
        from
          ? `/article/${encodeArticleId(article.url)}?from=${from}`
          : `/article/${encodeArticleId(article.url)}`
      }
      className="group bg-card relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl border lg:min-h-[520px]"
    >
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="relative z-10 flex flex-col gap-3 p-6 text-white sm:p-8">
        <div className="flex items-center gap-3">
          <Badge>Top story</Badge>
          {article.source.name && (
            <span className="text-sm text-white/80">{article.source.name}</span>
          )}
        </div>
        <h2 className="max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">
          {article.title}
        </h2>
        {article.description && (
          <p className="line-clamp-2 max-w-2xl text-white/80 sm:text-base">
            {article.description}
          </p>
        )}
        <div className="mt-2">
          <BookmarkButton
            article={article}
            variant="outline"
            className="border-white/30 bg-black/30 text-white backdrop-blur hover:bg-black/50 hover:text-white"
          />
        </div>
      </div>
    </Link>
  );
}
