import "server-only";

import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export interface ExtractedArticle {
  url: string;
  title: string;
  byline: string | null;
  siteName: string | null;
  imageUrl: string | null;
  publishedTime: string | null;
  excerpt: string | null;
  html: string | null;
}

export { encodeArticleId, decodeArticleId } from "@/lib/article-id";

const BLOCKED_TAGS = [
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "form",
  "button",
  "input",
  "select",
  "textarea",
  "noscript",
];

function sanitizeHtml(html: string, baseUrl: string): string {
  const dom = new JSDOM(`<body>${html}</body>`);
  const doc = dom.window.document;

  for (const tag of BLOCKED_TAGS) {
    doc.querySelectorAll(tag).forEach((el) => el.remove());
  }

  doc.querySelectorAll("*").forEach((el) => {
    for (const attr of [...el.attributes]) {
      if (
        attr.name.toLowerCase().startsWith("on") ||
        attr.name === "style" ||
        attr.value.trim().toLowerCase().startsWith("javascript:")
      ) {
        el.removeAttribute(attr.name);
      }
    }
  });

  doc.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", "lazy");
    const src = img.getAttribute("src");
    if (src) {
      try {
        img.setAttribute("src", new URL(src, baseUrl).toString());
      } catch {
        img.removeAttribute("src");
      }
    }
    if (!img.getAttribute("alt")) img.setAttribute("alt", "");
  });

  doc.querySelectorAll("a").forEach((a) => {
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
    const href = a.getAttribute("href");
    if (href) {
      try {
        a.setAttribute("href", new URL(href, baseUrl).toString());
      } catch {
        a.removeAttribute("href");
      }
    }
  });

  return doc.body.innerHTML;
}

function getMeta(doc: Document, selectors: string[]): string | null {
  for (const selector of selectors) {
    const value = doc
      .querySelector(selector)
      ?.getAttribute("content")
      ?.trim();
    if (value) return value;
  }
  return null;
}

export async function extractArticle(
  rawUrl: string,
  revalidate = 3600
): Promise<ExtractedArticle> {
  const fallback: ExtractedArticle = {
    url: rawUrl,
    title: "",
    byline: null,
    siteName: null,
    imageUrl: null,
    publishedTime: null,
    excerpt: null,
    html: null,
  };

  try {
    const res = await fetch(rawUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(15_000),
      next: { revalidate },
    });
    if (!res.ok) throw new Error(`Fetch failed with ${res.status}`);

    const html = await res.text();
    const dom = new JSDOM(html, { url: rawUrl });
    const doc = dom.window.document;

    const siteName =
      getMeta(doc, ['meta[property="og:site_name"]']) ??
      (() => {
        try {
          return new URL(rawUrl).hostname.replace(/^www\./, "");
        } catch {
          return null;
        }
      })();

    const parsed = new Readability(dom.window.document).parse();

    return {
      url: rawUrl,
      title:
        parsed?.title?.trim() ||
        getMeta(doc, ['meta[property="og:title"]', "title"]) ||
        "",
      byline: parsed?.byline?.trim() ?? null,
      siteName,
      imageUrl: getMeta(doc, [
        'meta[property="og:image"]',
        'meta[property="og:image:secure_url"]',
        'meta[name="twitter:image"]',
      ]),
      publishedTime: getMeta(doc, [
        'meta[property="article:published_time"]',
        'meta[name="date"]',
        'meta[itemprop="datePublished"]',
      ]),
      excerpt:
        getMeta(doc, [
          'meta[property="og:description"]',
          'meta[name="description"]',
        ]) ??
        parsed?.excerpt?.trim() ??
        null,
      html: parsed?.content ? sanitizeHtml(parsed.content, rawUrl) : null,
    };
  } catch {
    return fallback;
  }
}
