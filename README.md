# EKL News

A modern news aggregator built with Next.js 15, TypeScript, Tailwind CSS v4 and shadcn/ui.

## Features

- Trending + 6 category feeds (Technology, Business, Health, Science, Sports, Entertainment)
- Featured story hero with live data from the news API
- Full-text search with debounced queries
- "Read later" bookmarks persisted to localStorage (zustand)
- Dark / light / system theme
- Streaming pages with skeleton loading states

## Stack

| Layer    | Tech                          |
| -------- | ----------------------------- |
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript                    |
| Styling  | Tailwind CSS v4               |
| UI       | shadcn/ui components, lucide-react |
| State    | zustand (persisted)           |
| Theming  | next-themes                   |

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Project structure

```
src/
├── app/                  # Routes (home, category/[slug], search, bookmarks, login)
├── components/           # Shared components + shadcn ui primitives
├── lib/news.ts           # Typed API client + category registry
└── store/bookmarks.ts    # Persisted bookmark store
```
