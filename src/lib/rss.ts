import "server-only";

import { JSDOM } from "jsdom";

import type { Article } from "@/lib/news-types";

const BBC_FEEDS: Record<string, string> = {
  trending: "https://feeds.bbci.co.uk/news/rss.xml",
  business: "https://feeds.bbci.co.uk/news/business/rss.xml",
  health: "https://feeds.bbci.co.uk/news/health/rss.xml",
  science: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
  technology: "https://feeds.bbci.co.uk/news/technology/rss.xml",
  sports: "https://feeds.bbci.co.uk/sport/football/rss.xml",
  entertainment:
    "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml",
};

const GOOGLE_NEWS_SEARCH =
  "https://news.google.com/rss/search?hl=en-US&gl=US&ceid=US:en&q=";

function text(el: Element | null, tag: string): string | null {
  return el?.getElementsByTagName(tag)[0]?.textContent?.trim() ?? null;
}

/**
 * BBC feeds only ship 240px thumbnails, but their CDN serves any width
 * via the URL pattern /ace/standard/{width}/... — request high-res.
 */
function upscaleThumbnail(url: string): string {
  return url.replace(/\/ace\/standard\/\d+\//, "/ace/standard/976/");
}

function largestThumbnail(item: Element): string | null {
  const thumbs = item.getElementsByTagName("media:thumbnail");
  let best: string | null = null;
  let bestWidth = 0;
  for (const thumb of thumbs) {
    const url = thumb.getAttribute("url");
    const width = Number(thumb.getAttribute("width") ?? 0);
    if (url && width >= bestWidth) {
      best = url;
      bestWidth = width;
    }
  }
  return best ? upscaleThumbnail(best) : null;
}

function parseRss(xml: string, sourceName: string): Article[] {
  const dom = new JSDOM(xml, { contentType: "text/xml" });
  const items = [...dom.window.document.getElementsByTagName("item")];

  return items
    .map((item): Article => {
      const title = text(item, "title") ?? "";
      const link = text(item, "link") ?? "";
      const description = text(item, "description");
      const pubDate = text(item, "pubDate");

      return {
        source: { id: null, name: sourceName },
        author: null,
        title,
        description,
        url: link,
        urlToImage: largestThumbnail(item),
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        content: description,
      };
    })
    .filter((a) => a.title && a.url);
}

export async function fetchRssCategoryFallback(
  slug: string
): Promise<Article[]> {
  const feedUrl = BBC_FEEDS[slug] ?? BBC_FEEDS.trending;
  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return [];
    return parseRss(await res.text(), "BBC News");
  } catch {
    return [];
  }
}

export async function fetchRssSearchFallback(
  query: string
): Promise<Article[]> {
  try {
    const res = await fetch(
      `${GOOGLE_NEWS_SEARCH}${encodeURIComponent(query)}`,
      { next: { revalidate: 600 }, signal: AbortSignal.timeout(10_000) }
    );
    if (!res.ok) return [];
    return parseRss(await res.text(), "Google News");
  } catch {
    return [];
  }
}
