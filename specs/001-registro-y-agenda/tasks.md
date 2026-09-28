---
feature: 001-registro-y-agenda
spec: ./spec.md
plan: ./plan.md
---

# 001 · Tareas

> Ordenadas por dependencia. Cada tarea cita el criterio de aceptación que ayuda a
> cumplir, y una tarea que no cita ninguno es una tarea que sobra o un criterio que
> falta.

| # | Tarea | Cubre | Estado |
| :-: | :--- | :--- | :--- |
| 1 | Tablas `professionals`, `availability_rules` y `time_blocks`, con sus políticas de RLS | AC-6, AC-9 | hecha |
| 2 | Registro: formulario, validación de nombre, correo y contraseña antes de enviar | AC-1 | hecha |
| 3 | Alta contra el proveedor de autenticación, con confirmación por correo | AC-2 | hecha |
| 4 | Derivar la dirección pública del nombre y reservarla con sufijo si está tomada | AC-3 | hecha |
| 5 | Acceso con correo y contraseña, y cierre de sesión | AC-5 | hecha |
| 6 | Recuperación y cambio de contraseña, con el enlace que llega por correo | AC-4 | hecha |
| 7 | **Mensajes de error genéricos en las cuatro pantallas de acceso**, sin exponer lo que devuelve el proveedor | AC-4 | hecha |
| 8 | Middleware que deja el panel fuera del alcance de quien no tiene sesión | AC-5 | hecha |
| 9 | Pantalla de horario semanal: días, franjas y guardado que reemplaza la semana completa | AC-6, AC-7 | hecha |
| 10 | Selección de duración del turno entre los valores previstos | AC-8 | hecha |
| 11 | Alta y baja de bloqueos puntuales, sin tocar el horario semanal | AC-9, AC-10 | hecha |

## Sin cobertura

Ninguno. Los diez criterios tienen al menos una tarea.

> **AC-7** (guardar reemplaza el horario anterior por completo) lo cubre la misma tarea 9 que
> guarda el horario, pero **se verifica aparte**: es el criterio que se rompe sin que nadie lo
> note, porque para verlo hay que desmarcar un día y después mirar la página pública.
