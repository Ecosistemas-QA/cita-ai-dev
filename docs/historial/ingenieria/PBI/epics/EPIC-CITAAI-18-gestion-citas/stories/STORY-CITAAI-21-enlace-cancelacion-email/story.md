# Como cliente, quiero un enlace en mi email para cancelar mi cita

**Jira Key:** CITAAI-21
**Epic:** CITAAI-18 (Gestión de Citas)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una cliente (Sofía)
**Quiero** que el email de confirmación contenga un enlace para poder cancelar mi cita
**Para que** pueda autogestionar mi reserva si surge un imprevisto.

---

## Descripción

Esta historia proporciona un mecanismo de autoservicio para que los clientes cancelen sus citas sin necesidad de contactar directamente al profesional, mejorando la experiencia del cliente y reduciendo la carga administrativa.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Cancelación exitosa a través del enlace
- **Dado** que he recibido un email de confirmación de mi cita
- **Cuando** hago clic en el enlace único de cancelación
- **Y** soy dirigido a una página web que me pide confirmar la cancelación
- **Y** confirmo la acción
- **Entonces** el sistema cancela la cita y me muestra un mensaje de confirmación "Tu cita ha sido cancelada".

### Escenario 2: Usar un enlace de cancelación por segunda vez
- **Dado** que ya he utilizado el enlace para cancelar mi cita
- **Cuando** intento hacer clic en el mismo enlace de cancelación de nuevo
- **Entonces** el sistema me muestra un mensaje indicando que la cita ya ha sido cancelada o que el enlace no es válido.

### Escenario 3: Cancelación dispara notificación al profesional
- **Dado** que cancelo exitosamente mi cita a través del enlace
- **Cuando** la cita es cancelada
- **Entonces** el sistema dispara un evento para notificar al profesional sobre la cancelación.

---

## Notas Técnicas

### Frontend
-   Crear una página pública `cancelar-cita/[token]` que muestre los detalles de la cita y un botón para confirmar la cancelación.
-   Tras la confirmación, enviar una petición al backend.
-   Mostrar un mensaje de éxito o error al cliente.

### Backend
-   Al crear una cita (`STORY-CITAAI-16`), generar un token de cancelación único y seguro (ej. UUID) y almacenarlo asociado a la cita.
-   Endpoint público `POST /api/public/appointments/:token/cancel`.
-   Este endpoint debe:
    1.  Validar el token.
    2.  Verificar que la cita no esté ya cancelada o en el pasado.
    3.  Cambiar el estado de la cita a `cancelled`.
    4.  Invalidar el token de cancelación (ej. marcándolo como usado).
    5.  Disparar el evento `appointment.cancelled` para el sistema de notificaciones.

---

## Dependencias

### Bloqueado por
-   **STORY-CITAAI-16:** Seleccionar un turno e ingresar mis datos para reservar (para la generación del token).

### Bloquea
-   **EPIC-CITAAI-5:** Notificaciones Transaccionales (para la notificación de cancelación).

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-18-gestion-citas/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-012)
