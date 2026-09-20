# Como profesional, quiero ver una lista de mis clientes

**Jira Key:** CITAAI-26
**Epic:** CITAAI-25 (Lógica Freemium)
**Priority:** Medium
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** un profesional (Carlos)
**Quiero** poder ver una lista simple de todos los clientes que han reservado conmigo
**Para que** pueda tener un registro de quiénes son mis clientes.

---

## Descripción

Esta historia proporciona al profesional una vista básica de los clientes que han interactuado con él a través de la plataforma. Es una funcionalidad fundamental para la gestión de su base de clientes.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Ver lista de clientes
- **Dado** que he iniciado sesión como profesional y tengo 3 clientes que han reservado citas conmigo
- **Cuando** navego a la sección "Mis Clientes" en mi panel
- **Entonces** veo una lista de esos 3 clientes, mostrando su nombre y email.

### Escenario 2: No tener clientes
- **Dado** que he iniciado sesión como profesional y ningún cliente ha reservado citas conmigo
- **Cuando** navego a la sección "Mis Clientes"
- **Entonces** veo un mensaje que dice "Aún no tienes clientes. ¡Comparte tu enlace de reserva para empezar!"

---

## Notas Técnicas

### Frontend
-   Crear una nueva sección en el panel del profesional (`/dashboard/clients`).
-   Mostrar una tabla o lista con el nombre y email de cada cliente.
-   Manejar el estado de carga y los mensajes de "no clientes".

### Backend
-   Endpoint `GET /api/clients`: Devuelve una lista de clientes únicos que han reservado citas con el profesional autenticado.
-   La lógica debe consultar la tabla `appointments` y `clients` para obtener los clientes asociados al `professional_id`.

### Base de Datos
-   **Tablas:** `clients`, `appointments`
-   **Operación:** `SELECT` con `JOIN` o subconsulta.

---

## Dependencias

### Bloqueado por
-   **EPIC-CITAAI-14:** Portal de Reserva del Cliente (para que se creen clientes y citas).

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-25-logica-freemium/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-015)
