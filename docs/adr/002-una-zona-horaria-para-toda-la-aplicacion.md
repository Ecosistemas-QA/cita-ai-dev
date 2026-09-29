# 002 · Una zona horaria para toda la aplicación

**Fecha:** 2026-06-12

## Estado

Aceptada.

> Decidida durante la construcción del cálculo de disponibilidad, a fines de 2025. Se documenta
> ahora porque está metida en el modelo de datos y en cada pantalla que muestra una hora.

## Contexto

Un turno tiene una hora, y esa hora significa algo distinto según desde dónde se la mire. El
profesional la piensa en la hora de su consultorio. El cliente reserva desde su teléfono. La
base guarda un instante absoluto. El correo llega a cualquier lado.

Si cada una de esas puntas puede tener su propia zona, **la pregunta "¿a qué hora es el turno?"
deja de tener una sola respuesta**, y el error no se ve: se ve una hora, plausible, equivocada
por tres.

Hoy los profesionales de Cita.ai están todos en Argentina, que además no tiene horario de
verano desde 2009. La pregunta es si construir para el caso que existe o para el que podría
existir.

## Decisión

**Toda la aplicación opera en una única zona horaria: `America/Argentina/Buenos_Aires`.**

- Los instantes se **guardan en UTC**, siempre.
- Se **muestran** en la zona de la aplicación, en todas las pantallas y en todos los correos.
- **No hay zona por profesional ni por cliente**, y no existe una columna para eso.
- La zona vive en una constante, con una variable de entorno que la puede cambiar entera.
- Toda conversión pasa por los utilitarios de `src/lib/utils/`. **Ninguna feature arma una fecha
  a mano.**

Se descartó la zona por profesional: obliga a que el cálculo de disponibilidad, las
comparaciones de solapamiento y el armado de cada correo lleven la zona como parámetro, para un
caso que hoy no existe.

## Consecuencias

**Lo que se gana.** Una hora es una hora. El cálculo de disponibilidad compara intervalos sin
preguntarle la zona a nadie, y el correo dice lo mismo que la pantalla.

**Lo que se pierde.** El día que haya un profesional en otro país, **no hay una forma barata de
agregarlo**: hay que agregar la zona al modelo, pasarla por el cálculo y revisar cada lugar
donde hoy se asume la constante. Es una migración, no una feature.

**Lo que queda atado:**

- Un profesional que viaja ve su agenda en la hora de su consultorio, no en la del lugar donde
  está. Es lo correcto para una agenda de trabajo, y conviene que esté dicho.
- El cliente ve los horarios en la zona del profesional, aunque reserve desde otro huso. No se
  le aclara en pantalla: **si alguna vez hay profesionales en dos países, eso pasa a ser
  obligatorio.**
- Cambiar la constante cambia el significado de los datos ya guardados. No es un ajuste de
  presentación.
