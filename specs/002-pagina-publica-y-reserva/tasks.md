---
feature: 002-pagina-publica-y-reserva
spec: ./spec.md
plan: ./plan.md
---

# 002 · Tareas

> Ordenadas por dependencia. Cada tarea cita el criterio de aceptación que ayuda a
> cumplir, y una tarea que no cita ninguno es una tarea que sobra o un criterio que
> falta.

| # | Tarea | Cubre | Estado |
| :-: | :--- | :--- | :--- |
| 1 | Tablas `clients` y `appointments`, con sus políticas de acceso | AC-4, AC-10 | hecha |
| 2 | Página pública por dirección: lectura anónima del profesional y respuesta de *no existe* | AC-1 | hecha |
| 3 | Cálculo de horarios libres: cruce del horario semanal con turnos y bloqueos, descartando el que no entra completo | AC-2 | hecha |
| 4 | Endpoint público de disponibilidad, con su contrato | AC-2 | hecha |
| 5 | Formulario de reserva: **nombre y correo, nada más**, con validación antes de enviar | AC-3 | hecha |
| 6 | Endpoint público de reserva: validar, reverificar el horario y guardar el turno | AC-2, AC-8 | hecha |
| 7 | **Guardar el cliente con el nombre que escribió**, reutilizando su registro cuando vuelve | AC-4 | hecha |
| 8 | Aviso de horario ocupado cuando el turno se tomó entre la consulta y la reserva | AC-8 | hecha |
| 9 | Pantalla de confirmación con el turno reservado | AC-5 | hecha |
| 10 | Correo de confirmación al cliente, con el detalle y el enlace de cancelación | AC-6 | hecha |
| 11 | Correo de aviso al profesional | AC-7 | hecha |
| 12 | **El envío de correo no puede voltear una reserva ya guardada** (`T-4`) | AC-9 | hecha |
| 13 | Aislamiento entre profesionales: cada uno ve sus propios clientes y sus propios turnos | AC-10 | hecha |

## Sin cobertura

Ninguno. Los diez criterios tienen al menos una tarea.

> **Las tareas 7, 12 y 13 son las que más fácil se dan por hechas sin comprobarse**, porque las
> tres se ven igual cuando funcionan y cuando no: la reserva responde `201` en los tres casos.
> Se verifican mirando el dato guardado, no la respuesta.
