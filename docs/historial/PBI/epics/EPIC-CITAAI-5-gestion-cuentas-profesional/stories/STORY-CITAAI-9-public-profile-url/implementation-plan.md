# Implementation Plan: STORY-CITAAI-9 - Public Profile URL

## Overview

Implementar la lógica para generar y asignar automáticamente un "slug" único y amigable (URL pública) a cada profesional durante su registro.

**Acceptance Criteria a cumplir:**
- ✅ Generación automática de slug basada en el nombre completo (ej: "Juan Pérez" -> "juan-perez").
- ✅ Normalización de caracteres (quitar acentos, convertir a minúsculas, guiones por espacios).
- ✅ Manejo de colisiones mediante sufijos numéricos (ej: "juan-perez-2").
- ✅ Persistencia del slug en la tabla `professionals`.

---

## Technical Approach

**Chosen approach:** Implementar una utilidad de generación de slugs en TypeScript que se ejecute durante el flujo de registro. La lógica verificará la disponibilidad en la DB antes de confirmar el valor final.

**Why this approach:**
- ✅ Asegura URLs consistentes y legibles.
- ✅ Evita errores de duplicidad mediante validación previa en DB.
- ❌ Trade-off: Requiere una consulta adicional (SELECT) durante el registro para verificar colisiones.

---

## Implementation Steps

### **Step 1: Utilidad de Normalización**
**Task:** Crear una función que limpie el string de entrada.
**File:** `src/lib/utils/slug.ts`
**Logic:**
- `trim()`, `toLowerCase()`.
- Reemplazar caracteres con acentos por sus versiones base (ej: á -> a).
- Reemplazar espacios y caracteres no alfanuméricos por guiones.
- Remover guiones duplicados.

### **Step 2: Lógica de Unicidad en DB**
**Task:** Crear una función que busque colisiones y genere el sufijo si es necesario.
**File:** `src/lib/supabase/professionals.ts`
**Logic:**
1. Generar slug base.
2. `SELECT count(*) FROM professionals WHERE slug LIKE 'base-slug%'`.
3. Si existe, agregar `-N` donde N es count + 1.

### **Step 3: Integración en el Registro**
**Task:** Actualizar el flujo de registro para incluir el slug generado.
**File:** `src/app/api/auth/register/route.ts` (o donde se maneje el INSERT en `professionals`).
**Note:** Si el registro se hace vía Supabase Auth con Triggers, la lógica del slug debería residir en una Database Function de Postgres (PL/pgSQL) para máxima eficiencia.

### **Step 4: Database Constraint (Supabase)**
**Task:** Asegurar que el campo `slug` tiene un índice único.
**Tool:** Supabase Dashboard o Migration.

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Utilidad Slug | 30m |
| 2. Lógica Unicidad | 45m |
| 3. Integración | 30m |
| 4. Database Config | 15m |
| **Total** | **2h** |

**Story points:** 2

---

## Definition of Done Checklist
- [ ] Función `generateSlug` probada con casos de borde (acentos, símbolos).
- [ ] Registro de usuario nuevo crea perfil con slug correcto.
- [ ] Dos usuarios con mismo nombre obtienen slugs diferentes.
- [ ] El campo `slug` es inmutable desde el registro inicial (en este MVP).
