import { Newspaper } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <span className="flex items-center gap-2 font-medium">
          <Newspaper className="size-4" /> EKL News
        </span>
        <span>© {new Date().getFullYear()} EKL News. All rights reserved.</span>
      </div>
    </footer>
  );
}
