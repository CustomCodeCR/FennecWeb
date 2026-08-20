from firebase_config import db


shipments = [
    {
        "idtra": "IDTRA-2026-00125",
        "bl": "CFBL260819001",
        "equipment_quantity": 2,
        "containers": [
            "MSCU5839201",
            "TGHU7284910",
        ],
        "status": "In Transit",
        "origin_office": "cr-curridabat",
        "destination_office": "usa",
        "pol": "Puerto Limón, Costa Rica",
        "poe": "PortMiami, United States",
        "pod": "Miami, Florida",
        "transit_days": 6,
    },

    {
        "idtra": "IDTRA-2026-00126",
        "bl": "CFBL260819002",
        "equipment_quantity": 1,
        "containers": [
            "CMAU4827319",
        ],
        "status": "Pending Departure",
        "origin_office": "cr-calle-blancos",
        "destination_office": "mexico",
        "pol": "Puerto Caldera, Costa Rica",
        "poe": "Puerto de Manzanillo, México",
        "pod": "Ciudad de México, México",
        "transit_days": 9,
    },

    {
        "idtra": "IDTRA-2026-00127",
        "bl": "CFBL260819003",
        "equipment_quantity": 3,
        "containers": [
            "MAEU6182743",
            "MSKU3728194",
            "TEMU9284715",
        ],
        "status": "Arrived at Port of Entry",
        "origin_office": "china",
        "destination_office": "cr-curridabat",
        "pol": "Shanghai, China",
        "poe": "Puerto Limón, Costa Rica",
        "pod": "San José, Costa Rica",
        "transit_days": 24,
    },

    {
        "idtra": "IDTRA-2026-00128",
        "bl": "CFBL260819004",
        "equipment_quantity": 1,
        "containers": [
            "HLXU5839271",
        ],
        "status": "Delivered",
        "origin_office": "panama",
        "destination_office": "cr-calle-blancos",
        "pol": "Manzanillo, Panamá",
        "poe": "Puerto Limón, Costa Rica",
        "pod": "Heredia, Costa Rica",
        "transit_days": 3,
    },

    {
        "idtra": "IDTRA-2026-00129",
        "bl": "CFBL260819005",
        "equipment_quantity": 2,
        "containers": [
            "OOLU7391824",
            "CSNU2847193",
        ],
        "status": "In Transit",
        "origin_office": "holanda",
        "destination_office": "usa",
        "pol": "Rotterdam, Netherlands",
        "poe": "Port Everglades, United States",
        "pod": "Fort Lauderdale, Florida",
        "transit_days": 15,
    },

    {
        "idtra": "IDTRA-2026-00130",
        "bl": "CFBL260819006",
        "equipment_quantity": 1,
        "containers": [
            "SEGU4839201",
        ],
        "status": "Pending Departure",
        "origin_office": "japon",
        "destination_office": "cr-curridabat",
        "pol": "Yokohama, Japón",
        "poe": "Puerto Caldera, Costa Rica",
        "pod": "San José, Costa Rica",
        "transit_days": 21,
    },

    {
        "idtra": "IDTRA-2026-00131",
        "bl": "CFBL260819007",
        "equipment_quantity": 2,
        "containers": [
            "MEDU7283910",
            "TCNU3928174",
        ],
        "status": "Delivered",
        "origin_office": "alemania",
        "destination_office": "cr-calle-blancos",
        "pol": "Hamburg, Alemania",
        "poe": "Puerto Limón, Costa Rica",
        "pod": "Cartago, Costa Rica",
        "transit_days": 18,
    },

    {
        "idtra": "IDTRA-2026-00132",
        "bl": "CFBL260819008",
        "equipment_quantity": 1,
        "containers": [
            "APZU6382917",
        ],
        "status": "Arrived at Port of Entry",
        "origin_office": "colombia",
        "destination_office": "panama",
        "pol": "Cartagena, Colombia",
        "poe": "Colón, Panamá",
        "pod": "Panamá, Panamá",
        "transit_days": 5,
    },
]


def seed_shipments():
    print("Iniciando carga de embarques...")

    for shipment in shipments:
        idtra = shipment["idtra"]

        shipment_ref = (
            db.collection("shipments")
            .document(idtra)
        )

        shipment_ref.set(
            shipment,
            merge=True,
        )

        print(
            f"✓ {idtra} cargado correctamente"
        )

    print()
    print("Carga de embarques terminada.")
    print(f"Total cargado: {len(shipments)}")


if __name__ == "__main__":
    seed_shipments()