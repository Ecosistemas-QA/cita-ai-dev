# Implementation Plan: STORY-CITAAI-13 - Block Specific Times

## Overview

Implementar excepciones a la disponibilidad general (Bloqueos). Esto permite al profesional marcar tiempos como "No Disponibles" sin cambiar su horario recurrente.

**Acceptance Criteria a cumplir:**
- ✅ Interfaz para seleccionar rangos de fecha/hora específicos.
- ✅ Almacenamiento en tabla dedicada `time_blocks`.
- ✅ Los bloqueos deben anular cualquier regla de disponibilidad recurrente.
- ✅ Funcionalidad para eliminar bloqueos existentes.

---

## Technical Approach

**Chosen approach:** Crear una tabla `time_blocks` en Supabase. En el frontend, utilizaremos un calendario interactivo que permita visualizar tanto citas existentes como bloqueos manuales.

**Why this approach:**
- ✅ Flexibilidad: Permite bloquear desde una hora hasta semanas enteras.
- ✅ Claridad: Al visualizarlos junto con las citas, el profesional tiene el panorama completo de su tiempo.

---

## Implementation Steps

### **Step 1: Database Setup**
**Task:** Crear la tabla `time_blocks` (si no existe).
**Fields:** `id`, `professional_id`, `start_time` (timestamptz), `end_time` (timestamptz), `reason` (text).
**RLS:** Solo el profesional puede ver y editar sus propios bloques.

### **Step 2: UI - Calendario de Excepciones**
**Task:** Implementar vista de calendario con selección de rango.
**File:** `src/components/dashboard/availability/TimeBlockCalendar.tsx`
**Logic:** Click y drag para seleccionar rango, o modal simple con selectores de fecha/hora.

### **Step 3: Endpoints API**
**Task:** CRUD de bloqueos.
**File:** `src/app/api/availability/blocks/route.ts`
**Operations:** 
- `GET`: Obtener bloques del mes actual.
- `POST`: Crear nuevo bloque.
- `DELETE`: Eliminar bloque por ID.

### **Step 4: Lógica de Intersección (Crítica)**
**Task:** Asegurar que la función que calcula slots disponibles (Fase 7) reste los `time_blocks`.

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. DB Setup | 30m |
| 2. Calendar UI | 3h |
| 3. API Logic | 1h |
| 4. Validation Logic | 1h |
| **Total** | **5.5h** |

**Story points:** 5

---

## Definition of Done Checklist
- [ ] El profesional puede ver sus bloqueos en un calendario.
- [ ] Se pueden crear y borrar bloqueos sin errores.
- [ ] La base de datos guarda correctamente los UTC timestamps.
- [ ] Los bloqueos aparecen visualmente distintos a las citas normales.
