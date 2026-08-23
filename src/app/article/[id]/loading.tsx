import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-8 w-20" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16" />
          ))}
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-3/4" />
      </div>
      <Skeleton className="mb-8 aspect-video w-full rounded-xl" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-4 ${i % 4 === 3 ? "w-2/3" : "w-full"}`}
          />
        ))}
      </div>
    </div>
  );
}
