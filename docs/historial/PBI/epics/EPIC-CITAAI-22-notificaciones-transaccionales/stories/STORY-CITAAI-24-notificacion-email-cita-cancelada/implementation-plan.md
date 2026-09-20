# Implementation Plan: STORY-CITAAI-24 - Cancellation Notification

## Overview

Asegurar que cuando una cita se cancela (ya sea por el cliente o el profesional), la parte afectada reciba un aviso inmediato.

**Acceptance Criteria a cumplir:**
- ✅ Email al Cliente si el Profesional cancela.
- ✅ Email al Profesional si el Cliente cancela.
- ✅ Claridad en el motivo (si existe) y pasos a seguir.

---

## Technical Approach

**Chosen approach:** Reutilizar la infraestructura de **Resend** configurada en CITAAI-23. Añadiremos la llamada a la función de envío en los dos endpoints de cancelación existentes (`DELETE` y `POST /cancel`).

**Why this approach:**
- ✅ Consistencia: Mismo estilo y proveedor que la confirmación.
- ✅ Eficiencia: Reutilización de componentes de email.

---

## Implementation Steps

### **Step 1: Template de Cancelación**
**Task:** Crear componente de email para cancelación.
**File:** `src/components/email/CancellationNotice.tsx`
**Props:** `cancelledBy` ('professional' | 'client').

### **Step 2: Servicio de Envío**
**Task:** Añadir función `sendCancellationEmail` al servicio.
**File:** `src/lib/email/send.ts`

### **Step 3: Integración - Cancelación por Cliente**
**Task:** Modificar endpoint público.
**File:** `src/app/api/public/appointments/[id]/cancel/route.ts`

### **Step 4: Integración - Cancelación por Profesional**
**Task:** Modificar endpoint privado.
**File:** `src/app/api/appointments/[id]/cancel/route.ts`

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Template Email | 45m |
| 2. Logic & Integration | 1h |
| **Total** | **1.75h** |

**Story points:** 2

---

## Definition of Done Checklist
- [ ] Cancelar como Pro envía correo al Cliente.
- [ ] Cancelar como Cliente envía correo al Pro.
