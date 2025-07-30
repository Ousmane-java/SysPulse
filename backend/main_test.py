from scraper import scrape_all
import asyncio

if __name__ == "__main__":
    print("Scraping en cours...")
    articles = asyncio.run(scrape_all())
    print(f"{len(articles)} articles récupérés.")
