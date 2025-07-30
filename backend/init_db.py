from database import Base, engine
from models import Article, Favorite

print("📦 Initialisation de la base...")
Base.metadata.create_all(bind=engine)
print("✅ Base initialisée.")
