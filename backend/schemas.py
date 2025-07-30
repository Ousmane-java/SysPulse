# backend/schemas.py

from pydantic import BaseModel
from datetime import datetime

class Article(BaseModel):
    id: int
    title: str
    url: str
    content: str
    summary: str
    category: str
    published_at: datetime

    class Config:
        from_attributes = True  # équivalent de orm_mode = True en Pydantic v2
