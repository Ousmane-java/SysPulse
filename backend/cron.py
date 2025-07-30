# backend/cron.py

import os
from datetime import datetime, timedelta, timezone
from openai import OpenAI
from sqlalchemy.orm import Session
from newspaper import Article as WebArticle
from dotenv import load_dotenv

from database import SessionLocal
from models import Article

load_dotenv()
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

NEWS_SOURCES = [
    "https://www.zdnet.com/article/linux-foundation-launches-new-cybersecurity-initiative/",
    "https://www.lemondeinformatique.fr/actualites/lire-linux-la-fondation-devoile-un-plan-sur-la-securite-du-noyau-92542.html",
    "https://www.clubic.com/antivirus-securite-informatique/actualite-511302-linux-et-la-securite-un-nouveau-plan-d-action.html",
    "https://www.journaldunet.com/solutions/cloud-computing/123456/kubernetes-securite-cloud.html"
]

KEYWORDS = ["linux", "cybersécurité", "cloud", "devops", "infrastructure", "système", "kubernetes", "firewall", "réseau"]

def summarize(text: str) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Tu es un expert en synthèse d'articles tech."},
                {"role": "user", "content": f"Résume cet article en 3 lignes max :\n\n{text}"}
            ],
            max_tokens=200
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"[ERREUR] Résumé échoué : {e}")
        return ""

def detect_category(text: str) -> str:
    if "linux" in text.lower():
        return "Linux"
    elif "cloud" in text.lower() or "kubernetes" in text.lower():
        return "Cloud"
    elif "sécurité" in text.lower() or "cyber" in text.lower():
        return "Sécurité"
    elif "devops" in text.lower():
        return "DevOps"
    return "Tech"

def fetch_and_store_articles():
    print("[CRON] Scraping intelligent lancé...")

    db: Session = SessionLocal()
    today = datetime.now(timezone.utc)
    total = 0

    for url in NEWS_SOURCES:
        try:
            article = WebArticle(url, language="fr")
            article.download()
            article.parse()

            title = article.title
            content = article.text
            published_at = today  # On ne récupère pas la date exacte dans newspaper3k
            link = url

            if not any(k in content.lower() for k in KEYWORDS):
                print(f"[SKIP] Aucun mot-clé trouvé : {title}")
                continue

            if db.query(Article).filter(Article.link == link).first():
                print(f"[SKIP] Déjà existant : {title}")
                continue

            resume = summarize(content)
            category = detect_category(content)

            db_article = Article(
                title=title,
                summary=resume,
                link=link,
                category=category,
                published_at=published_at
            )
            db.add(db_article)
            total += 1
            print(f"[OK] Ajouté : {title}")
        except Exception as e:
            print(f"[ERROR] {url} : {e}")

    db.commit()
    db.close()
    print(f"[CRON] ✅ {total} article(s) ajoutés.")
