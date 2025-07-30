# backend/favorites.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Favorite, Article

router = APIRouter()


@router.post("/favorites")
def add_to_favorites(user_email: str, article_id: int, db: Session = Depends(get_db)):
    fav = db.query(Favorite).filter_by(user_email=user_email, article_id=article_id).first()
    if fav:
        raise HTTPException(status_code=400, detail="Déjà dans les favoris")

    new_fav = Favorite(user_email=user_email, article_id=article_id)
    db.add(new_fav)
    db.commit()
    return {"message": "✅ Ajouté aux favoris"}


@router.get("/favorites")
def list_favorites(user_email: str, db: Session = Depends(get_db)):
    favorites = (
        db.query(Article)
        .join(Favorite, Favorite.article_id == Article.id)
        .filter(Favorite.user_email == user_email)
        .order_by(Article.published_at.desc())
        .all()
    )
    return favorites


@router.delete("/favorites")
def remove_favorite(user_email: str, article_id: int, db: Session = Depends(get_db)):
    fav = db.query(Favorite).filter_by(user_email=user_email, article_id=article_id).first()
    if not fav:
        raise HTTPException(status_code=404, detail="Favori non trouvé")

    db.delete(fav)
    db.commit()
    return {"message": "🗑️ Supprimé des favoris"}
