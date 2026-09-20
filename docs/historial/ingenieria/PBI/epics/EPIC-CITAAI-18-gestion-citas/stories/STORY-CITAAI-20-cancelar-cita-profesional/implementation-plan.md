# Implementation Plan: STORY-CITAAI-20 - Cancel Appointment (Professional)

## Overview

Permitir al profesional cancelar una cita desde su panel. Esto debe ser una acción consciente (requiere confirmación) y tener efectos inmediatos en la disponibilidad.

**Acceptance Criteria a cumplir:**
- ✅ Botón "Cancelar" en cada tarjeta de cita.
- ✅ Modal de confirmación para evitar accidentes.
- ✅ Actualización de estado en DB (`status = 'cancelled'`).
- ✅ Liberación del slot en el calendario público (implícito por el cambio de estado).

---

## Technical Approach

**Chosen approach:** Acción destructiva protegida por un Alert Dialog. En el backend, marcaremos la cita como cancelada (Soft Delete lógico) en lugar de borrarla físicamente, para mantener historial y auditoría.

**Why this approach:**
- ✅ Integridad: Mantiene el registro de que hubo una cita.
- ✅ Analytics: Permite saber cuántas citas se cancelan.

---

## Implementation Steps

### **Step 1: Endpoint de Cancelación**
**Task:** Crear ruta API segura.
**File:** `src/app/api/appointments/[id]/cancel/route.ts`
**Logic:** `UPDATE appointments SET status = 'cancelled' WHERE id = ... AND professional_id = current_user`.

### **Step 2: UI - Modal de Confirmación**
**Task:** Componente `AlertDialog` de Shadcn UI.
**File:** `src/components/dashboard/CancelAppointmentDialog.tsx`

### **Step 3: Integración en Card**
**Task:** Agregar el botón a `AppointmentCard.tsx`.
**Logic:** Llamada a API + `router.refresh()` para actualizar la lista.

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. API Endpoint | 30m |
| 2. UI Dialog | 45m |
| 3. Integration | 30m |
| **Total** | **1.75h** |

**Story points:** 3

---

## Definition of Done Checklist
- [ ] La cita desaparece de la lista de "Próximas" (o se mueve a canceladas).
- [ ] El slot vuelve a estar disponible para reserva (Verificación manual).
- [ ] El cambio persiste en DB.
