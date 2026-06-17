import type { Chapter, MangaDetail, MangaSummary } from "./types"

// Mock dataset used as a fallback so the UI renders before the real backend
// endpoints are connected. Replace by wiring up the fetchers in lib/api.ts.

export const mockMangaList: MangaSummary[] = [
  {
    id: "solo-ascension",
    title: "Solo Ascension",
    cover: "/manga-cover-dark-fantasy-warrior.png",
    description:
      "A weak hunter awakens a mysterious system that lets him grow infinitely stronger with every battle he survives.",
    status: "ongoing",
    author: "Hyun Jae",
    tags: ["Action", "Fantasy", "Adventure"],
    latestChapter: "Ch. 184",
    latestChapterSource: "MangaVerse",
    latestChapterLocked: true,
    latestChapterUnlockAt: new Date(Date.now() + 3 * 86_400_000).toISOString(),
    updatedAt: "2026-06-16T09:00:00Z",
  },
  {
    id: "blade-of-the-azure",
    title: "Blade of the Azure Sky",
    cover: "/manga-cover-samurai-blue-sky.png",
    description:
      "A wandering swordsman seeks the legendary blade said to cut through fate itself.",
    status: "ongoing",
    author: "Kaito Mori",
    tags: ["Action", "Historical", "Drama"],
    latestChapter: "Ch. 96",
    latestChapterSource: "ScanHub",
    updatedAt: "2026-06-15T18:30:00Z",
  },
  {
    id: "midnight-cafe",
    title: "Midnight Café",
    cover: "/manga-cover-cozy-cafe-night.png",
    description:
      "Strangers share their deepest secrets at a café that only opens after midnight.",
    status: "completed",
    author: "Rin Sato",
    tags: ["Slice of Life", "Romance", "Drama"],
    latestChapter: "Ch. 60",
    latestChapterSource: "LeafNovel Scans",
    updatedAt: "2026-06-10T12:00:00Z",
  },
  {
    id: "starbound-academy",
    title: "Starbound Academy",
    cover: "/manga-cover-space-academy-students.png",
    description:
      "At an elite academy orbiting a dying star, cadets train to pilot the last hope of humanity.",
    status: "ongoing",
    author: "Yuki Tanaka",
    tags: ["Sci-Fi", "Action", "School"],
    latestChapter: "Ch. 121",
    latestChapterSource: "MangaVerse",
    latestChapterLocked: true,
    latestChapterUnlockAt: new Date(Date.now() + 18 * 3_600_000).toISOString(),
    updatedAt: "2026-06-16T07:45:00Z",
  },
  {
    id: "the-last-alchemist",
    title: "The Last Alchemist",
    cover: "/manga-cover-alchemist-magic-circle.png",
    description:
      "In a world stripped of magic, one alchemist guards the final formula that could restore it.",
    status: "hiatus",
    author: "Elena Cross",
    tags: ["Fantasy", "Mystery", "Adventure"],
    latestChapter: "Ch. 73",
    latestChapterSource: "ScanHub",
    updatedAt: "2026-05-28T15:20:00Z",
  },
  {
    id: "crimson-harvest",
    title: "Crimson Harvest",
    cover: "/manga-cover-horror-red-field.png",
    description:
      "A quiet farming village hides a terrible ritual that feeds on its own people.",
    status: "ongoing",
    author: "Mara Vance",
    tags: ["Horror", "Thriller", "Supernatural"],
    latestChapter: "Ch. 48",
    latestChapterSource: "LeafNovel Scans",
    updatedAt: "2026-06-14T20:10:00Z",
  },
  {
    id: "neon-runner",
    title: "Neon Runner",
    cover: "/manga-cover-cyberpunk-city-runner.png",
    description:
      "A courier with illegal cybernetics races across a megacity to deliver a secret that could topple a corporation.",
    status: "ongoing",
    author: "Jin Park",
    tags: ["Cyberpunk", "Action", "Sci-Fi"],
    latestChapter: "Ch. 88",
    latestChapterSource: "MangaVerse",
    latestChapterLocked: true,
    latestChapterUnlockAt: new Date(Date.now() + 5 * 86_400_000).toISOString(),
    updatedAt: "2026-06-16T05:00:00Z",
  },
  {
    id: "petals-and-promises",
    title: "Petals and Promises",
    cover: "/manga-cover-romance-cherry-blossom.png",
    description:
      "Two childhood friends reunite under the cherry blossoms and rediscover a promise they once made.",
    status: "completed",
    author: "Aoi Hayashi",
    tags: ["Romance", "Slice of Life", "Drama"],
    latestChapter: "Ch. 54",
    latestChapterSource: "LeafNovel Scans",
    updatedAt: "2026-06-09T11:30:00Z",
  },
  {
    id: "iron-titan-saga",
    title: "Iron Titan Saga",
    cover: "/manga-cover-mecha-giant-robot.png",
    description:
      "Humanity's last line of defense rests in colossal war machines piloted by a rebellious generation.",
    status: "ongoing",
    author: "Takeshi Endo",
    tags: ["Mecha", "Action", "Sci-Fi"],
    latestChapter: "Ch. 110",
    latestChapterSource: "ScanHub",
    updatedAt: "2026-06-15T22:00:00Z",
  },
  {
    id: "spirit-hunter-yua",
    title: "Spirit Hunter Yua",
    cover: "/manga-cover-spirit-hunter-girl.png",
    description:
      "A high schooler inherits her grandmother's duty to seal away vengeful spirits roaming the city.",
    status: "ongoing",
    author: "Nao Kimura",
    tags: ["Supernatural", "Action", "Mystery"],
    latestChapter: "Ch. 67",
    latestChapterSource: "MangaVerse",
    updatedAt: "2026-06-16T08:15:00Z",
  },
  {
    id: "kings-gambit",
    title: "King's Gambit",
    cover: "/manga-cover-chess-strategy-king.png",
    description:
      "A disgraced strategist is given one last chance to reclaim a throne through wit alone.",
    status: "ongoing",
    author: "Victor Halloran",
    tags: ["Drama", "Psychological", "Historical"],
    latestChapter: "Ch. 39",
    latestChapterSource: "LeafNovel Scans",
    latestChapterLocked: true,
    latestChapterUnlockAt: new Date(Date.now() + 2 * 86_400_000).toISOString(),
    updatedAt: "2026-06-13T16:40:00Z",
  },
  {
    id: "deep-blue-requiem",
    title: "Deep Blue Requiem",
    cover: "/manga-cover-underwater-mermaid-blue.png",
    description:
      "Beneath the waves lies a sunken civilization, and a diver who can hear its dying song.",
    status: "ongoing",
    author: "Coral Nishi",
    tags: ["Fantasy", "Adventure", "Mystery"],
    latestChapter: "Ch. 31",
    latestChapterSource: "ScanHub",
    updatedAt: "2026-06-12T10:05:00Z",
  },
]

const sources = [
  { id: "src-mangaverse", name: "MangaVerse", url: "https://example.com/mangaverse" },
  { id: "src-scanhub", name: "ScanHub", url: "https://example.com/scanhub" },
  { id: "src-leafnovel", name: "LeafNovel Scans", url: "https://example.com/leafnovel" },
]

export function getMockMangaDetail(id: string): MangaDetail | null {
  const summary = mockMangaList.find((m) => m.id === id)
  if (!summary) return null
  return {
    ...summary,
    artist: summary.author,
    year: 2023,
    altTitles: [`${summary.title} (Official)`],
    sources,
  }
}

export function getMockChapters(id: string): Chapter[] {
  const summary = mockMangaList.find((m) => m.id === id)
  const total = summary?.latestChapter
    ? Number.parseInt(summary.latestChapter.replace(/\D/g, ""), 10) || 24
    : 24

  const chapters: Chapter[] = []
  for (let n = total; n >= 1; n--) {
    const daysAgo = (total - n) * 3
    const baseDate = Date.now() - daysAgo * 86_400_000

    // Each chapter number can be uploaded by more than one source site.
    // The newest chapters tend to have fewer sources (still being mirrored),
    // and the very latest release from the primary source may be locked.
    const releaseCount = n === total ? 1 : n >= total - 2 ? 2 : (n % 3) + 1

    for (let s = 0; s < releaseCount; s++) {
      const source = sources[(n + s) % sources.length]
      // Stagger publish times so different sources posted at different moments.
      const date = new Date(baseDate - s * 6 * 3_600_000).toISOString()

      // Lock the primary source's release of the two most recent chapters.
      const locked = s === 0 && n >= total - 1
      const unlockAt = locked
        ? new Date(Date.now() + (n - (total - 2)) * 2 * 86_400_000).toISOString()
        : undefined

      chapters.push({
        id: `${id}-ch-${n}-${source.id}`,
        number: String(n),
        title: n % 4 === 0 && s === 0 ? `The Turning Point ${n}` : undefined,
        sourceId: source.id,
        sourceName: source.name,
        group: source.name,
        publishedAt: date,
        externalUrl: `${source.url}/${id}/chapter-${n}`,
        locked,
        unlockAt,
      })
    }
  }
  return chapters
}
