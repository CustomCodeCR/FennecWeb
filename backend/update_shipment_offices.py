from firebase_config import db


shipment_offices = {
    "IDTRA-2026-00125": {
        "origin_office": "cr-curridabat",
        "destination_office": "usa",
    },
    "IDTRA-2026-00126": {
        "origin_office": "cr-calle-blancos",
        "destination_office": "usa",
    },
    "IDTRA-2026-00127": {
        "origin_office": "china",
        "destination_office": "cr-curridabat",
    },
    "IDTRA-2026-00128": {
        "origin_office": "panama",
        "destination_office": "cr-calle-blancos",
    },
    "IDTRA-2026-00129": {
        "origin_office": "holanda",
        "destination_office": "usa",
    },
}


def update_shipment_offices():
    print("Actualizando oficinas de los embarques...")

    for idtra, offices in shipment_offices.items():
        shipment_ref = (
            db.collection("shipments")
            .document(idtra)
        )

        shipment = shipment_ref.get()

        if not shipment.exists:
            print(
                f"✗ {idtra} no existe en Firebase"
            )
            continue

        shipment_ref.update(
            {
                "origin_office":
                    offices["origin_office"],

                "destination_office":
                    offices["destination_office"],
            }
        )

        print(
            f"✓ {idtra} actualizado"
        )

    print()
    print("Actualización terminada.")


if __name__ == "__main__":
    update_shipment_offices()
    