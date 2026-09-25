---
feature: 005-panel-y-calendario
estado: implementada
---

# 005 · Panel y calendario

## Por qué

El profesional que se registra hoy no tiene dónde mirar su día. Las reservas le llegan por
correo, una por una, y para saber qué tiene mañana a la tarde termina buscando en la bandeja
de entrada y ordenando a mano. Con diez turnos por semana eso ya no cierra, y es el reclamo
más repetido de las entrevistas: *"necesito abrir algo y ver la semana"*.

Del otro lado pasa lo mismo al revés. El cliente que entra a la página pública elige la fecha
en un campo de fecha del sistema operativo, que le tapa la pantalla y no le dice nada sobre
qué días trabaja el profesional: prueba fecha por fecha hasta que aparece un horario.

Las dos puntas necesitan lo mismo — **ver un mes de un vistazo y moverse entre meses** — y por
eso se especifican juntas.

## Alcance

**Entra:**

- El panel del profesional en `/dashboard`: qué tiene hoy, cuál es su próximo turno y la lista
  de los que vienen.
- La lista de próximos turnos, con el dato del cliente y la posibilidad de cancelar.
- La **vista de calendario** del panel, como alternativa a la lista, con los turnos ubicados en
  el día que les toca.
- El **calendario de reserva** de la página pública, en grilla de mes.
- La **navegación entre meses**, que es la misma en los dos calendarios.

**No entra:**

- **Reprogramar un turno.** Mover un turno implica revisar disponibilidad, avisar al cliente y
  resolver qué pasa si el horario nuevo se ocupa mientras tanto. Es una feature propia y no
  entra acá: hoy se cancela y se vuelve a reservar.
- **Vista semanal y vista diaria.** Aparecieron en las entrevistas, pero con el volumen de un
  profesional independiente el mes alcanza. Se revisa cuando haya alguien con agenda llena.
- **Exportar a Google Calendar o iCal.** Pedido en dos entrevistas. Ata el producto a un
  proveedor y merece su propio ADR antes de especificarse.
- **Clientes totales e ingresos del mes.** Las dos tarjetas quedan visibles y en gris, con la
  leyenda *"En desarrollo"*, para no rehacer la grilla cuando lleguen los números. **Mostrar un
  cero sería peor que mostrar un guion**: un cero se lee como un dato.

## Usuarios y escenarios

**El profesional, a primera hora.** Abre el panel y ve, sin hacer nada más, cuántos turnos
tiene hoy y a qué hora es el primero. Abajo, la lista de lo que viene, en orden.

**El profesional que necesita liberar un horario.** Encuentra el turno en la lista, lo cancela
desde ahí, confirma, y el horario vuelve a estar disponible para que otro cliente lo tome.

**El profesional que quiere ver la distribución del mes.** Cambia a la vista de calendario y ve
los turnos repartidos por día. Se mueve al mes siguiente y vuelve.

**El cliente que entra a reservar.** Ve la grilla del mes en curso, con los días pasados
apagados. Elige un día y aparecen los horarios libres de ese día. Si no encuentra nada, avanza
al mes siguiente.

## Criterios de aceptación

| # | Criterio | Cómo se verifica |
| :-: | :--- | :--- |
| 1 | La tarjeta **Citas Hoy** cuenta los turnos de hoy que no están cancelados | Con dos turnos hoy y uno cancelado, la tarjeta dice `2` |
| 2 | La tarjeta **Próxima Cita** muestra la hora del primer turno futuro, y `--:--` cuando no hay ninguno | Cuenta sin turnos futuros: dice `--:--` |
| 3 | La lista muestra **solo turnos futuros y no cancelados**, del más cercano al más lejano | Un turno de ayer y uno cancelado no aparecen; los demás salen en orden |
| 4 | El profesional puede alternar entre **vista de lista y vista de calendario**, y en la de calendario cada turno aparece en su día | Se alterna con el botón; un turno del 14 aparece en la celda del 14 |
| 5 | **Cancelar un turno desde el panel pide confirmación**, y al confirmar el turno queda cancelado: desaparece de la lista, libera el horario y **sigue sin aparecer después de recargar** | Cancelar, recargar el panel, y consultar el mismo horario en la página pública: vuelve a ofrecerse |
| 6 | **Los dos calendarios se mueven de a un mes.** `›` avanza exactamente un mes y `‹` retrocede exactamente uno, así que ir y volver deja el calendario en el mes de partida | Parado en septiembre: `›` muestra octubre, `‹` vuelve a septiembre. Se verifica en el calendario del panel y en el público |
| 7 | En el calendario público **los días anteriores a hoy no se pueden elegir**, y no se puede retroceder más allá del mes en curso | Los días pasados salen apagados y no responden al clic; en el mes en curso, `‹` está deshabilitado |
| 8 | El día de hoy se distingue visualmente del día elegido | Sin elegir nada, hoy aparece marcado; al elegir otro día, se distinguen entre sí |
| 9 | Elegir un día en el calendario público **trae los horarios libres de ese día**, y avisa cuando no hay ninguno | Un día sin disponibilidad muestra *"No hay horarios disponibles para este día"* |
| 10 | Todas las horas se muestran en la zona horaria de la aplicación (`T-3`), tanto en el panel como en la página pública | Un turno guardado a las `13:00` locales se ve `13:00` en los dos lados |

## Casos borde

- **Cuenta recién creada, sin ningún turno.** La lista no queda vacía a secas: muestra la
  invitación a compartir el perfil público, que es la acción que sigue.
- **El próximo turno cae en otro mes.** La vista de calendario del panel abre en el mes del
  próximo turno y no en el mes en curso. Es a propósito: abrir en un mes vacío haría pensar que
  no hay nada agendado.
- **El mes no arranca el lunes.** La grilla deja los huecos del principio en blanco; ningún día
  se corre de columna.
- **El turno se canceló desde otro lado** —el cliente usó el enlace del correo mientras el
  profesional tenía el panel abierto—. Al recargar, el turno ya no está. No hay aviso en vivo:
  el panel no escucha cambios.
- **Un día con varios turnos** en la vista de calendario: la celda los lista a todos, no muestra
  solo el primero.

## Qué se asume

- Que el profesional atiende en una sola zona horaria, la de la aplicación (`T-3`). Un
  profesional que viaje verá sus turnos en la hora de su agenda, no en la del lugar donde está.
- Que la cantidad de turnos futuros de una cuenta entra en una sola consulta sin paginar. Con el
  tope del plan gratuito (`P-4`) es una apuesta segura; con cuentas más grandes hay que volver.
- Que cancelar desde el panel **notifica al cliente**. La notificación en sí se especifica en
  `002`; acá se asume que ocurre.
- Que el calendario del panel no necesita actualizarse solo. Se recarga al entrar y después de
  cancelar.

## Preguntas abiertas

Ninguna. La única que quedó de `clarify` —si la vista de calendario tenía que ser la de entrada
en lugar de la lista— se resolvió a favor de la lista: es la que responde *"¿qué tengo ahora?"*,
que es la pregunta con la que el profesional abre el panel.
