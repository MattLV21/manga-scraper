from datetime import datetime
import logging
import re
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from MangaScraper import MangaScraper


class Elftoonscraper(MangaScraper):
    """
    Manga scraper for ElfToon (https://elftoon.com/).

    Scrapes manga updates from homepage and details from manga detail pages.
    """

    def __init__(self, database_path="manga.db"):
        """
        Initialize the Elftoonscraper.

        Args:
            database_path: Path to the SQLite database
        """
        super().__init__(database_path)
        self.base_url = "https://elftoon.com/"
        self.base_latest = "page/"
        self.site_id = self.add_site({
            "domain": "ElfToon",
            "url": "https://elftoon.com/"
        })

    def fetch_latest_updates(self):
        """
        Fetch the latest manga updates from ElfToon homepage.

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
        login_url_trigger = "elftoon.xyz/login"  # The indicator for locked content

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            page = context.new_page()

            try:
                page.goto(target_url)
                # Ensure the list has actually rendered
                page.wait_for_selector('div.uta', timeout=10000)
                # Small wait to ensure dynamic URLs (if any) are swapped by JS
                page.wait_for_load_state("networkidle")
                
                soup = BeautifulSoup(page.content(), 'html.parser')
            except Exception:
                return []
            finally:
                browser.close()

            updates = []
            manga_entries = soup.select('div.uta')

            for entry in manga_entries:
                title_tag = entry.select_one('.luf a.series, .luf h3 a')
                if not title_tag:
                    continue
                
                manga_title = title_tag.get_text(strip=True)
                manga_url = title_tag.get('href')

                chapter_info_list = []
                chapter_items = entry.select('.luf ul li')
                
                for li in chapter_items:
                    link = li.find('a')
                    if not link:
                        continue
                    
                    # GET THE URL
                    chapter_url = link.get('href', '')
                    
                    # LOGIC: If the link leads to /login/, it is locked.
                    is_locked = login_url_trigger in chapter_url
                    locked_timer = None

                    # CHAPTER NUMBER EXTRACTION
                    raw_text = link.get_text(strip=True)
                    chapter_num = raw_text.replace('Chapter', '').replace('Ch.', '').strip()

                    chapter_info_list.append({
                        "chapter_number": chapter_num,
                        "url": chapter_url if not is_locked else manga_url, # Fallback to manga home if locked
                        "locked": is_locked,
                        "locked_timer": locked_timer
                    })

                updates.append({
                    "manga_title": manga_title,
                    "manga_url": manga_url,
                    "chapter_info": chapter_info_list
                })

            return updates

    def fetch_manga_details(self, manga_url: str) -> dict:
        """
        Fetch manga details from the ElfToon manga detail page.
        """
        with sync_playwright() as p:
            # Launch browser with a common User-Agent to avoid basic bot detection
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            page = context.new_page()

            # Navigate to manga URL
            page.goto(manga_url)

            # Wait for the chapter list to load, as it is often dynamic
            page.wait_for_load_state("networkidle", timeout=10000)  # Wait until network is idle to ensure all content is loaded

            soup = BeautifulSoup(page.content(), 'html.parser')
            browser.close()

            # --- Extraction Logic ---

            # Title
            title = soup.select_one('.entry-title').text.strip()
            # Alternative Titles
            alt_titles = soup.select_one('#titlemove span').text.split('，')
            alt_titles = [alt.strip() for alt in alt_titles if alt]
            
            status = None
            manga_type = None
            authors = []
            artists = []
            info_section = soup.select('.imptdt')
            for info in info_section:
                alt = False
                for alt in alt_titles:
                    if alt in info.text:
                        alt = True
                        break
                if alt:
                    continue
                if 'Status' in info.text:
                    status = info.select_one('i').text.strip()
                elif 'Type' in info.text:
                    manga_type = info.select_one('a').text.strip()
                elif 'Author' in info.text:
                    authors = info.select_one('i').text
                    authors = [author.strip() for author in authors.split(',') if author.strip()]
                elif 'Artist' in info.text:
                    artists = info.select_one('i').text
                    artists = [artist.strip() for artist in artists.split(',') if artist.strip()]

            # Genres
            genres = []
            tags = soup.select('.mgen a')
            for tag in tags:
                genre = tag.text.strip()
                genres.append(genre)

            # Cover Image
            cover_url = soup.select_one('.thumb img')['src']

            # Summary
            summary = soup.select_one('.entry-content').text.strip()

            # Chapters
            chapters = []
            chapter_info = soup.select('#chapterlist li')
            for info in chapter_info:
                url = info.select_one('.chapter-link-overlay')['href'] 
                locked = False
                if url == '#':
                    locked = True
                    url = manga_url

                chapter_num = info.select_one('.chapternum').text.replace('Chapter ', '').replace('Fixed', '').strip()
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
    toons = Elftoonscraper()
    updates = toons.fetch_latest_updates()
    #print(f"Found {len(updates)} updates:")
    #print(f"Title: {updates[0]['manga_title']}, URL: {updates[0]['manga_url']}")
    details = toons.fetch_manga_details('https://elftoon.com/manga/after-the-school-belle-dumped-me-i-became-a-martial-arts-god/')
    print("Fetched details for the first manga update.")
    for key, value in details.items():
        if key == "chapters":
            print(f"{key}:")
            for chapter in value:
                print(f"  - Chapter {chapter['chapter_number']}: URL={chapter['url']}, Locked={chapter['locked']}, Locked Timer={chapter['locked_timer']}")
        else:
            print(f"{key}: {value}")
    """ toons.scrape() """
