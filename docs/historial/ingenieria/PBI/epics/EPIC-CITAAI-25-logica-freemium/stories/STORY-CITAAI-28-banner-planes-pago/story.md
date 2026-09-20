# Como profesional, quiero ver un banner de invitación a planes de pago

**Jira Key:** CITAAI-28
**Epic:** CITAAI-25 (Lógica Freemium)
**Priority:** Medium
**Story Points:** 2
**Status:** To Do
**Assignee:** null

---

## Historia de Usuario

**Como** un profesional que ha alcanzado el límite
**Quiero** ver un banner o sección que me invite a solicitar más información sobre los futuros planes de pago
**Para que** sepa cómo puedo desbloquear más funcionalidades.

---

## Descripción

Esta historia se encarga de la comunicación con el profesional una vez que ha alcanzado el límite de clientes en el plan gratuito. Se le presentará una invitación clara para explorar opciones de pago, lo que es crucial para la monetización de la plataforma.

---

## Criterios de Aceptación (formato Gherkin)

### Escenario 1: Mostrar banner cuando se alcanza el límite
- **Dado** que soy un profesional con 10 clientes únicos (límite del plan gratuito)
- **Cuando** inicio sesión y navego a mi panel principal
- **Entonces** veo un banner prominente que me informa que he alcanzado el límite y me invita a "Solicitar más información sobre planes de pago".

### Escenario 2: No mostrar banner si el límite no se ha alcanzado
- **Dado** que soy un profesional con 5 clientes únicos (por debajo del límite)
- **Cuando** inicio sesión y navego a mi panel principal
- **Entonces** no veo el banner de invitación a planes de pago.

### Escenario 3: Interacción con el banner
- **Dado** que veo el banner de invitación a planes de pago
- **Cuando** hago clic en el botón "Solicitar más información"
- **Entonces** soy redirigido a una página de contacto o se abre un formulario para que pueda dejar mis datos y ser contactado.

---

## Notas Técnicas

### Frontend
-   En el panel principal del profesional, implementar un componente de banner.
-   Este componente debe ser condicional: solo se muestra si el profesional ha alcanzado el límite de clientes.
-   El banner debe contener un mensaje claro y un botón de llamada a la acción.

### Backend
-   Endpoint `GET /api/professionals/me/plan-status`: Devuelve el estado del plan del profesional autenticado, incluyendo si ha alcanzado el límite de clientes.
-   Este endpoint utilizará la lógica de conteo de clientes (`FR-015`).

---

## Dependencias

### Bloqueado por
-   **STORY-CITAAI-27:** Como profesional, quiero ser informado del límite del plan gratuito (para que la lógica de límite esté implementada).

---

## Documentación Relacionada

-   **Epic:** `.context/PBI/epics/EPIC-CITAAI-25-logica-freemium/epic.md`
-   **SRS:** `.context/SRS/functional-specs.md` (FR-017)
