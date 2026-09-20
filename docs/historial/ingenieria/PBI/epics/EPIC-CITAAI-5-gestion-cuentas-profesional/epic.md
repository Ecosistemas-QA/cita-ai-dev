# Gestión de Cuentas de Profesional (Admin)

**Jira Key:** CITAAI-5
**Status:** To Do
**Priority:** CRITICAL
**Phase:** Foundation

---

## Epic Description

Esta épica cubre la funcionalidad fundamental para que los profesionales se unan y accedan a la plataforma Cita.ai. Incluye el registro de nuevas cuentas, la autenticación de usuarios existentes, un mecanismo de recuperación de contraseña y la generación de una URL de perfil pública y única, que es una característica clave para su marketing personal.

**Business Value:**
This epic is critical for user acquisition. It provides the entry point for professionals, our primary user base. A smooth and secure account management experience is fundamental to building trust and encouraging adoption. The unique profile URL is a direct tool for professionals to market themselves, tying their success to our platform's utility.

---

## User Stories

1.  **CITAAI-29** - Como profesional, quiero poder registrarme con nombre, email y contraseña para crear mi cuenta.
2.  **CITAAI-30** - Como profesional, quiero poder iniciar sesión con email y contraseña para acceder a mi panel.
3.  **CITAAI-8** - Como profesional, quiero poder recuperar mi contraseña a través de mi email.
4.  **CITAAI-9** - Como profesional, quiero que se genere una URL de perfil pública y única.

**NOTA:** Los IDs de las historias han sido actualizados con sus valores reales de Jira.

---

## Scope

### In Scope
-   User registration with email and password.
-   User login and session management (JWT).
-   Secure password recovery flow via email.
-   Automatic generation of a unique, SEO-friendly public profile URL (slug).

### Out of Scope (Future)
-   Social login (Google, Facebook, etc.).
-   Two-Factor Authentication (2FA).
-   Profile picture uploads or detailed profile editing (covered in another epic).
-   Changing email address or password from the user panel.

---

## Acceptance Criteria (Epic Level)

1.  ✅ A new professional can successfully create an account and log in.
2.  ✅ An existing professional can log in, and their session is maintained.
3.  ✅ A professional who forgot their password can successfully reset it and regain access.
4.  ✅ Upon registration, every professional has a unique and accessible public URL (e.g., `cita.ai/name-slug`).

---

## Related Functional Requirements

-   **FR-001:** El sistema debe permitir el registro de un nuevo profesional.
-   **FR-002:** El sistema debe permitir la autenticación de un profesional.
-   **FR-003:** El sistema debe permitir la recuperación de contraseña.
-   **FR-004:** El sistema debe generar una URL de perfil pública y única.

See: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Authentication
-   Use JWT for session management.
-   Passwords must be hashed using a strong, salted algorithm (e.g., bcrypt).

### Database Schema
**Tables:**
-   `professionals`: `id` (PK), `name`, `email` (unique), `password_hash`, `slug` (unique), `created_at`, `updated_at`.

**IMPORTANTE:** NO hardcodear schema SQL completo. Usar Supabase MCP para schema real.

### Security Requirements
-   Implement rate limiting on login and password recovery endpoints to prevent brute-force attacks.
-   Password recovery tokens must be single-use and have a short expiration time (e.g., 1 hour).
-   All communication must be over HTTPS.

---

## Dependencies

### External Dependencies
-   Email sending service (e.g., SendGrid, Resend) for password recovery emails.

### Internal Dependencies
-   None. This is a foundational epic.

### Blocks
-   Almost all other epics are blocked by this one, as they require an authenticated professional user.

---

## Success Metrics

### Functional Metrics
-   Successful registration rate > 98%.
-   Login success rate > 99%.
-   Server response time for auth endpoints < 200ms.

### Business Metrics
-   Time to create an account and log in < 2 minutes.

---

## Risks & Mitigations

| Risk                  | Impact | Probability | Mitigation                                                                 |
| --------------------- | ------ | ----------- | -------------------------------------------------------------------------- |
| Email deliverability issues | High   | Medium      | Use a reputable email provider and monitor bounce/spam rates.            |
| Security breach       | High   | Low         | Follow security best practices, conduct security reviews, use secure libraries. |
| Slug generation conflict | Low    | Medium      | Implement a robust unique slug generation algorithm with numerical suffixes. |

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/feature-test-plan.md` (se crea en Fase 4)

### Test Coverage Requirements
-   **Unit Tests:** Cover validation logic, password hashing, and slug generation.
-   **Integration Tests:** Test API endpoints for registration, login, and password recovery flow.
-   **E2E Tests:** Simulate a full user registration and login journey.

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/feature-implementation-plan.md` (se crea en Fase 5)

### Recommended Story Order
1.  **CITAAI-29** - User registration
2.  **CITAAI-9** - Public profile URL generation
3.  **CITAAI-30** - User login/logout
4.  **CITAAI-8** - Password recovery

### Estimated Effort
-   **Development:** 1 sprint
-   **Testing:** 0.5 sprints
-   **Total:** 1.5 sprints

---

## Notes

-   The choice of email provider should be configured via environment variables.
-   Initial focus is on a seamless and secure experience.

---

## Related Documentation

-   **PRD:** `.context/PRD/mvp-scope.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-001 to FR-004)
-   **Architecture:** `.context/SRS/architecture-specs.md`
-   **API Contracts:** `.context/SRS/api-contracts.yaml`
