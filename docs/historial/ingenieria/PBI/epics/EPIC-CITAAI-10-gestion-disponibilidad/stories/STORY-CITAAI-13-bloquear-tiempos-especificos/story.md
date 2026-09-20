# Como profesional, quiero poder bloquear tiempos específicos en mi calendario

**Jira Key:** CITAAI-13
**Epic:** CITAAI-10 (Gestión de Disponibilidad)
**Priority:** Highest
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una profesional (Laura)
**Quiero** poder añadir "bloqueos" de tiempo específicos en mi calendario para vacaciones o citas personales
**Para que** nadie pueda reservar en esos momentos.

---

## Descripción

Esta historia permite a los profesionales añadir excepciones a su disponibilidad recurrente. Pueden bloquear rangos de fecha/hora para eventos como vacaciones, citas médicas o cualquier otro compromiso personal, asegurando que no se ofrezcan citas durante esos períodos.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Bloquear un rango de horas en un día
- **Dado** que estoy en mi vista de calendario/disponibilidad
- **Cuando** selecciono un rango de "14:00" a "16:00" en un día específico para bloquearlo
- **Y** confirmo el bloqueo
- **Entonces** el sistema crea un nuevo bloqueo de tiempo y esos huecos ya no aparecen como disponibles para los clientes.

### Escenario 2: Bloquear un día completo o varios días
- **Dado** que estoy en mi vista de calendario/disponibilidad
- **Cuando** selecciono un rango de 3 días para mis vacaciones
- **Y** confirmo el bloqueo
- **Entonces** el sistema crea un bloqueo que abarca esos 3 días y no se muestran citas disponibles durante ese período.

### Escenario 3: Eliminar un bloqueo existente
- **Dado** que he creado un bloqueo de tiempo previamente
- **Cuando** selecciono el bloqueo y elijo la opción de eliminar
- **Entonces** el sistema elimina el bloqueo y los huecos de cita correspondientes vuelven a estar disponibles (si coinciden con mi horario recurrente).

---

## Notas Técnicas

### Frontend
-   Implementar una vista de calendario (ej. usando `react-big-calendar` o similar) donde se muestren las citas y los bloqueos.
-   Permitir al usuario seleccionar un rango de tiempo en el calendario para crear un bloqueo.
-   Mostrar un modal o formulario para confirmar la creación del bloqueo.
-   Los bloqueos deben poder ser seleccionados para su eliminación.

### Backend
-   Endpoint `POST /api/time-blocks`: Recibe `startTime` y `endTime` (datetimes ISO) y crea un nuevo registro.
-   Endpoint `DELETE /api/time-blocks/:id`: Elimina un bloqueo de tiempo por su ID.
-   Endpoint `GET /api/time-blocks`: Devuelve todos los bloqueos para el profesional en un rango de fechas.

### Base de Datos
-   **Tabla:** `time_blocks`
-   **Campos:** `id`, `professional_id`, `start_time`, `end_time`.
-   **Operaciones:** `INSERT`, `DELETE`, `SELECT`.

---

## Dependencias

### Bloqueado por
-   **EPIC-CITAAI-5:** Requiere un profesional autenticado.

---

## Definición de Terminado (Definition of Done)

-   [ ] Código implementado para la UI de calendario y los endpoints de gestión de bloqueos.
-   [ ] Tests de integración para los endpoints de `time-blocks`.
-   [ ] Test E2E para crear, visualizar y eliminar un bloqueo de tiempo.
-   [ ] Revisión de código aprobada.
-   [ ] Desplegado en el entorno de staging.
-   [ ] Pruebas de QA superadas.
-   [ ] Todos los criterios de aceptación se cumplen.

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-10-gestion-disponibilidad/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-007)
