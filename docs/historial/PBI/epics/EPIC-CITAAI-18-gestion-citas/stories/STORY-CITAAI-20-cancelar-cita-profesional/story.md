# Como profesional, quiero poder cancelar una cita desde mi panel

**Jira Key:** CITAAI-20
**Epic:** CITAAI-18 (Gestión de Citas)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** un profesional (Carlos)
**Quiero** poder cancelar una cita desde mi panel
**Para que** se elimine de mi agenda y se libere el espacio para que otro cliente pueda reservarlo.

---

## Descripción

Esta funcionalidad da al profesional control sobre su agenda, permitiéndole cancelar citas que ya no pueden llevarse a cabo. La cancelación debe reflejarse inmediatamente en la disponibilidad.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Cancelar una cita próxima
- **Dado** que estoy viendo una cita agendada para mañana en mi panel
- **Cuando** hago clic en el botón "Cancelar" de esa cita
- **Y** confirmo la cancelación en un diálogo de confirmación
- **Entonces** la cita se elimina de mi lista de próximas citas.
- **Y** el hueco horario de esa cita vuelve a estar disponible para que otros clientes lo reserven.

### Escenario 2: Abortar la cancelación
- **Dado** que estoy viendo una cita agendada en mi panel
- **Cuando** hago clic en el botón "Cancelar"
- **Y** en el diálogo de confirmación, elijo "No" o cierro el diálogo
- **Entonces** la cita no se cancela y permanece en mi agenda.

### Escenario 3: Cancelación dispara notificación
- **Dado** que cancelo exitosamente una cita con un cliente
- **Cuando** la cita es cancelada
- **Entonces** el sistema dispara un evento para notificar al cliente sobre la cancelación (la notificación en sí se maneja en otra historia).

---

## Notas Técnicas

### Frontend
-   En la lista de citas del panel (`STORY-CITAAI-19`), cada elemento de cita debe tener un botón de "Cancelar".
-   Al hacer clic, mostrar un modal de confirmación para prevenir cancelaciones accidentales.
-   Si se confirma, enviar una petición `POST` (o `DELETE`) al endpoint del backend.
-   Actualizar la UI para eliminar la cita de la lista tras la confirmación del backend.

### Backend
-   Endpoint `POST /api/appointments/:id/cancel`.
-   Verificar que el usuario autenticado es el dueño de la cita que intenta cancelar.
-   Cambiar el estado de la cita a `cancelled` en la base de datos (o eliminarla, dependiendo de la estrategia de datos). Es preferible cambiar el estado para mantener un historial.
-   Disparar el evento `appointment.cancelled` para el sistema de notificaciones.

---

## Dependencias

### Bloqueado por
-   **STORY-CITAAI-19:** Ver mis próximas citas en un panel.

### Bloquea
-   **STORY-CITAAI-TBD:** Notificación de cancelación al cliente.

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-18-gestion-citas/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-012)
