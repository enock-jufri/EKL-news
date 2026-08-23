"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ALargeSmall, Check, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const SIZES = [
  { label: "S", className: "text-[15px]" },
  { label: "M", className: "text-base" },
  { label: "L", className: "text-lg" },
];

const SIZE_KEY = "ekl-reader-size";

export function ArticleReader({
  url,
  title,
  actions,
  leading,
  children,
}: {
  url: string;
  title: string;
  actions?: ReactNode;
  leading?: ReactNode;
  children: ReactNode;
}) {
  const [sizeIndex, setSizeIndex] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = Number(localStorage.getItem(SIZE_KEY));
    if (stored >= 0 && stored < SIZES.length) setSizeIndex(stored);
  }, []);

  function cycleSize() {
    const next = (sizeIndex + 1) % SIZES.length;
    setSizeIndex(next);
    localStorage.setItem(SIZE_KEY, String(next));
  }

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // share sheet dismissed or clipboard unavailable
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2">
        {leading}
        <div className="flex items-center gap-1">
          {actions}
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleSize}
            aria-label="Change text size"
            className="gap-1.5"
          >
            <ALargeSmall className="size-4" />
            <span className="w-3 text-xs font-semibold">
              {SIZES[sizeIndex].label}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={share}
            aria-label="Share article"
          >
            {copied ? (
              <>
                <Check className="size-4" /> Copied
              </>
            ) : (
              <>
                <Share2 className="size-4" /> Share
              </>
            )}
          </Button>
        </div>
      </div>
      <div className={SIZES[sizeIndex].className}>{children}</div>
    </>
  );
}
