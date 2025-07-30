import requests
import os
import time
from datetime import datetime
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Article
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")
BASE_URL = "https://gnews.io/api/v4/search"
LANG = "fr"
MAX = 10  # Nombre d'articles maximum par requête

# ✅ Mots-clés intelligents par catégorie
KEYWORDS_BY_CATEGORY = {
    "Linux": ["linux", "distribution linux", "kernel", "gnu linux"],
    "Système": ["système", "infrastructure", "virtualisation", "système d'exploitation"],
    "Cloud": ["cloud", "aws", "azure", "gcp", "kubernetes", "docker"],
    "Réseau": ["réseau", "networking", "tcp ip", "dns", "routeur", "switch"],
    "Sécurité": ["cybersécurité", "faille", "cve", "malware", "attaque", "vulnérabilité zero day"],
    "Développement": ["développement", "programmation", "python", "javascript", "typescript"],
    "Evènement SI": ["conférence", "webinar", "event", "salon", "rencontre"],
    "Actualité Tech": ["technologie", "startup", "innovation", "ia", "chatgpt"]
}


def fetch_articles(query: str):
    params = {
        "q": query,
        "lang": LANG,
        "max": MAX,
        "apikey": GNEWS_API_KEY,
    }
    response = requests.get(BASE_URL, params=params)
    if response.status_code != 200:
        print(f"❌ Erreur {response.status_code} pour '{query}' : {response.text}")
        return []
    return response.json().get("articles", [])


def store_articles(articles, category):
    db: Session = SessionLocal()
    total = 0

    for article in articles:
        if db.query(Article).filter(Article.url == article["url"]).first():
            continue  # Article déjà en base

        try:
            db_article = Article(
                title=article["title"],
                url=article["url"],
                content=article.get("content", "")[:1000],
                summary=article.get("description", "")[:300],
                category=category,
                image=article.get("image"),
                published_at=datetime.fromisoformat(article["publishedAt"].replace("Z", "+00:00")),
            )
            db.add(db_article)
            db.commit()
            total += 1
        except Exception as e:
            db.rollback()
            print(f"⚠️ Article ignoré : {article['title'][:60]}... → {e}")

    db.close()
    print(f"📥 {total} nouvel(s) article(s) stocké(s) pour la catégorie '{category}'.")


def run_scraper():
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"\n📅 Scraper lancé à {now}\n")
    print("🔍 Scraping GNews API par catégories intelligentes...\n")

    for category, keywords in KEYWORDS_BY_CATEGORY.items():
        print(f"📚 Catégorie : {category}")
        for keyword in keywords:
            print(f"🔍 Recherche : {keyword}...")
            articles = fetch_articles(keyword)
            store_articles(articles, category)
            time.sleep(1)  # Éviter erreur 429

    end = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"\n✅ Scraper terminé à {end}\n")


if __name__ == "__main__":
    run_scraper()
