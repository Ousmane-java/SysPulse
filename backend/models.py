# backend/models.py

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    url = Column(String, unique=True)
    content = Column(Text)
    summary = Column(Text)
    category = Column(String)
    image = Column(String, nullable=True)
    published_at = Column(DateTime, default=datetime.utcnow)

    favorites = relationship("Favorite", back_populates="article")


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    article_id = Column(Integer, ForeignKey("articles.id"))

    article = relationship("Article", back_populates="favorites")
