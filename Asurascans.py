from datetime import datetime
import logging
import time
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from MangaScraper import MangaScraper
from tqdm import tqdm

class AsurascansScraper(MangaScraper):
    def __init__(self, database_path="manga.db"):
        super().__init__(database_path)
        self.base_url = "https://asurascans.com/"
        self.base_latest = "?page="
        self.latest_page = self.base_url + self.base_latest
        self.site_id = self.add_site({"domain": "Asurascans", "url": "https://asurascans.com/"})

    def fetch_latest_updates(self):
        """Fetch the latest manga updates from the website."""
        return self.fetch_updates_from_page(1)

    def fetch_updates_from_page(self, page_number: int = 1):
        """Fetch manga updates from a specific page number. 
        page 1 is the same as fetch_latest_updates, so it can be optimized to avoid duplicate code.
        """
        assert page_number > 0, "Page number must be greater than 0"

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # Navigate to the URL
            page.goto(self.latest_page + str(page_number))

            # Wait for the dynamic content to load
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_load_state("networkidle", timeout=5000) # wait for the network to be idle, which means the page has finished loading

            soup = BeautifulSoup(page.content(), 'html.parser')
            container = soup.select_one("div.grid.grid-cols-1.md\\:grid-cols-2.content-start.px-4.md\\:px-8")

            if not container:
                logging.info("No manga updates found on the page.")
                return []

            # Each manga entry is a direct child div of the container
            items = container.find_all('div', recursive=False)
            mangas = []

            for item in items:
                manga_url = self.base_url + item.find('img').parent['href'][1:]

                links = item.find_all('a', href=True)
                chapters = []
                for url in links:
                    if "chapter" in url['href']:
                        # Find chapter information and locks
                        chapter_url = self.base_url + url['href'][1:]
                        chapter_number = url['href'].split('/')[-1]
                        locked = url.find('svg') is not None
                        if locked:
                            locked_timer = url.text.replace("Chapter "+chapter_number, "").strip()

                            if not locked_timer[0].isdigit():
                                if ")" in locked_timer:
                                    locked_timer = locked_timer.split(")")[1].strip()
                        else:
                            locked_timer = None

                        chapter = {
                            "url": chapter_url,
                            "chapter_number": chapter_number,
                            "locked": locked,
                            "locked_timer": locked_timer
                        }
                        chapters.append(chapter)

                manga_title = manga_url.split('/')[-1]
                manga_title = manga_title.split('-')[:-1] # everything except the last part
                manga_title = ' '.join(manga_title) # join the remaining parts with spaces

                mangas.append({
                    "manga_title": manga_title,
                    "manga_url": manga_url,
                    "chapter_info": chapters
                })

            browser.close()
            return mangas

    def fetch_manga_details(self, manga_url):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # Navigate to the URL
            page.goto(manga_url)

            # Wait for the dynamic content to load
            page.wait_for_load_state("networkidle", timeout=1000)

            soup = BeautifulSoup(page.content(), 'html.parser')

            title = soup.select_one("meta[property='og:title']")['content'].split("|")[0].strip()
            alt_titles_el = soup.select_one("p#alt-titles")
            alt_titles = alt_titles_el.get_text(strip=True).split(" • ") if alt_titles_el else []
            status = soup.select_one("span.capitalize").get_text(strip=True)
            manga_type = soup.select_one("span.uppercase").get_text(strip=True)
            links = soup.select("a")
            cover_url = soup.select_one("meta[property='og:image']")['content']
            summary = " ".join([p.text.strip() for p in soup.select("div#description-text p")]) # has a list of p elements, that need to join them together
            
            if summary == "":
                print(title, manga_url)
                summary = soup.select_one("div#description-text").text.strip()

            chapters = []
            genres = []
            author = None
            artist = None

            for link in links:
                url = link['href']
                if "author" in url:
                    author = url.split('=')[-1].replace("%20", " ") # only if one author ( need to check how url looks like if multiple authors )
                    continue
                elif "artist" in url:
                    artist = url.split('=')[-1].replace("%20", " ") # only if one author ( need to check how url looks like if multiple authors )
                    continue
                elif "genres" in url:
                    genre = url.split('=')[-1].replace("%20", " ") # only if one genre ( need to check how url looks like if multiple genres )
                    genres.append(genre)
                elif "chapter" in url:
                    chapter_url = self.base_url + url[1:]
                    # if link has child svg element chapter locked, else chapter unlocked
                    locked = bool(link.find('svg')) and "Early Access" in link.text.strip() 
                    if locked:
                        # Chapter 59Early AccessUnlocks in 5h 15mJust now
   
                        locked_timer = ''.join(link.text).replace("Just now", "").split(" ")[4:]
                        for value in locked_timer:
                            if "m" in value:
                                idx = locked_timer.index(value)
                                locked_timer[idx] = value.split("m")[0] + "m"
                                locked_timer = locked_timer[:idx+1]
                                break
                        locked_timer = " ".join(locked_timer)
                    chapter = {
                        "url": chapter_url,
                        "chapter_number": url.split('/')[-1],
                        "locked": locked,
                        "locked_timer": locked_timer if locked else None
                    }
                    chapters.append(chapter)

            browser.close()
            

            updates = {
                "title": title,
                "alt_titles": alt_titles,
                "status": status,
                "type": manga_type,
                "authors": [author] if author else [],
                "artists": [artist] if artist else [],
                "genres": genres,
                "cover_url": cover_url,
                "chapters": chapters,
                "total_chapters": len(chapters),
                "summary": summary
            }

            return updates

    def scrape(self):
        latest_updates = self.fetch_latest_updates()

        for update in tqdm(latest_updates, desc="Scraping Latest Updates"):
            manga_url = update['manga_url']

            # Check if manga already exists
            sources_id = self.get_manga_sources_id_by_url(manga_url)
            
            if not sources_id:
                # Add new manga to the database
                updates = self.fetch_manga_details(manga_url)
                manga_id = self.add_full_manga(updates)
            else:
                manga_id = self.get_manga_id_by_source_id(sources_id)

            # To insure that in case of new status
            sources_id = self.add_manga_sources(self.site_id, manga_id, update)

            # Update chapters
            for chapter in update['chapter_info']:
                result = self.add_chapter(sources_id, chapter)
                
                # since the oldest chapter was added make sure that a chapter wasn't skipped
                if result and (chapter is update['chapter_info'][-1]):
                    details = self.fetch_manga_details(manga_url)
                    self.add_chapters(manga_id, self.site_id, details['chapters'])


if __name__ == "__main__":
    scraper = AsurascansScraper()
    scraper.scrape()
    