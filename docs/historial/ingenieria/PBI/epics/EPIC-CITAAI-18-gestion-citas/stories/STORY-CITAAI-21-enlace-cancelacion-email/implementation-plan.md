# Implementation Plan: STORY-CITAAI-21 - Client Cancellation Link

## Overview

Implementar el flujo de cancelación autoservicio para clientes. Requiere un enlace seguro y único que no requiera login.

**Acceptance Criteria a cumplir:**
- ✅ Página pública de cancelación por token.
- ✅ Confirmación visual antes de ejecutar la acción.
- ✅ Validación de token (existencia y estado).
- ✅ Idempotencia (si ya se canceló, avisar amigablemente).

---

## Technical Approach

**Chosen approach:** Usar el `id` de la cita como token (UUID v4) es suficiente seguridad para este MVP, ya que es prácticamente imposible de adivinar por fuerza bruta. No crearemos una tabla separada de tokens por ahora.

**Why this approach:**
- ✅ Simplicidad: Menos tablas, menos gestión de estado.
- ✅ Seguridad adecuada: UUID v4 tiene suficiente entropía.

---

## Implementation Steps

### **Step 1: Página Pública de Cancelación**
**Task:** Crear ruta dinámica.
**File:** `src/app/cancelar/[id]/page.tsx`
**Logic:** `SELECT * FROM appointments WHERE id = params.id`.

### **Step 2: API de Cancelación Pública**
**Task:** Endpoint que recibe el ID y ejecuta la cancelación.
**File:** `src/app/api/public/appointments/[id]/cancel/route.ts`
**Validation:** Verificar que la cita sea futura.

### **Step 3: UI - Pantalla de Confirmación**
**Task:** Mostrar detalles (Día/Hora) y botón rojo "Confirmar Cancelación".
**States:** Loading, Success, Error (Ya cancelada).

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Page Setup | 1h |
| 2. API Logic | 45m |
| 3. UI States | 45m |
| **Total** | **2.5h** |

**Story points:** 3

---

## Definition of Done Checklist
- [ ] Acceder a `/cancelar/UUID` muestra la cita correcta.
- [ ] Cancelar funciona y actualiza la DB.
- [ ] Intentar cancelar de nuevo muestra mensaje "Ya cancelada".
