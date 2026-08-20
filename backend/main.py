import os
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .email_service import send_quote_email, QuotePayload

load_dotenv()

app = FastAPI(
    title="Quote API Service",
    version="1.0.0"
)

allowed_origins_env = os.getenv("ORIGENES_PERMITIDOS", "*")
origins = [origin.strip() for origin in allowed_origins_env.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/quote", status_code=status.HTTP_200_OK)
def handle_quote(payload: QuotePayload):
    try:
        send_quote_email(payload)
        return {
            "success": True,
            "message": "La solicitud de cotización ha sido enviada exitosamente."
        }
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al enviar el correo: {str(e)}"
        )