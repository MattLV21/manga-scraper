from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from tqdm import tqdm
import logging

# Get logger
logger = logging.getLogger('manga_scraper.playwright_helper')

def fetch_chapters_from_urls(urls):
    all_chapters = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        for url in urls:
            try:
                page.goto(url)
                page.wait_for_selector('#manga-chapters-holder', timeout=5000)

                soup = BeautifulSoup(page.content(), 'html.parser')
                container = soup.find('div', id='manga-chapters-holder')

                chapters = []
                if container:
                    for a in container.find_all('a', href=True):
                        label = a.get_text(strip=True)
                        href = a['href']
                        if label and href:
                            chapters.append((label, href))
                    logger.debug(f"Found {len(chapters)} chapters for {url}")
                else:
                    logger.warning(f"No chapters container found in {url}")
                
                all_chapters[url] = chapters

            except Exception as e:
                logger.error(f"Error while processing {url}: {e}", exc_info=True)
                all_chapters[url] = []

        browser.close()
    return all_chapters

if __name__ == "__main__":
    # Example usage
    url = ["https://likemanga.in/manga/the-legendary-hero-is-an-academy-honors-student/"]
    links = fetch_chapters_from_urls(url)
    chapters = links.get(url[0], [])
    if chapters != []:
        for label, link in chapters:
            print(f"{label} -> {link}")