# 003 · La disponibilidad se calcula, no se guarda

**Fecha:** 2026-06-15

## Estado

Aceptada.

> Decidida al construir la página pública de reserva. Se documenta ahora porque define la forma
> de la API pública y el techo de rendimiento del producto.

## Contexto

La pregunta que el producto contesta todo el día es *"¿qué horarios tiene libres este
profesional tal día?"*. La respuesta sale de cruzar tres cosas: el horario semanal, los turnos
ya tomados y los bloqueos puntuales.

Hay dos formas de contestarla. Una es **mantener una tabla de horarios libres** y leerla. La
otra es **calcularla en el momento**.

La tabla es más rápida de leer, pero hay que mantenerla al día. Y las cosas que la ensucian son
cinco, no una: una reserva, una cancelación, un bloqueo nuevo, un bloqueo borrado y cualquier
cambio en el horario semanal o en la duración del turno. **Cada una es una forma distinta de
quedar desincronizada**, y una tabla de disponibilidad desincronizada ofrece turnos que no
existen: el cliente reserva, y en el otro extremo hay alguien ya sentado en esa silla.

## Decisión

**La disponibilidad se calcula en el momento en que alguien la pide, y no se guarda en ningún
lado.**

Se traen las reglas, los turnos vigentes y los bloqueos **de ese día**, y se recorre la franja
de a un turno por vez descartando el que se pise con algo. Un turno que no termina dentro de la
franja no se ofrece.

Como el cálculo no es la verdad sino una foto, **el control se repite inmediatamente antes de
guardar la reserva**. Eso no cierra la ventana de carrera —para eso hace falta una restricción
en la base—, pero la achica a milisegundos.

## Consecuencias

**Lo que se gana.** No hay nada que invalidar. Un bloqueo nuevo cambia la disponibilidad en el
acto, sin que nadie tenga que acordarse de recalcular nada. El estado del producto vive en un
solo lugar: los turnos.

**Lo que se pierde.** Cada consulta cuesta tres lecturas y un cruce en memoria, y **la
disponibilidad se pide de a un día**: no hay forma barata de contestar *"¿qué tenés libre este
mes?"*. Si esa pregunta aparece, este ADR se reemplaza.

**Lo que queda atado:**

- La API pública toma **un profesional y un día**. Cambiar eso por un rango es cambiar esta
  decisión.
- Queda una **deuda declarada**: la restricción de unicidad para el par profesional–horario, que
  es lo único que cierra del todo la carrera por el mismo turno. Está diferida porque obliga a
  definir qué pasa con los turnos cancelados, que ocupan la misma combinación.
- El volumen se banca porque el tope del plan gratuito mantiene chicas las agendas. **La primera
  cuenta sin tope es el momento de volver a mirar esto.**
