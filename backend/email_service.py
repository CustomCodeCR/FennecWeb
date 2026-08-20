import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
from pydantic import BaseModel, EmailStr

load_dotenv()

class QuotePayload(BaseModel):
    service: str
    origin: str
    destination: str
    cargoType: str
    weight: str
    length: str
    width: str
    height: str
    pieces: str
    additionalInfo: str = ""
    clientEmail: EmailStr | None = None

def send_quote_email(data: QuotePayload) -> bool:
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    sender_email = os.getenv("SMTP_USER")
    sender_password = os.getenv("SMTP_PASSWORD")
    recipient_email = os.getenv("EMAIL_DESTINO")


    if not sender_email or not sender_password:
        raise ValueError("Las credenciales del servidor SMTP no están configuradas correctamente en el .env")

    text_body = f"""Nueva solicitud de cotización recibida:

- Servicio: {data.service}
- Origen: {data.origin}
- Destino: {data.destination}
- Tipo de Carga: {data.cargoType}
- Peso: {data.weight} kg
- Dimensiones: {data.length} x {data.width} x {data.height} cm
- Piezas: {data.pieces}
- Correo del cliente: {data.clientEmail or 'No proporcionado'}

Información adicional:
{data.additionalInfo or 'Sin notas adicionales.'}
"""

    msg = MIMEText(text_body, "plain", "utf-8")
    msg["Subject"] = f"Solicitud de Cotización - {data.service}"
    msg["From"] = sender_email
    msg["To"] = data.clientEmail or recipient_email

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, [recipient_email or sender_email], msg.as_string())

    return True