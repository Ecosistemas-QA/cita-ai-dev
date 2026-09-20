# Como cliente, quiero seleccionar un turno e ingresar mis datos para reservar

**Jira Key:** CITAAI-16
**Epic:** CITAAI-14 (Portal de Reserva del Cliente)
**Priority:** Highest
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una cliente (Sofía)
**Quiero** poder seleccionar un día y hora disponibles e ingresar mi nombre y email
**Para que** pueda solicitar la cita.

---

## Descripción

Una vez que el cliente ha encontrado un hueco que le conviene, esta historia le permite seleccionarlo y proporcionar la información mínima necesaria (nombre y email) para confirmar la reserva.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Reserva exitosa
- **Dado** que he seleccionado el hueco de las "10:00" en la página de un profesional
- **Cuando** ingreso mi nombre "Sofía" y mi email "sofia@email.com" en el formulario
- **Y** hago clic en "Confirmar Cita"
- **Entonces** el sistema procesa la reserva y me redirige a una página de confirmación.

### Escenario 2: Intento de reservar un hueco que acaba de ser ocupado
- **Dado** que estoy viendo el hueco de las "11:00" como disponible
- **Y** otro cliente reserva ese mismo hueco mientras yo relleno mis datos
- **Cuando** hago clic en "Confirmar Cita"
- **Entonces** el sistema detecta que el hueco ya no está disponible y me muestra un mensaje de error "Lo sentimos, este horario acaba de ser reservado. Por favor, selecciona otro."

### Escenario 3: Datos de formulario inválidos
- **Dado** que he seleccionado un hueco disponible
- **Cuando** intento confirmar la cita sin ingresar mi nombre o con un email inválido
- **Entonces** el sistema muestra un error de validación junto al campo correspondiente y no procesa la reserva.

---

## Notas Técnicas

### Frontend
-   Al seleccionar un hueco, mostrar un formulario (puede ser en un modal o en la misma página) con campos para "Nombre" y "Email".
-   Implementar validación de cliente para los campos.
-   Al enviar, hacer una petición `POST` al backend con el `professionalId`, `startTime`, `clientName` y `clientEmail`.

### Backend
-   Endpoint público `POST /api/appointments`.
-   **Control de Concurrencia:** La lógica debe ser transaccional. Antes de insertar la nueva cita, se debe volver a verificar que el hueco sigue libre para evitar reservas dobles. Este es el punto más crítico.
-   Validar los datos de entrada.
-   Buscar o crear un registro para el cliente en la tabla `clients`.
-   Crear el nuevo registro en la tabla `appointments`.
-   Disparar el evento para la notificación por email (gestionado en otra historia).

---

## Dependencias

### Bloqueado por
-   **STORY-CITAAI-15:** Ver horarios disponibles de un profesional.

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-14-portal-reserva-cliente/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-009)
