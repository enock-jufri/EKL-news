"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/article-card";
import { useBookmarks } from "@/store/bookmarks";

export default function BookmarksPage() {
  const bookmarks = useBookmarks((s) => s.bookmarks);
  const clear = useBookmarks((s) => s.clear);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Read later</h1>
        {bookmarks.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clear}>
            <Trash2 className="size-4" /> Clear all
          </Button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-muted-foreground py-24 text-center">
          Nothing saved yet. Bookmark articles to read them later.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((article) => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
