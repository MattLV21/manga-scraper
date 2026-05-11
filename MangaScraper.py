import re
import sqlite3
from threading import local
import logging
from datetime import datetime, timedelta
from playwright.sync_api import sync_playwright
from tqdm import tqdm

class MangaScraper:
    def __init__(self, database_path="manga.db"):
        self.database_path = database_path
        self.thread_local = local()
        self.browser = None
        self.page = None

    def _get_browser(self):
        """Get or create browser instance."""
        if self.browser is None:
            self.playwright = sync_playwright().start()
            self.browser = self.playwright.chromium.launch(headless=True)
            self.context = self.browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            self.page = self.context.new_page()

        return self.browser, self.page

    def _close_browser(self):
        """Close browser on destruction."""
        if self.browser:
            self.browser.close()
        if getattr(self, "playwright", None):
            self.playwright.stop()


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
            INSERT INTO chapter(manga_sources_id, chapter_number, chapter_url, locked, locked_until)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(manga_sources_id, chapter_number) DO UPDATE SET
                locked=excluded.locked,
                locked_until=excluded.locked_until
        """
        chapter_number = data.get('chapter_number', data.get('chapter_number', ''))
        chapter_url = data.get('url', '')
        locked = data.get('locked', False)
        locked_until = data.get('locked_timer', None)

        # Convert duration string to datetime
        if locked and isinstance(locked_until, str):
            locked_until_dt = self._parse_duration_string(locked_until, datetime.now())
            if locked_until_dt:
                locked_until = locked_until_dt.strftime("%Y-%m-%d %H:%M:%S")
            else:
                locked_until = None
        elif isinstance(locked_until, datetime):
            locked_until = locked_until.strftime("%Y-%m-%d %H:%M:%S")

        result = conn.execute(query, (
            manga_sources_id, 
            chapter_number, 
            chapter_url, 
            locked, 
            locked_until
            ))
        conn.commit()
        return result.lastrowid

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
            WHERE manga_sources_id=? AND locked=1
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
            else:
                # TODO: Handle chapters that are locked without a valid locked_until since some sites do not provide a tiemr.
                # This can be done by checking the chapter's locked status on the site again and unlocking it if it's no longer locked.
                continue

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
        
        if unlock_time <= datetime.now():
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
        """
        Parses a duration string into a datetime.
        Accepts formats like:
            "3h 42m", "5h 11m", "50m", "2h", "1h 0m"
        """
        duration_str = duration_str.strip().lower()
        
        # Regex: optional hours, mandatory minutes
        match = re.match(r'(?:(\d+(?:\.\d+)?)\s*h(?:ours?)?\s*)?(?:(\d+(?:\.\d+)?)\s*m(?:in(?:ute?)?)?)$', duration_str)
        
        if match:
            hours = float(match.group(1)) if match.group(1) else 0
            minutes = float(match.group(2)) if match.group(2) else 0
            unlock_time = now + timedelta(hours=hours, minutes=minutes)
            return unlock_time
        
        logging.error(f"Invalid duration format: {duration_str}")
        return None

    def add_full_manga(self, data: dict):
        """
        Adds a manga and manga_sources to the database if it doesn't already exist, 
        otherwise updates the existing manga entry.
        """
        conn = self.get_db_connection()
        cursor = conn.cursor()

        # Extract data with defaults
        title = data.get('title', '')
        manga_type = data.get('type', None)
        cover_url = data.get('cover_url', '')
        summary = data.get('summary', '')
        authors = data.get('authors', [])
        artists = data.get('artists', [])
        genres = data.get('genres', [])
        alt_titles = data.get('alt_titles', [])

        manga_id = None

        # Check primary title first
        cursor.execute("SELECT id FROM manga WHERE title = ?", (title,))
        result = cursor.fetchone()
        
        if result:
            manga_id = result[0]
        else:
            # Check if any of the provided alt_titles already exist in the alt_titles table
            if alt_titles:
                # Create a placeholders string like (?, ?, ?)
                placeholders = ', '.join(['?'] * len(alt_titles))
                query = f"SELECT manga_id FROM alt_titles WHERE alt_title IN ({placeholders})"
                cursor.execute(query, alt_titles)
                alt_result = cursor.fetchone()
                if alt_result:
                    manga_id = alt_result[0]

        # 2. ADD OR UPDATE MANGA TABLE
        if manga_id is None:
            # Truly new manga
            cursor.execute("""
                INSERT INTO manga (title, type, cover_url, summary)
                VALUES (?, ?, ?, ?)
            """, (title, manga_type, cover_url, summary))
            manga_id = cursor.lastrowid
        else:
            # Existing manga: Update metadata (optional, but keeps info fresh)
            cursor.execute("""
                UPDATE manga 
                SET type = COALESCE(?, type),
                    cover_url = COALESCE(?, cover_url), 
                    summary = COALESCE(?, summary)
                WHERE id = ?
            """, (manga_type, cover_url, summary, manga_id))

        # 3. ADD ALT_TITLES (Using INSERT OR IGNORE to prevent duplicates for this ID)
        # Ensure the main title is also in alt_titles for easier searching later
        all_titles = list(set(alt_titles + [title]))
        for t in all_titles:
            cursor.execute("""
                INSERT OR IGNORE INTO alt_titles (manga_id, alt_title)
                VALUES (?, ?)
            """, (manga_id, t))

        # 4. ADD AUTHORS
        for author in authors:
            cursor.execute("""
                INSERT OR IGNORE INTO authors (manga_id, author)
                VALUES (?, ?)
            """, (manga_id, author))

        # 5. ADD ARTISTS
        for artist in artists:
            cursor.execute("""
                INSERT OR IGNORE INTO artists (manga_id, artist)
                VALUES (?, ?)
            """, (manga_id, artist))

        # 6. ADD GENRES
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

    def get_manga_id_by_source_id(self, source_id):
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT manga_id FROM manga_sources WHERE id=?", (source_id,))
        result = cursor.fetchone()
        if result:
            return result[0]
        return None

    def add_site(self, data: dict):
        """ Adds a new site to the database if it doesn't already exist, otherwise returns the existing site_id"""
        site_name = data.get('domain', '')
        base_url = data.get('url', '')
 # Debugging statement to verify inputs
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

    def add_manga_sources(self, site_id, manga_id, data: dict):
        """
        Adds a manga_sources entry to the database if it doesn't already exist, otherwise returns the existing id.
        data dict should contain: manga_id, site_id, manga_url, status (optional)
        """
        manga_url = data.get('manga_url', '')
        status = data.get('status', 'ongoing')

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
    
    def scrape(self):

        browser, page = self._get_browser()
        latest_updates = self.fetch_latest_updates()

        db_changes = {
            "manga_added": 0,
            "manga_updated": 0,
            "sources_updated": 0,
            "chapters_added": 0,
            "chapters_backfilled": 0
        }

        for update in tqdm(latest_updates, desc="Scraping Latest Updates"):
            manga_url = update['manga_url']

            # Check if manga already exists
            sources_id = self.get_manga_sources_id_by_url(manga_url)
            
            if not sources_id:
                # Add new manga to the database
                updates = self.fetch_manga_details(manga_url)
                manga_id = self.add_full_manga(updates)
                db_changes["manga_added"] += 1
            else:
                manga_id = self.get_manga_id_by_source_id(sources_id)

            # To insure that in case of new status
            sources_id = self.add_manga_sources(self.site_id, manga_id, update)
            db_changes["sources_updated"] += 1

            update['chapter_info'] = sorted(
                update['chapter_info'],
                key=lambda c: float(c.get("chapter_number", 0)),
                reverse=True
            )

            need_backfill = False

            # Update chapters
            for idx, chapter in enumerate(update['chapter_info']):
                result = self.add_chapter(sources_id, chapter)
                
                if result:
                    db_changes["chapters_added"] += 1

                if result and idx == len(update['chapter_info']) - 1:
                    need_backfill = True

            # since the oldest chapter was added make sure that a chapter wasn't skipped
            if need_backfill:
                details = self.fetch_manga_details(manga_url)

                details['chapters'] = sorted(
                    details['chapters'],
                    key=lambda c: float(c.get("chapter_number", 0)),
                    reverse=True
                )

                self.add_chapters(manga_id, self.site_id, details['chapters'])

                db_changes["chapters_backfilled"] += 1
                
        # TODO: return the amount of changes that were made to the database for logging and debugging purposes
        self._close_browser()