# backend/api.py (mis à jour avec la route /articles)

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Article

router = APIRouter()

@router.get("/articles")
def list_articles(limit: int = 20, category: str = None, db: Session = Depends(get_db)):
    query = db.query(Article)
    if category:
        query = query.filter(Article.category == category)
    articles = query.order_by(Article.published_at.desc()).limit(limit).all()
    return [
        {
            "id": a.id,
            "title": a.title,
            "summary": a.summary,
            "url": a.url,
            "category": a.category,
            "published_at": a.published_at.isoformat(),
            "image": a.image
        }
        for a in articles
    ]
