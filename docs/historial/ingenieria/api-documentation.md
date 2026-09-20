# API Documentation - Cita.ai

Esta documentación describe cómo interactuar con el backend de Supabase. Se recomienda usar el cliente tipado de Supabase (`@supabase/supabase-js`) en lugar de fetch directo.

## Cliente Supabase

```typescript
import { createClient } from '@/lib/supabase/client' // En componentes cliente
// import { createClient } from '@/lib/supabase/server' // En server components

const supabase = createClient()
```

## Endpoints (Tablas)

### Professionals (`public.professionals`)

- **GET (Perfil Propio):**
  ```typescript
  const { data: profile } = await supabase
    .from('professionals')
    .select('*')
    .eq('id', user.id)
    .single()
  ```

- **GET (Perfil Público por Slug):**
  ```typescript
  const { data: profile } = await supabase
    .from('professionals')
    .select('*')
    .eq('slug', 'nombre-profesional')
    .single()
  ```

### Appointments (`public.appointments`)

- **GET (Mis Citas):**
  ```typescript
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, clients(*)')
    .eq('professional_id', user.id)
  ```

- **POST (Nueva Cita):**
  ```typescript
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      professional_id: '...',
      client_id: '...', // Primero crear o buscar cliente
      start_time: '2023-10-27T10:00:00Z',
      end_time: '2023-10-27T11:00:00Z'
    })
  ```

### Availability (`public.availability_rules`)

- **GET (Disponibilidad Pública):**
  ```typescript
  const { data: rules } = await supabase
    .from('availability_rules')
    .select('*')
    .eq('professional_id', 'uuid-del-profesional')
  ```

## Troubleshooting

- **Error 401/403 (RLS):** Verificar que el usuario está autenticado y las políticas RLS permiten la operación.
- **Tipos TypeScript:** Si las columnas no aparecen en el autocompletado, regenerar tipos: `npm run up:types` (si script configurado) o usar el comando de Supabase.
