# backend/scraper.py

import feedparser
from datetime import datetime
from sqlalchemy.orm import Session
from models import Article
from database import SessionLocal
from summarizer import summarize_text

# Liste des flux RSS à parser
RSS_FEEDS = [
    "https://rss.lemonde.fr/rss/une.xml",
    "https://www.phoronix.com/rss.php",
    "https://www.redhat.com/en/blog/rss.xml"
]

# Mots-clés pour catégoriser les articles
CATEGORY_KEYWORDS = {
    "Système":   ["linux", "kernel", "ubuntu", "debian", "windows", "macos"],
    "Sécurité":  ["vuln", "cve", "zero-day", "malware", "ransomware", "security"],
    "Réseaux":   ["dns", "tcp", "ip", "router", "switch", "network"],
    "Cloud":     ["aws", "azure", "gcp", "cloud", "kubernetes", "docker"],
    "Innovation": ["apple", "tesla", "ai", "chatgpt", "elon", "spacex"]
}


def detect_category(title: str, summary: str) -> str:
    text = (title + " " + summary).lower()
    for cat, keywords in CATEGORY_KEYWORDS.items():
        if any(kw in text for kw in keywords):
            return cat
    return "Autre"


def save_article(db: Session, data: dict):
    existing = db.query(Article).filter_by(url=data["url"]).first()
    if existing:
        return  # déjà en base

    article = Article(
        title=data["title"],
        url=data["url"],
        content=data["content"],
        summary=data.get("summary", ""),
        category=data.get("category", "Autre"),
        published_at=data.get("published_at", datetime.utcnow())
    )
    db.add(article)
    db.commit()


def fetch_and_process_articles():
    db = SessionLocal()
    try:
        for url in RSS_FEEDS:
            feed = feedparser.parse(url)
            for entry in feed.entries[:10]:
                content = entry.summary if hasattr(entry, "summary") else entry.get("description", "")
                published = datetime(*entry.published_parsed[:6]) if hasattr(entry, "published_parsed") else datetime.utcnow()

                article_data = {
                    "title": entry.title,
                    "url": entry.link,
                    "content": content,
                    "published_at": published,
                }

                article_data["summary"] = summarize_text(content)
                article_data["category"] = detect_category(article_data["title"], article_data["summary"])
                save_article(db, article_data)

    finally:
        db.close()
