from firebase_config import db


offices = [
    {
        "id": "cr-curridabat",
        "label": "Costa Rica - Curridabat",
        "active": True,
    },
    {
        "id": "cr-calle-blancos",
        "label": "Costa Rica - Calle Blancos",
        "active": True,
    },
    {
        "id": "nicaragua",
        "label": "Nicaragua",
        "active": True,
    },
    {
        "id": "usa",
        "label": "Estados Unidos",
        "active": True,
    },
    {
        "id": "peru",
        "label": "Perú",
        "active": True,
    },
    {
        "id": "china",
        "label": "China",
        "active": True,
    },
    {
        "id": "brasil",
        "label": "Brasil",
        "active": True,
    },
    {
        "id": "mexico",
        "label": "México",
        "active": True,
    },
    {
        "id": "guatemala",
        "label": "Guatemala",
        "active": True,
    },
    {
        "id": "panama",
        "label": "Panamá",
        "active": True,
    },
    {
        "id": "japon",
        "label": "Japón",
        "active": True,
    },
    {
        "id": "salvador",
        "label": "El Salvador",
        "active": True,
    },
    {
        "id": "india",
        "label": "India",
        "active": True,
    },
    {
        "id": "alemania",
        "label": "Alemania",
        "active": True,
    },
    {
        "id": "colombia",
        "label": "Colombia",
        "active": True,
    },
    {
        "id": "espana",
        "label": "España",
        "active": True,
    },
    {
        "id": "holanda",
        "label": "Holanda",
        "active": True,
    },
    {
        "id": "honduras",
        "label": "Honduras",
        "active": True,
    },
    {
        "id": "francia",
        "label": "Francia",
        "active": True,
    },
    {
        "id": "indonesia",
        "label": "Indonesia",
        "active": True,
    },
    {
        "id": "taiwan",
        "label": "Taiwán",
        "active": True,
    },
    {
        "id": "tailandia",
        "label": "Tailandia",
        "active": True,
    },
    {
        "id": "sudafrica",
        "label": "Sudáfrica",
        "active": True,
    },
    {
        "id": "paraguay",
        "label": "Paraguay",
        "active": True,
    },
    {
        "id": "argentina",
        "label": "Argentina",
        "active": True,
    },
    {
        "id": "chile",
        "label": "Chile",
        "active": True,
    },
    {
        "id": "canada",
        "label": "Canadá",
        "active": True,
    },
    {
        "id": "italia",
        "label": "Italia",
        "active": True,
    },
    {
        "id": "ecuador",
        "label": "Ecuador",
        "active": True,
    },
    {
        "id": "korea",
        "label": "Corea",
        "active": True,
    },
]


def seed_offices():
    print("Iniciando carga de oficinas...")

    for office in offices:
        office_id = office["id"]

        db.collection(
            "offices"
        ).document(
            office_id
        ).set(
            office
        )

        print(
            f"✓ {office_id} guardada correctamente"
        )

    print()
    print("Todas las oficinas fueron cargadas.")
    print(f"Total: {len(offices)}")


if __name__ == "__main__":
    seed_offices()