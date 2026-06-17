module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/Code/Manga/web/lib/mock-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMockChapters",
    ()=>getMockChapters,
    "getMockMangaDetail",
    ()=>getMockMangaDetail,
    "mockMangaList",
    ()=>mockMangaList
]);
const mockMangaList = [
    {
        id: "solo-ascension",
        title: "Solo Ascension",
        cover: "/manga-cover-dark-fantasy-warrior.png",
        description: "A weak hunter awakens a mysterious system that lets him grow infinitely stronger with every battle he survives.",
        status: "ongoing",
        author: "Hyun Jae",
        tags: [
            "Action",
            "Fantasy",
            "Adventure"
        ],
        latestChapter: "Ch. 184",
        latestChapterSource: "MangaVerse",
        latestChapterLocked: true,
        latestChapterUnlockAt: new Date(Date.now() + 3 * 86_400_000).toISOString(),
        updatedAt: "2026-06-16T09:00:00Z"
    },
    {
        id: "blade-of-the-azure",
        title: "Blade of the Azure Sky",
        cover: "/manga-cover-samurai-blue-sky.png",
        description: "A wandering swordsman seeks the legendary blade said to cut through fate itself.",
        status: "ongoing",
        author: "Kaito Mori",
        tags: [
            "Action",
            "Historical",
            "Drama"
        ],
        latestChapter: "Ch. 96",
        latestChapterSource: "ScanHub",
        updatedAt: "2026-06-15T18:30:00Z"
    },
    {
        id: "midnight-cafe",
        title: "Midnight Café",
        cover: "/manga-cover-cozy-cafe-night.png",
        description: "Strangers share their deepest secrets at a café that only opens after midnight.",
        status: "completed",
        author: "Rin Sato",
        tags: [
            "Slice of Life",
            "Romance",
            "Drama"
        ],
        latestChapter: "Ch. 60",
        latestChapterSource: "LeafNovel Scans",
        updatedAt: "2026-06-10T12:00:00Z"
    },
    {
        id: "starbound-academy",
        title: "Starbound Academy",
        cover: "/manga-cover-space-academy-students.png",
        description: "At an elite academy orbiting a dying star, cadets train to pilot the last hope of humanity.",
        status: "ongoing",
        author: "Yuki Tanaka",
        tags: [
            "Sci-Fi",
            "Action",
            "School"
        ],
        latestChapter: "Ch. 121",
        latestChapterSource: "MangaVerse",
        latestChapterLocked: true,
        latestChapterUnlockAt: new Date(Date.now() + 18 * 3_600_000).toISOString(),
        updatedAt: "2026-06-16T07:45:00Z"
    },
    {
        id: "the-last-alchemist",
        title: "The Last Alchemist",
        cover: "/manga-cover-alchemist-magic-circle.png",
        description: "In a world stripped of magic, one alchemist guards the final formula that could restore it.",
        status: "hiatus",
        author: "Elena Cross",
        tags: [
            "Fantasy",
            "Mystery",
            "Adventure"
        ],
        latestChapter: "Ch. 73",
        latestChapterSource: "ScanHub",
        updatedAt: "2026-05-28T15:20:00Z"
    },
    {
        id: "crimson-harvest",
        title: "Crimson Harvest",
        cover: "/manga-cover-horror-red-field.png",
        description: "A quiet farming village hides a terrible ritual that feeds on its own people.",
        status: "ongoing",
        author: "Mara Vance",
        tags: [
            "Horror",
            "Thriller",
            "Supernatural"
        ],
        latestChapter: "Ch. 48",
        latestChapterSource: "LeafNovel Scans",
        updatedAt: "2026-06-14T20:10:00Z"
    },
    {
        id: "neon-runner",
        title: "Neon Runner",
        cover: "/manga-cover-cyberpunk-city-runner.png",
        description: "A courier with illegal cybernetics races across a megacity to deliver a secret that could topple a corporation.",
        status: "ongoing",
        author: "Jin Park",
        tags: [
            "Cyberpunk",
            "Action",
            "Sci-Fi"
        ],
        latestChapter: "Ch. 88",
        latestChapterSource: "MangaVerse",
        latestChapterLocked: true,
        latestChapterUnlockAt: new Date(Date.now() + 5 * 86_400_000).toISOString(),
        updatedAt: "2026-06-16T05:00:00Z"
    },
    {
        id: "petals-and-promises",
        title: "Petals and Promises",
        cover: "/manga-cover-romance-cherry-blossom.png",
        description: "Two childhood friends reunite under the cherry blossoms and rediscover a promise they once made.",
        status: "completed",
        author: "Aoi Hayashi",
        tags: [
            "Romance",
            "Slice of Life",
            "Drama"
        ],
        latestChapter: "Ch. 54",
        latestChapterSource: "LeafNovel Scans",
        updatedAt: "2026-06-09T11:30:00Z"
    },
    {
        id: "iron-titan-saga",
        title: "Iron Titan Saga",
        cover: "/manga-cover-mecha-giant-robot.png",
        description: "Humanity's last line of defense rests in colossal war machines piloted by a rebellious generation.",
        status: "ongoing",
        author: "Takeshi Endo",
        tags: [
            "Mecha",
            "Action",
            "Sci-Fi"
        ],
        latestChapter: "Ch. 110",
        latestChapterSource: "ScanHub",
        updatedAt: "2026-06-15T22:00:00Z"
    },
    {
        id: "spirit-hunter-yua",
        title: "Spirit Hunter Yua",
        cover: "/manga-cover-spirit-hunter-girl.png",
        description: "A high schooler inherits her grandmother's duty to seal away vengeful spirits roaming the city.",
        status: "ongoing",
        author: "Nao Kimura",
        tags: [
            "Supernatural",
            "Action",
            "Mystery"
        ],
        latestChapter: "Ch. 67",
        latestChapterSource: "MangaVerse",
        updatedAt: "2026-06-16T08:15:00Z"
    },
    {
        id: "kings-gambit",
        title: "King's Gambit",
        cover: "/manga-cover-chess-strategy-king.png",
        description: "A disgraced strategist is given one last chance to reclaim a throne through wit alone.",
        status: "ongoing",
        author: "Victor Halloran",
        tags: [
            "Drama",
            "Psychological",
            "Historical"
        ],
        latestChapter: "Ch. 39",
        latestChapterSource: "LeafNovel Scans",
        latestChapterLocked: true,
        latestChapterUnlockAt: new Date(Date.now() + 2 * 86_400_000).toISOString(),
        updatedAt: "2026-06-13T16:40:00Z"
    },
    {
        id: "deep-blue-requiem",
        title: "Deep Blue Requiem",
        cover: "/manga-cover-underwater-mermaid-blue.png",
        description: "Beneath the waves lies a sunken civilization, and a diver who can hear its dying song.",
        status: "ongoing",
        author: "Coral Nishi",
        tags: [
            "Fantasy",
            "Adventure",
            "Mystery"
        ],
        latestChapter: "Ch. 31",
        latestChapterSource: "ScanHub",
        updatedAt: "2026-06-12T10:05:00Z"
    }
];
const sources = [
    {
        id: "src-mangaverse",
        name: "MangaVerse",
        url: "https://example.com/mangaverse"
    },
    {
        id: "src-scanhub",
        name: "ScanHub",
        url: "https://example.com/scanhub"
    },
    {
        id: "src-leafnovel",
        name: "LeafNovel Scans",
        url: "https://example.com/leafnovel"
    }
];
function getMockMangaDetail(id) {
    const summary = mockMangaList.find((m)=>m.id === id);
    if (!summary) return null;
    return {
        ...summary,
        artist: summary.author,
        year: 2023,
        altTitles: [
            `${summary.title} (Official)`
        ],
        sources
    };
}
function getMockChapters(id) {
    const summary = mockMangaList.find((m)=>m.id === id);
    const total = summary?.latestChapter ? Number.parseInt(summary.latestChapter.replace(/\D/g, ""), 10) || 24 : 24;
    const chapters = [];
    for(let n = total; n >= 1; n--){
        const daysAgo = (total - n) * 3;
        const baseDate = Date.now() - daysAgo * 86_400_000;
        // Each chapter number can be uploaded by more than one source site.
        // The newest chapters tend to have fewer sources (still being mirrored),
        // and the very latest release from the primary source may be locked.
        const releaseCount = n === total ? 1 : n >= total - 2 ? 2 : n % 3 + 1;
        for(let s = 0; s < releaseCount; s++){
            const source = sources[(n + s) % sources.length];
            // Stagger publish times so different sources posted at different moments.
            const date = new Date(baseDate - s * 6 * 3_600_000).toISOString();
            // Lock the primary source's release of the two most recent chapters.
            const locked = s === 0 && n >= total - 1;
            const unlockAt = locked ? new Date(Date.now() + (n - (total - 2)) * 2 * 86_400_000).toISOString() : undefined;
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
                unlockAt
            });
        }
    }
    return chapters;
}
}),
"[project]/Desktop/Code/Manga/web/lib/api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLatestManga",
    ()=>getLatestManga,
    "getMangaChapters",
    ()=>getMangaChapters,
    "getMangaDetail",
    ()=>getMangaDetail,
    "searchManga",
    ()=>searchManga
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/lib/mock-data.ts [app-rsc] (ecmascript)");
;
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8000")?.replace(/\/$/, "") ?? "";
const USE_MOCKS = BASE_URL === "";
// Mapping site IDs to display names globally
const siteNameMap = {
    1: "Asmotoon",
    2: "MangaDex",
    3: "MangaFox"
};
async function apiGet(path, init) {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...init,
        headers: {
            Accept: "application/json",
            ...init?.headers
        }
    });
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
// Data Transformer: Maps database structures and calculates values dynamically
function mapBackendMangaSummary(backend) {
    const latestChNum = backend.latest_chapter_number || backend.chapter_number;
    const latestSiteId = backend.latest_site_id || backend.site_id;
    // Grab the absolute source address
    const rawCoverUrl = backend.cover_url ? String(backend.cover_url) : "";
    return {
        id: String(backend.id),
        title: backend.title || "Untitled Manga",
        // CHANGED: If it's a valid remote link, funnel it directly into your local NextJS proxy route
        cover_url: rawCoverUrl ? `/api/proxy-image?url=${encodeURIComponent(rawCoverUrl)}` : "/placeholder.svg",
        summary: backend.summary || "",
        status: backend.status || "ongoing",
        author: backend.author || "Unknown Author",
        genre: backend.genres || [],
        created_at: backend.created_at,
        updated_at: backend.updated_at,
        chapter_number: latestChNum ? `Ch. ${latestChNum}` : undefined,
        latestChapterSource: latestSiteId ? siteNameMap[Number(latestSiteId)] || `Site #${latestSiteId}` : undefined,
        locked: Boolean(backend.locked),
        locked_until: backend.locked_until || undefined
    };
}
async function getLatestManga(limit = 24) {
    if (USE_MOCKS) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockMangaList"].slice(0, limit);
    }
    try {
        const data = await apiGet(`/manga/latest?limit=${limit}&offset=0`);
        // If your backend endpoint doesn't automatically join the latest chapter details, 
        // we can request them or map them safely.
        return data.map(mapBackendMangaSummary);
    } catch (error) {
        console.error("Error fetching latest manga:", error);
        return [];
    }
}
async function searchManga(query, limit = 24) {
    if (USE_MOCKS) {
        const q = query.trim().toLowerCase();
        if (!q) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockMangaList"].slice(0, limit);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockMangaList"].filter((m)=>m.title.toLowerCase().includes(q)).slice(0, limit);
    }
    try {
        const params = new URLSearchParams({
            title: query,
            limit: String(limit)
        });
        const data = await apiGet(`/manga/search/advanced?${params}`);
        return data.map(mapBackendMangaSummary);
    } catch (error) {
        console.error("Error searching manga:", error);
        return [];
    }
}
async function getMangaDetail(id) {
    if (USE_MOCKS) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMockMangaDetail"])(id);
    }
    try {
        const data = await apiGet(`/manga/${encodeURIComponent(id)}`);
        if (!data || !data.id) return null;
        return {
            ...mapBackendMangaSummary(data),
            artists: data.artists || [],
            authors: data.authors || [],
            altTitles: data.alt_titles || [],
            sources: (data.sources || []).map((src)=>({
                    source_id: String(src.source_id),
                    site_id: String(src.site_id),
                    domain: src.domain || "Unknown Source",
                    site_url: src.site_url,
                    manga_url: src.manga_url,
                    status: src.status
                }))
        };
    } catch (error) {
        console.error(`Error fetching manga detail for ID ${id}:`, error);
        return null;
    }
}
async function getMangaChapters(id) {
    if (USE_MOCKS) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMockChapters"])(id);
    }
    try {
        const data = await apiGet(`/manga/${encodeURIComponent(id)}/chapters`);
        return (data.chapters || []).map((ch)=>{
            const siteIdNum = Number(ch.site_id);
            return {
                id: String(ch.id),
                number: String(ch.chapter_number),
                title: ch.title || `Chapter ${ch.chapter_number}`,
                sourceId: String(ch.site_id),
                sourceName: siteNameMap[siteIdNum] || `Site #${ch.site_id}`,
                externalUrl: ch.url || "",
                locked: Boolean(ch.locked),
                unlockAt: ch.locked_until || undefined
            };
        });
    } catch (error) {
        console.error(`Failed fetching chapters for ${id}:`, error);
        return [];
    }
}
}),
"[project]/Desktop/Code/Manga/web/lib/format.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatRelativeTime",
    ()=>formatRelativeTime,
    "formatUnlockCountdown",
    ()=>formatUnlockCountdown,
    "statusColors",
    ()=>statusColors,
    "statusLabels",
    ()=>statusLabels
]);
function formatRelativeTime(iso) {
    if (!iso) return "—";
    const date = new Date(iso);
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.round(diffMs / 60_000);
    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.round(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDay = Math.round(diffHr / 24);
    if (diffDay < 30) return `${diffDay}d ago`;
    const diffMo = Math.round(diffDay / 30);
    if (diffMo < 12) return `${diffMo}mo ago`;
    return `${Math.round(diffMo / 12)}y ago`;
}
const statusLabels = {
    ongoing: "Ongoing",
    completed: "Completed",
    hiatus: "Hiatus",
    cancelled: "Cancelled"
};
const statusColors = {
    ongoing: "bg-chart-3/15 text-chart-3 border-chart-3/30",
    completed: "bg-chart-2/15 text-chart-2 border-chart-2/30",
    hiatus: "bg-chart-4/15 text-chart-4 border-chart-4/30",
    cancelled: "bg-destructive/15 text-destructive border-destructive/30"
};
function formatUnlockCountdown(iso) {
    if (!iso) return "Locked";
    const diffMs = new Date(iso).getTime() - Date.now();
    if (diffMs <= 0) return "Unlocking soon";
    const diffMin = Math.round(diffMs / 60_000);
    if (diffMin < 60) return `Unlocks in ${diffMin}m`;
    const diffHr = Math.round(diffMin / 60);
    if (diffHr < 24) return `Unlocks in ${diffHr}h`;
    const diffDay = Math.round(diffHr / 24);
    return `Unlocks in ${diffDay}d`;
}
}),
"[project]/Desktop/Code/Manga/web/components/manga-card.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MangaCard",
    ()=>MangaCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-rsc] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/lib/format.ts [app-rsc] (ecmascript)");
;
;
;
;
;
function MangaCard({ manga }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        href: `/manga/${manga.id}`,
        className: "group flex flex-col gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-border bg-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        /* CHANGED: Swapped manga.cover to manga.cover_url */ src: manga.cover_url || "/placeholder.svg",
                        alt: `Cover of ${manga.title}`,
                        fill: true,
                        sizes: "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px",
                        className: "object-cover transition-transform duration-300 group-hover:scale-105"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    manga.chapter_number && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm",
                        children: manga.chapter_number
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this),
                    manga.locked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-primary backdrop-blur-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                className: "size-3",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatUnlockCountdown"])(manga.locked_until)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary",
                        children: manga.title
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: manga.latestChapterSource && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate text-xs font-medium text-muted-foreground",
                            children: manga.latestChapterSource
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Code/Manga/web/components/manga-card.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/Code/Manga/web/components/site-header.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteHeader",
    ()=>SiteHeader
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SiteHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SiteHeader() from the server but SiteHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Desktop/Code/Manga/web/components/site-header.tsx <module evaluation>", "SiteHeader");
}),
"[project]/Desktop/Code/Manga/web/components/site-header.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteHeader",
    ()=>SiteHeader
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SiteHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SiteHeader() from the server but SiteHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Desktop/Code/Manga/web/components/site-header.tsx", "SiteHeader");
}),
"[project]/Desktop/Code/Manga/web/components/site-header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$site$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/components/site-header.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$site$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/components/site-header.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$site$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/Desktop/Code/Manga/web/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Desktop/Code/Manga/web/components/ui/skeleton.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/lib/utils.ts [app-rsc] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/Code/Manga/web/components/ui/skeleton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/Code/Manga/web/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/lib/api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$manga$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/components/manga-card.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$site$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/components/site-header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/components/ui/skeleton.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
const dynamic = "force-dynamic";
function MangaGrid({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        children: items.map((manga)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$manga$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MangaCard"], {
                manga: manga
            }, manga.id, false, {
                fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
function GridSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
        children: Array.from({
            length: 12
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "aspect-[2/3] w-full rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "h-4 w-3/4"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "h-3 w-1/2"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
async function Results({ query }) {
    const items = query ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchManga"])(query) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLatestManga"])();
    if (items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-20 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-medium text-foreground",
                    children: "No results found"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-muted-foreground",
                    children: query ? `Nothing matched "${query}". Try a different title or genre.` : "No manga available yet."
                }, void 0, false, {
                    fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(MangaGrid, {
        items: items
    }, void 0, false, {
        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
        lineNumber: 50,
        columnNumber: 10
    }, this);
}
async function HomePage({ searchParams }) {
    const { q } = await searchParams;
    const query = (q ?? "").trim();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$site$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SiteHeader"], {
                initialQuery: query
            }, void 0, false, {
                fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto max-w-7xl px-4 py-8 sm:px-6",
                children: [
                    !query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
                                children: "Discover manga from across the web"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 max-w-2xl text-pretty text-sm text-muted-foreground",
                                children: "Latest releases aggregated and tracked across multiple sources, all in one place."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-5 flex items-baseline justify-between gap-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold text-foreground",
                            children: query ? `Results for "${query}"` : "Latest Updates"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(GridSkeleton, {}, void 0, false, {
                            fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                            lineNumber: 83,
                            columnNumber: 41
                        }, this),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Results, {
                            query: query
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    }, query, false, {
                        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Code/Manga/web/app/page.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/Code/Manga/web/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/Code/Manga/web/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0oh8srf._.js.map