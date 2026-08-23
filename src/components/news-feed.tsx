import { ArticleCard } from "@/components/article-card";
import { FeaturedArticle } from "@/components/featured-article";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@/lib/news";

export function NewsFeed({
  articles,
  featured,
  from,
}: {
  articles: Article[];
  featured?: boolean;
  from?: string;
}) {
  if (articles.length === 0) {
    return (
      <p className="text-muted-foreground py-24 text-center">
        No articles found. Check back later.
      </p>
    );
  }

  const [first, ...rest] = articles;

  return (
    <div className="flex flex-col gap-8">
      {featured && <FeaturedArticle article={first} from={from} />}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(featured ? rest : articles).map((article, i) => (
          <ArticleCard key={`${article.url}-${i}`} article={article} from={from} />
        ))}
      </div>
    </div>
  );
}

export function NewsFeedSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="min-h-[420px] rounded-2xl lg:min-h-[520px]" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
