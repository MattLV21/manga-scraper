"""
Database schema initialization script.
Creates all necessary tables for the manga scraper with proper constraints and indexes.
"""
import sqlite3

# Connect to (or create) the SQLite database
conn = sqlite3.connect("manga.db")
cursor = conn.cursor()

# Main manga table - stores core manga information
# Non unique fields: title, cover_url, created_at, updated_at
# Same for all sites, so stored in the main manga table
cursor.execute("""
CREATE TABLE IF NOT EXISTS manga (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,                       -- Manga title (unique to prevent duplicates)
    cover_url TEXT,                                   -- URL to the cover image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- When the manga was first added
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    -- When the manga was last updated
)
""")

# Migration: Add new columns to existing tables if they don't exist
# This allows the schema to be updated without losing existing data
for column in ['updated_at']:
    try:
        cursor.execute(f"ALTER TABLE manga ADD COLUMN {column} TEXT")
        # Set default timestamp for updated_at on existing rows
        if column == 'updated_at':
            cursor.execute("UPDATE manga SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL")
    except sqlite3.OperationalError:
        pass  # Column already exists, skip

# Alternative titles table - stores other names the manga is known by
# Many-to-one relationship with manga (one manga can have multiple alt titles)
cursor.execute("""
CREATE TABLE IF NOT EXISTS alt_titles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_id INTEGER NOT NULL,
    alt_title TEXT NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE  -- Delete alt titles when manga is deleted
)
""")

# Authors table - stores author information
# Many-to-one relationship (one manga can have multiple authors)
cursor.execute("""
CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_id INTEGER NOT NULL,
    author TEXT NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
)
""")

# Genres table - stores genre tags
# Many-to-many relationship (one manga can have multiple genres)
cursor.execute("""
CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_id INTEGER NOT NULL,
    genre TEXT NOT NULL,
    FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
)
""")

# Chapter table - stores individual chapters for each manga
# Many-to-one relationship (one manga has many chapters)
cursor.execute("""
CREATE TABLE IF NOT EXISTS chapter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_site_id INTEGER NOT NULL,
    chapter_number TEXT NOT NULL,                     -- Chapter number (TEXT to handle "20.5", etc.)
    chapter_url TEXT NOT NULL,                        -- URL to the chapter page
    chapter_title TEXT,                               -- Optional chapter title
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- When the chapter was added
    FOREIGN KEY (manga_site_id) REFERENCES manga_site(id),
    UNIQUE(manga_site_id, chapter_number)                  -- Prevent duplicate chapters for a given manga and site (critical for performance)
)
""")

# Migration: Add unique index if table already exists without the constraint
# This ensures the unique constraint exists even for older databases
try:
    cursor.execute("""
        CREATE UNIQUE INDEX IF NOT EXISTS idx_chapter_unique 
        ON chapter(manga_site_id, chapter_number)
    """)
except sqlite3.OperationalError:
    pass  # Index already exists or constraint is already defined

# Site table - stores information about each website
cursor.execute("""
CREATE TABLE IF NOT EXISTS site (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT NOT NULL UNIQUE,                      -- Domain of the website (e.g., likemanga.in)
    url TEXT NOT NULL,                                 -- Base URL of the website
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- When the site was added
)
""")

# Manga-Site table - stores the relationship between mangas and sites
# Used for data that is unique to a manga on a specific site (e.g., manga_url, status on that site, etc.)
cursor.execute("""
CREATE TABLE IF NOT EXISTS manga_site (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    manga_id INTEGER NOT NULL,
    site_id INTEGER NOT NULL,
    manga_url TEXT NOT NULL,                          -- URL to the manga's page on the specific site
    status TEXT CHECK(status IN ('ongoing', 'completed', 'hiatus', 'dropped')),  -- Status of the manga on this site 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- When the manga was added for this site
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- When the manga was last updated for this site
    FOREIGN KEY (manga_id) REFERENCES manga(id),
    FOREIGN KEY (site_id) REFERENCES site(id),
    UNIQUE(manga_id, site_id)
)
""")

# Save all changes and close the connection
conn.commit()
conn.close()

print("All tables created successfully (if they didn't already exist).")

