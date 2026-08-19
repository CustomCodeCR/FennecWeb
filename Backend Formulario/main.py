import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from dotenv import load_dotenv

from pathlib import Path

ENV_PATH = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=ENV_PATH, override=True)

# --- Configuración (se lee de variables de entorno / archivo .env) ---
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")          # cuenta que envía el correo
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")  # contraseña / app password
EMAIL_DESTINO = os.getenv("EMAIL_DESTINO")  # correo interno que recibe los mensajes

# Orígenes permitidos para CORS (dominio de tu formulario)
ORIGENES_PERMITIDOS = os.getenv("ORIGENES_PERMITIDOS", "*").split(",")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("formulario-backend")

# --- Diagnóstico temporal: confirma qué .env se está leyendo ---
logger.info(f"Buscando .env en: {ENV_PATH} (existe: {ENV_PATH.exists()})")
logger.info(f"SMTP_USER cargado: {SMTP_USER}")
logger.info(f"EMAIL_DESTINO cargado: {EMAIL_DESTINO}")

app = FastAPI(title="Backend Formulario de Contacto")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGENES_PERMITIDOS,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)


# --- Modelo de datos del formulario ---
class FormularioContacto(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    apellido: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    celular: str = Field(..., min_length=7, max_length=20)
    mensaje: str = Field(..., min_length=1, max_length=2000)


def enviar_correo(datos: FormularioContacto):
    """Arma y envía el correo interno con los datos del formulario."""
    if not all([SMTP_USER, SMTP_PASSWORD, EMAIL_DESTINO]):
        logger.error("Faltan variables de entorno SMTP_USER, SMTP_PASSWORD o EMAIL_DESTINO")
        raise HTTPException(status_code=500, detail="Configuración de correo incompleta en el servidor")

    cuerpo = f"""
Nuevo mensaje recibido desde el formulario de contacto:

Nombre: {datos.nombre} {datos.apellido}
Email: {datos.email}
Celular: {datos.celular}

Mensaje:
{datos.mensaje}
"""

    msg = MIMEMultipart()
    msg["From"] = SMTP_USER
    msg["To"] = EMAIL_DESTINO
    msg["Subject"] = f"Nuevo contacto: {datos.nombre} {datos.apellido}"
    # Para poder responder directo al usuario que llenó el formulario
    msg["Reply-To"] = datos.email
    msg.attach(MIMEText(cuerpo, "plain", "utf-8"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, EMAIL_DESTINO, msg.as_string())
    except Exception as e:
        logger.exception("Error enviando el correo")
        raise HTTPException(status_code=502, detail="No se pudo enviar el correo") from e


@app.post("/contacto")
def recibir_formulario(datos: FormularioContacto):
    enviar_correo(datos)
    return {"ok": True, "mensaje": "Formulario enviado correctamente"}


@app.get("/health")
def health():
    return {"status": "ok"}