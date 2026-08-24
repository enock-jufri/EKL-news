"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsFeed } from "@/components/news-feed";
import type { Article } from "@/lib/news-types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setArticles([]);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setArticles(data.articles ?? []);
      } catch {
        // aborted or network error — keep previous results
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
      setLoading(false);
    };
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Search</h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mb-8 flex max-w-xl gap-2"
      >
        <div className="relative flex-1">
          <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news…"
            className="pl-9"
            autoFocus
            aria-label="Search articles"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {loading ? (
        <p className="text-muted-foreground animate-pulse text-sm">
          Searching…
        </p>
      ) : query.trim() ? (
        <NewsFeed articles={articles} />
      ) : (
        <p className="text-muted-foreground py-24 text-center">
          Type something to start searching.
        </p>
      )}
    </div>
  );
}
