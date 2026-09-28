---
feature: 004-cancelacion-por-link
spec: ./spec.md
plan: ./plan.md
---

# 004 · Tareas

> Ordenadas por dependencia. Cada tarea cita el criterio de aceptación que ayuda a
> cumplir, y una tarea que no cita ninguno es una tarea que sobra o un criterio que
> falta.

| # | Tarea | Cubre | Estado |
| :-: | :--- | :--- | :--- |
| 1 | Armar el enlace de cancelación con la dirección de la aplicación y el identificador del turno, y declarar la variable en `.env.example` | AC-1 | hecha |
| 2 | Incluir el enlace en la plantilla del correo de confirmación del cliente | AC-1 | hecha |
| 3 | Página pública `/cancelar/<id>`: leer el turno y mostrar profesional, día y hora **sin pedir sesión** | AC-2 | hecha |
| 4 | Estado *ya cancelada* en esa misma página, sin botón de confirmar | AC-5 | hecha |
| 5 | Respuesta de *no existe* cuando el identificador no corresponde a ningún turno | AC-7 | hecha |
| 6 | Endpoint `POST /api/public/appointments/<id>/cancel`: pasar el turno a `cancelled` | AC-3 | hecha |
| 7 | Rechazo con `409` cuando el turno ya estaba cancelado | AC-5 | hecha |
| 8 | Botón de confirmación en la página, con el resultado a la vista del cliente | AC-4 | hecha |
| 9 | Aviso por correo al profesional después de cancelar, sin bloquear la cancelación si el envío falla | AC-6 | hecha |

## Sin cobertura

**AC-8** (el turno cancelado desaparece de la agenda del profesional) no tiene tarea propia: el
panel ya filtra los turnos cancelados y esta feature solo cambia el estado. Se deja anotado
porque el criterio igual hay que verificarlo — es la forma en que el profesional se entera de
que el horario se liberó.
