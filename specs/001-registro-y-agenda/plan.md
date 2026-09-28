---
feature: 001-registro-y-agenda
spec: ./spec.md
---

# 001 · Plan técnico

## Enfoque

La identidad la resuelve el proveedor de autenticación de Supabase (`T-1`): registro con
confirmación por correo, acceso con correo y contraseña, y recuperación por enlace. **Este
producto no guarda ni verifica contraseñas.**

Al registrarse se crea la fila del profesional, con el mismo identificador que la cuenta de
autenticación. Ahí se reserva la dirección pública: se deriva del nombre, y si está tomada se
le agrega un sufijo numérico hasta encontrar una libre.

La agenda son dos tablas y ninguna lógica compartida con los turnos: el **horario semanal** —qué
días y qué franjas— y los **bloqueos puntuales**, que son excepciones con fecha. El cálculo de
disponibilidad las combina, pero eso vive en `002`; acá solo se guardan.

**Guardar el horario reemplaza el anterior entero**, no calcula diferencias. Es la operación que
el profesional entiende —*"esta es mi semana"*— y evita tener que resolver qué pasa con una
franja que se acortó.

Las rutas del panel las protege el middleware, que se limita a ellas con su `matcher`: el resto
de la aplicación —la página pública, la reserva, la cancelación— es anónima y **no tiene que
pagar el costo de una verificación de sesión** en cada pedido.

## Decisiones

| Decisión | Alternativa descartada | Por qué |
| :--- | :--- | :--- |
| Autenticación del proveedor | Sesiones propias con contraseñas en nuestra base | Guardar contraseñas es asumir un riesgo que no le agrega nada al producto. El proveedor ya trae confirmación por correo, recuperación y expiración de sesión |
| La dirección pública se deriva del nombre | Un identificador opaco, o que la elija el profesional | La dirección se comparte por WhatsApp y se dicta por teléfono: tiene que ser el nombre. Elegirla a mano suma una pantalla y una pelea por los nombres cortos |
| Guardar el horario **reemplaza** todo | Calcular altas, bajas y modificaciones | El profesional edita su semana como un todo. Comparar franjas sería más eficiente y mucho más fácil de equivocar |
| Los bloqueos son filas con fecha, aparte del horario semanal | Marcar excepciones sobre la regla semanal | Un bloqueo es un hecho puntual con principio y fin. Mezclarlo con la regla semanal obliga a versionar la regla |
| Una sola duración por profesional | Duración por servicio | El catálogo de servicios es otra feature. Con una duración, la disponibilidad se calcula con una división |

## Modelo de datos

| Tabla | Qué guarda |
| :--- | :--- |
| `professionals` | Una fila por cuenta, con el mismo `id` que la cuenta de autenticación: `name`, `email`, `slug` —la dirección pública, única— y `appointment_duration_minutes` |
| `availability_rules` | Una fila por franja: `professional_id`, `day_of_week`, `start_time`, `end_time`. Varias filas por día son válidas |
| `time_blocks` | Una fila por bloqueo: `professional_id`, `start_time`, `end_time`, con fecha completa |

Las tres llevan RLS con política por operación (`T-2`): el profesional solo alcanza sus propias
filas. La lectura anónima de `professionals` está habilitada para la página pública, y se limita
a lo que esa página muestra.

## Contratos

| Método y ruta | Entrada | Salida | Errores |
| :--- | :--- | :--- | :--- |
| `POST /api/availability/rules` | `{ rules: [...] }` — la semana completa | `{ success: true }` | `401` sin sesión · `500` si falla el guardado |
| `POST /api/availability/blocks` | `{ start_time, end_time }` | El bloqueo creado | `400` si el rango es inválido · `401` sin sesión |
| `DELETE /api/availability/blocks` | `{ id }` | `{ success: true }` | `401` sin sesión · `404` si el bloqueo no es de esta cuenta |
| `PUT /api/professionals/settings` | `{ appointment_duration }` | `{ success: true }` | `400` si la duración **no es uno de los valores previstos** (15, 30, 45, 60, 90, 120) · `401` sin sesión |

## Riesgos

| Riesgo | Impacto | Cómo se mitiga |
| :--- | :--- | :--- |
| **Guardar el horario borra y vuelve a insertar, y las dos operaciones no son una sola** | Si el borrado sale y la inserción falla, el profesional **se queda sin horario** y su página deja de ofrecer turnos sin que nadie se entere | Anotado como deuda: la forma correcta es una función en la base que haga las dos cosas juntas. Mientras tanto, el error se devuelve al profesional para que reintente |
| Los mensajes de error de las pantallas de acceso pueden filtrar el texto del proveedor | Le dicen a quien prueba si un correo está registrado | AC-4 lo cubre para las cuatro pantallas, no solo para el acceso |
| La dirección pública se reserva con una búsqueda y una inserción separadas | Dos registros simultáneos con el mismo nombre pueden pelear por la misma dirección | La columna es única: el segundo falla y reintenta con el sufijo siguiente |
| El bloqueo no mira si hay turnos reservados encima | El profesional cree que liberó la franja y el turno sigue ahí | Es deliberado (`P-2`) y está declarado como caso borde. El turno sigue visible en su panel |

## Qué queda para después

- **Hacer transaccional el guardado del horario**, con una función en la base.
- **Varias personas por cuenta**, que obliga a repensar agenda y página pública.
- **Duración por servicio**, junto con el catálogo.
- **Feriados**, cuando haya con qué calendario resolverlos.
