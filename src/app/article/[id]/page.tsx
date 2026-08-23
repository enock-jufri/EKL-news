import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, Clock3, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookmarkButton } from "@/components/bookmark-button";
import { ArticleCard } from "@/components/article-card";
import { ArticleReader } from "@/components/article-reader";
import { ReadingProgress } from "@/components/reading-progress";
import { decodeArticleId, extractArticle } from "@/lib/extract";
import { fetchByCategory } from "@/lib/news";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const runtime = "nodejs";
export const maxDuration = 30;

function first(value: string | string[] | undefined): string | null {
  return (Array.isArray(value) ? value[0] : value) ?? null;
}

/** Lightweight metadata so the shell renders without waiting on extraction. */
export async function generateMetadata({ searchParams }: Props) {
  const sp = await searchParams;
  const title = first(sp.t);
  const description = first(sp.x);
  return {
    title: title ?? "Article",
    ...(description ? { description } : {}),
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

function readingMinutes(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Streams in: full text extracted server-side. */
async function ExtractedBody({
  url,
  heroImage,
}: {
  url: string;
  heroImage: string | null;
}) {
  const article = await extractArticle(url);
  const minutes = article.html ? readingMinutes(article.html) : null;

  return (
    <>
      {minutes !== null && (
        <p className="text-muted-foreground mb-6 flex items-center gap-1 text-sm">
          <Clock3 className="size-3.5" /> {minutes} min read
        </p>
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
          {!heroImage && article.imageUrl && (
            <p className="text-muted-foreground text-sm">
              Open the source below to see the original piece.
            </p>
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
    </>
  );
}

function BodySkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <Skeleton className="h-5 w-32" />
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i % 4 === 3 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

/** Related feed is ISR-cached, so this resolves quickly after first hit. */
async function RelatedArticles({
  from,
  currentUrl,
}: {
  from: string | null;
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
  const sp = await searchParams;
  const url = decodeArticleId(id);

  if (!url) {
    return (
      <p className="text-muted-foreground py-24 text-center">
        Invalid article link.
      </p>
    );
  }

  // Instant display metadata carried over from the listing page.
  const meta = {
    title: first(sp.t) ?? "",
    source: first(sp.s),
    image: first(sp.i),
    date: formatDate(first(sp.d)),
    from: first(sp.from),
  };

  return (
    <>
      <ReadingProgress />

      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <ArticleReader
          url={url}
          title={meta.title}
          leading={
            <Button variant="ghost" size="sm" asChild>
              <Link href={meta.from === "trending" ? "/" : `/category/${meta.from}`}>
                <ArrowLeft className="size-4" /> Back
              </Link>
            </Button>
          }
          actions={
            <BookmarkButton
              article={{
                source: { id: null, name: meta.source ?? "" },
                author: null,
                title: meta.title,
                description: null,
                url,
                urlToImage: meta.image,
                publishedAt: first(sp.d) ?? new Date().toISOString(),
                content: null,
              }}
              variant="ghost"
            />
          }
        >
          <header className="mb-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {meta.source && (
                <Badge variant="secondary">{meta.source}</Badge>
              )}
              {meta.date && (
                <span className="text-muted-foreground text-sm">
                  {meta.date}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {meta.title}
            </h1>
          </header>

          {meta.image && (
            <figure className="relative mb-8 aspect-video overflow-hidden rounded-xl border">
              <Image
                src={meta.image}
                alt={meta.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </figure>
          )}

          <Suspense fallback={<BodySkeleton />}>
            <ExtractedBody url={url} heroImage={meta.image} />
          </Suspense>
        </ArticleReader>
      </article>

      <Suspense fallback={null}>
        <RelatedArticles from={meta.from} currentUrl={url} />
      </Suspense>
    </>
  );
}
