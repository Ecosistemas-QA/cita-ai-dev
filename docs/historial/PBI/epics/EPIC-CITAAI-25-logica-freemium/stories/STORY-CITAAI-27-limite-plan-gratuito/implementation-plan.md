# Implementation Plan: STORY-CITAAI-27 - Freemium Limit Enforcement

## Overview

Implementar la lógica de negocio "hard" que bloquea el crecimiento orgánico si no se paga. Es el mecanismo de monetización principal.

**Acceptance Criteria a cumplir:**
- ✅ Conteo preciso de clientes únicos.
- ✅ Bloqueo de reservas para el cliente #11 (si es nuevo).
- ✅ Permiso de reservas para clientes #1-#10 (si ya existen).
- ✅ Mensaje de error específico para el cliente bloqueado.

---

## Technical Approach

**Chosen approach:** Middleware o función de verificación dentro de la transacción de creación de cita (`POST /api/appointments`).

**Why this approach:**
- ✅ Atomicidad: Se evalúa en el momento exacto de la reserva.
- ✅ Seguridad: No depende del frontend.

---

## Implementation Steps

### **Step 1: Función de Verificación de Límite**
**Task:** Crear helper `checkFreemiumLimit(proId, clientEmail)`.
**File:** `src/lib/business/freemium.ts`
**Logic:**
1. Obtener `plan` del profesional. Si es 'PRO', retornar `true`.
2. Si es 'FREE':
   - Contar clientes únicos actuales (`count`).
   - Verificar si `clientEmail` ya está en la lista.
   - Si `count >= 10` Y `clientEmail` NO existe -> Retornar `false`.

### **Step 2: Integración en Endpoint de Reserva**
**Task:** Inyectar la verificación antes de crear la cita.
**File:** `src/app/api/public/appointments/route.ts`
**Error Handling:** Si `check` falla, retornar 403 Forbidden con código `LIMIT_REACHED`.

### **Step 3: Feedback al Cliente**
**Task:** Mostrar mensaje amigable en el formulario de reserva si falla por este motivo.
**UI:** "Lo sentimos, este profesional ha alcanzado su límite de nuevos clientes."

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Business Logic | 1.5h |
| 2. API Integration | 1h |
| 3. UI Error Handling | 30m |
| **Total** | **3h** |

**Story points:** 5

---

## Definition of Done Checklist
- [ ] Intentar reservar con email nuevo cuando hay 10 clientes falla.
- [ ] Intentar reservar con email viejo cuando hay 10 clientes funciona.
- [ ] Profesional PRO no tiene límites.
