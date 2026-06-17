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
// Data Transformer: Forces database structures to conform perfectly with types.ts
function mapBackendMangaSummary(backend) {
    return {
        id: String(backend.id),
        title: backend.title || "Untitled Manga",
        // CRITICAL FIX: If backend cover_url is null/missing, fallback gracefully, 
        // otherwise preserve the exact absolute database string
        cover_url: backend.cover_url ? String(backend.cover_url) : "/placeholder.svg",
        summary: backend.summary || "",
        status: backend.type === "manga" || !backend.status ? "ongoing" : backend.status,
        author: backend.author || "Unknown Author",
        genre: backend.genres || [],
        created_at: backend.created_at,
        updated_at: backend.updated_at
    };
}
async function getLatestManga(limit = 24) {
    if (USE_MOCKS) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockMangaList"].slice(0, limit);
    }
    try {
        const data = await apiGet(`/manga/latest?limit=${limit}&offset=0`);
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
        // Ensure the ID is cleanly passed as a segment
        const cleanId = encodeURIComponent(id.trim());
        const data = await apiGet(`/manga/${cleanId}`);
        // If the backend returned nothing valid, exit safely to let the UI react
        if (!data || !data.id) return null;
        return {
            id: String(data.id),
            title: data.title || "Untitled Manga",
            cover_url: data.cover_url ? String(data.cover_url) : "/placeholder.svg",
            summary: data.summary || "",
            status: data.status || "ongoing",
            author: data.author || data.authors && data.authors[0] || "Unknown Author",
            genre: data.genres || [],
            artists: data.artists || [],
            authors: data.authors || [],
            altTitles: data.alt_titles || [],
            created_at: data.created_at,
            updated_at: data.updated_at,
            sources: (data.sources || []).map((src)=>({
                    source_id: String(src.source_id),
                    site_id: String(src.site_id),
                    domain: src.domain || "Unknown Source",
                    稳定_url: src.site_url,
                    manga_url: src.manga_url,
                    status: src.status
                }))
        };
    } catch (error) {
        console.error(`Error fetching manga detail for ID ${id}:`, error);
        // Temporarily return the mock detail if the backend fails, so your page doesn't 404 during testing
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMockMangaDetail"])(id);
    }
}
async function getMangaChapters(id) {
    if (USE_MOCKS) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMockChapters"])(id);
    }
    // A dictionary mapping site_id from your database to display names
    const siteNameMap = {
        1: "Asmotoon",
        2: "MangaDex",
        3: "MangaFox"
    };
    try {
        const data = await apiGet(`/manga/${encodeURIComponent(id)}/chapters`);
        return (data.chapters || []).map((ch)=>{
            const siteIdNum = Number(ch.site_id);
            return {
                id: String(ch.id),
                number: String(ch.chapter_number),
                title: ch.title || `Chapter ${ch.chapter_number}`,
                sourceId: String(ch.site_id),
                // CHANGED: Look up the real name from the map, fallback to generic string if missing
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
"[project]/Desktop/Code/Manga/web/components/chapter-list.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChapterList",
    ()=>ChapterList
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ChapterList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ChapterList() from the server but ChapterList is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Desktop/Code/Manga/web/components/chapter-list.tsx <module evaluation>", "ChapterList");
}),
"[project]/Desktop/Code/Manga/web/components/chapter-list.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChapterList",
    ()=>ChapterList
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ChapterList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ChapterList() from the server but ChapterList is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/Desktop/Code/Manga/web/components/chapter-list.tsx", "ChapterList");
}),
"[project]/Desktop/Code/Manga/web/components/chapter-list.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$chapter$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/components/chapter-list.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$chapter$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/components/chapter-list.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$chapter$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
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
"[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MangaDetailPage,
    "dynamic",
    ()=>dynamic,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-rsc] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/lucide-react/dist/esm/icons/globe.mjs [app-rsc] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/node_modules/lucide-react/dist/esm/icons/user.mjs [app-rsc] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/lib/api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$chapter$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/components/chapter-list.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$site$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Code/Manga/web/components/site-header.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
const dynamic = "force-dynamic";
async function generateMetadata({ params }) {
    const { id } = await params;
    const manga = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMangaDetail"])(id);
    if (!manga) return {
        title: "Manga not found — MangaVault"
    };
    return {
        title: `${manga.title} — MangaVault`,
        /* FIXED: Changed manga.description to manga.summary to match types.ts */ description: manga.summary
    };
}
async function MangaDetailPage({ params }) {
    const { id } = await params;
    const [manga, chapters] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMangaDetail"])(id),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMangaChapters"])(id)
    ]);
    if (!manga) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$site$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SiteHeader"], {}, void 0, false, {
                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 h-64 overflow-hidden bg-muted",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            src: manga.cover_url || "/placeholder.svg",
                            alt: "",
                            fill: true,
                            priority: true,
                            className: "object-cover opacity-20 blur-xl select-none pointer-events-none"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mx-auto max-w-4xl px-4 pt-16 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "size-4",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            "Back to browsing"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-6 sm:flex-row sm:items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative aspect-[2/3] w-full max-w-[200px] shrink-0 self-center overflow-hidden rounded-lg border border-border bg-muted shadow-md sm:self-start",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            src: manga.cover_url || "/placeholder.svg",
                                            alt: `Cover of ${manga.title}`,
                                            fill: true,
                                            priority: true,
                                            sizes: "200px",
                                            className: "object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
                                                    children: manga.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 15
                                            }, this),
                                            manga.author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-sm font-medium text-muted-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        className: "size-4",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: manga.author
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: manga.artists?.join(", ") || "Unknown Artists"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this),
                                            manga.genre && manga.genre.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1.5",
                                                children: manga.genre.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground",
                                                        children: tag
                                                    }, tag, false, {
                                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                        lineNumber: 106,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                lineNumber: 104,
                                                columnNumber: 17
                                            }, this),
                                            manga.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground",
                                                children: manga.summary
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this),
                                            manga.sources && manga.sources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center gap-1.5 text-muted-foreground",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                className: "size-4",
                                                                "aria-hidden": true
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 21
                                                            }, this),
                                                            "Available on:"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 19
                                                    }, this),
                                                    manga.sources.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: s.manga_url || "#",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "rounded-md border border-border bg-card px-2 py-0.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary hover:border-primary/30",
                                                            children: s.domain
                                                        }, s.source_id, false, {
                                                            fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                            lineNumber: 131,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mt-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex items-baseline justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold text-foreground",
                                                children: "Chapters"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                lineNumber: 150,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-muted-foreground",
                                                children: [
                                                    chapters.length,
                                                    " chapter",
                                                    chapters.length === 1 ? "" : "s"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    chapters.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$components$2f$chapter$2d$list$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ChapterList"], {
                                        chapters: chapters
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Code$2f$Manga$2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground",
                                        children: "No chapters available yet."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/Code/Manga/web/app/manga/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0zryt~n._.js.map