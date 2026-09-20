# Como profesional, quiero poder iniciar sesión con email y contraseña para acceder a mi panel

**Jira Key:** CITAAI-30
**Epic:** CITAAI-5 (Gestión de Cuentas de Profesional (Admin))
**Priority:** High
**Story Points:** 3
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** un profesional (Carlos)
**Quiero** poder iniciar sesión con mi email y contraseña
**Para que** pueda acceder a mi panel de administración.

---

## Descripción

Esta historia de usuario permite a un profesional existente autenticarse de forma segura y acceder a su panel de control privado.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Inicio de sesión exitoso (Happy Path)
- **Dado** un profesional existente y registrado que se encuentra en la página de inicio de sesión
- **Cuando** introduce su email y contraseña correctos y envía el formulario
- **Entonces** el sistema valida las credenciales, emite un nuevo token de sesión (JWT) y lo redirige a su panel de control.

### Escenario 2: Contraseña incorrecta
- **Dado** un profesional existente que se encuentra en la página de inicio de sesión
- **Cuando** introduce su email correcto pero una contraseña incorrecta
- **Entonces** el sistema muestra un mensaje de error genérico "Email o contraseña inválidos." y no le permite iniciar sesión.

### Escenario 3: Usuario no existente
- **Dado** un usuario que se encuentra en la página de inicio de sesión
- **Cuando** introduce una dirección de email que no está registrada en el sistema
- **Entonces** el sistema muestra un mensaje de error genérico "Email o contraseña inválidos." y no le permite iniciar sesión.

---

## Notas Técnicas

### Frontend
-   Crear un componente de formulario de login (`/components/auth/LoginForm.js`).
-   Gestionar el estado del formulario y el envío con una librería de manejo de estado.
-   Guardar el JWT recibido en el almacenamiento local (localStorage) y en el estado de la aplicación.

### Backend
-   Crear un nuevo endpoint de API: `POST /api/auth/login`.
-   Buscar al usuario por email.
-   Comparar la contraseña proporcionada con el hash almacenado usando bcrypt.
-   Si las credenciales son válidas, generar y devolver un nuevo JWT.

### Base de Datos
-   **Tabla:** `professionals`
-   **Operación:** `SELECT`

**IMPORTANTE:** NO hardcodear SQL. Usar Supabase MCP.

---

## Dependencias

### Bloqueado por
-   STORY-CITAAI-6: User Registration

### Bloquea
-   Prácticamente todas las demás historias que requieren un profesional autenticado.

---

## Consideraciones de UI/UX

-   El formulario de login debe ser simple y directo.
-   Incluir un enlace a la página de "Recuperar contraseña".
-   Mostrar un indicador de carga durante el envío del formulario.

---

## Definición de Terminado (Definition of Done)

-   [ ] Código implementado y funcionando para el endpoint y formulario de login.
-   [ ] Tests unitarios para la lógica de comparación de contraseñas.
-   [ ] Tests de integración para el endpoint `POST /api/auth/login`.
-   [ ] Test E2E para el flujo completo de inicio de sesión.
-   [ ] Revisión de código aprobada.
-   [ ] Desplegado en el entorno de staging.
-   [ ] Pruebas de QA superadas.
-   [ ] Todos los criterios de aceptación se cumplen.

---

## Estrategia de Pruebas

Ver: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/stories/STORY-CITAAI-7-user-login/test-cases.md` (se crea en Fase 4)

**Casos de Prueba Esperados:** 6+
-   Login exitoso.
-   Login con contraseña incorrecta.
-   Login con email no registrado.
-   Login con campos vacíos.
-   Validación del formato de email.

---

## Plan de Implementación

Ver: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/stories/STORY-CITAAI-7-user-login/implementation-plan.md` (se crea en Fase 5)

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-002)
-   **API Contracts:** `.context/SRS/api-contracts.yaml`
