import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/bookmark-button";
import {
  decodeArticleId,
  extractArticle,
  type ExtractedArticle,
} from "@/lib/extract";

interface Props {
  params: Promise<{ id: string }>;
}

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

function ReaderBody({ article }: { article: ExtractedArticle }) {
  const date = formatDate(article.publishedTime);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="size-4" /> Back to news
          </Link>
        </Button>
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
        />
      </div>

      <header className="mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {article.siteName && (
            <Badge variant="secondary">{article.siteName}</Badge>
          )}
          {date && (
            <span className="text-muted-foreground text-sm">{date}</span>
          )}
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {article.title}
        </h1>
        {article.byline && (
          <p className="text-muted-foreground text-sm">By {article.byline}</p>
        )}
      </header>

      {article.imageUrl && (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-xl border">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      {article.html ? (
        <div
          className="prose prose-neutral dark:prose-invert max-w-none prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      ) : (
        <div className="flex flex-col items-start gap-4">
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
    </article>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const url = decodeArticleId(id);

  if (!url) {
    return (
      <p className="text-muted-foreground py-24 text-center">
        Invalid article link.
      </p>
    );
  }

  const article = await extractArticle(url);
  return <ReaderBody article={article} />;
}
