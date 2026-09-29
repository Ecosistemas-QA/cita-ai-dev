---
feature: 002-pagina-publica-y-reserva
spec: ./spec.md
---

# 002 · Plan técnico

## Enfoque

La página pública se resuelve en el servidor: busca al profesional por su dirección y, si no
existe, responde que no existe. Lo que se lee de ahí es lo mínimo que la página muestra —nombre
y duración—, porque es una lectura anónima.

Los horarios libres se calculan **en el momento en que el cliente elige un día**, no se guardan.
Se traen las tres cosas de ese día —el horario semanal, los turnos vigentes y los bloqueos— y se
cruzan: se recorre la franja de a un turno por vez y se descarta el que se pise con algo. Un
turno que no termina dentro de la franja no se ofrece.

**El cálculo no se guarda a propósito.** Una tabla de horarios libres habría que mantenerla al
día con cada reserva, cada cancelación y cada cambio de agenda, y cada una de esas es una forma
de quedar desincronizada.

La reserva es un endpoint público, sin sesión posible, así que corre del lado del servidor con
la clave de servicio (`T-2`). Hace cinco cosas en orden: valida, controla el tope del plan
(`003`), vuelve a verificar que el horario siga libre, guarda el turno y manda los correos.

El correo sale por **el servicio de correo transaccional del mismo proveedor que la base**, que
es el que ya está en el stack (`T-1`): no suma un servicio más ni una cuenta más que administrar.

> **El control del horario se hace dos veces**: una al calcular lo que se ofrece y otra
> inmediatamente antes de guardar. No cierra la ventana de carrera del todo —para eso hace falta
> una restricción en la base—, pero la achica a milisegundos.

## Decisiones

| Decisión | Alternativa descartada | Por qué |
| :--- | :--- | :--- |
| Los horarios libres se calculan al vuelo | Una tabla de disponibilidad precalculada | La tabla hay que invalidarla con cada reserva, cancelación, bloqueo y cambio de horario. El cálculo es una división y un cruce de intervalos: sale más barato hacerlo que mantenerlo |
| El cliente se identifica **por su correo** | Un identificador propio por profesional | El correo es lo único que la persona vuelve a escribir igual. Es lo que permite reconocerla cuando vuelve |
| Correo transaccional del proveedor de la base | Un servicio de correo aparte | Ya está en el stack y no agrega cuenta, clave ni ADR (`T-1`). Si aparece una necesidad que no cubra, se decide con un ADR y se cambia |
| Doble control del horario antes de guardar | Una restricción de unicidad en la base | La restricción es lo correcto y está anotado como deuda. Se difirió porque obliga a definir qué pasa con los turnos cancelados, que ocupan la misma fila |
| Sin campo de notas | Un campo libre al reservar | Un campo libre en un turno de salud se llena con motivos de consulta. Es dato sensible que preferimos no tener (`D-1`) |

## Modelo de datos

| Tabla | Qué guarda |
| :--- | :--- |
| `clients` | El cliente final: `name` y `email`. **No tiene cuenta ni contraseña** |
| `appointments` | `professional_id`, `client_id`, `start_time`, `end_time` y `status` (`confirmed` o `cancelled`) |

La página pública lee `professionals` de forma anónima, limitada a las columnas que muestra. La
escritura del turno y del cliente la hace el endpoint con la clave de servicio, porque el que
reserva no tiene sesión.

> **El cliente se busca por correo antes de crearlo**, para no duplicar a la persona que vuelve.
> Si ya existe, se reutiliza su fila y se le asocia el turno nuevo.

## Contratos

| Método y ruta | Entrada | Salida | Errores |
| :--- | :--- | :--- | :--- |
| `GET /api/public/availability` | `professionalId`, `date` (`yyyy-MM-dd`) | `[{ start, end, label }]` | `400` si falta un parámetro |
| `POST /api/public/appointments` | `{ professionalId, startTime, clientName, clientEmail }` | `201` con el turno creado | `400` datos incompletos o inválidos · `403` tope del plan alcanzado · `404` profesional inexistente · `409` horario ocupado |

El detalle formal, con ejemplos de cada respuesta, está en [`contracts/`](./contracts/).

## Riesgos

| Riesgo | Impacto | Cómo se mitiga |
| :--- | :--- | :--- |
| **Dos reservas simultáneas sobre el mismo horario** | Dos clientes creen tener el mismo turno y el profesional se entera en el momento | Doble control, y la restricción en la base queda como deuda declarada |
| **El correo del cliente es la clave con la que se lo reconoce** | Dos personas que comparten casilla son, para el sistema, la misma persona | Aceptado: es el caso raro, y pedir más datos rompe `P-1`. **Lo que no se acepta es que el dato que la persona escribe no se use** (`D-2`) |
| El envío de correo depende de un servicio externo al proceso | Un turno reservado del que nadie se entera | El envío va después de guardar y no puede voltear la reserva (`T-4`). Los fallos quedan registrados |
| La lectura anónima de `professionals` | Exponer de más | La política limita las columnas a lo que la página muestra. Cualquier columna nueva se revisa antes de sumarla |

## Qué queda para después

- **Restricción de unicidad** para el par profesional–horario, que cierra la carrera del todo.
- **Lista de espera** para horarios ocupados.
- **Verificación del correo del cliente**, si aparecen reservas falsas.
- **Reserva de varios turnos** en una sola operación.
