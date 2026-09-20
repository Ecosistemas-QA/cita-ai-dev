# Como profesional, quiero que se genere una URL de perfil pública y única

**Jira Key:** CITAAI-9
**Epic:** CITAAI-5 (Gestión de Cuentas de Profesional (Admin))
**Priority:** High
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** un profesional (Carlos)
**Quiero** que se genere una URL pública única y simple para mi perfil (ej: `cita.ai/carlos-rojas`)
**Para que** pueda compartirla fácilmente en mi Instagram o WhatsApp.

---

## Descripción

Esta historia de usuario asegura que cada profesional tenga una URL personalizable y fácil de recordar para su página de reservas. Esta URL (o "slug") se genera automáticamente durante el registro a partir del nombre del profesional.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Generación de slug único en el registro
- **Dado** un nuevo profesional llamado "Ana Pérez" que se está registrando
- **Y** no existe ningún otro profesional con el slug "ana-perez"
- **Cuando** completa su registro
- **Entonces** el sistema le asigna el slug "ana-perez" y su perfil es accesible en `cita.ai/ana-perez`.

### Escenario 2: Generación de slug con colisión de nombre
- **Dado** un nuevo profesional llamado "Ana Pérez" que se está registrando
- **Y** ya existe un profesional con el slug "ana-perez"
- **Cuando** completa su registro
- **Entonces** el sistema le asigna un slug único con un sufijo numérico, como "ana-perez-2", y su perfil es accesible en `cita.ai/ana-perez-2`.

### Escenario 3: Generación de slug con caracteres especiales
- **Dado** un nuevo profesional llamado "José & Núñez" que se está registrando
- **Cuando** completa su registro
- **Entonces** el sistema le asigna un slug normalizado, como "jose-nunez", eliminando caracteres especiales y convirtiendo espacios y acentos.

---

## Notas Técnicas

### Backend
-   La lógica de generación de slugs debe ser parte del servicio de registro de usuarios (`POST /api/auth/register`).
-   Utilizar una librería para "slugify" el nombre del profesional (ej: `slugify`).
-   La función debe normalizar el texto: convertir a minúsculas, reemplazar espacios con guiones, eliminar acentos y caracteres especiales.
-   Debe verificar en la base de datos si el slug generado ya existe y, en caso afirmativo, añadir un sufijo numérico incremental.

### Base de Datos
-   **Tabla:** `professionals`
-   **Campo:** `slug` (debe tener un índice único para garantizar la integridad de los datos).
-   **Operación:** `SELECT` (para verificar existencia), `INSERT` (como parte del registro).

---

## Dependencias

### Bloqueado por
-   Ninguna, pero su implementación está ligada a `STORY-CITAAI-6` (Registro).

---

## Definición de Terminado (Definition of Done)

-   [ ] La lógica de generación de slugs está implementada y cubierta por tests unitarios.
-   [ ] El campo `slug` se guarda correctamente en la base de datos durante el registro.
-   [ ] El endpoint de registro refleja esta nueva lógica.
-   [ ] Revisión de código aprobada.
-   [ ] Todos los criterios de aceptación se cumplen.

---

## Estrategia de Pruebas

Ver: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/stories/STORY-CITAAI-9-public-profile-url/test-cases.md` (se crea en Fase 4)

**Casos de Prueba Esperados:** 5+
-   Generación de slug simple.
-   Generación de slug con colisión.
-   Generación de slug con múltiples colisiones (ej: `nombre-3`, `nombre-4`).
-   Generación de slug con acentos y caracteres especiales.
-   Generación de slug con espacios múltiples y guiones.

---

## Plan de Implementación

Ver: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/stories/STORY-CITAAI-9-public-profile-url/implementation-plan.md` (se crea en Fase 5)

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-004)
-   **API Contracts:** `.context/SRS/api-contracts.yaml`
