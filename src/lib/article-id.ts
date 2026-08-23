export function encodeArticleId(url: string): string {
  return Buffer.from(url, "utf8").toString("base64url");
}

export function decodeArticleId(id: string): string | null {
  try {
    const url = Buffer.from(id, "base64url").toString("utf8");
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

interface ArticleMetaHref {
  url: string;
  title?: string;
  urlToImage?: string | null;
  publishedAt?: string;
  sourceName?: string;
}

/**
 * Builds an in-app reader href. Display metadata (title, image, source,
 * date) travels in the query string so the reader shell renders instantly
 * while full text is extracted server-side.
 */
export function buildArticleHref(
  article: ArticleMetaHref,
  from?: string
): string {
  const q = new URLSearchParams();
  if (from) q.set("from", from);
  if (article.title) q.set("t", article.title);
  if (article.sourceName) q.set("s", article.sourceName);
  if (article.urlToImage) q.set("i", article.urlToImage);
  if (article.publishedAt) q.set("d", article.publishedAt);
  const qs = q.toString();
  return `/article/${encodeArticleId(article.url)}${qs ? `?${qs}` : ""}`;
}
