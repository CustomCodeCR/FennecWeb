# Backend Formulario de Contacto (FastAPI)

## 1. Instalar dependencias

```bash
pip install -r requirements.txt
```

## 2. Configurar variables de entorno

Copia `.env.example` a `.env` y completa tus datos:

```bash
cp .env.example .env
```

- `SMTP_USER` / `SMTP_PASSWORD`: la cuenta que enviará el correo.
  - Si usas Gmail, necesitas generar una "Contraseña de aplicación" (no tu contraseña normal), ya que Google bloquea el login directo por SMTP.
- `EMAIL_DESTINO`: el correo interno que recibirá los mensajes del formulario.
- `ORIGENES_PERMITIDOS`: dominio(s) desde donde tu formulario hará la petición (para CORS).

## 3. Ejecutar el servidor

```bash
uvicorn main:app --reload --port 8000
```

## 4. Endpoint

**POST** `/contacto`

Body (JSON):
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "celular": "+506 8888-8888",
  "mensaje": "Hola, quiero más información."
}
```

Respuesta exitosa:
```json
{ "ok": true, "mensaje": "Formulario enviado correctamente" }
```

Si falta un campo o el email no es válido, FastAPI responde automáticamente con error 422 y el detalle.

## 5. Probar rápido con curl

```bash
curl -X POST http://localhost:8000/contacto \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","apellido":"Pérez","email":"juan@example.com","celular":"88888888","mensaje":"Prueba"}'
```

## Notas

- El correo se envía usando SMTP estándar (`smtplib`), funciona con Gmail, Outlook, o el SMTP de tu propio dominio/hosting.
- El campo `Reply-To` del correo se configura con el email del usuario que llenó el formulario, así puedes responderle directo desde tu bandeja.
- Para producción, restringe `ORIGENES_PERMITIDOS` al dominio real de tu sitio (no dejes `*`).
