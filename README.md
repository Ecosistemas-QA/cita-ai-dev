# Cita.ai

Plataforma de auto-reserva de turnos para profesionales independientes. El profesional
se registra, define su disponibilidad y obtiene una página pública de reservas; el
cliente final reserva **sin crear cuenta**, con nombre y correo, y cancela por un
enlace que le llega por mail.

Modelo freemium: la cuenta gratuita admite hasta **10 clientes únicos**.

---

## Cómo trabaja este equipo

Desde junio de 2026 el desarrollo es **spec-driven**: no se implementa nada que no esté
especificado antes, y la especificación vive en el repositorio, versionada junto al
código que la cumple.

| Carpeta | Qué hay |
| :--- | :--- |
| `.specify/memory/constitution.md` | Las reglas que ninguna feature puede romper |
| `.specify/templates/` | Las plantillas de `spec.md`, `plan.md` y `tasks.md` |
| `specs/<NNN>-<slug>/` | Una carpeta por feature, numerada y **nunca renumerada** |
| `docs/adr/` | Decisiones de arquitectura, una por archivo |
| `docs/historial/` | Lo que el proyecto sabía **antes** de adoptar SDD |
| `src/` | La aplicación |

El ciclo completo y las reglas de trabajo están en **`AGENTS.md`**. Si vas a tocar algo
acá adentro, ese es el archivo que hay que leer primero.

> ⚠️ **`docs/historial/` no se edita.** Es un registro de lo que se sabía en su momento,
> no documentación de trabajo. Si algo de ahí contradice una spec actual, eso es un
> hallazgo que se reporta — no una errata que se limpia.

---

## Puesta en marcha

La plantilla pública está en **[Ecosistemas-QA/cita-ai-dev](https://github.com/Ecosistemas-QA/cita-ai-dev)**.
Usá **Use this template** para crear un repositorio independiente con la rama `main`.
La copia arranca con un historial nuevo y no recibe actualizaciones posteriores de la plantilla.

Hace falta **Node 22** y **pnpm**.

```bash
pnpm install
cp .env.example .env     # completá los valores; ninguno está en el repo
pnpm dev                 # http://localhost:3000
```

Las variables de entorno están documentadas una por una en `.env.example`, con qué
rompe cada una si falta. Tres son obligatorias para que la aplicación levante y una
cuarta —`NEXT_PUBLIC_APP_URL`— no tiene valor por defecto: sin ella los enlaces de
cancelación que salen por correo quedan rotos.

```bash
pnpm build       # compilación de producción
pnpm typecheck   # verificación de tipos
pnpm lint
```

---

## Stack

Next.js 14 con App Router y TypeScript · Supabase para Postgres, autenticación y Row
Level Security · Tailwind y Radix · react-hook-form con zod · date-fns con locale `es` ·
Resend para los correos transaccionales · desplegado en Vercel.

## Publicación de la plantilla

El desarrollo se integra mediante PR en el repositorio privado `jlb984/cita-ai-dev`.
El workflow `sync-public-main.yml` publica únicamente `main` en la plantilla pública,
conservando los commits. No publica otras ramas ni tags. Si el destino tiene cambios
divergentes, la sincronización falla: no sobrescribe su historial.

La plantilla tiene GitHub Actions deshabilitado y no está conectada a un servicio de
despliegue. Las copias creadas desde ella deben configurar sus propias integraciones.
El workflow de sincronización solo corre en `jlb984/cita-ai-dev`; en las copias se omite.

La autenticación usa el secreto de Actions `PUBLIC_MIRROR_SSH_KEY` del repositorio privado.
Su clave pública está registrada como clave SSH con escritura exclusivamente en el destino.
No es una variable de la aplicación y no va en `.env`. Para rotarla, registrá una clave nueva,
actualizá el secreto y retirá la anterior después de verificar la sincronización.
