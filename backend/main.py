import os

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google.cloud.firestore_v1.base_query import FieldFilter

try:
    from .email_service import send_quote_email, QuotePayload
    from .firebase_config import db
except ImportError:
    from email_service import send_quote_email, QuotePayload
    from firebase_config import db


load_dotenv()

app = FastAPI(
    title="FennecWeb API",
    description="Backend para cotizaciones y Web Tracking",
    version="1.0.0",
)

allowed_origins_env = os.getenv(
    "ORIGENES_PERMITIDOS",
    "http://localhost:5173,http://127.0.0.1:5173",
)

origins = [
    origin.strip()
    for origin in allowed_origins_env.split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "FennecWeb API funcionando"
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }


@app.post(
    "/api/quote",
    status_code=status.HTTP_200_OK,
)
def handle_quote(payload: QuotePayload):
    try:
        send_quote_email(payload)

        return {
            "success": True,
            "message": (
                "La solicitud de cotización "
                "ha sido enviada exitosamente."
            ),
        }

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
        )

    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Error al enviar el correo: "
                f"{str(error)}"
            ),
        )


def normalize_document(data: dict) -> dict:
    return {
        key.strip(): value
        for key, value in data.items()
    }


def get_office(office_id: str | None):
    if not office_id:
        return None

    office_document = (
        db.collection("offices")
        .document(office_id)
        .get()
    )

    if not office_document.exists:
        return None

    office_data = office_document.to_dict()

    return normalize_document(
        office_data
    )


def enrich_shipment_with_offices(
    shipment_data: dict,
) -> dict:
    data = normalize_document(
        shipment_data
    )

    origin_office_id = data.get(
        "origin_office"
    )

    destination_office_id = data.get(
        "destination_office"
    )

    data["origin_office"] = get_office(
        origin_office_id
    )

    data["destination_office"] = get_office(
        destination_office_id
    )

    return data


@app.get("/tracking/{reference}")
def get_tracking(reference: str):
    clean_reference = (
        reference
        .strip()
        .upper()
    )

    shipments = db.collection(
        "shipments"
    )

    idtra_document = (
        shipments
        .document(clean_reference)
        .get()
    )

    if idtra_document.exists:
        return enrich_shipment_with_offices(
            idtra_document.to_dict()
        )

    bl_query = (
        shipments
        .where(
            filter=FieldFilter(
                "bl",
                "==",
                clean_reference,
            )
        )
        .limit(1)
    )

    bl_results = list(
        bl_query.stream()
    )

    if bl_results:
        return enrich_shipment_with_offices(
            bl_results[0].to_dict()
        )

    container_query = (
        shipments
        .where(
            filter=FieldFilter(
                "containers",
                "array_contains",
                clean_reference,
            )
        )
        .limit(1)
    )

    container_results = list(
        container_query.stream()
    )

    if container_results:
        return enrich_shipment_with_offices(
            container_results[0].to_dict()
        )

    raise HTTPException(
        status_code=404,
        detail=(
            "No shipment found with this "
            "IDTRA, BL or container number"
        ),
    )