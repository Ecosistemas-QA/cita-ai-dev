# Design System - Cita.ai

**Generado:** Fase 3.3 - Frontend Setup
**Fecha:** 2026-01-04
**Estilo Visual:** Moderno/Bold (Gradientes, sombras suaves, bordes redondeados)

---

## 🔗 Integración Backend-Frontend

### Tipos TypeScript Compartidos

**Archivo de tipos:** `src/types/supabase.ts` (generado por Supabase CLI)
**Helper de tipos:** `src/lib/types.ts` (extrae tipos específicos)

**Ejemplo de uso:**

```typescript
import type { Professional } from '@/lib/types'

const ProfessionalCard = ({ professional }: { professional: Professional }) => {
  return <div>{professional.name}</div>
}
```

---

## 🎨 Paleta de Colores

### Colores Principales (Indigo/Purple Theme)

| Color         | Variable Tailwind | Uso                                                           |
| ------------- | ----------------- | ------------------------------------------------------------- |
| **Primary**   | `bg-primary`      | Botones principales, enlaces, bordes activos (Indigo/Purple)  |
| **Secondary** | `bg-secondary`    | Elementos secundarios, fondos de tarjetas destacados          |
| **Accent**    | `bg-accent`       | Badges, estados activos, elementos decorativos                |

### Colores de Sistema

| Color          | Variable Tailwind | Uso                            |
| -------------- | ----------------- | ------------------------------ |
| **Background** | `bg-background`   | Fondo de la aplicación (White/Gray-950) |
| **Card**       | `bg-card`         | Fondo de tarjetas, modales     |
| **Border**     | `border-border`   | Bordes de inputs, separadores  |
| **Text**       | `text-foreground` | Texto principal                |
| **Muted**      | `text-muted`      | Texto secundario, placeholders |

---

## 🧱 Componentes UI

### Button

**Ubicación:** `src/components/ui/button.tsx`

**Variantes:**
- `default`: Gradiente Indigo-Purple, texto blanco.
- `outline`: Borde simple, fondo transparente.
- `ghost`: Sin fondo, texto color primario.
- `destructive`: Rojo para acciones peligrosas.

### Card

**Ubicación:** `src/components/ui/card.tsx`

**Estilo:**
- Fondo blanco (o gris oscuro en dark mode).
- Sombra suave (`shadow-soft`).
- Bordes redondeados (`rounded-xl`).

---

## 📐 Layout

### Estructura: Top Navbar + Contenido

Se ha elegido un layout limpio con **Top Navbar** para la navegación principal, adecuado para la simplicidad del MVP.

**Componentes:**
- `src/components/layout/navbar.tsx`: Barra superior con Logo y User Menu.
- `src/app/layout.tsx`: Layout raíz con AuthProvider.

---

## ✨ Estilo Visual

**Características:**
- **Espaciado:** Generoso (`p-6`, `gap-4`).
- **Bordes:** Redondeados (`rounded-lg` o `rounded-xl`).
- **Sombras:** Sutiles para profundidad (`shadow-sm`, `shadow-md`).
- **Gradientes:** Uso de gradientes en textos clave y botones primarios.

---

## 📖 Guidelines

1. **Usa `lucide-react`** para todos los iconos.
2. **Importa tipos desde `@/lib/types`**.
3. **No hardcodees colores** hex, usa las clases de Tailwind (`bg-primary`, etc.).
4. **Mobile First:** Asegura que todo se vea bien en pantallas pequeñas.
