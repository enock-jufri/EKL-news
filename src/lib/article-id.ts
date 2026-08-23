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
