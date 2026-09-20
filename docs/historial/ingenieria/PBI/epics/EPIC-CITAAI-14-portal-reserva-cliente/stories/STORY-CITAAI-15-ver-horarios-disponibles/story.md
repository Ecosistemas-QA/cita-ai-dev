# Como cliente, quiero ver los horarios disponibles de un profesional

**Jira Key:** CITAAI-15
**Epic:** CITAAI-14 (Portal de Reserva del Cliente)
**Priority:** Highest
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una cliente (Sofía)
**Quiero** al visitar la URL pública de un profesional, ver sus horarios disponibles en una vista de calendario simple
**Para que** pueda encontrar un turno que me convenga.

---

## Descripción

Esta historia cubre la parte más importante del portal de reservas: la visualización de la disponibilidad del profesional. El sistema debe calcular los huecos libres basándose en el horario recurrente, los bloqueos y las citas ya existentes, y presentarlos de forma clara al cliente.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Ver disponibilidad en una semana con huecos libres
- **Dado** que el profesional "Carlos" tiene disponibilidad configurada para los lunes de 9:00 a 12:00
- **Y** no tiene citas ni bloqueos ese día
- **Cuando** visito su página de perfil `cita.ai/carlos-rojas`
- **Entonces** veo el calendario y los huecos disponibles para el próximo lunes (ej. 9:00, 10:00, 11:00).

### Escenario 2: Ver disponibilidad con huecos ocupados
- **Dado** que el profesional "Carlos" tiene una cita agendada el lunes a las 10:00
- **Cuando** visito su página de perfil
- **Entonces** el hueco de las 10:00 ya no aparece en la lista de horarios disponibles.

### Escenario 3: Ver disponibilidad en un día sin horario configurado
- **Dado** que el profesional "Carlos" no trabaja los sábados
- **Cuando** navego al próximo sábado en el calendario de su perfil
- **Entonces** el sistema muestra un mensaje "No hay disponibilidad para este día" y no se muestran huecos.

---

## Notas Técnicas

### Frontend
-   Crear una página pública `/[slug]` que se renderice del lado del servidor (SSR/ISR) para obtener los datos del profesional.
-   La página mostrará el nombre del profesional y un componente de calendario.
-   Al seleccionar un día en el calendario, se hará una petición al backend para obtener los huecos disponibles.
-   Mostrar los huecos en una lista o cuadrícula junto al calendario.

### Backend
-   Endpoint público `GET /api/availability/:slug?date=YYYY-MM-DD`.
-   Este endpoint ejecutará la lógica principal de negocio:
    1.  Encontrar al profesional por su `slug`.
    2.  Obtener sus reglas de disponibilidad para el día de la semana de la `date`.
    3.  Obtener la duración de sus citas.
    4.  Generar todos los posibles huecos para ese día.
    5.  Obtener las citas ya agendadas y los bloqueos de tiempo para ese día.
    6.  Filtrar los huecos posibles, eliminando los que se solapen con citas o bloqueos.
    7.  Devolver el array de huecos disponibles.

---

## Dependencias

### Bloqueado por
-   **EPIC-CITAAI-10:** Gestión de Disponibilidad.

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-14-portal-reserva-cliente/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-008)
