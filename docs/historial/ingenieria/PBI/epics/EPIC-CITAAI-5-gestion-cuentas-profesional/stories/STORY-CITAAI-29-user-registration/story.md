# As a professional, I want to register with name, email and password to create my account

**Jira Key:** CITAAI-29
**Epic:** CITAAI-5 (Gestión de Cuentas de Profesional (Admin))
**Priority:** High
**Story Points:** 5
**Status:** To Do
**Assignee:** null

---

## User Story

**As a** professional (Laura)
**I want to** be able to register with my name, email and password
**So that** I can create my account in Cita.ai.

---

## Description

This user story covers the initial registration process for a new professional. It is the first step for any user to start using the platform. The process should be simple, secure, and provide immediate feedback. This also includes the creation of their unique public URL (slug) as defined in FR-004.

---

## Acceptance Criteria (Gherkin format)

### Scenario 1: Successful Registration (Happy Path)
- **Given:** A new user is on the registration page
- **When:** They enter a valid name, a unique email, and a strong password and submit the form
- **Then:** The system creates a new professional account, generates a unique profile URL, logs them in, and redirects them to their dashboard.

### Scenario 2: Email Already Exists
- **Given:** A user is on the registration page
- **When:** They enter an email address that already exists in the system
- **Then:** The system displays an inline error message "This email address is already in use." and does not create an account.

### Scenario 3: Invalid Password
- **Given:** A user is on the registration page
- **When:** They enter a password that is shorter than 8 characters
- **Then:** The system displays an inline error message "Password must be at least 8 characters long." and does not create an account.

---

## Technical Notes

### Frontend
-   Create a registration form component (`/components/auth/RegisterForm.js`).
-   Use a state management library (e.g., Zustand, Redux) to handle form state and submission.
-   Implement client-side validation for immediate feedback.

### Backend
-   Create a new API endpoint: `POST /api/auth/register`.
-   Implement validation logic (email format, password strength).
-   Use bcrypt to hash the password before storing it.
-   Implement unique slug generation logic.
-   Insert the new user into the `professionals` table.
-   Generate and return a JWT upon successful registration.

### Database
-   **Table:** `professionals`
-   **Operation:** `INSERT`

**IMPORTANTE:** NO hardcodear SQL. Usar Supabase MCP.

---

## Dependencies

### Blocked By
-   None.

### Blocks
-   STORY-CITAAI-TBD: User Login
-   All other stories requiring an authenticated professional.

---

## UI/UX Considerations

-   The registration form should be clean and simple, with clear labels and placeholders.
-   Provide real-time validation feedback on fields.
-   Show a loading indicator during form submission.
-   The password field should have a "show/hide" toggle.

---

## Definition of Done

-   [ ] Code implemented and functioning for the registration endpoint and form.
-   [ ] Unit tests for validation, password hashing, and slug generation (> 80% coverage).
-   [ ] Integration tests for the `POST /api/auth/register` endpoint.
-   [ ] E2E test for the complete registration flow.
-   [ ] Code review approved by at least one other developer.
-   [ ] Deployed to staging environment.
-   [ ] QA testing passed.
-   [ ] All acceptance criteria are met.

---

## Testing Strategy

See: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/stories/STORY-CITAAI-6-user-registration/test-cases.md` (se crea en Fase 4)

**Test Cases Expected:** 8+ detailed test cases covering:
-   Happy path registration.
-   Registration with an existing email.
-   Registration with invalid email format.
-   Registration with a weak password.
-   Registration with empty fields.
-   Slug generation for common names (e.g., "John Doe").
-   Slug generation for names that might conflict (e.g., another "John Doe").

---

## Implementation Plan

See: `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/stories/STORY-CITAAI-6-user-registration/implementation-plan.md` (se crea en Fase 5)

**Implementation Steps Expected:**
-   Step-by-step technical plan for frontend and backend implementation.
-   File structure for new components and API routes.
-   Function signatures for key logic.
-   API endpoint contract for `POST /api/auth/register`.

---

## Notes

-   Ensure the JWT secret is stored securely as an environment variable.
-   The registration process should be protected against CSRF attacks if using cookie-based sessions.

---

## Related Documentation

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-5-gestion-cuentas-profesional/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-001, FR-004)
-   **API Contracts:** `.context/SRS/api-contracts.yaml`
