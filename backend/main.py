# backend/main.py (complet)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import router as article_router
from favorites import router as favorites_router
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="Syspulse API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3003",
        "http://192.168.1.14:3003"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(article_router)
app.include_router(favorites_router)

@app.get("/")
def read_root():
    return {"message": "✅ Syspulse API is running"}