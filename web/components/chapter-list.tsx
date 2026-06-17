"use client"

import { useMemo, useState } from "react"
import { ExternalLink, Lock } from "lucide-react"
import type { Chapter } from "@/lib/types"
import { formatRelativeTime, formatUnlockCountdown } from "@/lib/format"
import { cn } from "@/lib/utils"

interface ChapterGroup {
  number: string
  title?: string
  /** Newest publish time across all releases of this chapter. */
  latestPublishedAt?: string
  releases: Chapter[]
}

export function ChapterList({ chapters }: { chapters: Chapter[] }) {
  const sources = useMemo(() => {
    const map = new Map<string, string>()
    for (const c of chapters) map.set(c.sourceId, c.sourceName)
    return Array.from(map, ([id, name]) => ({ id, name }))
  }, [chapters])

  const [activeSource, setActiveSource] = useState<string>("all")

  // Group releases by chapter number — a single chapter (e.g. 183) can be
  // uploaded by more than one source site.
  const groups = useMemo<ChapterGroup[]>(() => {
    const map = new Map<string, ChapterGroup>()
    for (const c of chapters) {
      if (activeSource !== "all" && c.sourceId !== activeSource) continue
      const existing = map.get(c.number)
      if (existing) {
        existing.releases.push(c)
        if (!existing.title && c.title) existing.title = c.title
        if (
          c.publishedAt &&
          (!existing.latestPublishedAt ||
            c.publishedAt > existing.latestPublishedAt)
        ) {
          existing.latestPublishedAt = c.publishedAt
        }
      } else {
        map.set(c.number, {
          number: c.number,
          title: c.title,
          latestPublishedAt: c.publishedAt,
          releases: [c],
        })
      }
    }
    return Array.from(map.values()).sort(
      (a, b) => Number(b.number) - Number(a.number),
    )
  }, [chapters, activeSource])

  return (
    <div className="flex flex-col gap-4">
      {sources.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Source:
          </span>
          <FilterChip
            label="All"
            active={activeSource === "all"}
            onClick={() => setActiveSource("all")}
          />
          {sources.map((s) => (
            <FilterChip
              key={s.id}
              label={s.name}
              active={activeSource === s.id}
              onClick={() => setActiveSource(s.id)}
            />
          ))}
        </div>
      )}

      <ul className="flex flex-col divide-y divide-border overflow-hidden rounded-lg border border-border">
        {groups.map((group) => (
          <li key={group.number} className="bg-card">
            <div className="flex items-center justify-between gap-3 px-4 pt-3">
              <span className="truncate text-sm font-semibold text-foreground">
                Chapter {group.number}
                {group.title ? (
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    · {group.title}
                  </span>
                ) : null}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatRelativeTime(group.latestPublishedAt)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 px-4 pb-3 pt-2">
              {group.releases.map((release) => (
                <ReleaseTag key={release.id} release={release} />
              ))}
            </div>
          </li>
        ))}
      </ul>

      {groups.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No chapters from this source yet.
        </p>
      )}
    </div>
  )
}

function ReleaseTag({ release }: { release: Chapter }) {
  if (release.locked) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
        title={formatUnlockCountdown(release.locked_until)}
      >
        <Lock className="size-3.5" aria-hidden />
        <span>{release.sourceName}</span>
        <span className="text-primary/70">·</span>
        <span className="text-primary/90">
          {formatUnlockCountdown(release.locked_until)}
        </span>
      </span>
    )
  }

  return (
    <a
      href={release.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group/tag inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:text-foreground"
    >
      <span>{release.sourceName}</span>
      <ExternalLink
        className="size-3.5 text-muted-foreground transition-colors group-hover/tag:text-primary"
        aria-hidden
      />
      
    </a>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  )
}
