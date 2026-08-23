/** Base64url that works in both Node and the browser (no Buffer). */
function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(id: string): string {
  const base64 = id.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  return new TextDecoder().decode(
    Uint8Array.from(binary, (char) => char.charCodeAt(0))
  );
}

export function encodeArticleId(url: string): string {
  return toBase64Url(new TextEncoder().encode(url));
}

export function decodeArticleId(id: string): string | null {
  try {
    const url = fromBase64Url(id);
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
