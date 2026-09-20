# Implementation Plan: STORY-CITAAI-28 - Upgrade Banner

## Overview

Implementar el componente visual que informa al profesional sobre su estado de "límite alcanzado" e invita a la acción (Upgrade).

**Acceptance Criteria a cumplir:**
- ✅ Visibilidad condicional (solo si límite >= 10).
- ✅ Diseño prominente pero no intrusivo (no modal bloqueante).
- ✅ Botón de acción claro ("Upgrade" o "Contactar").

---

## Technical Approach

**Chosen approach:** Un Server Component en el `layout.tsx` del dashboard que verifica el estado del plan una vez por renderizado.

**Why this approach:**
- ✅ Performance: No requiere fetch del lado del cliente.
- ✅ Consistencia: Aparece en todas las sub-páginas del dashboard.

---

## Implementation Steps

### **Step 1: Función de Estado de Plan**
**Task:** Helper para obtener estado actual.
**File:** `src/lib/business/plan-status.ts`
**Logic:** Reutilizar lógica de conteo de CITAAI-27. Return `{ isLimitReached: boolean }`.

### **Step 2: Componente Banner**
**Task:** UI del banner.
**File:** `src/components/dashboard/UpgradeBanner.tsx`
**Style:** `bg-amber-100 text-amber-900 border-amber-200`.

### **Step 3: Integración en Layout**
**Task:** Inyectar en `src/app/(protected)/dashboard/layout.tsx`.
**Logic:**
```tsx
const status = await getPlanStatus(user.id);
return (
  <>
    {status.isLimitReached && <UpgradeBanner />}
    {children}
  </>
)
```

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Business Logic | 30m |
| 2. UI Component | 45m |
| 3. Integration | 30m |
| **Total** | **1.75h** |

**Story points:** 2

---

## Definition of Done Checklist
- [ ] Banner aparece para usuarios al límite.
- [ ] Banner NO aparece para usuarios nuevos.
- [ ] El botón lleva a la página correcta.
