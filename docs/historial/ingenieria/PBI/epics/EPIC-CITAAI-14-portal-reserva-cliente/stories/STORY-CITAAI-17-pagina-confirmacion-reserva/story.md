# Como cliente, quiero ver una página de confirmación tras la reserva

**Jira Key:** CITAAI-17
**Epic:** CITAAI-14 (Portal de Reserva del Cliente)
**Priority:** High
**Story Points:** 1
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una cliente (Sofía)
**Quiero** ver una página de confirmación inmediata después de enviar mi solicitud
**Para que** sepa que el proceso funcionó.

---

## Descripción

Esta historia cierra el flujo de reserva mostrando al cliente una página clara y concisa que confirma que su cita ha sido agendada con éxito. Proporciona feedback inmediato y la información esencial de la cita.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Ver página de confirmación
- **Dado** que he completado exitosamente el formulario de reserva de cita
- **Cuando** el sistema procesa mi reserva
- **Entonces** soy redirigido a una página de confirmación.
- **Y** la página muestra un mensaje claro como "¡Tu cita está confirmada!".
- **Y** la página muestra los detalles de la cita: nombre del profesional, fecha y hora.

### Escenario 2: Información de cancelación
- **Dado** que estoy en la página de confirmación de mi cita
- **Cuando** leo el contenido de la página
- **Entonces** veo una nota que indica que recibiré un email de confirmación con los detalles y un enlace para cancelar si lo necesito.

---

## Notas Técnicas

### Frontend
-   Crear una nueva página (ruta) para la confirmación, por ejemplo `/reserva-confirmada`.
-   La página recibirá los datos de la cita recién creada a través del estado de la aplicación o como parámetros en la URL.
-   El diseño debe ser simple, centrado en el mensaje de éxito y los detalles clave.

### Backend
-   El endpoint `POST /api/appointments` debe devolver el objeto de la cita creada en su respuesta exitosa. El frontend usará estos datos para poblar la página de confirmación.

---

## Dependencias

### Bloqueado por
-   **STORY-CITAAI-16:** Seleccionar un turno e ingresar mis datos para reservar.

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-14-portal-reserva-cliente/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-010)
