---
feature: 004-cancelacion-por-link
estado: implementada
---

# 004 · Cancelación por link

## Por qué

El cliente que reserva no tiene cuenta (`P-1`), así que hoy no tiene forma de deshacer lo que
reservó: escribe por WhatsApp, manda un DM o directamente no avisa. En las entrevistas fue el
problema más caro de todos: *"a él lo que lo mata son las cancelaciones de último momento; le
avisan por DM quince minutos antes, y ese horario ya no lo puede llenar con nadie"*.

El horario que se libera tarde no se llena. El que se libera con dos días se puede volver a
ofrecer. **La distancia entre las dos cosas es cuánto le cuesta avisar al cliente**, y hoy le
cuesta escribir un mensaje y esperar una respuesta.

El correo de confirmación ya llega a su casilla, y es ahí donde el cliente va a buscar cuándo
era el turno. Ahí tiene que estar el botón para soltarlo.

## Alcance

**Entra:**

- Un **enlace de cancelación** en el correo de confirmación que recibe el cliente.
- Una **página pública** que abre ese enlace, muestra de qué turno se trata y pide confirmación
  antes de hacer nada.
- La **cancelación** en sí: el turno queda cancelado y su horario vuelve a ofrecerse.
- El **aviso al profesional** de que le cancelaron.

**No entra:**

- **Reprogramar desde el enlace.** Elegir un horario nuevo es el flujo de reserva completo, con
  su disponibilidad y su formulario. El cliente que quiere mover el turno cancela y reserva de
  nuevo: dos pasos, pero ninguno a medias.
- **Un plazo mínimo para cancelar.** Se discutió poner un límite —*"no se puede cancelar con
  menos de 24 horas de anticipación"*— y se descartó: el que va a faltar igual va a faltar, y
  el profesional prefiere enterarse. Un turno cancelado tarde es mejor dato que un turno que
  nadie ocupa.
- **Un comprobante de cancelación para el cliente.** Acaba de ver la pantalla que se lo
  confirma; un correo más por algo que ya está en la pantalla es ruido.
- **Cancelar varios turnos de una vez.** El enlace es de un turno.

## Usuarios y escenarios

**El cliente que no va a poder ir.** Busca en su correo la confirmación del turno, toca el
enlace de cancelar, ve en pantalla con quién y cuándo era —para asegurarse de que está soltando
el turno correcto—, confirma, y listo. No inicia sesión, no crea cuenta y no contesta nada.

**El cliente que toca el enlace dos veces.** Vuelve al correo viejo y entra de nuevo. La página
le dice que ese turno ya está cancelado, sin volver a cancelarlo y sin mostrarle un error.

**El profesional.** Recibe un correo avisándole que se liberó un horario, con el día y la hora
del turno. No tiene que entrar al panel para enterarse.

## Criterios de aceptación

| # | Criterio | Cómo se verifica |
| :-: | :--- | :--- |
| 1 | El correo de confirmación que recibe el cliente **trae un enlace de cancelación** apuntado a ese turno | Reservar y mirar el correo recibido: el enlace está y lleva el identificador del turno |
| 2 | **El enlace abre una página que muestra el turno** —con quién, qué día y a qué hora— y un botón para confirmar la cancelación. **No pide iniciar sesión** | Abrir el enlace del correo en una ventana sin sesión: se ven el detalle del turno y el botón |
| 3 | Confirmar **deja el turno cancelado**, y el horario vuelve a ofrecerse en la página pública del profesional | Cancelar, y buscar ese mismo horario en la página del profesional: aparece disponible otra vez |
| 4 | Después de confirmar, **el cliente ve que la cancelación se hizo**. No queda esperando ni mirando la pantalla anterior | Confirmar y mirar la pantalla: dice que el turno quedó cancelado |
| 5 | Entrar al enlace de un turno **ya cancelado** muestra que ya estaba cancelado, y no lo vuelve a cancelar | Abrir el mismo enlace dos veces: la segunda avisa que ya fue cancelada |
| 6 | La cancelación **le avisa al profesional** por correo | Cancelar y revisar la casilla del profesional: llega el aviso con el día y la hora del turno liberado |
| 7 | Un enlace con un identificador **que no corresponde a ningún turno** no revela nada: responde que no existe | Cambiar el identificador de la dirección por uno inventado |
| 8 | El turno cancelado **desaparece de la agenda del profesional** | Cancelar, y recargar el panel: el turno ya no está en la lista de próximos |

## Casos borde

- **El turno ya pasó.** El enlace sigue funcionando y la cancelación se acepta. Se decidió no
  bloquearlo: cancelar algo que ya ocurrió no le cambia nada al profesional, y el caso real es
  el cliente que ordena su bandeja tarde.
- **El profesional canceló primero.** El cliente que entra después ve el mismo mensaje de *ya
  cancelada*: para él no hay diferencia entre quién lo hizo.
- **El correo tardó y el turno se canceló desde el panel.** Igual que el anterior: el enlace no
  se rompe, informa.
- **El cliente reenvía el correo a otra persona.** Quien tenga el enlace puede cancelar. Es una
  consecuencia asumida de no pedir cuenta (`P-1`), y por eso el enlace se trata como credencial
  (`D-3`): no se publica, no se indexa y no aparece en ninguna pantalla del profesional.
- **El aviso al profesional no sale.** La cancelación ya ocurrió y no se deshace: el correo es
  consecuencia y no requisito (`T-4`).

## Qué se asume

- **Que el identificador del turno alcanza como credencial.** Es un UUID: no se adivina ni se
  recorre. No caduca y no se invalida después de usarse, porque un enlace vencido en la casilla
  del cliente genera más soporte del que ahorra.
- Que el cliente conserva el correo de confirmación. Si lo borra, se queda sin forma de cancelar
  y vuelve al canal de antes.
- Que el correo de confirmación efectivamente llega a la casilla del cliente. Eso lo garantiza
  `002`; acá se depende de eso.
- Que el horario se libera por el solo hecho de que el turno quede cancelado: la disponibilidad
  se calcula sobre los turnos vigentes y no hay nada que reponer a mano.

## Preguntas abiertas

Ninguna. La del plazo mínimo para cancelar se cerró en `clarify` y quedó escrita arriba, en lo
que no entra.
