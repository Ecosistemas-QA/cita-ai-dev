# Implementation Plan: STORY-CITAAI-17 - Booking Confirmation Page

## Overview

Implementar la página de aterrizaje post-reserva ("Thank You Page"). Debe ser reconfortante y clara.

**Acceptance Criteria a cumplir:**
- ✅ Mensaje de éxito claro.
- ✅ Resumen de la cita (Quién, Cuándo, Dónde).
- ✅ Información sobre próximos pasos (Email).

---

## Technical Approach

**Chosen approach:** Una página dedicada `/booking/success` que recibe los parámetros mínimos (ID de cita o detalles encriptados) vía URL o State. Para el MVP, usar Query Params es suficiente y simple.

**Why this approach:**
- ✅ Simplicidad: Evita estados globales complejos.
- ✅ Compartible: Si el usuario guarda el link, puede ver su confirmación (con validación de seguridad básica).

---

## Implementation Steps

### **Step 1: Página de Éxito**
**Task:** Crear la estructura de la página.
**File:** `src/app/booking/success/page.tsx`
**UI:** Icono de check verde grande, tarjeta con detalles.

### **Step 2: Recuperación de Datos**
**Task:** Leer los query params (`date`, `time`, `proName`) y mostrarlos.
**Logic:** `useSearchParams`.

### **Step 3: Botón "Volver"**
**Task:** Botón para reservar otra cita o volver al perfil del profesional.

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. UI Page | 45m |
| 2. Data Wiring | 15m |
| **Total** | **1h** |

**Story points:** 1

---

## Definition of Done Checklist
- [ ] Redirección correcta desde el formulario.
- [ ] Los datos mostrados coinciden con lo reservado.
