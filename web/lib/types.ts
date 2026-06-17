// Domain types for the manga aggregator. These mirror a MangaDex-style data
// model: a manga has metadata plus chapters that may originate from multiple
// source sites / scanlation groups, presented here as a single merged list.

export type MangaStatus = "ongoing" | "completed" | "hiatus" | "cancelled"

export type ContentRating = "safe" | "suggestive" | "erotica"

export interface MangaSummary {
  id: string
  title: string
  /** Cover image URL. */
  cover_url: string
  /** Short description / synopsis. */
  summary?: string
  status: MangaStatus
  /** Primary author(s). */
  author?: string
  artist?: string
  /** Genre / theme tags. */
  genre: string[]
  /** Most recent chapter label, e.g. "Ch. 142". */
  chapter_number?: string
  /** Name of the source site that uploaded the most recent chapter. */
  latestChapterSource?: string
  /** Whether the most recent chapter is locked behind early access. */
  locked?: boolean
  /** ISO timestamp when the most recent chapter unlocks, if locked. */
  locked_until?: string
  /** ISO timestamp of last update. */
  updated_at?: string
  /** ISO timestamp of creation. */
  created_at?: string
}

export interface MangaDetail extends MangaSummary {
  artists?: string[]
  authors?: string[]
  /** Alternative titles. */
  altTitles?: string[]
  /** Distinct source sites that supply chapters for this manga. */
  sources: MangaSource[]
}

export interface MangaSource {
  source_id: string
  site_id: string
  /** Display name of the source site / scanlation group. */
  domain: string
  /** Optional homepage of the source. */
  site_url?: string
  manga_url?: string
  status?: MangaStatus
}

export interface Chapter {
  id: string
  /** Chapter number as a string to allow values like "10.5". */
  number: string
  title: string
  /** The source this specific chapter release comes from. */
  sourceId: string
  /** Display name of the source site / scanlation group. */
  sourceName: string
  /** ISO timestamp this chapter was published. */
  publishedAt?: string
  /** External URL to read the chapter on the source site. */
  externalUrl: string
  /** Scanlation group, if distinct from the source. */
  group?: string
  /** Whether this release is locked behind early access / paid tier. */
  locked?: boolean
  /** ISO timestamp when a locked release becomes free to read. */
  locked_until?: string
}

export interface SearchResponse {
  results: MangaSummary[]
  total: number
}
