from datetime import datetime
import logging
import re
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from MangaScraper import MangaScraper


class AsmotoonScraper(MangaScraper):
    """
    Manga scraper for Asmotoon (https://asmotoon.com/).

    Scrapes manga updates from homepage and details from manga detail pages.
    """

    def __init__(self, database_path="manga.db"):
        """
        Initialize the AsmotoonScraper.

        Args:
            database_path: Path to the SQLite database
        """
        super().__init__(database_path)
        self.base_url = "https://asmotoon.com/"
        self.base_latest = "latest/"
        self.site_id = self.add_site({
            "domain": "Asmotoon",
            "url": "https://asmotoon.com/"
        })

    def fetch_latest_updates(self):
        """
        Fetch the latest manga updates from Asmotoon homepage.

        Returns:
            List of manga update dicts with title, URL, and chapter info.
        """
        return self.fetch_latest_updates_from_page(1)

    def fetch_latest_updates_from_page(self, page_number: int = 1) -> list[dict]:
        """
        Fetch updates with lock detection based on the redirect URL.
        """
        assert page_number > 0
        target_url = f"{self.base_url}{self.base_latest}{page_number}"

        _, page = self._get_browser()

        try:
            page.goto(target_url, wait_until="domcontentloaded")
            page.wait_for_timeout(1000)
            
            soup = BeautifulSoup(page.content(), 'html.parser')
        except Exception:
            return []
        

        updates = []
        manga_entries = soup.select('div.latest-poster')

        for entry in manga_entries:
            tag = entry.find_all('a', href=True, recursive=False)[0]  # The second link is the manga detail page
            manga_title = tag.get('title')
            manga_url = self.base_url + tag.get('href')[1:]

            chapter_info = []
            chapter_items = entry.select_one('div .-mb-1').find_all('a')

            for chapter in chapter_items:
                
                if chapter.name != 'a':
                    continue
                
                # GET THE URL
                chapter_url = self.base_url + chapter.get('href', '')[1:]
                
                is_locked = chapter.find('img') is not None
                locked_timer = None

                # CHAPTER NUMBER EXTRACTION
                chapter_num = chapter.get('title').split(' ')[1].strip()

                chapter_info.append({
                    "chapter_number": chapter_num,
                    "url": chapter_url,
                    "locked": is_locked,
                    "locked_timer": locked_timer
                })

            updates.append({
                "manga_title": manga_title,
                "manga_url": manga_url,
                "chapter_info": chapter_info
            })

        return updates

    def fetch_manga_details(self, manga_url: str) -> dict:
        """
        Fetch manga details from the Asmotoon manga detail page.
        """
        _, page = self._get_browser()

        # Navigate to manga URL
        page.goto(manga_url, wait_until="domcontentloaded")
        page.wait_for_timeout(1000)

        soup = BeautifulSoup(page.content(), 'html.parser')

        # --- Extraction Logic ---

        # Title
        title = soup.select_one('h1').get_text(strip=True)
        # Alternative Titles
        alt_titles = soup.select_one('div #expand_content').select_one('span').get_text(strip=True).split(',')
        alt_titles = [alt.strip() for alt in alt_titles if alt]
        if 'No alternative titles.' in alt_titles:
            alt_titles = []

        status = None
        manga_type = None
        authors = []
        artists = []
        info_section = soup.select('div .h-fit')
        for info in info_section:
            try:
                if 'Status' in info.text:
                    status = info.select_one('div .w-fit').get_text(strip=True)
                elif 'Type' in info.text:
                    manga_type = info.select_one('div .w-fit').get_text(strip=True)
                elif 'Author' in info.text:
                    authors.append(info.select_one('div .w-fit').get_text(strip=True))
                elif 'Artist' in info.text:
                    artists.append(info.select_one('div .w-fit').get_text(strip=True))
            except Exception as e:
                print(f"Error parsing info section: {e}")
                continue
        if manga_type.lower() == 'novel':
            return {
                "title": None,
                "alt_titles": None,
                "status": None,
                "type": None,
                "authors": None,
                "artists": None,
                "genres": None,
                "cover_url": None,
                "chapters": None,
                "total_chapters": None,
                "summary": None
            }
        # Genres
        genres = []
        tags = soup.select_one('div .items-start').select('a')
        for tag in tags:
            genre = tag.get('title').strip()
            genres.append(genre)

        # Cover Image
        cover_url = soup.select_one('div .bg-\[image\:--photoURL\]').get('style')
        match = re.search(r'--photoURL:url\((.*?)\)', cover_url)
        cover_url = match.group(1) if match else None

        # Summary
        summary = soup.select_one('div #expand_content').select_one('.rounded-lg').get_text(strip=True)

        # Chapters
        chapters = []
        chapter_info = soup.select_one('div #chapters').select('a')
        for info in chapter_info:
            url = self.base_url + info.get('href', '')[1:]
            locked = info.find('img') is not None
            

            chapter_num = info.get('title').split(' ')[1].strip()
            locked_timer = None

            chapters.append({
                "url": url,
                "chapter_number": chapter_num,
                "locked": locked,
                "locked_timer": locked_timer
            })

        return {
            "title": title,
            "alt_titles": alt_titles,
            "status": status,
            "type": manga_type,
            "authors": authors,
            "artists": artists,
            "genres": genres,
            "cover_url": cover_url,
            "chapters": chapters,
            "total_chapters": len(chapters),
            "summary": summary
        }
    

if __name__ == "__main__":
    toons = AsmotoonScraper()
    """ updates = toons.fetch_latest_updates()
    #print(f"Found {len(updates)} updates:")
    print(f"Title: {updates[0]['manga_title']}, URL: {updates[0]['manga_url']}")
    print(f"Chapter Info: {updates[0]['chapter_info']}")

    details = toons.fetch_manga_details('https://asmotoon.com/series/65139c7c5f5/')
    print("Fetched details for the first manga update.")
    for key, value in details.items():
        if key == "chapters":
            print(f"{key}:")
            for chapter in value:
                print(f"  - Chapter {chapter['chapter_number']}: URL={chapter['url']}, Locked={chapter['locked']}, Locked Timer={chapter['locked_timer']}")
        else:
            print(f"{key}: {value}") """
    toons.scrape()