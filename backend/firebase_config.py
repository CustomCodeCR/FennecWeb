from pathlib import Path

import firebase_admin
from firebase_admin import credentials, firestore


BASE_DIR = Path(__file__).resolve().parent

cred = credentials.Certificate(
    str(BASE_DIR / "serviceAccountKey.json")
)

firebase_admin.initialize_app(cred)

db = firestore.client()