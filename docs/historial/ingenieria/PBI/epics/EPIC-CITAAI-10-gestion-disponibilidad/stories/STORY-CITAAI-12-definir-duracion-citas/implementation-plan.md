# Implementation Plan: STORY-CITAAI-12 - Define Appointment Duration

## Overview

Implementar la capacidad para que el profesional establezca cuánto dura cada sesión, lo cual es crítico para la división del tiempo en el portal de reservas.

**Acceptance Criteria a cumplir:**
- ✅ Campo numérico para introducir duración en minutos.
- ✅ Validación de valor positivo (> 0).
- ✅ Guardado persistente en el perfil del profesional.

---

## Technical Approach

**Chosen approach:** Añadir una sección de "Configuración de Citas" en la misma página de disponibilidad. Se usará un campo de `select` con opciones comunes (15, 30, 45, 60, 90, 120) para mejorar la UX y simplificar validaciones.

**Why this approach:**
- ✅ UX: Previene que el usuario ingrese valores extraños (ej: 7 minutos).
- ✅ Backend: Facilita el cálculo de slots si los tiempos son estandarizados.

---

## Implementation Steps

### **Step 1: UI - Selector de Duración**
**Task:** Crear componente de selección.
**File:** `src/components/dashboard/availability/DurationSettings.tsx`
**Logic:** Un simple select vinculado al estado del perfil.

### **Step 2: API Logic**
**Task:** Extender el endpoint de perfil para aceptar `appointment_duration`.
**File:** `src/app/api/professionals/settings/route.ts`
**Validation:** Asegurar que sea uno de los valores permitidos o un entero válido.

### **Step 3: Database Sync**
**Task:** Actualizar el campo en Supabase.
**Table:** `professionals` -> `appointment_duration`.

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. UI Component | 30m |
| 2. API Logic | 30m |
| 3. Database Sync | 15m |
| **Total** | **1.25h** |

**Story points:** 2

---

## Definition of Done Checklist
- [ ] El profesional puede cambiar la duración y ver el éxito en la UI.
- [ ] El valor persiste tras recargar.
- [ ] El valor se refleja correctamente en el portal de reserva (Verificado en Fase 7).
