import logging
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from MangaScraper import MangaScraper
from tqdm import tqdm

class AsurascansScraper(MangaScraper):
    def __init__(self, database_path="manga.db"):
        super().__init__(database_path)
        self.base_url = "https://asurascans.com/"
        self.add_site("Asurascans", "https://asurascans.com/")

    def update_manga_data(self, manga_data):
        """Update manga data from the database when available."""
        conn = self.get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, title, cover_url, summary FROM manga WHERE manga_url=?", (manga_data["manga_url"],))
        result = cursor.fetchone()
        conn.close()

        if result:
            manga_id = result[0]
            self.update_manga_full(manga_id, {
                "title": result[1],
                "cover_url": result[2],
                "summary": result[3]
            })
            return True
        return False

    def fetch_latest_updates(self):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # Navigate to the URL
            page.goto(self.base_url)

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
            page.wait_for_selector("")

            soup = BeautifulSoup(page.content(), 'html.parser')

            #TODO:
            # should retrive the following details:
            # - title
            # - alternative titles (if available)
            # - status (Ongoing, Completed, etc.)
            # - type (Manga, Manhwa, etc.)
            # - author(s)
            # - genres (Action, Comedy, etc.)
            # - cover_url
            # - total chapters
            # - summary

            

            browser.close()
            
            # return details as a dictionary

            updates = {
                
            }

            return updates

    def fetch_chapters(self, manga_url):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # Navigate to the URL
            page.goto(manga_url)

            # Wait for the dynamic content to load
            page.wait_for_selector("")

            soup = BeautifulSoup(page.content(), 'html.parser')

            

            browser.close()
            
            # TODO:
            # should return a list of dictionaries with the following details:
            # - chapter_url
            # - chapter_label (e.g., "Chapter 1", "Chapter 20.5", etc.)
            # - locked (boolean indicating if the chapter is locked or not)
            # - locked timer (if locked, how long until it unlocks)

            chapters = []

            return chapters

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
                site_id = self.get_manga_site_id_by_url(manga_url)  # Assuming Asurascans is the first site (site_id=1)
                self.add_manga_site(manga_id, site_id, manga_url)

                manga_details = self.fetch_manga_details(manga_url)

                # TODO: update manga details in the database
            
            # TODO
            # If magna already exists
            # check if the scaper, retrived a new chapter
            # if new chapter or just added manga, fetch all chapters and update the database with the new chapters
            # else do nothing

            # Fetch chapters and update database
            chapters = self.fetch_chapters(manga_url)
            site_id = self.get_manga_site_id_by_url(manga_url) 
            for chapter_url, chapter_label in chapters:
                manga_site_id = self.get_manga_site_id(result[0], site_id)  # Assuming Asurascans is the first site (site_id=1)
                if manga_site_id is None:
                    manga_site_id = self.add_manga_site(result[0], site_id, manga_url)
                self.add_chapter(manga_site_id, chapter_label, chapter_url)

if __name__ == "__main__":
    scraper = AsurascansScraper()
    scraper.scrape()
