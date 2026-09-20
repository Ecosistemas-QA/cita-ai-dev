# Lógica Freemium

**Jira Key:** CITAAI-25
**Status:** To Do
**Priority:** MEDIUM
**Phase:** Business Logic

---

## Descripción de la Épica

Introduce el modelo de negocio desde el inicio para validar la hipótesis de crecimiento. Esta épica implementa las restricciones del plan gratuito y la invitación a la actualización para profesionales que alcanzan el límite.

**Valor de Negocio:**
Esta épica es fundamental para validar el modelo de negocio y generar ingresos. Al implementar una lógica freemium clara, podemos atraer una amplia base de usuarios mientras incentivamos la conversión a planes de pago, asegurando la sostenibilidad a largo plazo de la plataforma.

---

## Historias de Usuario

1.  **CITAAI-26** - Como profesional, quiero ver una lista de mis clientes.
2.  **CITAAI-27** - Como profesional, quiero ser informado del límite del plan gratuito.
3.  **CITAAI-28** - Como profesional, quiero ver un banner de invitación a planes de pago.

**NOTA:** Los IDs de las historias han sido actualizados con sus valores reales de Jira.

---

## Alcance

### Dentro del Alcance
-   Listado de clientes asociados a un profesional.
-   Restricción de nuevas reservas para profesionales que superen el límite de clientes del plan gratuito.
-   Visualización de un mensaje o banner de "actualización" para profesionales que alcancen el límite.

### Fuera del Alcance (Futuro)
-   Gestión de suscripciones o pagos.
-   Múltiples planes de pago.
-   Analíticas avanzadas de uso del plan.
-   Gestión de clientes (CRM) avanzada.

---

## Criterios de Aceptación (Nivel Épica)

1.  ✅ Un profesional puede ver una lista de todos los clientes que han reservado con él.
2.  ✅ El sistema impide que un profesional en el plan gratuito acepte reservas de más de 10 clientes únicos.
3.  ✅ Los profesionales que alcanzan el límite son informados y se les ofrece una opción para "actualizar".

---

## Requerimientos Funcionales Relacionados

-   **FR-015:** El sistema debe listar los clientes de un profesional.
-   **FR-016:** El sistema debe aplicar el límite de clientes del plan gratuito.
-   **FR-017:** El sistema debe exponer el estado del límite del plan.

Ver: `.context/SRS/functional-specs.md`

---

## Consideraciones Técnicas

### Backend
-   La lógica de conteo de clientes únicos debe ser eficiente.
-   La restricción del plan gratuito debe integrarse en el endpoint de creación de citas.
-   Un endpoint para obtener el conteo de clientes y el estado del plan para el frontend.

---

## Dependencias

### Dependencias Internas
-   **EPIC-CITAAI-14:** Portal de Reserva del Cliente (para la creación de citas y el conteo de clientes).

---

## Documentación Relacionada

-   **PRD:** `.context/PRD/mvp-scope.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-015 a FR-017)
-   **Architecture:** `.context/SRS/architecture-specs.md`
