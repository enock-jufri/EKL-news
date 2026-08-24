"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Newspaper, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/news-types";
import { useBookmarks } from "@/store/bookmarks";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const count = useBookmarks((s) => s.bookmarks.length);

  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <Newspaper className="size-4" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            EKL<span className="text-muted-foreground font-normal">News</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={c.slug === "trending" ? "/" : `/category/${c.slug}`}
              className={cn(
                "text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                (c.slug === "trending"
                  ? pathname === "/"
                  : pathname === `/category/${c.slug}`) &&
                  "text-foreground bg-accent"
              )}
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="Search">
            <Link href="/search">
              <Search className="size-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Bookmarks">
            <Link href="/bookmarks" className="relative">
              <Bookmark className="size-4" />
              {count > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-1 -right-1 size-4 min-w-4 rounded-full px-0 text-[10px]"
                >
                  {count > 99 ? "9+" : count}
                </Badge>
              )}
            </Link>
          </Button>
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild className="ml-1 hidden sm:inline-flex">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t px-4 py-2 lg:hidden">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={c.slug === "trending" ? "/" : `/category/${c.slug}`}
            className={cn(
              "text-muted-foreground hover:text-foreground shrink-0 rounded-full border px-3 py-1 text-xs font-medium",
              (c.slug === "trending" ? pathname === "/" : pathname === `/category/${c.slug}`) &&
                "text-primary-foreground bg-primary border-transparent"
            )}
          >
            {c.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
