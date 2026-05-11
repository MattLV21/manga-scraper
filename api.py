"""
Manga Scraper API
A FastAPI application to expose manga database operations.
"""
from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI, HTTPException, status
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
    """Response model for manga data."""
    id: int
    title: str
    type: Optional[str]
    cover_url: Optional[str]
    summary: Optional[str]
    created_at: datetime
    updated_at: datetime


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


@app.get("/manga/{manga_id}", response_model=MangaResponse, tags=["Manga"])
async def get_manga(manga_id: int):
    """
    Get a specific manga by ID.

    Returns detailed information about a manga including authors, artists, genres, etc.
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
        SELECT m.* FROM manga m
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

    # Search in alt_titles (exact match)
    cursor.execute("""
        SELECT m.* FROM manga m
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
            "chapter_number": row[1],
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

    # Get unlocked chapters
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
        AND (c.locked = 0 OR c.locked_until IS NULL)
        ORDER BY c.chapter_number DESC
    """, (manga_id,))

    chapters = []
    for row in cursor.fetchall():
        chapters.append({
            "id": row[0],
            "chapter_number": row[1],
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
    last_updated = cursor.fetchone()[0]

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
