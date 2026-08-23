"use client";

import { useState } from "react";
import Link from "next/link";
import { Newspaper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <div className="bg-card w-full max-w-sm rounded-2xl border p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2">
          <span className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg">
            <Newspaper className="size-5" />
          </span>
          <h1 className="text-xl font-bold">
            {mode === "signin" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === "signin"
              ? "Sign in to sync your bookmarks"
              : "Sign up to get started"}
          </p>
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          {mode === "signup" && (
            <Input type="text" placeholder="Username" required minLength={3} />
          )}
          <Input type="email" placeholder="Email" required />
          <Input
            type="password"
            placeholder="Password"
            required
            minLength={8}
          />
          <Button type="submit">
            {mode === "signin" ? "Sign in" : "Sign up"}
          </Button>
        </form>

        <p className="text-muted-foreground mt-4 text-center text-sm">
          {mode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-foreground font-medium underline underline-offset-4"
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          Authentication is not wired to a backend yet.{" "}
          <Link href="/" className="underline underline-offset-2">
            Back to news
          </Link>
        </p>
      </div>
    </div>
  );
}
