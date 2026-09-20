# Backend Setup - Cita.ai MVP

## Database Schema

### 1. `professionals`
- **Propósito:** Almacena la información de los profesionales (usuarios del sistema). Extiende `auth.users`.
- **Columnas:** `id` (FK auth.users), `name`, `email`, `slug` (URL pública), `appointment_duration_minutes`.
- **RLS:**
  - SELECT: Público.
  - INSERT/UPDATE: Solo el propio usuario.

### 2. `clients`
- **Propósito:** Almacena los clientes que reservan citas.
- **Columnas:** `id`, `name`, `email`.
- **RLS:**
  - SELECT: Solo autenticados (profesionales).
  - INSERT: Público (al reservar).

### 3. `appointments`
- **Propósito:** Citas agendadas.
- **Columnas:** `id`, `professional_id` (FK), `client_id` (FK), `start_time`, `end_time`, `status`.
- **RLS:**
  - SELECT/UPDATE: Solo el profesional dueño.
  - INSERT: Público (para permitir reservas).

### 4. `availability_rules`
- **Propósito:** Reglas de disponibilidad recurrente (ej: Lunes 9-18).
- **Columnas:** `id`, `professional_id`, `day_of_week`, `start_time`, `end_time`.
- **RLS:**
  - SELECT: Público.
  - ALL: Solo el profesional dueño.

## Authentication

- **Provider:** Supabase Auth (Email/Password).
- **Librería:** `@supabase/ssr` para integración con Next.js App Router.
- **Context:** `src/contexts/auth-context.tsx` provee el estado de sesión a toda la app.
- **Middleware:** `middleware.ts` protege las rutas `/dashboard` y redirige usuarios logueados fuera de `/login`.

## API Layer

- **Cliente:** `src/lib/supabase/client.ts` (Browser) y `src/lib/supabase/server.ts` (Server Components/Actions).
- **Configuración:** `src/lib/config.ts` centraliza las variables de entorno.
- **Tipos:** `src/types/supabase.ts` generado automáticamente desde el schema.

## Variables de Entorno

Requiere las siguientes variables en `.env`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Ver `.env.example` para más detalles.
