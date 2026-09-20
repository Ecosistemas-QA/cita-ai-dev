# Como cliente y profesional, quiero notificación por email de cita cancelada

**Jira Key:** CITAAI-24
**Epic:** CITAAI-22 (Notificaciones Transaccionales)
**Priority:** High
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una cliente (Sofía) y un profesional (Carlos)
**Queremos** recibir una notificación por email si una cita es cancelada (ya sea por el cliente o el profesional)
**Para que** ambos estemos informados del cambio.

---

## Descripción

Esta historia asegura que, en caso de cancelación de una cita, tanto el cliente como el profesional reciban una notificación por email. Esto es crucial para mantener a ambas partes informadas y evitar confusiones.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Notificación al cliente por cancelación del profesional
- **Dado** que el profesional "Carlos" ha cancelado mi cita
- **Cuando** la cita es marcada como cancelada en el sistema
- **Entonces** recibo un email informándome de la cancelación de mi cita, incluyendo los detalles de la misma.

### Escenario 2: Notificación al profesional por cancelación del cliente
- **Dado** que he cancelado mi cita a través del enlace de cancelación
- **Cuando** la cita es marcada como cancelada en el sistema
- **Entonces** el profesional "Carlos" recibe un email informándole de la cancelación de la cita, incluyendo los detalles de la misma.

### Escenario 3: Contenido del email de cancelación
- **Dado** que he recibido un email de notificación de cancelación
- **Cuando** abro el email
- **Entonces** el email contiene la información esencial de la cita (fecha, hora, nombre del profesional/cliente) y un mensaje claro sobre la cancelación.

---

## Notas Técnicas

### Backend
-   Implementar un "listener" o "handler" para el evento `appointment.cancelled` (disparado por `STORY-CITAAI-20` y `STORY-CITAAI-21`).
-   Este handler debe:
    1.  Recuperar los detalles completos de la cita, el profesional y el cliente.
    2.  Determinar quién inició la cancelación para enviar el email a la parte contraria.
    3.  Construir el contenido del email de cancelación.
    4.  Utilizar el servicio de envío de emails para enviar el correo.

---

## Dependencias

### Bloqueado por
-   **STORY-CITAAI-20:** Cancelar una cita desde mi panel (para el evento de cancelación por profesional).
-   **STORY-CITAAI-21:** Enlace en mi email para cancelar mi cita (para el evento de cancelación por cliente).

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-22-notificaciones-transaccionales/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-014)
