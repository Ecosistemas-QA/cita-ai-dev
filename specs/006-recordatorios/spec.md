---
feature: 006-recordatorios
estado: aprobada
---

# 006 · Recordatorios

## Por qué

El problema que esta feature ataca es el que más plata le cuesta al profesional, y está medido
en las entrevistas: **el cliente que no viene y no avisa.** No es mala fe. Reservó hace tres
semanas, se olvidó, y el horario quedó vacío.

La cancelación por enlace (`004`) resolvió la mitad: el que se acuerda, ahora puede avisar
solo. Falta la otra mitad, que es **acordarse**. Un mensaje el día anterior convierte al que se
olvidó en alguien que cancela con un día de anticipación, y un día alcanza para volver a
ofrecer el horario.

Es la feature que cierra el circuito: reservar, recordar, y —si hace falta— soltar.

## Alcance

**Entra:**

- Un **recordatorio por correo al cliente, el día anterior al turno**, con el detalle y el
  enlace para cancelar.
- Un **horario fijo de envío**, el mismo todos los días.
- El **registro de que el recordatorio salió**, para no mandarlo dos veces.

**No entra:**

- **Recordatorio por WhatsApp o SMS.** Es el canal que todos piden y el que obliga a contratar
  un proveedor, verificar plantillas y guardar teléfonos (`D-1`). Necesita su propio ADR y su
  propia spec.
- **Que el profesional elija cuándo se manda.** Un día antes, para todos. Hacerlo configurable
  multiplica los casos y no se sabe todavía si alguien lo quiere.
- **Recordatorio al profesional.** Él tiene el panel y el aviso de cada reserva.
- **Confirmar asistencia desde el recordatorio** —*"¿vas a venir?"*—. Suma un estado nuevo al
  turno y una pregunta que la mayoría no va a responder. Si más adelante se quiere, es otra
  feature.

## Usuarios y escenarios

**El cliente que reservó hace tres semanas.** La tarde anterior recibe un correo: mañana a las
15, con Laura. Se acuerda, y va.

**El cliente que ya no puede ir.** Recibe el mismo correo y ahí se da cuenta. Usa el enlace de
cancelar que viene adentro y suelta el horario con un día de anticipación.

**El cliente que reservó para mañana, hoy.** Ya sabe que tiene turno mañana: reservó hace un
rato. No necesita que se lo recordemos.

## Criterios de aceptación

| # | Criterio | Cómo se verifica |
| :-: | :--- | :--- |
| 1 | Un turno confirmado para mañana **genera un recordatorio al cliente**, que sale a la hora fija de todos los días | Dejar un turno para el día siguiente y esperar el envío |
| 2 | El recordatorio dice **con quién, qué día y a qué hora**, en la zona de la aplicación (`T-3`) | Leer el correo recibido |
| 3 | El recordatorio **trae el mismo enlace de cancelación** que el correo de confirmación (`004`) | Seguir el enlace del recordatorio |
| 4 | **Un turno cancelado no genera recordatorio** | Cancelar un turno de mañana antes del envío |
| 5 | **Cada turno recibe, como mucho, un recordatorio**, aunque el envío se ejecute dos veces | Ejecutar el envío dos veces seguidas y contar los correos |
| 6 | Un turno **reservado para el día siguiente después de la hora de envío** no genera recordatorio. No se manda nada fuera de la ventana | Reservar para mañana, pasada la hora del envío |
| 7 | **Que un recordatorio falle no afecta a los demás**: el envío sigue con los que quedan | Con un correo inválido entre los turnos del día, el resto igual se manda |
| 8 | El envío **queda registrado**: cuándo corrió, cuántos turnos alcanzó y cuántos fallaron | Mirar el registro después de un envío |

## Casos borde

- **El turno es mañana temprano y se reservó anoche.** Igual se recuerda: la regla es el día
  anterior, no un tiempo mínimo.
- **El cliente tiene dos turnos mañana.** Recibe dos recordatorios, uno por turno. Agruparlos
  es una decisión de forma que hoy no hace falta tomar.
- **El envío no corre un día** —falla, o el servicio está caído—. Los recordatorios de ese día
  **no se mandan tarde**: un recordatorio que llega el mismo día a la mañana no es un
  recordatorio del día anterior, y confunde más de lo que ayuda.
- **El turno se cancela después de que salió el recordatorio.** Nada que hacer: el cliente ya
  recibió el correo y el enlace de cancelación le va a decir que ya está cancelado (`004`).

## Qué se asume

- **Que existe algo que ejecute el envío una vez por día a una hora fija.** Hoy no lo hay, y es
  la condición de esta feature: sin eso, no hay recordatorio.
- Que el correo del cliente sigue siendo válido entre la reserva y el día anterior al turno.
- Que la hora de envío de la tarde es la mejor. No está medido; es la hora en que la gente mira
  el correo personal.
- Que el volumen diario entra en una sola ejecución. Con los números del soft launch, es un
  puñado de turnos por día.

## Preguntas abiertas

Ninguna que bloquee la especificación. **Sí queda una para el plan técnico**, y es la más
pesada: **con qué se dispara el envío diario.** La aplicación no tiene hoy ninguna forma de
ejecutar algo por su cuenta a una hora fija, y de esa decisión depende el costo de toda la
feature.
