"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Article } from "@/lib/news";

interface BookmarkState {
  bookmarks: Article[];
  toggle: (article: Article) => void;
  isBookmarked: (url: string) => boolean;
  clear: () => void;
}

export const useBookmarks = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggle: (article) =>
        set((state) => {
          const exists = state.bookmarks.some((a) => a.url === article.url);
          return {
            bookmarks: exists
              ? state.bookmarks.filter((a) => a.url !== article.url)
              : [article, ...state.bookmarks],
          };
        }),
      isBookmarked: (url) => get().bookmarks.some((a) => a.url === url),
      clear: () => set({ bookmarks: [] }),
    }),
    { name: "ekl-bookmarks" }
  )
);
