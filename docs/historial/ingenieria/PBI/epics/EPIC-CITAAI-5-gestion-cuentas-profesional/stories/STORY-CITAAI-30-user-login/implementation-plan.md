# Implementation Plan: STORY-CITAAI-30 - User Login

## Overview

Implementar un flujo de inicio de sesión seguro y robusto utilizando Supabase Auth, asegurando una experiencia de usuario fluida y manejo de errores consistente.

**Acceptance Criteria a cumplir:**
- ✅ Inicio de sesión exitoso con email y contraseña válidos.
- ✅ Redirección automática al `/dashboard` tras el éxito.
- ✅ Manejo de error para credenciales incorrectas (mensaje genérico).
- ✅ Persistencia de sesión (manejo automático por Supabase/SSR).

---

## Technical Approach

**Chosen approach:** Utilizar Supabase Auth (`signInWithPassword`) integrado con el `AuthContext` actual. La validación previa se realizará con Zod en el cliente para evitar peticiones innecesarias.

**Why this approach:**
- ✅ Seguridad de nivel industrial gestionada por Supabase.
- ✅ Gestión de sesiones (cookies/tokens) automática.
- ❌ Trade-off: Dependencia directa de la API de Supabase Auth.

---

## Implementation Steps

### **Step 1: Esquema de Validación (Zod)**
**Task:** Definir el esquema de login (email y password requeridos).
**File:** `src/lib/validations/auth.ts` (Compartido con registro).
**Testing:** Unit tests del esquema.

### **Step 2: Componentización (LoginForm)**
**Task:** Extraer la lógica de login de la página actual a un componente dedicado.
**File:** `src/components/auth/LoginForm.tsx`
**Structure:** 
- `react-hook-form` con el esquema de Zod.
- Uso del hook `useAuth` si está disponible o cliente de Supabase.
- Manejo de estados `loading` y `error`.

### **Step 3: Refactor de AuthContext**
**Task:** Asegurar que el estado del usuario se actualiza correctamente tras el login.
**File:** `src/contexts/auth-context.tsx`

### **Step 4: Integración en UI**
**Task:** Actualizar `src/app/login/page.tsx` para alternar entre `LoginForm` y `RegisterForm`.

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Esquema Zod | 15m |
| 2. LoginForm Component | 45m |
| 3. Integration & UI | 30m |
| **Total** | **1.5h** |

**Story points:** 3

---

## Definition of Done Checklist
- [ ] Login funcional en UI.
- [ ] Redirección exitosa a zona protegida.
- [ ] Sesión persistente tras recargar.
- [ ] Error "Invalid login credentials" visible al fallar.
