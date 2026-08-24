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

export const CATEGORIES = [
  { slug: "trending", label: "Trending", apiCategory: "general" },
  { slug: "technology", label: "Technology", apiCategory: "technology" },
  { slug: "business", label: "Business", apiCategory: "business" },
  { slug: "health", label: "Health", apiCategory: "health" },
  { slug: "science", label: "Science", apiCategory: "science" },
  { slug: "sports", label: "Sports", apiCategory: "sports" },
  { slug: "entertainment", label: "Entertainment", apiCategory: "entertainment" },
] as const;

export function isValidCategory(slug: string): boolean {
  return CATEGORIES.some((c) => c.slug === slug);
}
