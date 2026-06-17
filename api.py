"""
Manga Scraper API
A FastAPI application to expose manga database operations.
"""
from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import sqlite3
import logging

# Initialize FastAPI app
app = FastAPI(
    title="Manga Scraper API",
    description="API for managing manga data from scraped sources",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ============================================================================
# Pydantic Models
# ============================================================================

class MangaResponse(BaseModel):
    """Response model for basic manga data."""
    id: int
    title: str
    type: Optional[str]
    cover_url: Optional[str]
    summary: Optional[str]
    created_at: datetime
    updated_at: datetime

class MangaSourceInfo(BaseModel):
    """Manga source and site details."""
    source_id: int
    site_id: int
    domain: str
    site_url: str
    manga_url: str
    status: Optional[str]

class MangaDetailResponse(BaseModel):
    """Detailed response model for manga data including metadata and sources."""
    id: int
    title: str
    type: Optional[str]
    cover_url: Optional[str]
    summary: Optional[str]
    created_at: datetime
    updated_at: datetime
    authors: List[str] = []
    artists: List[str] = []
    genres: List[str] = []
    alt_titles: List[str] = []
    sources: List[MangaSourceInfo] = []

class Chapter(BaseModel):
    """Chapter model."""
    id: int
    chapter_number: str
    url: str
    locked: bool
    locked_until: Optional[datetime]


class ChapterList(BaseModel):
    """Chapter list response."""
    manga_id: int
    manga_title: str
    chapters: List[dict]


class LatestChapterResponse(BaseModel):
    """Clean, strict chapter information model for front-end feeds."""
    id: int
    manga_sources_id: int
    chapter_number: str
    chapter_url: str
    locked: bool
    locked_until: Optional[datetime]
    created_at: datetime


class Site(BaseModel):
    """Site model."""
    id: int
    domain: str
    url: str
    created_at: datetime


class Stats(BaseModel):
    """Database statistics."""
    total_mangas: int
    total_chapters: int
    total_sites: int
    last_updated: Optional[str]


class LatestSourceResponse(BaseModel):
    """Response model for latest updated manga sources."""
    source_id: int
    manga_id: int
    manga_title: str
    site_id: int
    site_domain: str
    manga_url: str
    status: Optional[str]
    updated_at: datetime


# ============================================================================
# Database Helper
# ============================================================================

def get_db_connection():
    """Get a database connection."""
    return sqlite3.connect("manga.db")


# ============================================================================
# Health Check
# ============================================================================

@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint.
    Returns the API status.
    """
    return {
        "status": "healthy",
        "service": "Manga Scraper API",
        "version": "1.0.0"
    }


# ============================================================================
# Manga Endpoints
# ============================================================================

@app.get("/manga", response_model=List[MangaResponse], tags=["Manga"])
async def list_mangas():
    """
    List all mangas in the database.
    Returns a list of all manga entries with their basic information.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            m.id,
            m.title,
            m.type,
            m.cover_url,
            m.summary,
            m.created_at,
            m.updated_at
        FROM manga m
        ORDER BY m.updated_at DESC
    """)

    columns = [description[0] for description in cursor.description]
    rows = cursor.fetchall()
    conn.close()

    mangas = []
    for row in rows:
        mangas.append({
            column: value
            for column, value in zip(columns, row)
        })

    return mangas


@app.get("/manga/latest", tags=["Manga"]) # Swapped response_model to handle the extra calculated keys dynamically
async def get_latest_mangas(limit: int = 24, offset: int = 0):
    conn = get_db_connection()
    conn.row_factory = sqlite3.Row # Allows dictionary access by column names
    cursor = conn.cursor()
    
    # Updated SQL to look up the latest chapter values directly inside sqlite
    cursor.execute("""
        SELECT 
            m.id, m.title, m.type, m.cover_url, m.summary, m.created_at, m.updated_at,
            c.chapter_number,
            ms.site_id,
            c.locked,
            c.locked_until
        FROM manga m
        LEFT JOIN manga_sources ms ON m.id = ms.manga_id
        LEFT JOIN chapter c ON ms.id = c.manga_sources_id
        GROUP BY m.id
        ORDER BY m.updated_at DESC 
        LIMIT ? OFFSET ?
    """, (limit, offset))
    
    rows = cursor.fetchall()
    conn.close()
    
    # Turn SQL row objects into clean JSON dictionaries
    return [dict(row) for row in rows]

@app.get("/manga/newest", response_model=List[MangaResponse], tags=["Manga"])
async def get_newest_manga(limit: int = Query(10, ge=1, le=100, description="Number of newest created mangas to fetch")):
    """
    Get the $n$ newest created mangas based on insertion timestamp (`created_at`).
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT id, title, type, cover_url, summary, created_at, updated_at
        FROM manga
        ORDER BY created_at DESC
        LIMIT ?
    """, (limit,))
    
    columns = [description[0] for description in cursor.description]
    rows = cursor.fetchall()
    conn.close()
    
    return [{column: value for column, value in zip(columns, row)} for row in rows]


@app.get("/manga/sources/latest", response_model=List[LatestSourceResponse], tags=["Manga"])
async def get_latest_sources(
    limit: int = Query(10, ge=1, le=100, description="Number of latest updated manga sources to fetch"),
    offset: int = Query(0, ge=0)
):
    """
    Get the $n$ latest updated manga sources. Useful to identify which specific mirror/site updated recently.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT 
            ms.id,
            ms.manga_id, 
            m.title, 
            ms.site_id, 
            s.domain, 
            ms.locked,
            ms.locked_until,
            ms.manga_url, 
            ms.status, 
            ms.updated_at
        FROM manga_sources ms
        JOIN manga m ON ms.manga_id = m.id
        JOIN site s ON ms.site_id = s.id
        ORDER BY ms.updated_at DESC
        LIMIT ? OFFSET ?
    """, (limit, offset))
    
    rows = cursor.fetchall()
    conn.close()
    
    results = []
    for row in rows:
        results.append({
            "source_id": row[0],
            "manga_id": row[1],
            "manga_title": row[2],
            "site_id": row[3],
            "site_domain": row[4],
            "manga_url": row[5],
            "status": row[6],
            "updated_at": row[7]
        })
    return results


@app.get("/manga/search/advanced", response_model=List[MangaResponse], tags=["Manga"])
async def advanced_search_mangas(
    title: Optional[str] = Query(None, description="Partial match search for manga titles"),
    type: Optional[str] = Query(None, description="Manga type filter (e.g., manga, manhwa, manhua)"),
    site_id: Optional[int] = Query(None, description="Filter by a specific scraper site ID"),
    status: Optional[str] = Query(None, description="Filter by publication status ('ongoing', 'completed', etc.)"),
    genres: Optional[List[str]] = Query(None, description="List of genres to filter by"),
    genre_match_all: bool = Query(False, description="If True, matches mangas containing ALL listed genres. If False, matches ANY."),
    min_chapters: Optional[int] = Query(None, description="Minimum chapter count threshold"),
    max_chapters: Optional[int] = Query(None, description="Maximum chapter count threshold"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """
    Advanced deep filter and search engine.
    Combines nested criteria queries for multi-genre filtering, structural counts, and source status tracking.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = """
        SELECT m.id, m.title, m.type, m.cover_url, m.summary, m.created_at, m.updated_at
        FROM manga m
        WHERE 1=1
    """
    params = []
    
    if title:
        query += " AND LOWER(m.title) LIKE LOWER(?)"
        params.append(f"%{title}%")
        
    if type:
        query += " AND LOWER(m.type) = LOWER(?)"
        params.append(type)
        
    if site_id or status:
        query += " AND EXISTS (SELECT 1 FROM manga_sources ms WHERE ms.manga_id = m.id"
        if site_id:
            query += " AND ms.site_id = ?"
            params.append(site_id)
        if status:
            query += " AND LOWER(ms.status) = LOWER(?)"
            params.append(status)
        query += ")"
        
    if genres:
        placeholders = ",".join(["?"] * len(genres))
        if genre_match_all:
            query += f""" AND (
                SELECT COUNT(DISTINCT g.genre) 
                FROM genres g 
                WHERE g.manga_id = m.id AND LOWER(g.genre) IN ({placeholders})
            ) = ?"""
            for g in genres:
                params.append(g.lower())
            params.append(len(genres))
        else:
            query += f""" AND EXISTS (
                SELECT 1 FROM genres g 
                WHERE g.manga_id = m.id AND LOWER(g.genre) IN ({placeholders})
            )"""
            for g in genres:
                params.append(g.lower())
                
    if min_chapters is not None or max_chapters is not None:
        chapter_subquery = """
            SELECT COUNT(c.id) 
            FROM chapter c 
            JOIN manga_sources ms ON c.manga_sources_id = ms.id 
            WHERE ms.manga_id = m.id
        """
        subquery_params = []
        if site_id:
            chapter_subquery += " AND ms.site_id = ?"
            subquery_params.append(site_id)
            
        if min_chapters is not None:
            query += f" AND ({chapter_subquery}) >= ?"
            params.extend(subquery_params)
            params.append(min_chapters)
            
        if max_chapters is not None:
            query += f" AND ({chapter_subquery}) <= ?"
            params.extend(subquery_params)
            params.append(max_chapters)
            
    query += " ORDER BY m.updated_at DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])
    
    cursor.execute(query, tuple(params))
    columns = [description[0] for description in cursor.description]
    rows = cursor.fetchall()
    conn.close()
    
    return [{column: value for column, value in zip(columns, row)} for row in rows]


@app.get("/manga/{manga_id}", response_model=MangaDetailResponse, tags=["Manga"])
async def get_manga(manga_id: int):
    """
    Get a specific manga by ID.

    Returns detailed information about a manga including authors, artists, genres, sites/sources, etc.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # Get main manga data
    cursor.execute("""
        SELECT
            m.id,
            m.title,
            m.type,
            m.cover_url,
            m.summary,
            m.created_at,
            m.updated_at
        FROM manga m
        WHERE m.id = ?
    """, (manga_id,))

    manga = cursor.fetchone()
    conn.close()

    if not manga:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Manga with id {manga_id} not found"
        )

    result = {
        "id": manga[0],
        "title": manga[1],
        "type": manga[2],
        "cover_url": manga[3],
        "summary": manga[4],
        "created_at": manga[5],
        "updated_at": manga[6],
    }

    # Get authors
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT author FROM authors WHERE manga_id = ?", (manga_id,))
    result["authors"] = [row[0] for row in cursor.fetchall()]
    conn.close()

    # Get artists
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT artist FROM artists WHERE manga_id = ?", (manga_id,))
    result["artists"] = [row[0] for row in cursor.fetchall()]
    conn.close()

    # Get genres
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT genre FROM genres WHERE manga_id = ?", (manga_id,))
    result["genres"] = [row[0] for row in cursor.fetchall()]
    conn.close()

    # Get alt titles
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT alt_title FROM alt_titles WHERE manga_id = ?", (manga_id,))
    result["alt_titles"] = [row[0] for row in cursor.fetchall()]
    conn.close()

    # Get sources and sites information
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT 
            ms.id AS source_id,
            ms.site_id,
            s.domain,
            s.url AS site_url,
            ms.manga_url,
            ms.status
        FROM manga_sources ms
        INNER JOIN site s ON ms.site_id = s.id
        WHERE ms.manga_id = ?
    """, (manga_id,))
    
    columns = [desc[0] for desc in cursor.description]
    sources = []
    for row in cursor.fetchall():
        sources.append(dict(zip(columns, row)))
    result["sources"] = sources
    conn.close()

    return result


@app.get("/manga/title/{title}", response_model=MangaResponse, tags=["Manga"])
async def get_manga_by_title(title: str):
    """
    Search for a manga by title.
    Searches in the main title and alternative titles.
    Supports partial matches.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # Search in main title (partial match)
    cursor.execute("""
        SELECT m.id, m.title, m.type, m.cover_url, m.summary, m.created_at, m.updated_at FROM manga m
        WHERE LOWER(m.title) LIKE LOWER(?)
        ORDER BY m.updated_at DESC
        LIMIT 1
    """, (f"%{title}%",))

    result = cursor.fetchone()
    conn.close()

    if result:
        return {
            "id": result[0],
            "title": result[1],
            "type": result[2],
            "cover_url": result[3],
            "summary": result[4],
            "created_at": result[5],
            "updated_at": result[6],
        }

    # Search in alt_titles (exact match fallback)
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT m.id, m.title, m.type, m.cover_url, m.summary, m.created_at, m.updated_at FROM manga m
        INNER JOIN alt_titles at ON m.id = at.manga_id
        WHERE LOWER(at.alt_title) = LOWER(?)
        LIMIT 1
    """, (title.lower(),))

    result = cursor.fetchone()
    conn.close()

    if result:
        return {
            "id": result[0],
            "title": result[1],
            "type": result[2],
            "cover_url": result[3],
            "summary": result[4],
            "created_at": result[5],
            "updated_at": result[6],
        }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"No manga found with title '{title}'"
    )


# ============================================================================
# Chapter Endpoints
# ============================================================================


@app.get("/chapters/latest", response_model=List[LatestChapterResponse], tags=["Chapters"])
async def get_latest_chapters_for_manga(
    manga_id: int = Query(..., description="The ID of the manga to pull chapters for"),
    limit: int = Query(5, ge=1, le=50, description="Number of latest chapters to return per manga")
):
    """
    Get the strict 'n' latest chapters for a given manga ID across all its sources.
    Perfect for mapping onto a 'Latest Manga Updates' feed on the front-end homepage.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Query fetches only chapter properties filtering by the parent manga_id
    cursor.execute("""
        SELECT 
            c.id,
            c.manga_sources_id,
            c.chapter_number,
            c.chapter_url,
            c.locked,
            c.locked_until,
            c.created_at
        FROM chapter c
        JOIN manga_sources ms ON c.manga_sources_id = ms.id
        WHERE ms.manga_id = ?
        ORDER BY c.created_at DESC
        LIMIT ?
    """, (manga_id, limit))
    
    rows = cursor.fetchall()
    conn.close()
    
    results = []
    for row in rows:
        results.append({
            "id": row[0],
            "manga_sources_id": row[1],
            "chapter_number": str(row[2]),
            "chapter_url": row[3],
            "locked": bool(row[4]),
            "locked_until": row[5],
            "created_at": row[6]
        })
        
    return results

@app.get("/manga/{manga_id}/chapters", response_model=ChapterList, tags=["Chapters"])
async def get_manga_chapters(manga_id: int):
    """
    Get all chapters for a manga.
    Returns chapters from all sites associated with the manga.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # Get manga title
    cursor.execute("SELECT title FROM manga WHERE id = ?", (manga_id,))
    title = cursor.fetchone()
    if not title:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Manga with id {manga_id} not found"
        )

    # Get all chapters from all sources
    cursor.execute("""
        SELECT
            c.id,
            c.chapter_number,
            c.chapter_url,
            c.locked,
            c.locked_until,
            ms.site_id
        FROM chapter c
        INNER JOIN manga_sources ms ON c.manga_sources_id = ms.id
        INNER JOIN site cmss ON ms.site_id = cmss.id
        WHERE ms.manga_id = ?
        ORDER BY c.chapter_number DESC
    """, (manga_id,))

    chapters = []
    for row in cursor.fetchall():
        chapters.append({
            "id": row[0],
            "chapter_number": str(row[1]),
            "url": row[2],
            "locked": bool(row[3]),
            "locked_until": row[4],
            "site_id": row[5],
        })

    conn.close()

    return ChapterList(
        manga_id=manga_id,
        manga_title=title[0],
        chapters=chapters
    )


@app.get("/manga/{manga_id}/chapters/unlocked", response_model=ChapterList, tags=["Chapters"])
async def get_unlocked_chapters(manga_id: int):
    """
    Get only unlocked chapters for a manga.
    Useful for reading apps that want to show only available content.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # Get manga title
    cursor.execute("SELECT title FROM manga WHERE id = ?", (manga_id,))
    title = cursor.fetchone()
    if not title:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Manga with id {manga_id} not found"
        )

    # Get unlocked chapters (ensuring we respect past timers)
    cursor.execute("""
        SELECT
            c.id,
            c.chapter_number,
            c.chapter_url,
            c.locked,
            c.locked_until,
            ms.site_id
        FROM chapter c
        INNER JOIN manga_sources ms ON c.manga_sources_id = ms.id
        INNER JOIN site cmss ON ms.site_id = cmss.id
        WHERE ms.manga_id = ?
        AND (c.locked = 0 OR c.locked_until IS NULL OR c.locked_until <= CURRENT_TIMESTAMP)
        ORDER BY c.chapter_number DESC
    """, (manga_id,))

    chapters = []
    for row in cursor.fetchall():
        chapters.append({
            "id": row[0],
            "chapter_number": str(row[1]),
            "url": row[2],
            "locked": False,
            "locked_until": None,
            "site_id": row[5],
        })

    conn.close()

    return ChapterList(
        manga_id=manga_id,
        manga_title=title[0],
        chapters=chapters
    )


# ============================================================================
# Site Endpoints
# ============================================================================

@app.get("/sites", response_model=List[Site], tags=["Sites"])
async def list_sites():
    """
    List all scraper sites.
    Returns a list of all manga scraper websites configured in the database.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, domain, url, created_at
        FROM site
        ORDER BY id
    """)

    columns = [description[0] for description in cursor.description]
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            column: value
            for column, value in zip(columns, row)
        }
        for row in rows
    ]


@app.get("/sites/{site_id}", response_model=Site, tags=["Sites"])
async def get_site(site_id: int):
    """
    Get details for a specific site.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, domain, url, created_at FROM site WHERE id = ?", (site_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Site with id {site_id} not found"
        )

    return {
        "id": row[0],
        "domain": row[1],
        "url": row[2],
        "created_at": row[3]
    }


# ============================================================================
# Metadata Discovery Endpoints (For UI Dropdowns & Front-end Filters)
# ============================================================================

@app.get("/metadata/genres", response_model=List[str], tags=["Metadata"])
async def list_genres():
    """Get a list of all distinct genres available in the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT genre FROM genres WHERE genre IS NOT NULL AND genre != '' ORDER BY genre")
    genres = [row[0] for row in cursor.fetchall()]
    conn.close()
    return genres


@app.get("/metadata/types", response_model=List[str], tags=["Metadata"])
async def list_types():
    """Get a list of all distinct manga types (e.g., manga, manhwa, manhua) available."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT type FROM manga WHERE type IS NOT NULL AND type != '' ORDER BY type")
    types = [row[0] for row in cursor.fetchall()]
    conn.close()
    return types


@app.get("/metadata/statuses", response_model=List[str], tags=["Metadata"])
async def list_statuses():
    """Get a list of all distinct publication statuses available."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT status FROM manga_sources WHERE status IS NOT NULL AND status != '' ORDER BY status")
    statuses = [row[0] for row in cursor.fetchall()]
    conn.close()
    return statuses


# ============================================================================
# Statistics Endpoint
# ============================================================================

@app.get("/stats", response_model=Stats, tags=["Stats"])
async def get_stats():
    """
    Get basic statistics about the database.
    Returns total count of mangas, chapters, sites, and last updated timestamp.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # Get manga count
    cursor.execute("SELECT COUNT(*) FROM manga")
    total_mangas = cursor.fetchone()[0]

    # Get total chapters
    cursor.execute("SELECT COUNT(*) FROM chapter")
    total_chapters = cursor.fetchone()[0]

    # Get sites count
    cursor.execute("SELECT COUNT(*) FROM site")
    total_sites = cursor.fetchone()[0]

    # Get last updated manga
    cursor.execute("""
        SELECT updated_at FROM manga ORDER BY updated_at DESC LIMIT 1
    """)
    res = cursor.fetchone()
    last_updated = res[0] if res else None

    conn.close()

    return Stats(
        total_mangas=total_mangas,
        total_chapters=total_chapters,
        total_sites=total_sites,
        last_updated=last_updated
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)