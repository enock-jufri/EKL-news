import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/bookmark-button";
import { buildArticleHref } from "@/lib/article-id";
import type { Article } from "@/lib/news";

export function ArticleCard({
  article,
  from,
}: {
  article: Article;
  from?: string;
}) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={buildArticleHref(article, from)}
      className="group bg-card flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={article.urlToImage ?? ""}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          {article.source.name && (
            <Badge variant="secondary">{article.source.name}</Badge>
          )}
          <span className="text-muted-foreground text-xs">{date}</span>
        </div>
        <h3 className="line-clamp-2 font-semibold leading-snug group-hover:underline">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {article.description}
          </p>
        )}
        <div className="mt-auto pt-2">
          <BookmarkButton article={article} variant="outline" />
        </div>
      </div>
    </Link>
  );
}
