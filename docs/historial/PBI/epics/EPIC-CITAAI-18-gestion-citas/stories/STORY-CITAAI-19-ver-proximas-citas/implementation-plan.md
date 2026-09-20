# Implementation Plan: STORY-CITAAI-19 - View Upcoming Appointments

## Overview

Implementar la vista principal del Dashboard, donde el profesional gestiona su día a día.

**Acceptance Criteria a cumplir:**
- ✅ Listado de citas futuras ordenadas por fecha.
- ✅ Detalles clave visibles (Cliente, Hora, Notas).
- ✅ Estado vacío amigable ("Empty State").

---

## Technical Approach

**Chosen approach:** Una lista vertical limpia (Cards) para el MVP, posponiendo la vista de calendario complejo para una iteración posterior si el tiempo apremia (aunque el AC lo menciona, priorizaremos la lista funcional primero). Usaremos Server Components para la carga inicial de datos.

**Why this approach:**
- ✅ Simplicidad: Más fácil de leer en móvil que un calendario completo.
- ✅ Velocidad: Menos dependencias de librerías pesadas de calendario.

---

## Implementation Steps

### **Step 1: Endpoint de Citas**
**Task:** Crear endpoint para obtener citas con join a clientes.
**File:** `src/app/api/appointments/route.ts`
**Logic:** `SELECT * FROM appointments JOIN clients ... WHERE start_time > NOW() ORDER BY start_time ASC`.

### **Step 2: Componente Card de Cita**
**Task:** Diseño de la tarjeta individual.
**File:** `src/components/dashboard/AppointmentCard.tsx`
**Props:** `appointment` (Date, Client Name, Status).

### **Step 3: Página de Listado (Dashboard Home)**
**Task:** Ensamblar la página principal.
**File:** `src/app/(protected)/dashboard/page.tsx`
**Logic:** Fetch de datos y mapeo de cards.

### **Step 4: Empty State**
**Task:** Componente visual para cuando no hay datos.
**UI:** Icono grande, texto motivador, botón "Copiar mi Link".

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. API Endpoint | 45m |
| 2. UI Components | 1.5h |
| 3. Integration | 45m |
| **Total** | **3h** |

**Story points:** 3

---

## Definition of Done Checklist
- [ ] El profesional ve sus citas futuras al entrar.
- [ ] Los datos del cliente se muestran correctamente.
- [ ] El orden es cronológico ascendente.
