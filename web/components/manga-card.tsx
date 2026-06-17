import Image from "next/image"
import Link from "next/link"
import { Lock } from "lucide-react"
import type { MangaSummary } from "@/lib/types"
import { formatUnlockCountdown } from "@/lib/format"

export function MangaCard({ manga }: { manga: MangaSummary }) {
  return (
    <Link
      href={`/manga/${manga.id}`}
      className="group flex flex-col gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          /* CHANGED: Swapped manga.cover to manga.cover_url */
          src={manga.cover_url || "/placeholder.svg"}
          alt={`Cover of ${manga.title}`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        {manga.chapter_number && (
          <span className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
            {manga.chapter_number}
          </span>
        )}
        {manga.locked && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-primary backdrop-blur-sm">
            <Lock className="size-3" aria-hidden />
            {formatUnlockCountdown(manga.locked_until)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
          {manga.title}
        </h3>
        <div className="flex items-center gap-2">
          {manga.latestChapterSource && (
            <span className="truncate text-xs font-medium text-muted-foreground">
              {manga.latestChapterSource}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
