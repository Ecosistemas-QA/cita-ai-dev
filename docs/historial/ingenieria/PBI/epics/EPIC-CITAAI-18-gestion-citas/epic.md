# Gestión de Citas

**Jira Key:** CITAAI-18
**Status:** To Do
**Priority:** HIGH
**Phase:** Core Features

---

## Descripción de la Épica

Visualización y administración básica de las citas agendadas. Esta épica permite a los profesionales ver sus próximas citas y cancelarlas. También permite a los clientes cancelar sus propias citas a través de un enlace.

**Valor de Negocio:**
Esta épica proporciona herramientas esenciales para que los profesionales gestionen sus operaciones diarias, aumentando la adherencia a la plataforma. Para los clientes, ofrece una opción de autoservicio conveniente para cancelar, lo que mejora su experiencia y reduce la carga administrativa para el profesional.

---

## Historias de Usuario

1.  **CITAAI-19** - Como profesional, quiero ver mis próximas citas en un panel.
2.  **CITAAI-20** - Como profesional, quiero poder cancelar una cita desde mi panel.
3.  **CITAAI-21** - Como cliente, quiero un enlace en mi email para cancelar mi cita.

**NOTA:** Los IDs de las historias han sido actualizados con sus valores reales de Jira.

---

## Alcance

### Dentro del Alcance
-   Vista de lista o calendario para que el profesional vea sus próximas citas.
-   Funcionalidad para que el profesional cancele una cita.
-   Funcionalidad para que el cliente cancele una cita a través de un enlace seguro.

### Fuera del Alcance (Futuro)
-   Reprogramación de citas.
-   Historial de citas pasadas.
-   Añadir notas a las citas.
-   Confirmación manual de citas por parte del profesional.

---

## Criterios de Aceptación (Nivel Épica)

1.  ✅ Un profesional puede ver todas sus próximas citas en su panel de control.
2.  ✅ Un profesional puede cancelar una cita, y el hueco vuelve a estar disponible.
3.  ✅ Un cliente puede cancelar su propia cita usando un enlace del email de confirmación.

---

## Requerimientos Funcionales Relacionados

-   **FR-011:** El sistema debe listar las próximas citas de un profesional.
-   **FR-012:** El sistema debe permitir la cancelación de una cita.

Ver: `.context/SRS/functional-specs.md`

---

## Consideraciones Técnicas

### Backend
-   Endpoint `GET /api/appointments`: Devuelve las citas del profesional autenticado.
-   Endpoint `POST /api/appointments/:id/cancel`: Endpoint para que el profesional cancele una cita. Debe verificar que la cita le pertenece.
-   Endpoint `POST /api/public/appointments/:token/cancel`: Endpoint público para que el cliente cancele usando un token seguro. El token se genera al crear la cita y se envía por email.

---

## Dependencias

### Dependencias Internas
-   **EPIC-CITAAI-14:** Portal de Reserva del Cliente - Las citas deben poder crearse para poder gestionarlas.
-   **EPIC-CITAAI-5:** Notificaciones Transaccionales - La cancelación de citas debe disparar notificaciones.

---

## Documentación Relacionada

-   **PRD:** `.context/PRD/mvp-scope.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-011, FR-012)
-   **Architecture:** `.context/SRS/architecture-specs.md`
