# Como profesional, quiero ver mis próximas citas en un panel

**Jira Key:** CITAAI-19
**Epic:** CITAAI-18 (Gestión de Citas)
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una profesional (Laura)
**Quiero** tener un panel principal donde pueda ver una lista o calendario de mis próximas citas agendadas
**Para que** sepa cómo se ve mi día/semana.

---

## Descripción

Esta historia proporciona al profesional una vista centralizada de su agenda. Es la página principal que verá después de iniciar sesión, mostrándole de un vistazo todas sus próximas citas.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Ver lista de citas próximas
- **Dado** que he iniciado sesión como profesional y tengo 3 citas agendadas para esta semana
- **Cuando** navego a mi panel principal
- **Entonces** veo una lista de mis próximas 3 citas, ordenadas cronológicamente.
- **Y** cada elemento de la lista muestra el nombre del cliente, el día y la hora de la cita.

### Escenario 2: Vista de calendario
- **Dado** que estoy en mi panel principal
- **Cuando** cambio a una vista de "Calendario"
- **Entonces** veo mis citas representadas visualmente en un calendario semanal o mensual.

### Escenario 3: No tener citas próximas
- **Dado** que he iniciado sesión como profesional pero no tengo ninguna cita agendada
- **Cuando** navego a mi panel principal
- **Entonces** veo un mensaje amigable que dice "No tienes próximas citas" y quizás un consejo sobre cómo compartir mi página de reservas.

---

## Notas Técnicas

### Frontend
-   Crear la página del panel principal (`/dashboard`).
-   Implementar un componente para listar las citas.
-   Opcionalmente, integrar una librería de calendario (`react-big-calendar`) para la vista de calendario.
-   La página debe hacer una petición al backend para obtener las citas al cargarse.

### Backend
-   Endpoint `GET /api/appointments?range=upcoming`: Devuelve todas las citas futuras para el profesional autenticado.
-   La respuesta debe incluir los datos del cliente asociado a cada cita.

---

## Dependencias

### Bloqueado por
-   **EPIC-CITAAI-14:** Portal de Reserva del Cliente (necesita que se puedan crear citas).

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-18-gestion-citas/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-011)
