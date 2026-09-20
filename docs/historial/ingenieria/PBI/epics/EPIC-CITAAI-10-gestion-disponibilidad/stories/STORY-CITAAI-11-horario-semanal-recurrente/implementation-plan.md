# Implementation Plan: STORY-CITAAI-11 - Recurring Weekly Schedule

## Overview

Implementar la capacidad para que los profesionales definan sus horarios de trabajo semanales, los cuales servirán como base para la generación de slots disponibles.

**Acceptance Criteria a cumplir:**
- ✅ Selección de días laborales (Lunes a Domingo).
- ✅ Configuración de uno o más rangos horarios por día.
- ✅ Validación de solapamiento de rangos en el cliente.
- ✅ Persistencia de reglas recurrentes en la tabla `availability_rules`.

---

## Technical Approach

**Chosen approach:** Utilizar una estructura JSON para enviar las reglas desde el frontend y almacenarlas como filas individuales en la tabla `availability_rules`. Se usará un componente de UI reactivo para manejar la complejidad de múltiples rangos por día.

**Why this approach:**
- ✅ Escalabilidad: Permite agregar reglas complejas fácilmente.
- ✅ Performance: Las consultas de disponibilidad pueden filtrar por reglas específicas de forma eficiente.
- ❌ Trade-off: Requiere lógica de validación cuidadosa en el cliente para evitar rangos inválidos.

---

## Implementation Steps

### **Step 1: UI - Selector de Horarios**
**Task:** Crear el componente principal de gestión de disponibilidad.
**File:** `src/components/dashboard/availability/WeeklyScheduleForm.tsx`
**Structure:**
- Lista de días de la semana.
- Toggle para "Día Laboral".
- Botón "Agregar Rango" para cada día.
- Inputs de tiempo (HTML Time input).

### **Step 2: Lógica de Validación (Frontend)**
**Task:** Asegurar que los rangos sean lógicos (Start < End) y no se solapen.
**File:** `src/lib/utils/time-validation.ts`

### **Step 3: Endpoint de Guardado**
**Task:** Crear/Actualizar endpoint para procesar el lote de reglas.
**File:** `src/app/api/availability/rules/route.ts`
**Logic:**
1. Validar autenticación.
2. Limpiar reglas antiguas del profesional (`DELETE`).
3. Insertar nuevas reglas en bloque (`INSERT`).

### **Step 4: Integración con Dashboard**
**Task:** Conectar el formulario con la página de Disponibilidad actual.
**File:** `src/app/(protected)/dashboard/availability/page.tsx`

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Componente UI | 2h |
| 2. Validación y Form State | 1h |
| 3. API & DB Logic | 1h |
| 4. Integración Final | 30m |
| **Total** | **4.5h** |

**Story points:** 5

---

## Definition of Done Checklist
- [ ] El profesional puede guardar su horario semanal.
- [ ] Los datos persisten correctamente en la base de datos.
- [ ] Se validan errores de entrada (ej: hora de fin menor a hora de inicio).
- [ ] La UI refleja el estado guardado al recargar la página.
