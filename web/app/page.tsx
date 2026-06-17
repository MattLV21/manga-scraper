import { Suspense } from "react"
import { getLatestManga, searchManga } from "@/lib/api"
import { MangaCard } from "@/components/manga-card"
import { SiteHeader } from "@/components/site-header"
import { Skeleton } from "@/components/ui/skeleton"
import type { MangaSummary } from "@/lib/types"

export const dynamic = "force-dynamic"

function MangaGrid({ items }: { items: MangaSummary[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((manga) => (
        <MangaCard key={manga.id} manga={manga} />
      ))}
    </div>
  )
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  )
}

async function Results({ query }: { query: string }) {
  const items = query ? await searchManga(query) : await getLatestManga()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-20 text-center">
        <p className="text-lg font-medium text-foreground">No results found</p>
        <p className="text-sm text-muted-foreground">
          {query
            ? `Nothing matched "${query}". Try a different title or genre.`
            : "No manga available yet."}
        </p>
      </div>
    )
  }

  return <MangaGrid items={items} />
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = (q ?? "").trim()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader initialQuery={query} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {!query && (
          <section className="mb-8">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Discover manga from across the web
            </h1>
            <p className="mt-1 max-w-2xl text-pretty text-sm text-muted-foreground">
              Latest releases aggregated and tracked across multiple sources, all
              in one place.
            </p>
          </section>
        )}

        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            {query ? `Results for "${query}"` : "Latest Updates"}
          </h2>
        </div>

        <Suspense key={query} fallback={<GridSkeleton />}>
          <Results query={query} />
        </Suspense>
      </main>
    </div>
  )
}
