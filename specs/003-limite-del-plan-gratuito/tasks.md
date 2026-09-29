---
feature: 003-limite-del-plan-gratuito
spec: ./spec.md
plan: ./plan.md
---

# 003 · Tareas

> Ordenadas por dependencia. Cada tarea cita el criterio de aceptación que ayuda a
> cumplir, y una tarea que no cita ninguno es una tarea que sobra o un criterio que
> falta.

| # | Tarea | Cubre | Estado |
| :-: | :--- | :--- | :--- |
| 1 | Constante única con el tope del plan gratuito | AC-1 | hecha |
| 2 | Conteo de clientes distintos de un profesional, a partir de sus turnos | AC-1, AC-9 | hecha |
| 3 | Control en el endpoint de reserva, **antes de guardar nada** | AC-2 | hecha |
| 4 | Dejar pasar al cliente que ya reservó antes, aunque la cuenta esté en el tope | AC-3 | hecha |
| 5 | Mensaje de rechazo escrito para el cliente, sin mencionar planes ni la cuenta del profesional | AC-4 | hecha |
| 6 | Estado del plan para el panel, con la misma constante y el mismo criterio de conteo | AC-5 | hecha |
| 7 | Aviso en la estructura del panel, visible desde cualquier pantalla, solo con el tope alcanzado | AC-5 | hecha |
| 8 | Botón del aviso hacia el formulario de contacto | AC-6 | hecha |
| 9 | Pantalla de clientes: lista de los que reservaron con ese profesional, ordenada por nombre | AC-7 | hecha |

## Sin cobertura

**AC-8** (el tope no apaga ninguna otra función) no tiene tarea propia, y no debería tenerla:
**se cumple por no hacer nada.** Queda anotado porque es el criterio que se rompe cuando alguien,
más adelante, decide que el límite también debería frenar otra cosa.
