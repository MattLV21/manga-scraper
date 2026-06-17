"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { BookOpen, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SiteHeader({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery || searchParams.get("q") || "")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/")
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpen className="size-5" aria-hidden />
          </span>
          <span className="hidden text-lg font-bold tracking-tight text-foreground sm:inline">
            Manga<span className="text-primary">Vault</span>
          </span>
        </Link>

        <form onSubmit={onSubmit} className="relative ml-auto w-full max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search manga, authors, genres..."
            aria-label="Search manga"
            className="pl-9"
          />
        </form>
      </div>
    </header>
  )
}
