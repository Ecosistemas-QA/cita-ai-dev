# Como profesional, quiero ser informado del límite del plan gratuito

**Jira Key:** CITAAI-27
**Epic:** CITAAI-25 (Lógica Freemium)
**Priority:** Medium
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una profesional (Laura)
**Quiero** que, cuando mi 11º nuevo cliente intenta reservar, el sistema me informe que he alcanzado el límite del plan gratuito
**Para que** entienda las restricciones de mi plan actual.

---

## Descripción

Esta historia implementa la restricción clave del modelo freemium: limitar el número de clientes únicos que un profesional puede atender en el plan gratuito. Cuando se alcanza el límite, el sistema debe impedir nuevas reservas de clientes no registrados previamente y notificar al profesional.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Límite no alcanzado
- **Dado** que soy un profesional con 9 clientes únicos en el plan gratuito
- **Cuando** un nuevo cliente intenta reservar una cita conmigo
- **Entonces** la reserva se procesa con normalidad.

### Escenario 2: Límite alcanzado por un nuevo cliente
- **Dado** que soy un profesional con 10 clientes únicos en el plan gratuito
- **Cuando** un nuevo cliente (el 11º) intenta reservar una cita conmigo
- **Entonces** el sistema rechaza la reserva.
- **Y** el cliente ve un mensaje de error "Lo sentimos, este profesional ha alcanzado el límite de nuevos clientes en su plan actual."
- **Y** el profesional es notificado (o ve un indicador en su panel) de que ha alcanzado el límite.

### Escenario 3: Cliente existente reserva de nuevo
- **Dado** que soy un profesional con 10 clientes únicos en el plan gratuito
- **Cuando** uno de mis 10 clientes existentes intenta reservar una nueva cita conmigo
- **Entonces** la reserva se procesa con normalidad, ya que el límite solo aplica a clientes *nuevos*.

---

## Notas Técnicas

### Backend
-   Modificar el endpoint `POST /api/appointments` (de `STORY-CITAAI-16`).
-   Antes de crear una nueva cita, la lógica debe:
    1.  Contar el número de clientes únicos asociados al profesional (utilizando `FR-015`).
    2.  Verificar si el cliente que intenta reservar ya ha reservado antes con este profesional.
    3.  Si el cliente es nuevo y el conteo de clientes únicos es >= 10, rechazar la reserva con un código de estado 403 y un mensaje de error específico.

### Base de Datos
-   **Tablas:** `professionals`, `clients`, `appointments`.
-   **Operaciones:** `SELECT` (para contar clientes y verificar si el cliente es nuevo).

---

## Dependencias

### Bloqueado por
-   **STORY-CITAAI-16:** Seleccionar un turno e ingresar mis datos para reservar (para modificar la lógica de reserva).
-   **STORY-CITAAI-26:** Como profesional, quiero ver una lista de mis clientes (para la lógica de conteo de clientes).

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-25-logica-freemium/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-016)
