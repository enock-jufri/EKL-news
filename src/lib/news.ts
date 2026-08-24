import {
  fetchRssCategoryFallback,
  fetchRssSearchFallback,
} from "@/lib/rss";
import { CATEGORIES, type Article } from "@/lib/news-types";

export type { Article };
export { CATEGORIES, isValidCategory } from "@/lib/news-types";

const API_BASE = "https://news-api-rouge.vercel.app/api/get-data";

/** Max articles rendered per feed (featured + grid rows of 3). */
const FEED_LIMIT = 21;

export const PAGE_SIZE_PARAM = `pageSize=${FEED_LIMIT}`;

/** Cache feeds for 30 min to stay well inside the API's daily quota. */
const FEED_REVALIDATE = 1800;

export async function fetchByCategory(
  slug: string,
  revalidate = FEED_REVALIDATE
): Promise<Article[]> {
  const category =
    CATEGORIES.find((c) => c.slug === slug)?.apiCategory ?? "general";
  const articles = await fetchArticles(
    `${API_BASE}?category=${category}&${PAGE_SIZE_PARAM}`,
    revalidate
  );
  if (articles.length > 0) return articles;
  return fetchRssCategoryFallback(slug);
}

export async function fetchByQuery(query: string): Promise<Article[]> {
  const articles = await fetchArticles(
    `${API_BASE}?query=${encodeURIComponent(query)}&${PAGE_SIZE_PARAM}`,
    0,
    false
  );
  if (articles.length > 0) return articles;
  return fetchRssSearchFallback(query);
}

async function fetchArticles(
  url: string,
  revalidate: number,
  filterImages = true
): Promise<Article[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    const data: { status: string; articles?: Article[] } = await res.json();
    if (data.status === "error") throw new Error("news API error");
    const articles = data.articles ?? [];
    return filterImages ? articles.filter((a) => a.urlToImage) : articles;
  } catch {
    return [];
  }
}
