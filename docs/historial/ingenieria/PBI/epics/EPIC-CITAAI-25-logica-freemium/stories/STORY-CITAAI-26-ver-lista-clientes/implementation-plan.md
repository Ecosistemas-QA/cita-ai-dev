# Implementation Plan: STORY-CITAAI-26 - View Client List

## Overview

Implementar la visualización de la cartera de clientes. Esta vista es fundamental para que el profesional entienda su crecimiento y, técnicamente, es la base para calcular el límite del plan gratuito.

**Acceptance Criteria a cumplir:**
- ✅ Listado de clientes únicos (nombre, email).
- ✅ Orden alfabético o por fecha de última cita.
- ✅ Estado vacío motivador.

---

## Technical Approach

**Chosen approach:** Endpoint dedicado que realiza un `DISTINCT` sobre los clientes asociados a las citas del profesional.

**Why this approach:**
- ✅ Precisión: Asegura que cada persona cuenta como uno solo, independientemente de cuántas citas tenga.

---

## Implementation Steps

### **Step 1: Endpoint de Clientes**
**Task:** Obtener clientes únicos.
**File:** `src/app/api/clients/route.ts`
**Logic:**
```sql
SELECT DISTINCT c.* 
FROM clients c
JOIN appointments a ON c.id = a.client_id
WHERE a.professional_id = current_user
```

### **Step 2: UI - Tabla de Clientes**
**Task:** Componente de tabla simple usando Shadcn UI.
**File:** `src/components/dashboard/ClientList.tsx`
**Columns:** Nombre, Email, Teléfono (si existe), Última Cita.

### **Step 3: Página de Clientes**
**Task:** Integrar en el dashboard.
**File:** `src/app/(protected)/dashboard/clients/page.tsx`

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. API Endpoint | 45m |
| 2. UI Table | 1h |
| 3. Integration | 30m |
| **Total** | **2.25h** |

**Story points:** 2

---

## Definition of Done Checklist
- [ ] La lista muestra solo clientes propios.
- [ ] No hay duplicados.
- [ ] El estado vacío aparece correctamente.
