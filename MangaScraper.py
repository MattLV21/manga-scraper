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

    def update_manga_full(self, manga_id, updates):
        conn = self.get_db_connection()
        placeholders = ', '.join([f"{key}=?" for key in updates])
        set_clause = ', '.join(placeholders)
        query = f"UPDATE manga SET {set_clause}, updated_at=CURRENT_TIMESTAMP WHERE id=?"
        values = tuple([updates[key] for key in updates]) + (manga_id,)
        conn.execute(query, values)
        conn.commit()

    def add_chapter(self, manga_site_id, chapter_number, chapter_url):
        conn = self.get_db_connection()
        query = """
            INSERT OR IGNORE INTO chapter(manga_site_id, chapter_number, chapter_url) 
            VALUES (?, ?, ?)
        """
        conn.execute(query, (manga_site_id, chapter_number, chapter_url))
        conn.commit()
        return conn.lastrowid

    def fetch_and_update_mangas(self):
        conn = self.get_db_connection()
        mangas = self.get_all_manga(conn)
        conn.close()

        for manga in mangas:
            if self.update_manga_data(manga['manga_url'], manga['site_id']):
                self.process_chapters(manga['manga_url'], manga['id'], manga['site_id'])

    def update_manga_data(self, url, site_id):
        try:
            response = requests.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract manga information (e.g., title, cover_url, summary, etc.)
            manga_title = soup.find('h1', class_='title-name').text.strip()
            cover_url = soup.find('img', class_='manga-poster')['src']
            summary = ' '.join([p.text for p in soup.find('div', id='description-content').find_all('p')])
            
            updates = {
                "title": manga_title,
                "cover_url": cover_url,
                "summary": summary
            }
            
            conn = self.get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM manga WHERE manga_url=?", (url,))
            result = cursor.fetchone()
            
            if result:
                manga_id = result[0]
                self.update_manga_full(manga_id, updates)
                return True
            else:
                # Add new manga to the database if not already present
                pass
        
        except Exception as e:
            logging.error(f"Error fetching {url}: {e}")
        
        return False

    def process_chapters(self, url, manga_id, site_id):
        try:
            response = requests.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            container = soup.find('div', id='manga-chapters-holder')
            chapters = [(a['href'], a.text.strip()) for a in container.find_all('a', href=True)]
            
            for chapter_url, chapter_label in chapters:
                manga_site_id = self.get_manga_site_id(manga_id, site_id)
                if manga_site_id is None:
                    manga_site_id = self.add_manga_site(manga_id, site_id, url)
                self.add_chapter(manga_site_id, chapter_label, chapter_url)
        
        except Exception as e:
            logging.error(f"Error processing chapters for {url}: {e}")

    def get_all_manga(self, conn):
        cursor = conn.execute("SELECT * FROM manga")
        return cursor.fetchall()

    def get_manga_site_id(self, manga_id, site_id):
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM manga_site WHERE manga_id=? AND site_id=?", (manga_id, site_id))
        result = cursor.fetchone()
        if result:
            return result[0]
        return None

    def get_manga_site_id_by_url(self, manga_url):
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM manga_site WHERE manga_url=?", (manga_url,))
        result = cursor.fetchone()
        if result:
            return result[0]
        return None

    def add_site(self, site_name, base_url):
        print(site_name, base_url)  # Debugging statement to verify inputs
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM site WHERE domain=?", (site_name,))
        result = cursor.fetchone()
        
        if not result:
            query = "INSERT INTO site(domain, url) VALUES (?, ?)"
            conn.execute(query, (site_name, base_url))
            conn.commit()
        else:
            return result[0]

    def add_manga_site(self, manga_id, site_id, manga_url):
        conn = self.get_db_connection()
        query = """
            INSERT INTO manga_site(manga_id, site_id, manga_url) 
            VALUES (?, ?, ?)
        """
        conn.execute(query, (manga_id, site_id, manga_url))
        conn.commit()
        return conn.lastrowid

