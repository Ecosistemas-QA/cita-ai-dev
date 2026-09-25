---
feature: 005-panel-y-calendario
spec: ./spec.md
---

# 005 · Plan técnico

## Enfoque

El panel es una página de servidor. Consulta los turnos futuros del profesional con el cliente
de Supabase de sesión —así RLS hace el filtro por cuenta y no hay que confiar en un `where`
(`T-2`)— y le pasa los datos ya resueltos a la lista.

La alternancia entre lista y calendario ocurre del lado del cliente sobre los mismos datos: no
hay una segunda consulta ni una ruta nueva. La vista de calendario agrupa los turnos por día y
los ubica en la grilla del mes.

El calendario público reemplaza el `input type="date"` por una grilla de mes dentro de la
página. Al elegir un día dispara la búsqueda de disponibilidad que ya existe; **nada de la
lógica de turnos cambia**.

> **Las dos grillas se construyen por separado** y no comparten componente: una muestra turnos
> tomados y la otra, días elegibles; los estados de cada celda no se parecen. **Lo que sí es
> igual en las dos es la navegación entre meses**, y eso obliga a una disciplina: un cambio en
> cómo se avanza o se retrocede de mes se aplica en las dos superficies, o quedan desalineadas
> sin que nada falle.

## Decisiones

| Decisión | Alternativa descartada | Por qué |
| :--- | :--- | :--- |
| Grilla propia, armada con `date-fns` | Una librería de calendario | Lo que se necesita es una grilla de mes con celdas deshabilitadas. Una librería trae su propio modelo de estado y su propio manejo de zona horaria, que es justo lo que `T-3` fija de una sola forma |
| Reemplazar el `input type="date"` nativo | Dejarlo y sumar la grilla al lado | El campo nativo abre un diálogo del sistema operativo que tapa la pantalla en mobile y no muestra disponibilidad. Dos formas de elegir fecha en la misma pantalla es una de más |
| Los datos del panel se leen en el servidor | Leerlos desde el navegador con el cliente anónimo | La sesión y RLS viven del lado del servidor. Leer desde el navegador obliga a exponer filtros que hoy resuelve la base |
| Sin actualización en vivo | Suscripción *realtime* de Supabase | Un turno que entra mientras el panel está abierto aparece al recargar. La suscripción suma una conexión abierta por pestaña para un caso que el profesional no vive: mira el panel a la mañana, no todo el día |
| El calendario del panel abre en el mes del próximo turno | Abrir siempre en el mes en curso | Una agenda que arranca el mes que viene abriría en una grilla vacía, y eso se lee como *"no tengo nada"* |

## Modelo de datos

Ninguna tabla nueva. Se leen `appointments` —con el `client_id` resuelto a `clients(name,
email)`— y `professionals.slug` para la tarjeta del perfil público.

Las políticas de RLS existentes alcanzan: un profesional lee los `appointments` cuyo
`professional_id` es el suyo, y los `clients` asociados a esos turnos.

## Contratos

| Método y ruta | Entrada | Salida | Errores |
| :--- | :--- | :--- | :--- |
| `GET /api/public/availability` | `professionalId`, `date` (`yyyy-MM-dd`) | Lista de turnos libres: `{ start, end, label }` | `400` si falta un parámetro |
| `POST /api/appointments/<id>/cancel` | El `id` del turno en la ruta. Requiere sesión | `{ success: true }` | `401` sin sesión · `404` si el turno no es de esta cuenta |

El panel no usa una ruta propia para leer: consulta la base desde el componente de servidor.

## Riesgos

| Riesgo | Impacto | Cómo se mitiga |
| :--- | :--- | :--- |
| **La navegación de meses queda duplicada** en dos componentes | Un arreglo en una superficie deja la otra como estaba, y la diferencia no rompe nada: solo se ve | Queda declarado acá y citado en las dos tareas. Si aparece una tercera superficie con calendario, se extrae a un utilitario |
| La lista de turnos futuros se consulta sin paginar | Una agenda muy cargada trae todo de una | Aceptado mientras rija el tope del plan gratuito (`P-4`). Se revisa con la primera cuenta paga |
| El panel muestra datos del momento en que se cargó | El profesional cancela desde el teléfono y en la pantalla grande sigue viendo el turno | Se recarga al entrar y después de cancelar. Está declarado como caso borde en la spec |

## Qué queda para después

- **Reprogramar un turno** sin cancelarlo y volver a reservarlo.
- **Vista semanal y diaria**, cuando haya agendas que no entren cómodas en la del mes.
- **Exportar a Google Calendar o iCal**: necesita un ADR antes que una spec (`T-1`).
- **Las dos tarjetas en gris** del panel, clientes totales e ingresos del mes.
