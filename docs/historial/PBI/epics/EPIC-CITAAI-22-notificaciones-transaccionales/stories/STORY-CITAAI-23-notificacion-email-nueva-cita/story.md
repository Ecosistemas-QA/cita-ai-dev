# Como cliente y profesional, quiero notificación por email de nueva cita

**Jira Key:** CITAAI-23
**Epic:** CITAAI-22 (Notificaciones Transaccionales)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una cliente (Sofía) y un profesional (Laura)
**Queremos** recibir una notificación por email instantánea cuando se crea una nueva cita
**Para que** ambos estemos informados y se reduzca la incertidumbre.

---

## Descripción

Esta historia asegura que tanto el cliente que reserva como el profesional que recibe la reserva sean notificados inmediatamente por email cuando se agenda una nueva cita.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Email de confirmación al cliente
- **Dado** que un cliente ha reservado exitosamente una cita
- **Cuando** la cita es creada en el sistema
- **Entonces** el cliente recibe un email de confirmación con los detalles de la cita (profesional, fecha, hora) y un enlace para cancelar.

### Escenario 2: Email de notificación al profesional
- **Dado** que un cliente ha reservado exitosamente una cita
- **Cuando** la cita es creada en el sistema
- **Entonces** el profesional recibe un email de notificación con los detalles de la cita (cliente, fecha, hora).

### Escenario 3: Contenido del email
- **Dado** que he recibido un email de confirmación/notificación de nueva cita
- **Cuando** abro el email
- **Entonces** el email contiene la información esencial de la cita (fecha, hora, nombre del profesional/cliente) y un mensaje claro.

---

## Notas Técnicas

### Backend
-   Implementar un "listener" o "handler" para el evento `appointment.created` (disparado por `STORY-CITAAI-16`).
-   Este handler debe:
    1.  Recuperar los detalles completos de la cita, el profesional y el cliente.
    2.  Generar un token de cancelación único para el cliente (si aún no se ha hecho en `STORY-CITAAI-16`).
    3.  Construir el contenido del email para el cliente (incluyendo el enlace de cancelación).
    4.  Construir el contenido del email para el profesional.
    5.  Utilizar el servicio de envío de emails para enviar ambos correos.

---

## Dependencias

### Bloqueado por
-   **STORY-CITAAI-16:** Seleccionar un turno e ingresar mis datos para reservar (para que se cree la cita y se dispare el evento).

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-22-notificaciones-transaccionales/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-013)
