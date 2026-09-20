# Como profesional, quiero poder recuperar mi contraseña a través de mi email

**Jira Key:** CITAAI-8
**Epic:** CITAAI-5 (Gestión de Cuentas de Profesional (Admin))
**Priority:** High
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** una profesional (Laura)
**Quiero** poder recuperar mi contraseña a través de mi email si la olvido
**Para que** no pierda el acceso a mi cuenta.

---

## Descripción

Esta historia de usuario implementa un flujo seguro para que los usuarios puedan restablecer su contraseña en caso de olvido. Involucra la generación de un token seguro, el envío de un email y la validación de dicho token antes de permitir el cambio de contraseña.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Solicitud de recuperación exitosa
- **Dado** un profesional registrado que ha olvidado su contraseña
- **Cuando** introduce su dirección de email en la página de "Recuperar Contraseña" y envía la solicitud
- **Entonces** el sistema le muestra un mensaje ("Si el email está registrado, recibirás un enlace para restablecer tu contraseña") y le envía un email con un enlace único y de tiempo limitado para el reseteo.

### Escenario 2: Uso de enlace de recuperación
- **Dado** un profesional que ha recibido un email de recuperación de contraseña
- **Cuando** hace clic en el enlace y es dirigido a la página de "Restablecer Contraseña"
- **Y** introduce una nueva contraseña válida y la confirma
- **Entonces** el sistema actualiza su contraseña, invalida el enlace de recuperación y le permite iniciar sesión con la nueva contraseña.

### Escenario 3: Enlace de recuperación inválido o expirado
- **Dado** un usuario que intenta usar un enlace de recuperación
- **Cuando** el enlace ya ha sido utilizado o ha expirado
- **Entonces** el sistema muestra un mensaje de error "El enlace de recuperación es inválido o ha expirado. Por favor, solicita uno nuevo."

---

## Notas Técnicas

### Frontend
-   Crear página y formulario para solicitar el reseteo (`/forgot-password`).
-   Crear página y formulario para introducir la nueva contraseña (`/reset-password?token=...`).
-   Manejar el estado de envío y los mensajes de éxito/error.

### Backend
-   Endpoint `POST /api/auth/forgot-password`:
    -   Genera un token de reseteo único y con hash.
    -   Almacena el hash del token y su fecha de expiración en la tabla `professionals` o una tabla dedicada.
    -   Envía un email al usuario con un enlace que contiene el token (sin hash).
-   Endpoint `POST /api/auth/reset-password`:
    -   Recibe el token, la nueva contraseña y la confirmación.
    -   Busca el usuario por el hash del token.
    -   Verifica que el token no haya expirado.
    -   Actualiza la contraseña del usuario (con hash) y elimina el token de reseteo.

### Base de Datos
-   **Tabla:** `professionals`
-   **Operaciones:** `UPDATE` (para añadir token de reseteo y para actualizar contraseña).

---

## Dependencias

### Externas
-   Servicio de envío de emails (SendGrid, Resend, etc.).

### Bloqueado por
-   STORY-CITAAI-6: User Registration

---

## Definición de Terminado (Definition of Done)

-   [ ] Código implementado para los endpoints y formularios del flujo de recuperación.
-   [ ] Tests de integración para los endpoints `/forgot-password` y `/reset-password`.
-   [ ] Test E2E para el flujo completo de recuperación.
-   [ ] Revisión de código aprobada.
-   [ ] Desplegado en el entorno de staging.
-   [ ] Pruebas de QA superadas.
-   [ ] Todos los criterios de aceptación se cumplen.

---

## Estrategia de Pruebas

Ver: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/stories/STORY-CITAAI-8-password-recovery/test-cases.md` (se crea en Fase 4)

---

## Plan de Implementación

Ver: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/stories/STORY-CITAAI-8-password-recovery/implementation-plan.md` (se crea en Fase 5)

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-003)
-   **API Contracts:** `.context/SRS/api-contracts.yaml`
