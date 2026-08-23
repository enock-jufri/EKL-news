import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { NewsFeed, NewsFeedSkeleton } from "@/components/news-feed";
import { CATEGORIES, fetchByCategory, isValidCategory } from "@/lib/news";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.filter((c) => c.slug !== "trending").map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  return { title: category?.label ?? "Category" };
}

async function Feed({ slug }: { slug: string }) {
  const articles = await fetchByCategory(slug);
  return <NewsFeed articles={articles} featured from={slug} />;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!isValidCategory(slug)) notFound();

  const label = CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">{label}</h1>
      <Suspense fallback={<NewsFeedSkeleton />}>
        <Feed slug={slug} />
      </Suspense>
    </div>
  );
}
