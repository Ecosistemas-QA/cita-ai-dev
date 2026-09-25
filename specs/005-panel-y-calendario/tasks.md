---
feature: 005-panel-y-calendario
spec: ./spec.md
plan: ./plan.md
---

# 005 · Tareas

> Ordenadas por dependencia. Cada tarea cita el criterio de aceptación que ayuda a
> cumplir, y una tarea que no cita ninguno es una tarea que sobra o un criterio que
> falta.

| # | Tarea | Cubre | Estado |
| :-: | :--- | :--- | :--- |
| 1 | Consulta de turnos futuros del profesional en la página de servidor, con el cliente de sesión | AC-3 | hecha |
| 2 | Tarjetas de estado del panel: turnos de hoy y hora del próximo | AC-1, AC-2 | hecha |
| 3 | Lista de próximos turnos con los datos del cliente | AC-3 | hecha |
| 4 | Cancelación desde la lista: confirmación, llamada a la API y actualización de la pantalla | AC-5 | hecha |
| 5 | Alternancia lista / calendario sobre los mismos datos | AC-4 | hecha |
| 6 | Grilla de mes del panel, con los turnos agrupados por día | AC-4 | hecha |
| 7 | Navegación entre meses de la grilla del panel — **misma lógica que la tarea 9** | AC-6 | hecha |
| 8 | Grilla de mes del calendario público, con días pasados deshabilitados y el día de hoy marcado | AC-7, AC-8 | hecha |
| 9 | Navegación entre meses del calendario público, con el retroceso frenado en el mes en curso — **misma lógica que la tarea 7** | AC-6, AC-7 | hecha |
| 10 | Enganche del día elegido con la búsqueda de disponibilidad existente, y estado vacío | AC-9 | hecha |

## Sin cobertura

**AC-10** (las horas se muestran en la zona horaria de la aplicación) no tiene tarea propia: lo
resuelven los utilitarios de `src/lib/utils/` que ya existen, y esta feature solo los usa. Se
deja anotado para que la verificación no lo saltee por no encontrarle una tarea.
