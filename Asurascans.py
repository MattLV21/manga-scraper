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
        self.add_site({"domain": "Asurascans", "url": "https://asurascans.com/"})

    def update_manga_data(self, manga_data):
        """Update manga data from the database when available."""
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM manga WHERE manga_url=?", (manga_data["manga_url"],))
        result = cursor.fetchone()
        conn.close()

        if result:
            manga_id = result[0]
            # Manga exists, skip update to keep scraping process unchanged
            return True
        return False

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
            page.wait_for_selector("div.grid")

            soup = BeautifulSoup(page.content(), 'html.parser')
            container = soup.select_one("div.grid.grid-cols-1.md\\:grid-cols-2.content-start.px-4.md\\:px-8")

            if not container:
                logging.info("No manga updates found on the page.")
                return []

            # Each manga entry is a direct child div of the container
            items = container.find_all('div', recursive=False)
            print(len(items))
            mangas = []

            for item in items:
                manga_url = self.base_url + item.find('img').parent['href'][1:]

                links = item.find_all('a', href=True)
                chapters = [self.base_url + url['href'][1:] for url in links if "chapter" in url['href']]

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
            # page.wait_for_selector("div.flex.flex-center")
            time.sleep(1) # wait for 2 seconds to ensure content is loaded, can be optimized with better selectors

            soup = BeautifulSoup(page.content(), 'html.parser')

            title = soup.select_one("meta[property='og:title']")['content'].split("|")[0].strip()
            alt_titles = soup.select_one("p#alt-titles").text.strip().split(" • ")
            status = soup.select_one("span.capitalize").get_text(strip=True)
            manga_type = soup.select_one("span.uppercase").get_text(strip=True)
            links = soup.select("a")
            cover_url = soup.select_one("meta[property='og:image']")['content']
            summary = " ".join([p.text.strip() for p in soup.select("div#description-text p")]) # has a list of p elements, that need to join them together



            chapters = []
            genres = []

            for link in links:
                url = link['href']
                if "author" in url:
                    author = url.split('=')[-1].replace("%20", " ") # only if one author ( need to check how url looks like if multiple authors )
                    continue
                elif "artist" in url:
                    author = url.split('=')[-1].replace("%20", " ") # only if one author ( need to check how url looks like if multiple authors )
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
                    chapters.append((chapter_url, url.split('/')[-1], locked, locked_timer if locked else None))

            browser.close()
            

            updates = {
                "title": title,
                "alt_titles": alt_titles,
                "status": status,
                "type": manga_type,
                "author": author,
                "genres": genres,
                "cover_url": cover_url,
                "chapters": chapters,
                "total_chapters": len(chapters),
                "summary": summary
            }

            return updates

    def scrape(self):
        latest_updates = self.fetch_latest_updates()
        for update in latest_updates:
            print(update)

        for update in tqdm(latest_updates, desc="Scraping Latest Updates"):
            manga_url = update['manga_url']

            # Check if manga already exists
            conn = self.get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM manga WHERE manga_url=?", (manga_url,))
            result = cursor.fetchone()

            if not result:
                # Add new manga to the database
                updates = self.fetch_manga_details(manga_url)
                manga_id = self.add_manga_full(updates)
                site_id = self.get_manga_sources_id_by_url(manga_url)
                self.add_manga_sources(manga_id, site_id, manga_url)

                # TODO - fetch manga details and add to database, currently only adds manga and manga_sources, but not chapters, authors, genres, alt_titles

            # TODO - update chapters from updates
            # and if a single update, fetch next page aswell to make sure we get all updates

            
            

if __name__ == "__main__":
    scraper = AsurascansScraper()
    # scraper.scrape()
    result = scraper.fetch_manga_details("https://asurascans.com/comics/emperor-of-solo-play-26f76d6d")
    for key, value in result.items():
        # print if is chapter and chapter is locked
        if key == "chapters":
            for chapter in value:
                chapter_url, chapter_label, locked, locked_timer = chapter
                if locked:
                    print(f"Chapter: {chapter_label}, URL: {chapter_url}, Locked: {locked}, Locked Timer: {locked_timer}")