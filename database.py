"""
Database schema initialization script.
Creates all necessary tables for the manga scraper with proper constraints and indexes.
"""
import sqlite3

# Connect to (or create) the SQLite database
conn = sqlite3.connect("manga.db")
cursor = conn.cursor()

# Site table - stores information about each website
cursor.execute("""
CREATE TABLE IF NOT EXISTS site (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT NOT NULL UNIQUE,                       -- Domain of the website (e.g., likemanga.in)
    url TEXT NOT NULL,                                 -- Base URL of the website
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP     -- When the site was added
)
""")

# Main manga table - stores core manga information
cursor.execute("""
CREATE TABLE IF NOT EXISTS manga (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,                        -- Manga title (unique to prevent duplicates)
    cover_url TEXT,                                    -- URL to the cover image
    summary TEXT,                                    -- Summary specific to this site (if different from main manga summary)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- When the manga was first added
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP     -- When the manga was last updated
)
""")

# Manga Sources table - stores the relationship between mangas and sources
# Used for data that is unique to a manga on a specific source
cursor.execute("""
CREATE TABLE IF NOT EXISTS manga_sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_id INTEGER NOT NULL,
    site_id INTEGER NOT NULL,
    manga_url TEXT NOT NULL,                           -- URL to the manga's page on the specific site
    status TEXT CHECK(status IN ('ongoing', 'completed', 'hiatus', 'dropped')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- When the manga was last updated for this source
    FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE,
    FOREIGN KEY (site_id) REFERENCES site(id) ON DELETE CASCADE,
    UNIQUE(manga_id, site_id)
)
""")

# Chapter table - stores individual chapters for each manga on each site
# Many-to-many relationship (one manga has many chapters on different sites)
cursor.execute("""
CREATE TABLE IF NOT EXISTS chapter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_sources_id INTEGER NOT NULL,
    chapter_number TEXT NOT NULL,                      -- Chapter number (TEXT to handle "20.5", etc.)
    chapter_url TEXT NOT NULL,                         -- URL to the chapter page
    locked BOOLEAN NOT NULL DEFAULT 0,                 -- Whether the chapter is locked behind a timer
    locked_timer TEXT,                                -- Time remaining until the chapter unlocks (if locked)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- When the chapter was added
    FOREIGN KEY (manga_sources_id) REFERENCES manga_sources(id) ON DELETE CASCADE,
    UNIQUE(manga_sources_id, chapter_number)               -- Prevent duplicate chapters for a given manga and source
)
""")

# Authors table - stores author information for manga
# Many-to-one relationship (one manga can have multiple authors)
cursor.execute("""
CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_id INTEGER NOT NULL,
    author TEXT NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
)
""")

# Genres table - stores genre tags for manga
# Many-to-one relationship (one manga can have multiple genres)
cursor.execute("""
CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_id INTEGER NOT NULL,
    genre TEXT NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
)
""")

# Alternative titles table - stores other names the manga is known by
# Many-to-one relationship with manga (one manga can have multiple alt titles)
cursor.execute("""
CREATE TABLE IF NOT EXISTS alt_titles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_id INTEGER NOT NULL,
    alt_title TEXT NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
)
""")



# Save all changes and close the connection
conn.commit()
conn.close()

print("All tables created successfully (if they didn't already exist).")
