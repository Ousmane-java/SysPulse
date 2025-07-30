# 🚀 Syspulse – Veille technique intelligente via IA (Open Source)

**Syspulse** est une plateforme open source de **veille automatisée** dédiée aux technologies comme Linux, Réseaux, Cloud, DevOps, Sécurité, etc.  
Elle collecte, résume et classe automatiquement les meilleurs articles récents, en s’appuyant sur l’intelligence artificielle (OpenAI), une API d’actualités (GNews), et un moteur de catégorisation intelligent.

📚 L’objectif : Aider les ingénieurs, étudiants, enseignants et curieux à rester informés sans effort.

---

## 🔧 Technologies utilisées

| Fonctionnalité        | Stack utilisée                          |
|-----------------------|------------------------------------------|
| Frontend web          | **Next.js**, **React**, **Tailwind CSS** |
| Backend scraping      | **Python**, **SQLAlchemy**, **dotenv**   |
| IA pour résumé        | **OpenAI GPT-4** via API                 |
| Base de données       | **SQLite** (dev), **PostgreSQL** (prod)  |
| Planification         | **cron** (Linux/macOS)                   |
| API d'articles        | **GNews API**                            |
| Stockage local        | **LocalStorage** (favoris, thème)        |

---

## 🌍 Fonctionnalités principales

- 🔍 Scraper intelligent basé sur mots-clés métiers
- 🧠 Résumé automatique avec OpenAI GPT
- 🗃️ Classement automatique par **catégories techniques**
- ❤️ Ajout aux favoris (local)
- 🌗 Thème sombre/clair conservé entre sessions
- ⏱️ Cron intégré pour exécution automatique (3x/jour)
- 📱 Frontend responsive et moderne
- 🧩 Architecture modulaire facilement adaptable

---

## 📥 Cloner et adapter le projet

1. **Cloner le dépôt GitHub** :

Ce projet est open-source. Vous pouvez librement le cloner, l’adapter à vos besoins et l’utiliser pour votre propre veille technologique.

📦 Pré-requis
Git
Node.js (>= 18.x)
Python (>= 3.10)
Poetry ou venv pour gérer l’environnement Python
Une clé OpenAI (pour le résumé automatique)

```bash
git clone https://github.com/Ousmane-java/syspulse.git
cd syspulse


Configurer le backend Python :
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env  # puis configurez GNEWS_API_KEY et OPENAI_API_KEY
python init_db.py     # pour créer la base de données


Lancer le frontend (Next.js) :
cd ../frontend
npm install
npm run dev

L’interface sera accessible sur :
📍 http://localhost:3000


⚙️ Adapter Syspulse à votre propre domaine
Dans backend/smart_scraper.py, modifiez simplement les mots-clés :
KEYWORDS_BY_CATEGORY = {
  "MonDomaine": ["mot-clé1", "mot-clé2"],
  "AutreSujet": ["mot-cléA", "mot-cléB"]
}
Exemple : éducation, médecine, sport, finance, droit, architecture, etc.
Les articles pertinents seront automatiquement récupérés, résumés et classés.


⏱️ Automatiser avec Cron (scraping 3x/jour)
Ouvrir le planificateur :
crontab -e

Ajouter cette ligne (exécute à 7h, 13h et 19h) :
0 7,13,19 * * * /chemin/vers/venv/bin/python /chemin/vers/syspulse/backend/smart_scraper.py >> /chemin/vers/syspulse/backend/logs/smart_cron.log 2>&1

 Remplace /chemin/vers/... par ton chemin réel
✅ Crée le dossier logs/ s'il n'existe pas : mkdir backend/logs

🧪 Tests manuels
Exécuter manuellement le scraper :
source venv/bin/activate
python smart_scraper.py

Vérifier les logs :
tail -n 20 backend/logs/smart_cron.log

📦 Déploiement
Local : VM, Ubuntu, Mac (via cron)
Cloud : OVH, GCP, Render, Vercel (frontend), Docker (à venir)


🤝 Contribution
Ce projet est open source et collaboratif :
Ajoutez de nouvelles catégories ou sources
Améliorez les composants UI
Proposez des intégrations (Mailing, RSS, Dashboard admin…)

git checkout -b ma-feature
git commit -m "Ajout d'une nouvelle catégorie"
git push origin ma-feature

📄 Licence
MIT – libre d’usage, de modification et de diffusion.
🚀 Partagez, contribuez, améliorez !

⭐ Star ce dépôt si vous trouvez Syspulse utile pour votre veille ou vos projets !

👤 Auteur
Développé par Ousmane Drame | www.ousmanedrame.com 
Étudiant en Ingénierie Systèmes & Réseaux | Passionné d’IA, DevOps & cybersécurité
