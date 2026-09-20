# Como profesional, quiero definir la duración estándar de mis citas

**Jira Key:** CITAAI-12
**Epic:** CITAAI-10 (Gestión de Disponibilidad)
**Priority:** Highest
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** un profesional (Carlos)
**Quiero** poder definir la duración estándar de mis citas (ej: 45, 60 minutos)
**Para que** los turnos se muestren correctamente.

---

## Descripción

Esta historia permite al profesional establecer una duración por defecto para todas sus citas. Este valor es fundamental para calcular y generar los huecos de reserva disponibles en su calendario.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Establecer duración por primera vez
- **Dado** que estoy en mi panel de "Disponibilidad"
- **Cuando** introduzco "45" minutos como la duración estándar de mis citas
- **Y** guardo el cambio
- **Entonces** el sistema almacena que la duración de mis citas es de 45 minutos.

### Escenario 2: Actualizar duración existente
- **Dado** que la duración de mis citas está establecida en "45" minutos
- **Cuando** cambio el valor a "60" minutos
- **Y** guardo el cambio
- **Entonces** el sistema actualiza la duración de mis citas a 60 minutos.

### Escenario 3: Introducir un valor inválido
- **Dado** que estoy en mi panel de "Disponibilidad"
- **Cuando** intento establecer la duración en "0" o un valor negativo
- **Entonces** el sistema muestra un error de validación y no guarda el cambio.

---

## Notas Técnicas

### Frontend
-   Añadir un campo numérico en la página de "Disponibilidad" para la duración de la cita.
-   El campo podría ser un input de tipo `number` o un `select` con opciones predefinidas (30, 45, 60, 90).

### Backend
-   Crear un endpoint `PUT /api/professionals/me/settings` o similar para actualizar las configuraciones del profesional.
-   La lógica del endpoint debe validar que el valor de la duración sea un número entero positivo.
-   Actualizar el campo `appointment_duration` en la tabla `professionals` para el usuario autenticado.

### Base de Datos
-   **Tabla:** `professionals`
-   **Campo:** `appointment_duration` (integer)
-   **Operación:** `UPDATE`

---

## Dependencias

### Bloqueado por
-   **EPIC-CITAAI-5:** Requiere un profesional autenticado.

---

## Definición de Terminado (Definition of Done)

-   [ ] Código implementado para el campo de UI y el endpoint de actualización.
-   [ ] Tests de integración para el endpoint de actualización.
-   [ ] Test E2E para cambiar la duración de la cita.
-   [ ] Revisión de código aprobada.
-   [ ] Desplegado en el entorno de staging.
-   [ ] Pruebas de QA superadas.
-   [ ] Todos los criterios de aceptación se cumplen.

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-10-gestion-disponibilidad/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-006)
