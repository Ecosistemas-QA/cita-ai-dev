# Contrato · Reserva pública

Los dos endpoints que usa un visitante **sin cuenta**. Ninguno de los dos acepta ni espera una
sesión: cualquiera que tenga la dirección del profesional puede llamarlos.

---

## `GET /api/public/availability`

Devuelve los horarios libres de **un profesional en un día**.

**Parámetros de consulta**

| Nombre | Forma | Obligatorio |
| :--- | :--- | :-: |
| `professionalId` | Identificador del profesional | Sí |
| `date` | `yyyy-MM-dd`, en la zona de la aplicación (`T-3`) | Sí |

**Respuesta `200`** — una lista, que puede venir vacía:

```json
[
  { "start": "2026-09-24T12:00:00.000Z", "end": "2026-09-24T13:00:00.000Z", "label": "09:00" },
  { "start": "2026-09-24T13:00:00.000Z", "end": "2026-09-24T14:00:00.000Z", "label": "10:00" }
]
```

`start` y `end` son instantes absolutos; `label` es la hora que se le muestra al cliente, ya
convertida a la zona de la aplicación. **Una lista vacía significa que ese día no hay nada
libre**, y no es un error.

**Errores**

| Código | Cuándo |
| :-: | :--- |
| `400` | Falta `professionalId` o `date` |

---

## `POST /api/public/appointments`

Reserva un turno. **Es la única operación de escritura pública del producto.**

**Cuerpo**

```json
{
  "professionalId": "…",
  "startTime": "2026-09-24T13:00:00.000Z",
  "clientName": "Sofía García",
  "clientEmail": "sofia@ejemplo.com"
}
```

| Campo | Regla |
| :--- | :--- |
| `professionalId` | Tiene que existir |
| `startTime` | Instante absoluto, y **tiene que ser uno de los `start` que devolvió la consulta de disponibilidad** |
| `clientName` | No vacío. **Se guarda tal como se recibe**, sin espacios sobrantes (`D-2`) |
| `clientEmail` | Con formato de correo. Se normaliza a minúsculas |

**Respuesta `201`** — el turno creado, con el nombre del profesional para la pantalla de
confirmación:

```json
{
  "id": "…",
  "professional_id": "…",
  "client_id": "…",
  "start_time": "2026-09-24T13:00:00.000Z",
  "end_time": "2026-09-24T14:00:00.000Z",
  "status": "confirmed",
  "professionalName": "Laura Méndez"
}
```

**Errores**

| Código | `code` | Cuándo | Qué hace el cliente |
| :-: | :--- | :--- | :--- |
| `400` | — | Falta un campo, o el correo o la fecha vienen mal | Corregir y reintentar |
| `403` | `LIMIT_REACHED` | El profesional llegó al tope de clientes de su plan (`003`) | Mostrar el mensaje que viene en `error` |
| `404` | — | El profesional no existe | — |
| `409` | `SLOT_OCCUPIED` | El horario se ocupó entre la consulta y la reserva | Volver a pedir disponibilidad y elegir otro |

**Las respuestas de error traen siempre un campo `error`** con un texto que se le puede mostrar
al cliente tal cual: son mensajes escritos para una persona, no para un registro técnico.

> ⚠️ **No hay ningún caso previsto en el que el turno quede guardado y la respuesta no sea
> `201`.** Si la reserva se registró, el cliente tiene que enterarse. Lo que pase después de
> guardar —los correos, por ejemplo— no cambia la respuesta (`T-4`).

---

## Lo que estos contratos no dicen

- **No hay paginado ni rangos**: la disponibilidad se pide de a un día.
- **No hay autenticación**, y por lo tanto tampoco hay diferencia de respuesta entre un visitante
  y otro.
- **No hay límite de llamadas** declarado. Si aparece, se documenta acá antes de implementarse.
