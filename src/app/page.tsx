import { Suspense } from "react";

import { NewsFeed, NewsFeedSkeleton } from "@/components/news-feed";
import { fetchByCategory } from "@/lib/news";

async function Feed() {
  const articles = await fetchByCategory("trending");
  return <NewsFeed articles={articles} featured from="trending" />;
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Trending</h1>
      <Suspense fallback={<NewsFeedSkeleton />}>
        <Feed />
      </Suspense>
    </div>
  );
}
