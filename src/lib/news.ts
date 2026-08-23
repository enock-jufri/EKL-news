export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const CATEGORIES = [
  { slug: "trending", label: "Trending", apiCategory: "general" },
  { slug: "technology", label: "Technology", apiCategory: "technology" },
  { slug: "business", label: "Business", apiCategory: "business" },
  { slug: "health", label: "Health", apiCategory: "health" },
  { slug: "science", label: "Science", apiCategory: "science" },
  { slug: "sports", label: "Sports", apiCategory: "sports" },
  { slug: "entertainment", label: "Entertainment", apiCategory: "entertainment" },
] as const;

const API_BASE = "https://news-api-rouge.vercel.app/api/get-data";

export function isValidCategory(slug: string): boolean {
  return CATEGORIES.some((c) => c.slug === slug);
}

export async function fetchByCategory(
  slug: string,
  revalidate = 300
): Promise<Article[]> {
  const category =
    CATEGORIES.find((c) => c.slug === slug)?.apiCategory ?? "general";
  return fetchArticles(`${API_BASE}?category=${category}`, revalidate);
}

export async function fetchByQuery(query: string): Promise<Article[]> {
  return fetchArticles(
    `${API_BASE}?query=${encodeURIComponent(query)}`,
    0,
    false
  );
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
    const data: NewsResponse = await res.json();
    const articles = data.articles ?? [];
    return filterImages ? articles.filter((a) => a.urlToImage) : articles;
  } catch {
    return [];
  }
}
