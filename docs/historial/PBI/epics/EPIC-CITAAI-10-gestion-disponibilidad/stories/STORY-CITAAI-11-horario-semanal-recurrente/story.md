# Como profesional, quiero definir mi horario de trabajo semanal recurrente

**Jira Key:** CITAAI-11
**Epic:** CITAAI-10 (Gestión de Disponibilidad)
**Priority:** Highest
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una profesional (Laura)
**Quiero** poder definir mis bloques de horario de trabajo recurrentes por día de la semana
**Para que** pueda establecer mi disponibilidad base.

---

## Descripción

Esta historia permite a los profesionales configurar sus horas de trabajo estándar para cada día de la semana (ej. Lunes de 9:00 a 17:00, Martes de 9:00 a 13:00, etc.). Esta será la base sobre la cual se calcularán los huecos disponibles.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Configurar horario para un día
- **Dado** que estoy en mi panel de "Disponibilidad"
- **Cuando** selecciono "Lunes" y establezco un horario de "09:00" a "17:00"
- **Y** guardo los cambios
- **Entonces** el sistema almacena que mi disponibilidad para los lunes es de 9:00 a 17:00.

### Escenario 2: Añadir múltiples horarios en un mismo día
- **Dado** que estoy en mi panel de "Disponibilidad"
- **Cuando** para el "Miércoles", establezco un horario de "10:00" a "13:00" y otro de "15:00" a "18:00"
- **Y** guardo los cambios
- **Entonces** el sistema almacena ambos bloques de disponibilidad para los miércoles.

### Escenario 3: Eliminar la disponibilidad de un día
- **Dado** que tengo un horario configurado para el "Viernes"
- **Cuando** elimino toda la disponibilidad para ese día
- **Y** guardo los cambios
- **Entonces** el sistema registra que no estoy disponible los viernes.

---

## Notas Técnicas

### Frontend
-   Crear una interfaz de usuario para la gestión de horarios semanales. Podría ser una tabla con los 7 días de la semana.
-   Cada día debe permitir añadir uno o más rangos de tiempo (con selectores de hora).
-   La UI debe enviar un array de objetos al backend, representando todas las reglas de disponibilidad.

### Backend
-   Crear un endpoint `PUT /api/availability/rules`.
-   Este endpoint recibirá el conjunto completo de reglas para el profesional autenticado.
-   La lógica debe ser transaccional: eliminar todas las reglas antiguas e insertar las nuevas.
-   Validar que los rangos de tiempo sean lógicos (hora de fin posterior a hora de inicio) y no se solapen para el mismo día.

### Base de Datos
-   **Tabla:** `availability_rules`
-   **Operaciones:** `DELETE` (where professional_id = ?), `INSERT`.

---

## Dependencias

### Bloqueado por
-   **EPIC-CITAAI-5:** Requiere un profesional autenticado.

---

## Definición de Terminado (Definition of Done)

-   [ ] Código implementado para la UI y el endpoint de gestión de reglas de disponibilidad.
-   [ ] Tests de integración para el endpoint `PUT /api/availability/rules`.
-   [ ] Test E2E para configurar, actualizar y eliminar horarios.
-   [ ] Revisión de código aprobada.
-   [ ] Desplegado en el entorno de staging.
-   [ ] Pruebas de QA superadas.
-   [ ] Todos los criterios de aceptación se cumplen.

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-10-gestion-disponibilidad/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-005)
