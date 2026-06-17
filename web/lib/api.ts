import type {
  Chapter,
  MangaDetail,
  MangaSummary,
} from "./types"
import {
  getMockChapters,
  getMockMangaDetail,
  mockMangaList,
} from "./mock-data"

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? ""

const USE_MOCKS = BASE_URL === ""

// Mapping site IDs to display names globally
const siteNameMap: Record<number, string> = {
  1: "Asmotoon",
  2: "MangaDex",
  3: "MangaFox",
}

async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  })
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

// Data Transformer: Maps database structures and calculates values dynamically
function mapBackendMangaSummary(backend: any): MangaSummary {
  const latestChNum = backend.latest_chapter_number || backend.chapter_number;
  const latestSiteId = backend.latest_site_id || backend.site_id;

  // Grab the absolute source address
  const rawCoverUrl = backend.cover_url ? String(backend.cover_url) : "";

  return {
    id: String(backend.id),
    title: backend.title || "Untitled Manga",
    
    // CHANGED: If it's a valid remote link, funnel it directly into your local NextJS proxy route
    cover_url: rawCoverUrl 
      ? `/api/proxy-image?url=${encodeURIComponent(rawCoverUrl)}` 
      : "/placeholder.svg",
      
    summary: backend.summary || "",
    status: backend.status || "ongoing", 
    author: backend.author || "Unknown Author", 
    genre: backend.genres || [], 
    created_at: backend.created_at,
    updated_at: backend.updated_at,
    chapter_number: latestChNum ? `Ch. ${latestChNum}` : undefined,
    latestChapterSource: latestSiteId ? (siteNameMap[Number(latestSiteId)] || `Site #${latestSiteId}`) : undefined,
    locked: Boolean(backend.locked),
    locked_until: backend.locked_until || undefined
  }
}

export async function getLatestManga(limit = 24): Promise<MangaSummary[]> {
  if (USE_MOCKS) {
    return mockMangaList.slice(0, limit)
  }
  try {
    const data = await apiGet<any[]>(`/manga/latest?limit=${limit}&offset=0`)
    
    // If your backend endpoint doesn't automatically join the latest chapter details, 
    // we can request them or map them safely.
    return data.map(mapBackendMangaSummary)
  } catch (error) {
    console.error("Error fetching latest manga:", error)
    return []
  }
}

export async function searchManga(query: string, limit = 24): Promise<MangaSummary[]> {
  if (USE_MOCKS) {
    const q = query.trim().toLowerCase()
    if (!q) return mockMangaList.slice(0, limit)
    return mockMangaList.filter(m => m.title.toLowerCase().includes(q)).slice(0, limit)
  }
  try {
    const params = new URLSearchParams({ title: query, limit: String(limit) })
    const data = await apiGet<any[]>(`/manga/search/advanced?${params}`)
    return data.map(mapBackendMangaSummary)
  } catch (error) {
    console.error("Error searching manga:", error)
    return []
  }
}

export async function getMangaDetail(id: string): Promise<MangaDetail | null> {
  if (USE_MOCKS) {
    return getMockMangaDetail(id)
  }
  try {
    const data = await apiGet<any>(`/manga/${encodeURIComponent(id)}`)
    if (!data || !data.id) return null

    return {
      ...mapBackendMangaSummary(data),
      artists: data.artists || [],
      authors: data.authors || [],
      altTitles: data.alt_titles || [],
      sources: (data.sources || []).map((src: any) => ({
        source_id: String(src.source_id),
        site_id: String(src.site_id),
        domain: src.domain || "Unknown Source",
        site_url: src.site_url,
        manga_url: src.manga_url,
        status: src.status,
      }))
    }
  } catch (error) {
    console.error(`Error fetching manga detail for ID ${id}:`, error)
    return null
  }
}

export async function getMangaChapters(id: string): Promise<Chapter[]> {
  if (USE_MOCKS) {
    return getMockChapters(id)
  }
  try {
    const data = await apiGet<any>(`/manga/${encodeURIComponent(id)}/chapters`)
    return (data.chapters || []).map((ch: any) => {
      const siteIdNum = Number(ch.site_id)
      return {
        id: String(ch.id),
        number: String(ch.chapter_number), 
        title: ch.title || `Chapter ${ch.chapter_number}`,
        sourceId: String(ch.site_id),
        sourceName: siteNameMap[siteIdNum] || `Site #${ch.site_id}`,
        externalUrl: ch.url || "", 
        locked: Boolean(ch.locked),
        unlockAt: ch.locked_until || undefined
      }
    })
  } catch (error) {
    console.error(`Failed fetching chapters for ${id}:`, error)
    return []
  }
}