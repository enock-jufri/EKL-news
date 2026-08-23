"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/store/bookmarks";
import type { Article } from "@/lib/news";
import { cn } from "@/lib/utils";

export function BookmarkButton({
  article,
  variant = "outline",
  className,
}: {
  article: Article;
  variant?: "outline" | "ghost";
  className?: string;
}) {
  const toggle = useBookmarks((s) => s.toggle);
  const saved = useBookmarks((s) => s.bookmarks.some((a) => a.url === article.url));

  return (
    <Button
      variant={variant}
      size={variant === "ghost" ? "icon" : "sm"}
      aria-label={saved ? "Remove bookmark" : "Add bookmark"}
      onClick={(e) => {
        e.preventDefault();
        toggle(article);
      }}
      className={className}
    >
      {variant === "outline" ? (
        <>
          {saved ? (
            <BookmarkCheck className="size-4 text-primary" />
          ) : (
            <Bookmark className="size-4" />
          )}
          {saved ? "Saved" : "Save"}
        </>
      ) : (
        <Bookmark
          className={cn("size-4", saved && "fill-primary text-primary")}
        />
      )}
    </Button>
  );
}
