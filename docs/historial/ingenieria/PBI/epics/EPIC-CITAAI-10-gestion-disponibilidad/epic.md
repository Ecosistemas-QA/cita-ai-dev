# Gestión de Disponibilidad

**Jira Key:** CITAAI-10
**Status:** To Do
**Priority:** CRITICAL
**Phase:** Foundation

---

## Descripción de la Épica

El corazón de la propuesta de valor: el profesional define cuándo está disponible. Esta épica permite a los profesionales configurar sus horarios de trabajo, la duración de sus citas y bloquear tiempos específicos, sentando las bases para el portal de reservas del cliente.

**Valor de Negocio:**
Esta épica es el núcleo de la propuesta de valor. Permite a los profesionales traducir su horario del mundo real a un formato digital y reservable. Un sistema de gestión de disponibilidad flexible e intuitivo es crucial para la adopción por parte de los profesionales y afecta directamente la calidad de la experiencia de reserva para sus clientes.

---

## Historias de Usuario

1.  **CITAAI-11** - Como profesional, quiero definir mi horario de trabajo semanal recurrente.
2.  **CITAAI-12** - Como profesional, quiero definir la duración estándar de mis citas.
3.  **CITAAI-13** - Como profesional, quiero poder bloquear tiempos específicos en mi calendario.

**NOTA:** Los IDs de las historias han sido actualizados con sus valores reales de Jira.

---

## Alcance

### Dentro del Alcance
-   Definición de horarios de trabajo semanales recurrentes (ej. lunes de 9 a 5).
-   Establecer una duración única y estándar para todas las citas (ej. 60 minutos).
-   Crear bloqueos de tiempo puntuales (excepciones) para eventos personales o vacaciones.

### Fuera del Alcance (Futuro)
-   Múltiples tipos de servicios con diferentes duraciones.
-   Disponibilidad variable por semana (horarios no recurrentes).
-   Sincronización automática con calendarios externos (Google Calendar, Outlook).
-   Establecer "buffers" de tiempo entre citas.

---

## Criterios de Aceptación (Nivel Épica)

1.  ✅ Un profesional puede configurar su horario semanal, y este se refleja correctamente en la lógica de disponibilidad.
2.  ✅ Un profesional puede definir la duración de sus citas, y los huecos de reserva se generan de acuerdo a esa duración.
3.  ✅ Un profesional puede bloquear un día o un rango de horas, y ningún cliente puede reservar en ese período.

---

## Requerimientos Funcionales Relacionados

-   **FR-005:** El sistema debe permitir definir bloques de disponibilidad semanal recurrentes.
-   **FR-006:** El sistema debe permitir definir la duración estándar de las citas.
-   **FR-007:** El sistema debe permitir bloquear rangos de tiempo específicos.

Ver: `.context/SRS/functional-specs.md`

---

## Consideraciones Técnicas

### Lógica de Disponibilidad
-   La generación de huecos disponibles debe ser una función pura que tome la configuración de disponibilidad, los bloqueos y las citas existentes para calcular los huecos libres.
-   Esta lógica debe estar bien probada, ya que es crítica para el negocio.

### Base de Datos
**Tablas:**
-   `availability_rules`: `id`, `professional_id`, `day_of_week`, `start_time`, `end_time`.
-   `time_blocks`: `id`, `professional_id`, `start_time`, `end_time`, `reason` (opcional).
-   `professionals`: se añade el campo `appointment_duration` (integer, en minutos).

---

## Dependencias

### Dependencias Internas
-   **EPIC-CITAAI-5:** Gestión de Cuentas de Profesional (Admin) - Requiere un profesional autenticado.

### Bloquea
-   **EPIC-CITAAI-3:** Portal de Reserva del Cliente - La disponibilidad debe poder definirse antes de que los clientes puedan verla y reservar.

---

## Métricas de Éxito

### Métricas Funcionales
-   Tiempo de cálculo para obtener la disponibilidad de un profesional para una semana < 300ms.
-   Tasa de error en la creación de reglas de disponibilidad < 0.1%.

### Métricas de Negocio
-   Tasa de profesionales que completan su configuración de disponibilidad > 90%.
-   Tiempo promedio para configurar la disponibilidad inicial < 3 minutos.

---

## Riesgos y Mitigaciones

| Riesgo                                  | Impacto | Probabilidad | Mitigación                                                                    |
| --------------------------------------- | ------- | ------------ | ----------------------------------------------------------------------------- |
| Lógica de zonas horarias compleja       | Alto    | Medio        | Estandarizar todas las fechas en UTC en el backend y convertirlas en el frontend. |
| Cálculo de disponibilidad ineficiente | Medio   | Medio        | Optimizar las consultas a la base de datos y cachear los resultados si es necesario. |

---

## Estrategia de Pruebas

Ver: `.context/PBI/epics/EPIC-CITAAI-10-gestion-disponibilidad/feature-test-plan.md` (se crea en Fase 4)

---

## Plan de Implementación

Ver: `.context/PBI/epics/EPIC-CITAAI-10-gestion-disponibilidad/feature-implementation-plan.md` (se crea en Fase 5)

---

## Documentación Relacionada

-   **PRD:** `.context/PRD/mvp-scope.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-005 a FR-007)
-   **Architecture:** `.context/SRS/architecture-specs.md`
