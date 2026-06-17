import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Globe, User } from "lucide-react"
import { getMangaChapters, getMangaDetail } from "@/lib/api"
import { ChapterList } from "@/components/chapter-list"
import { SiteHeader } from "@/components/site-header"
import { statusColors, statusLabels } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const manga = await getMangaDetail(id)
  if (!manga) return { title: "Manga not found — MangaVault" }
  return {
    title: `${manga.title} — MangaVault`,
    /* FIXED: Changed manga.description to manga.summary to match types.ts */
    description: manga.summary,
  }
}

export default async function MangaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [manga, chapters] = await Promise.all([
    getMangaDetail(id),
    getMangaChapters(id),
  ])

  if (!manga) notFound()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero banner */}
      <div className="relative">
        <div className="absolute inset-0 h-64 overflow-hidden bg-muted">
          <Image
            src={manga.cover_url || "/placeholder.svg"}
            alt=""
            fill
            priority
            className="object-cover opacity-20 blur-xl select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
      </div>

      {/* Content layout */}
      <div className="relative mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to browsing
        </Link>

        <main className="mt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* Cover art image container */}
            <div className="relative aspect-[2/3] w-full max-w-[200px] shrink-0 self-center overflow-hidden rounded-lg border border-border bg-muted shadow-md sm:self-start">
              <Image
                src={manga.cover_url || "/placeholder.svg"}
                alt={`Cover of ${manga.title}`}
                fill
                priority
                sizes="200px"
                className="object-cover"
              />
            </div>

            {/* Info details blocks */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase",
                      statusColors[manga.status]
                    )}
                  >
                    {statusLabels[manga.status]}
                  </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {manga.title}
                </h1>
              </div>

              {manga.author && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <User className="size-4" aria-hidden />
                  <span>{manga.author}</span>
                  <span>|</span>
                  <User className="size-4" aria-hidden />
                  <span>{manga.artists?.join(", ") || "Unknown Artists"}</span>
                </div>
              )}

              {manga.genre && manga.genre.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {manga.genre.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* FIXED: Changed manga.description to manga.summary to match types.ts */}
              {manga.summary && (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {manga.summary}
                </p>
              )}

              {/* Sources integration */}
              {manga.sources && manga.sources.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Globe className="size-4" aria-hidden />
                    Available on:
                  </span>
                  {manga.sources.map((s) => (
                    <a
                      /* CHANGED: Converted from span to an external link anchor */
                      key={s.source_id}
                      href={s.manga_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-border bg-card px-2 py-0.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary hover:border-primary/30"
                    >
                      {s.domain}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chapters view container */}
          <section className="mt-10">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-foreground">Chapters</h2>
              <span className="text-sm text-muted-foreground">
                {chapters.length} chapter{chapters.length === 1 ? "" : "s"}
              </span>
            </div>
            {chapters.length > 0 ? (
              <ChapterList chapters={chapters} />
            ) : (
              <p className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
                No chapters available yet.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}