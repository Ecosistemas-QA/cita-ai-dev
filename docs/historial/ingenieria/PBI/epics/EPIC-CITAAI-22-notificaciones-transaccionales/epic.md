# Notificaciones Transaccionales

**Jira Key:** CITAAI-22
**Status:** To Do
**Priority:** HIGH
**Phase:** Core Features

---

## Descripción de la Épica

Asegura la comunicación y reduce la incertidumbre para ambas partes. Esta épica se encarga de enviar notificaciones automáticas por email a profesionales y clientes sobre eventos clave como la creación y cancelación de citas.

**Valor de Negocio:**
Esta épica es crucial para generar confianza y proporcionar una experiencia profesional tanto para clientes como para profesionales. Las notificaciones oportunas y claras reducen la incertidumbre, minimizan las ausencias y mejoran la satisfacción general con el proceso de reserva.

---

## Historias de Usuario

1.  **CITAAI-23** - Como cliente y profesional, quiero notificación por email de nueva cita.
2.  **CITAAI-24** - Como cliente y profesional, quiero notificación por email de cita cancelada.

**NOTA:** Los IDs de las historias han sido actualizados con sus valores reales de Jira.

---

## Alcance

### Dentro del Alcance
-   Envío de email de confirmación de nueva cita a cliente y profesional.
-   Envío de email de notificación de cancelación de cita a la parte correspondiente.

### Fuera del Alcance (Futuro)
-   Recordatorios de citas (ej. 24h antes).
-   Notificaciones por SMS o WhatsApp.
-   Notificaciones en la aplicación (in-app notifications).
-   Plantillas de email personalizables.

---

## Criterios de Aceptación (Nivel Épica)

1.  ✅ Tanto el cliente como el profesional reciben un email de confirmación tras una nueva reserva.
2.  ✅ La parte afectada recibe un email de notificación cuando una cita es cancelada.
3.  ✅ Los emails contienen la información relevante de la cita (profesional, cliente, fecha, hora).

---

## Requerimientos Funcionales Relacionados

-   **FR-013:** El sistema debe enviar notificaciones de nueva cita.
-   **FR-014:** El sistema debe enviar notificaciones de cancelación de cita.

Ver: `.context/SRS/functional-specs.md`

---

## Consideraciones Técnicas

### Backend
-   Implementar un servicio de notificación que escuche eventos (ej. `appointment.created`, `appointment.cancelled`).
-   Utilizar un proveedor de servicios de email transaccional (ej. SendGrid, Resend, Mailgun).
-   Diseñar plantillas de email claras y concisas.

---

## Dependencias

### Dependencias Internas
-   **EPIC-CITAAI-14:** Portal de Reserva del Cliente (para el evento `appointment.created`).
-   **EPIC-CITAAI-18:** Gestión de Citas (para el evento `appointment.cancelled`).

---

## Documentación Relacionada

-   **PRD:** `.context/PRD/mvp-scope.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-013, FR-014)
-   **Architecture:** `.context/SRS/architecture-specs.md`
