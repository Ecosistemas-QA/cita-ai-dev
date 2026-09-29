# 004 · El cliente final no tiene cuenta

**Fecha:** 2026-06-18

## Estado

Aceptada.

> Es la decisión más vieja del proyecto: se tomó en la reunión de arranque, en noviembre de
> 2024, y está en la minuta. Se documenta ahora porque atraviesa el modelo de datos, la
> privacidad y la seguridad, y nunca estuvo escrita como lo que es: una decisión de
> arquitectura.

## Contexto

En el arranque se preguntó si el cliente final tenía que registrarse. La respuesta fue que no,
y el motivo quedó en una frase: *"Nosotros no le traemos clientes. Le ordenamos los que ya
tiene."* Cita.ai no es un lugar al que la gente entra a buscar profesionales; es la agenda de
un profesional que ya tiene los suyos.

Pedirle cuenta a alguien que va a la peluquería cada dos meses es pedirle que recuerde una
contraseña para algo que usa seis veces por año. Se pierden reservas ahí.

Pero sin cuenta hay tres preguntas que igual hay que contestar: **cómo se reconoce a la persona
que vuelve, qué se guarda de ella, y cómo hace para tocar su turno más tarde.**

## Decisión

**El cliente final no tiene cuenta, no tiene contraseña y no inicia sesión.** Reserva con
nombre y correo.

De ahí salen tres reglas que el modelo tiene que sostener:

1. **Se lo reconoce por su correo.** Es lo único que la persona vuelve a escribir igual. Se
   normaliza —minúsculas, sin espacios— antes de compararlo.
2. **La relación es con cada profesional, no con la plataforma.** La misma persona que reserva
   con dos profesionales distintos son **dos relaciones distintas**, y cada una guarda lo que
   esa persona escribió en ese formulario. Un profesional no hereda —ni pisa— lo que la persona
   cargó en la página de otro.
3. **El enlace de cancelación es su única credencial.** Quien lo tenga puede cancelar ese turno.
   Por eso no se publica, no se indexa y no aparece en ninguna pantalla del profesional.

## Consecuencias

**Lo que se gana.** Reservar son tres campos y un botón. Es la razón por la que el producto
funciona para el cliente que no quiere saber nada con instalar ni registrarse.

**Lo que se pierde.** No hay forma de que el cliente vea *todos* sus turnos en un lugar, ni de
que reciba un historial. Cada turno vive solo, alcanzable por su enlace.

**Lo que queda atado, y es lo que hay que cuidar:**

- **El correo no puede ser único en todo el sistema.** Si una sola fila de cliente representara
  a la persona en toda la plataforma, la regla 2 se rompe: el segundo profesional vería el
  nombre que esa persona escribió en el formulario del primero, y el dato que cargó en el suyo
  se perdería sin que nadie se entere. La unicidad es **por profesional**.
- **Lo que la persona escribe es lo que se guarda.** Es la regla `D-2` de la constitución, y
  nace de acá: el formulario público pide un nombre, así que ese nombre tiene que usarse. Pedir
  un dato que después se descarta es peor que no pedirlo.
- Dos personas que comparten casilla de correo son, para el sistema, la misma. Es el caso raro y
  se asume: pedir más datos para distinguirlas es empezar a construir la cuenta que esta
  decisión descartó.
- Del cliente se guarda **nombre, correo y sus turnos**. Nada más, y nada deducido (`D-1`).
