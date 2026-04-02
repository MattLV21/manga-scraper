import re
import sqlite3
from threading import local
import logging
from datetime import datetime, timedelta

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
            INSERT OR IGNORE INTO chapter(manga_sources_id, chapter_number, chapter_url, locked, locked_until)
            VALUES (?, ?, ?, ?, ?)
        """
        chapter_number = data.get('chapter_number', str(data.get('chapter_num', '')))
        chapter_url = data.get('chapter_url', '')
        locked = data.get('locked', False)
        locked_until = data.get('locked_until', None)
        if locked and isinstance(locked_until, str):
            locked_until = self._parse_duration_string(locked_until, datetime.now())
        conn.execute(query, (manga_sources_id, chapter_number, chapter_url, locked, locked_until))
        conn.commit()
        return conn.lastrowid

    def unlock_chapter(self, manga_sources_id, chapter_number):
        """
        Manually unlocks a chapter (sets locked=0).
        Use check_and_unlock_chapters() instead for automatic unlocking.
        Returns True if the chapter was unlocked, False otherwise.
        """
        conn = self.get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE chapter SET locked=0, locked_until=NULL
            WHERE manga_sources_id=? AND chapter_number=?
        """, (manga_sources_id, chapter_number))
        conn.commit()
        return cursor.rowcount > 0

    def check_and_unlock_chapters(self, manga_sources_id):
        """
        Checks all locked chapters and unlocks any that have expired.
        Returns list of unlocked chapters.
        """

        conn = self.get_db_connection()
        cursor = conn.cursor()

        # Get all locked chapters with their unlock time
        cursor.execute("""
            SELECT chapter_number, locked_until FROM chapter
            WHERE manga_sources_id=? AND locked=1 AND locked_until IS NOT NULL
        """, (manga_sources_id,))
        locked_chapters = cursor.fetchall()

        now = datetime.now()
        unlocked = []

        for chapter_number, locked_until in locked_chapters:
            if locked_until:
                try:
                    # Parse the stored timestamp
                    unlock_time = datetime.strptime(locked_until, "%Y-%m-%d %H:%M:%S")

                    if now >= unlock_time:
                        # Chapter is ready to be unlocked
                        cursor.execute("""
                            UPDATE chapter SET locked=0, locked_until=NULL
                            WHERE manga_sources_id=? AND chapter_number=?
                        """, (manga_sources_id, chapter_number))
                        conn.commit()
                        unlocked.append(chapter_number)
                except ValueError:
                    # Invalid timestamp format, skip
                    logging.error(f"Invalid locked_until format for manga_sources_id={manga_sources_id}, chapter_number={chapter_number}: {locked_until}")
                    pass

        return unlocked

    def get_unlocked_chapters(self, manga_sources_id):
        """
        Gets all chapters that are unlocked (or locked with expired timer).
        Returns list of (chapter_number, chapter_url) tuples.
        """
        conn = self.get_db_connection()
        cursor = conn.cursor()

        # Get chapters that are not locked
        cursor.execute("""
            SELECT chapter_number, chapter_url FROM chapter
            WHERE manga_sources_id=? AND (locked=0 OR locked_until IS NULL)
            ORDER BY chapter_number
        """, (manga_sources_id,))
        return cursor.fetchall()

    def lock_chapter(self, manga_sources_id, chapter_number, unlock_time):
        """
        Locks a chapter until the specified unlock time.
        unlock_time should be a datetime object or string in "YYYY-MM-DD HH:MM:SS" format.
        """
        now = datetime.now()
        
        conn = self.get_db_connection()
        cursor = conn.cursor()

        # Convert to datetime if it's a string
        if isinstance(unlock_time, str):
            unlock_time = self._parse_duration_string(unlock_time, now)
   
        if not isinstance(unlock_time, datetime):
            logging.error("unlock_time must be a datetime object or a valid duration string")
            return False
        
        if unlock_time < datetime.now():
            logging.warning("unlock_time is in the past, chapter will be unlocked immediately")
            unlock_time = now
            return self.unlock_chapter(manga_sources_id, chapter_number)
       
        # Lock the chapter
        cursor.execute("""
            UPDATE chapter SET locked=1, locked_until=?
            WHERE manga_sources_id=? AND chapter_number=?
        """, (unlock_time.strftime("%Y-%m-%d %H:%M:%S"), manga_sources_id, chapter_number))
        conn.commit()
        return cursor.rowcount > 0

    def _parse_duration_string(self, duration_str, now):   
        match = re.match(r'(\d+(?:\.\d+)?)\s*h(?:ours?)?\s*(?:\s*,\s*)?\s*(\d+(?:\.\d+)?)\s*m(?:in(?:u+te?)?)?', duration_str)
        if match:
            hours = float(match.group(1)) or 0
            minutes = float(match.group(2)) or 0
            unlock_time = now + timedelta(hours=hours, minutes=minutes)
            return unlock_time
        
        logging.error(f"Invalid duration format: {duration_str}")
        return None

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
