# Portal de Reserva del Cliente

**Jira Key:** CITAAI-14
**Status:** To Do
**Priority:** CRITICAL
**Phase:** Foundation

---

## Descripción de la Épica

La experiencia del cliente final para la auto-reserva. Esta épica se centra en la interfaz pública que los clientes utilizarán para ver la disponibilidad de un profesional y reservar una cita.

**Valor de Negocio:**
Esta épica es el principal punto de contacto para los clientes del profesional y el motor clave para validar la hipótesis de negocio principal. Una experiencia de reserva fluida, intuitiva y rápida es esencial para la conversión y retención de clientes, lo que demuestra directamente el valor de Cita.ai a los profesionales.

---

## Historias de Usuario

1.  **CITAAI-15** - Como cliente, quiero ver los horarios disponibles de un profesional.
2.  **CITAAI-16** - Como cliente, quiero seleccionar un turno e ingresar mis datos para reservar.
3.  **CITAAI-17** - Como cliente, quiero ver una página de confirmación tras la reserva.

**NOTA:** Los IDs de las historias han sido actualizados con sus valores reales de Jira.

---

## Alcance

### Dentro del Alcance
-   Página de perfil pública accesible a través del `slug` del profesional.
-   Visualización de los huecos de cita disponibles en una interfaz de calendario.
-   Formulario para que el cliente introduzca su nombre y email para reservar.
-   Página de confirmación post-reserva.

### Fuera del Alcance (Futuro)
-   Selección de diferentes tipos de servicios o duraciones de cita.
-   Formularios de admisión personalizables para el cliente.
-   Autenticación o creación de cuentas para clientes.
-   Reprogramación de citas por parte del cliente.

---

## Criterios de Aceptación (Nivel Épica)

1.  ✅ Un cliente puede visitar la URL de un profesional y ver correctamente sus horarios disponibles.
2.  ✅ Un cliente puede completar el flujo de reserva (seleccionar hueco, rellenar datos, confirmar) de forma exitosa.
3.  ✅ Una vez que un cliente reserva un hueco, este deja de estar disponible para otros clientes.

---

## Requerimientos Funcionales Relacionados

-   **FR-008:** El sistema debe mostrar los huecos de cita disponibles de un profesional.
-   **FR-009:** El sistema debe permitir a un cliente solicitar una cita.
-   **FR-010:** El sistema debe mostrar una página de confirmación.

Ver: `.context/SRS/functional-specs.md`

---

## Consideraciones Técnicas

### Frontend
-   La página de perfil del profesional será una página generada dinámicamente basada en el `slug` de la URL.
-   Utilizar una librería de calendario (ej. `react-day-picker`) para mostrar la disponibilidad.
-   La lógica para calcular y mostrar los huecos debe manejar correctamente las zonas horarias, mostrando la disponibilidad en la zona horaria local del cliente.

### Backend
-   Endpoint `GET /api/professionals/:slug/availability`: Devuelve los huecos disponibles para un profesional en un rango de fechas. Este endpoint es público.
-   Endpoint `POST /api/appointments`: Endpoint público para crear una nueva cita. Debe incluir protección contra spam/bots (ej. CAPTCHA).

---

## Dependencias

### Dependencias Internas
-   **EPIC-CITAAI-10:** Gestión de Disponibilidad - Necesita que la disponibilidad esté configurada para poder mostrarla.

### Bloquea
-   **EPIC-CAI-4:** Gestión de Citas - Las citas deben poder crearse antes de poder gestionarlas.
-   **EPIC-CAI-5:** Notificaciones Transaccionales - La creación de citas dispara las notificaciones.

---

## Documentación Relacionada

-   **PRD:** `.context/PRD/mvp-scope.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-008 a FR-010)
-   **Architecture:** `.context/SRS/architecture-specs.md`
