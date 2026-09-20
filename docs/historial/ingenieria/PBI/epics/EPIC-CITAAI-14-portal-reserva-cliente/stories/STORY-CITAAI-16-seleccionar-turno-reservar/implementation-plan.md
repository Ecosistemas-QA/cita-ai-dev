# Implementation Plan: STORY-CITAAI-16 - Book Appointment

## Overview

Implementar el formulario de reserva y la lógica transaccional para confirmar una cita. Este es el punto de conversión del cliente.

**Acceptance Criteria a cumplir:**
- ✅ Formulario simple (Nombre, Email, Notas).
- ✅ Validación de formato de email.
- ✅ Prevención de doble reserva (Race Condition check).
- ✅ Creación automática del registro de "Cliente" si no existe.

---

## Technical Approach

**Chosen approach:** Utilizar un endpoint transaccional que realice una verificación de disponibilidad "Last-Second" antes de insertar. En el frontend, usaremos un formulario paso a paso o un modal limpio.

**Why this approach:**
- ✅ Integridad: Es crucial que no se creen dos citas en el mismo hueco.
- ✅ Simplicidad: Al crear el cliente "on the fly" por email, reducimos la fricción (no requiere registro de cliente).

---

## Implementation Steps

### **Step 1: UI - Formulario de Reserva**
**Task:** Componente que aparece tras seleccionar el slot.
**File:** `src/components/booking/BookingForm.tsx`
**Fields:** Name, Email, Notes (Optional).

### **Step 2: API Logic - Create Appointment**
**Task:** Endpoint principal de creación.
**File:** `src/app/api/public/appointments/route.ts`
**Transaction Logic (Pseudocode):**
```sql
BEGIN;
IF EXISTS (SELECT 1 FROM appointments WHERE professional_id = X AND start_time = Y) THEN
  ROLLBACK; RETURN 409;
END IF;
-- Upsert Client
INSERT INTO clients (email) VALUES (...) ON CONFLICT DO UPDATE ... RETURNING id;
-- Create Appointment
INSERT INTO appointments ...;
COMMIT;
```

### **Step 3: Feedback & Error Handling**
**Task:** Manejar el error 409 (Conflicto) elegantemente en la UI, pidiendo al usuario que elija otro horario.

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Form Component | 1.5h |
| 2. API Transaction | 2h |
| 3. Error Handling | 1h |
| **Total** | **4.5h** |

**Story points:** 3

---

## Definition of Done Checklist
- [ ] El cliente puede reservar exitosamente.
- [ ] Si dos clientes intentan reservar el mismo slot, solo uno pasa y el otro recibe error amigable.
- [ ] Se crea/actualiza el registro en la tabla `clients`.
