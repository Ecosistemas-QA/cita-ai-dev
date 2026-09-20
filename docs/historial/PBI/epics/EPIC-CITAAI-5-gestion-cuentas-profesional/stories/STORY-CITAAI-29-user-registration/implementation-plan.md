# Implementation Plan: STORY-CITAAI-29 - User Registration

## Overview

Refinar el flujo de registro de profesionales para cumplir con los estándares de arquitectura y negocio de Cita.ai.

**Acceptance Criteria a cumplir:**
- ✅ Registro exitoso con nombre, email y password.
- ✅ Generación automática de un `slug` único (ej: dr-juan-perez).
- ✅ Validación robusta de password (min 8 chars).
- ✅ Manejo de error de email duplicado.

---

## Technical Approach

**Chosen approach:** Utilizar Supabase Auth para la gestión de usuarios, integrando un trigger de base de datos (o lógica en cliente) para asegurar la creación del perfil en la tabla `professionals` con su correspondiente `slug`.

**Why this approach:**
- ✅ Delega la seguridad crítica a Supabase.
- ✅ Asegura integridad referencial entre Auth y Public Schema.
- ❌ Trade-off: Requiere configuración de DB (Triggers) para automatización total.

---

## Implementation Steps

### **Step 1: Esquema de Validación (Zod)**
**Task:** Definir el esquema de registro compartido.
**File:** `src/lib/validations/auth.ts`
**Testing:** Unit tests del esquema.

### **Step 2: Lógica de Generación de Slug**
**Task:** Crear utilidad para generar slugs amigables a partir del nombre.
**File:** `src/lib/utils/slug.ts`
**Logic:** `slugify(name) + randomSuffix if needed`.

### **Step 3: Componentización (RegisterForm)**
**Task:** Extraer el formulario de registro de la página de login actual.
**File:** `src/components/auth/RegisterForm.tsx`
**Structure:** 
- Use `react-hook-form` con el esquema de Zod.
- Manejar estados de carga y errores del `AppError`.

### **Step 4: Refactor de Página de Login**
**Task:** Limpiar `src/app/login/page.tsx` para que solo orqueste los componentes `LoginForm` y `RegisterForm`.

### **Step 5: Integración con Perfil (Trigger Supabase)**
**Task:** Asegurar que al registrarse se cree la entrada en `professionals`.
**Note:** Usar Supabase MCP para verificar el trigger actual o crear uno nuevo.

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Esquema Zod | 30m |
| 2. Utilidad Slug | 30m |
| 3. RegisterForm Component | 1h |
| 4. Integration & UI | 1h |
| **Total** | **3h** |

**Story points:** 5

---

## Definition of Done Checklist
- [ ] Registro funcional en UI.
- [ ] Perfil creado en tabla `professionals` con slug correcto.
- [ ] Tests unitarios de validación pasando.
- [ ] Linting y Build sin errores.
