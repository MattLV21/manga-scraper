import requests
from bs4 import BeautifulSoup
import sqlite3
from threading import local
from tqdm import tqdm
import logging

class MangaScraper:
    def __init__(self, database_path="manga.db"):
        self.database_path = database_path
        self.thread_local = local()

    def get_db_connection(self):
        if not hasattr(self.thread_local, 'conn'):
            self.thread_local.conn = sqlite3.connect(self.database_path, check_same_thread=False)
            self.thread_local.conn.execute("PRAGMA journal_mode=WAL")
        return self.thread_local.conn

    def update_manga_full(self, manga_id, data: dict):
        """
        Updates manga/manga_sources data in the database for a given manga_id with the provided updates dictionary.
        """
        conn = self.get_db_connection()
        placeholders = ', '.join([f"{key}=?" for key in data.keys()])
        set_clause = ', '.join(placeholders)
        query = f"UPDATE manga SET {set_clause}, updated_at=CURRENT_TIMESTAMP WHERE id=?"
        values = tuple([data[key] for key in data.keys()]) + (manga_id,)
        conn.execute(query, values)
        conn.commit()
        return True

    def add_chapter(self, manga_sources_id, data: dict):
        """
        Adds a chapter to the database if it doesn't already exist.
        """
        conn = self.get_db_connection()
        query = """
            INSERT OR IGNORE INTO chapter(manga_sources_id, chapter_number, chapter_url, locked, locked_timer)
            VALUES (?, ?, ?, ?, ?)
        """
        chapter_number = data.get('chapter_number', str(data.get('chapter_num', '')))
        chapter_url = data.get('chapter_url', '')
        locked = data.get('locked', False)
        locked_timer = data.get('locked_timer', None)
        conn.execute(query, (manga_sources_id, chapter_number, chapter_url, locked, locked_timer))
        conn.commit()
        return conn.lastrowid

    def add_full_manga(self, data: dict):
        """
        Adds a manga and manga_sources to the database if it doesn't already exist, otherwise updates the existing manga entry.
        Adds all details of the manga to the manga table and manga_sources table
        Adds all chapters + alt_titles + authors + genres to their respective tables
        """
        conn = self.get_db_connection()
        cursor = conn.cursor()

        # Extract data with defaults
        title = data.get('title', '')
        cover_url = data.get('cover_url', '')
        summary = data.get('summary', '')
        manga_url = data.get('manga_url', '')
        site_id = data.get('site_id', None)
        status = data.get('status', 'ongoing')
        authors = data.get('authors', [])
        genres = data.get('genres', [])
        alt_titles = data.get('alt_titles', [])

        # Add manga to manga table
        cursor.execute("""
            INSERT OR REPLACE INTO manga (title, cover_url, summary)
            VALUES (?, ?, ?)
        """)
        manga_id = cursor.lastrowid

        if manga_url:
            # update manga_sources entry if manga_url is provided
            cursor.execute("""
                UPDATE manga SET title=?, cover_url=?, summary=? WHERE id=?
            """, (title, cover_url, summary, manga_id))

        # Add manga_sources entry
        if site_id:
            cursor.execute("""
                INSERT OR IGNORE INTO manga_sources (manga_id, site_id, manga_url, status)
                VALUES (?, ?, ?, ?)
            """, (manga_id, site_id, manga_url, status))
            manga_sources_id = cursor.lastrowid

        # Add alt_titles
        for alt_title in alt_titles:
            cursor.execute("""
                INSERT OR IGNORE INTO alt_titles (manga_id, alt_title)
                VALUES (?, ?)
            """, (manga_id, alt_title))

        # Add authors
        for author in authors:
            cursor.execute("""
                INSERT OR IGNORE INTO authors (manga_id, author)
                VALUES (?, ?)
            """, (manga_id, author))

        # Add genres
        for genre in genres:
            cursor.execute("""
                INSERT OR IGNORE INTO genres (manga_id, genre)
                VALUES (?, ?)
            """, (manga_id, genre))

        conn.commit()
        return manga_id


    def update_manga_data(self, url, data: dict = None):
        """
        Updates manga data in the database if it already exists, otherwise adds it as a new entry.
        Makes sure any update is also reflected in the manga_sources table if any overlapping data is updated
        """
        pass

    def add_chapters(self, manga_id, site_id, chapters_data: dict):
        """
        Adds chapters to the database for a given manga and site. Checks for duplicates before adding.
        chapters_data should be a list of dicts with keys: chapter_number, chapter_url, chapter_title
        """
        manga_sources_id = self.get_manga_sources_id(manga_id, site_id)
        if not manga_sources_id:
            logging.error(f"No manga_sources found for manga_id={manga_id}, site_id={site_id}")
            return False

        conn = self.get_db_connection()
        added_count = 0

        for chapter in chapters_data:
            result = self.add_chapter(manga_sources_id, chapter)
            if result:
                added_count += 1

        return added_count > 0

    def get_all_manga(self, conn):
        cursor = conn.execute("SELECT * FROM manga")
        return cursor.fetchall()

    def get_manga_sources_id(self, manga_id, site_id):
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM manga_sources WHERE manga_id=? AND site_id=?", (manga_id, site_id))
        result = cursor.fetchone()
        if result:
            return result[0]
        return None

    def get_manga_sources_id_by_url(self, manga_url):
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM manga_sources WHERE manga_url=?", (manga_url,))
        result = cursor.fetchone()
        if result:
            return result[0]
        return None

    def add_site(self, data: dict):
        """ Adds a new site to the database if it doesn't already exist, otherwise returns the existing site_id"""
        site_name = data.get('domain', '')
        base_url = data.get('url', '')

        print(site_name, base_url)  # Debugging statement to verify inputs
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM site WHERE domain=?", (site_name,))
        result = cursor.fetchone()

        if not result:
            query = "INSERT INTO site(domain, url) VALUES (?, ?)"
            conn.execute(query, (site_name, base_url))
            conn.commit()
            return cursor.lastrowid
        else:
            return result[0]

    def add_manga_sources(self, data: dict):
        """
        Adds a manga_sources entry to the database if it doesn't already exist, otherwise returns the existing id.
        data dict should contain: manga_id, site_id, manga_url, status (optional)
        """
        manga_id = data.get('manga_id', None)
        site_id = data.get('site_id', None)
        manga_url = data.get('manga_url', '')
        status = data.get('status', 'ongoing')

        if not manga_id or not site_id:
            logging.error("manga_id and site_id are required")
            return None

        conn = self.get_db_connection()
        cursor = conn.cursor()

        # Check if entry already exists
        cursor.execute("""
            SELECT id FROM manga_sources WHERE manga_id=? AND site_id=?
        """, (manga_id, site_id))
        existing = cursor.fetchone()

        if existing:
            # Update existing entry
            cursor.execute("""
                UPDATE manga_sources SET manga_url=?, status=?, updated_at=CURRENT_TIMESTAMP
                WHERE manga_id=? AND site_id=?
            """, (manga_url, status, manga_id, site_id))
            conn.commit()
            return existing[0]
        else:
            # Insert new entry
            query = """
                INSERT INTO manga_sources(manga_id, site_id, manga_url, status)
                VALUES (?, ?, ?, ?)
            """
            cursor.execute(query, (manga_id, site_id, manga_url, status))
            conn.commit()
            return cursor.lastrowid
