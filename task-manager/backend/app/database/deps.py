# Ogni request apre sessione DB, usa DB e chiude DB

from app.database.db import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()