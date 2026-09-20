# Implementation Plan: STORY-CITAAI-8 - Password Recovery

## Overview

Implementar el flujo completo de recuperación de contraseña ("¿Olvidaste tu contraseña?") utilizando Supabase Auth para la gestión segura de tokens y envíos de email.

**Acceptance Criteria a cumplir:**
- ✅ El usuario puede solicitar el reseteo ingresando su email.
- ✅ El sistema envía un email con un link seguro.
- ✅ El usuario puede establecer una nueva contraseña mediante el link.
- ✅ El sistema maneja links expirados o inválidos.

---

## Technical Approach

**Chosen approach:** Utilizar los métodos `resetPasswordForEmail` y `updateUser` de Supabase Auth. Este enfoque delega la generación de tokens seguros y la expiración automática a Supabase.

**Why this approach:**
- ✅ Seguridad robusta (tokens efímeros y no reutilizables).
- ✅ Integración nativa con la base de datos de usuarios de Supabase.
- ✅ Simplifica el backend (no requiere lógica de tokens propia).

---

## Implementation Steps

### **Step 1: Página de Solicitud (`/forgot-password`)**
**Task:** Crear la vista donde el usuario ingresa su email.
**File:** `src/app/forgot-password/page.tsx`
**Logic:** Llamar a `supabase.auth.resetPasswordForEmail(email, { redirectTo: '.../reset-password' })`.

### **Step 2: Página de Nueva Contraseña (`/reset-password`)**
**Task:** Crear la vista de aterrizaje del link del email.
**File:** `src/app/reset-password/page.tsx`
**Logic:**
- El usuario llega aquí con un token en la URL (manejado por Supabase).
- Mostrar formulario de "Nueva Contraseña" y "Confirmar Contraseña".
- Llamar a `supabase.auth.updateUser({ password: newPassword })`.

### **Step 3: Esquema de Validación (Zod)**
**Task:** Esquema para validar la fortaleza de la nueva contraseña.
**File:** `src/lib/validations/auth.ts`

### **Step 4: Manejo de Errores y Feedback**
**Task:** Mostrar mensajes de éxito ("Email enviado") y error ("Link expirado") de forma clara.

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Vista Solicitud | 45m |
| 2. Vista Reset | 1h |
| 3. Esquemas y Lógica | 30m |
| 4. UI/UX Feedback | 30m |
| **Total** | **2.75h** |

**Story points:** 5

---

## Definition of Done Checklist
- [ ] Flujo completo funcional (Email -> Reset -> Login).
- [ ] Validación de password en el reset (min 8 chars).
- [ ] Manejo de estados de carga en ambos formularios.
- [ ] Pantalla de éxito tras el cambio de contraseña.
