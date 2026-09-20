# Implementation Plan: STORY-CITAAI-15 - View Available Slots

## Overview

Implementar la visualización pública de la agenda del profesional. Esta es la lógica más compleja del MVP, ya que debe cruzar 3 fuentes de datos en tiempo real: Reglas de horario, Citas existentes y Bloqueos de tiempo.

**Acceptance Criteria a cumplir:**
- ✅ Página pública accesible por slug (`cita.ai/slug`).
- ✅ Calendario visual para seleccionar fecha.
- ✅ Lista de slots generada dinámicamente según duración de cita y disponibilidad.
- ✅ Filtrado correcto de slots ocupados (citas) o bloqueados (vacaciones).

---

## Technical Approach

**Chosen approach:** 
1. **Frontend:** Página pública en `src/app/[slug]/page.tsx` usando Server Components para datos básicos del perfil y Client Components para el calendario interactivo.
2. **Backend:** Un endpoint optimizado que realiza el cálculo de disponibilidad "on-the-fly". No guardaremos slots pre-generados en DB para mantener la flexibilidad.

**Why this approach:**
- ✅ Datos siempre frescos (Real-time).
- ✅ Evita problemas de sincronización de caché si el profesional cambia su horario.

---

## Implementation Steps

### **Step 1: Página Pública Base**
**Task:** Crear la estructura de la página de perfil.
**File:** `src/app/[slug]/page.tsx`
**Logic:** `SELECT * FROM professionals WHERE slug = params.slug`. Si no existe -> 404.

### **Step 2: Componente de Calendario**
**Task:** Integrar `react-day-picker` o una solución simple de calendario.
**File:** `src/components/booking/BookingCalendar.tsx`
**State:** `selectedDate`.

### **Step 3: Algoritmo de Disponibilidad (Core Logic)**
**Task:** Implementar la función pura que calcula los slots.
**File:** `src/lib/availability/calculator.ts`
**Input:** `rules`, `appointments`, `blocks`, `duration`, `date`.
**Output:** Array de objetos `Date` (slots).
**Logic:**
1. Generar grilla base según reglas del día (ej: 9:00, 9:30...).
2. Restar intervalos de `appointments`.
3. Restar intervalos de `time_blocks`.
4. Devolver restantes.

### **Step 4: Endpoint API**
**Task:** Exponer la lógica al frontend.
**File:** `src/app/api/public/availability/route.ts`
**Query Params:** `professionalId`, `date`.

### **Step 5: UI - Lista de Slots**
**Task:** Mostrar los horarios resultantes como botones seleccionables.
**File:** `src/components/booking/TimeSlots.tsx`

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Page Setup | 1h |
| 2. Calendar UI | 2h |
| 3. Core Algorithm | 4h |
| 4. API & Integration | 2h |
| **Total** | **9h** |

**Story points:** 5 (Complex)

---

## Definition of Done Checklist
- [ ] La URL pública carga el perfil correcto.
- [ ] El calendario permite navegar entre meses.
- [ ] Al seleccionar un día, se cargan los slots correctos.
- [ ] Los slots ocupados NO aparecen.
- [ ] Días pasados están deshabilitados.
