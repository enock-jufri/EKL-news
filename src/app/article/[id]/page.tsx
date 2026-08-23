import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/article-card";
import { BookmarkButton } from "@/components/bookmark-button";
import { ArticleReader } from "@/components/article-reader";
import { ReadingProgress } from "@/components/reading-progress";
import {
  decodeArticleId,
  extractArticle,
} from "@/lib/extract";
import { fetchByCategory } from "@/lib/news";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}

export const runtime = "nodejs";
export const maxDuration = 30;

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const url = decodeArticleId(id);
  if (!url) return { title: "Article" };
  const article = await extractArticle(url);
  return {
    title: article.title || "Article",
    description: article.excerpt ?? undefined,
  };
}

function formatDate(value: string | null): string | null {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

function readingMinutes(html: string | null): number | null {
  if (!html) return null;
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return words > 80 ? Math.max(1, Math.round(words / 220)) : null;
}

async function RelatedArticles({
  from,
  currentUrl,
}: {
  from?: string;
  currentUrl: string;
}) {
  if (!from) return null;

  const articles = (await fetchByCategory(from))
    .filter((a) => a.url !== currentUrl)
    .slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
      <h2 className="mb-4 text-xl font-bold tracking-tight">More like this</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.url} article={article} from={from} />
        ))}
      </div>
    </section>
  );
}

export default async function ArticlePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { from } = await searchParams;
  const url = decodeArticleId(id);

  if (!url) {
    return (
      <p className="text-muted-foreground py-24 text-center">
        Invalid article link.
      </p>
    );
  }

  const article = await extractArticle(url);
  const date = formatDate(article.publishedTime);
  const minutes = readingMinutes(article.html);

  return (
    <>
      <ReadingProgress />

      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <ArticleReader
          url={article.url}
          title={article.title}
          leading={
            <Button variant="ghost" size="sm" asChild>
              <Link href={from === "trending" ? "/" : `/category/${from}`}>
                <ArrowLeft className="size-4" /> Back
              </Link>
            </Button>
          }
          actions={
            <BookmarkButton
              article={{
                source: { id: null, name: article.siteName ?? "" },
                author: article.byline,
                title: article.title,
                description: article.excerpt,
                url: article.url,
                urlToImage: article.imageUrl,
                publishedAt: article.publishedTime ?? new Date().toISOString(),
                content: null,
              }}
              variant="ghost"
            />
          }
        >
          <header className="mb-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {article.siteName && (
                <Badge variant="secondary">{article.siteName}</Badge>
              )}
              {date && (
                <span className="text-muted-foreground text-sm">{date}</span>
              )}
              {minutes && (
                <span className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Clock3 className="size-3.5" /> {minutes} min read
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {article.title}
            </h1>
            {article.byline && (
              <p className="text-muted-foreground text-sm">
                By {article.byline}
              </p>
            )}
          </header>

          {article.imageUrl && (
            <figure className="relative mb-8 aspect-video overflow-hidden rounded-xl border">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </figure>
          )}

          {article.html ? (
            <div
              className="prose prose-neutral dark:prose-invert max-w-none prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          ) : (
            <div className="flex flex-col items-start gap-4 py-4">
              <p className="text-muted-foreground">
                We couldn&apos;t display the full text of this article — the
                publisher doesn&apos;t allow it to be embedded.
              </p>
              {article.excerpt && (
                <p className="text-base leading-relaxed">{article.excerpt}</p>
              )}
            </div>
          )}

          <div className="mt-10 border-t pt-6">
            <Button variant="outline" asChild>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read at source <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </ArticleReader>
      </article>

      <RelatedArticles from={from} currentUrl={url} />
    </>
  );
}
