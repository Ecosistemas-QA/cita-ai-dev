---
feature: 003-limite-del-plan-gratuito
estado: implementada
---

# 003 · Límite del plan gratuito

## Por qué

Cita.ai se usa gratis. Eso está bien para que el profesional pruebe sin hablar con nadie, pero
el producto tiene que tener un lugar donde empiece a cobrar, y ese lugar tiene que ser **el que
demuestra que el producto le sirve**.

El corte no puede ser por funciones: un profesional al que le escondemos la mitad del producto
no llega a ver si le sirve, y `P-4` lo prohíbe. El corte es por tamaño. **La cuenta gratuita
admite hasta diez clientes distintos**; el que pasa de ahí ya no está probando, está trabajando.

El número no es arbitrario: con diez clientes recurrentes, la agenda ya reemplazó al cuaderno.

## Alcance

**Entra:**

- El **tope de diez clientes únicos** por cuenta gratuita.
- El **rechazo de la reserva** cuando la haría un cliente nuevo y la cuenta ya llegó al tope,
  con un mensaje que el cliente pueda entender.
- El **aviso en el panel** cuando la cuenta llegó al tope.
- La **lista de clientes** del profesional, para que el tope sea algo que pueda mirar.
- El **camino para pasarse a un plan pago**: un formulario de contacto.

**No entra:**

- **El plan pago en sí.** Todavía no hay planes, ni precios, ni cobro: el producto no cobra
  (`P-5`). El botón lleva a un formulario, no a una caja.
- **Bloquear funciones del panel al llegar al tope.** La agenda, los bloqueos, las
  cancelaciones y los correos siguen funcionando igual. El tope frena clientes nuevos, nada más
  (`P-4`).
- **Avisos escalonados** —*"te quedan dos"*—. Se evaluó y se dejó para cuando exista el plan
  pago: avisar de un límite que todavía no se puede levantar es apurar a alguien que no tiene
  a dónde ir.
- **Borrar clientes para hacer lugar.** Un cliente no se borra: es historia de turnos.

## Usuarios y escenarios

**El profesional que arranca.** No se entera de que existe un tope. Reserva tras reserva, nada
le avisa nada, y está bien.

**El profesional que llegó a diez.** Entra al panel y ve un aviso de que alcanzó el límite del
plan gratuito, con un botón para pedir información. Todo lo demás sigue funcionando.

**Un cliente nuevo que intenta reservar con esa cuenta.** No lo logra: la pantalla le dice que
ese profesional no está tomando clientes nuevos. **No le decimos que el profesional no paga**:
no es asunto del cliente.

**Un cliente de los diez, que vuelve.** Reserva sin problema. El tope es de personas distintas,
no de turnos.

## Criterios de aceptación

| # | Criterio | Cómo se verifica |
| :-: | :--- | :--- |
| 1 | Una cuenta gratuita admite **hasta diez clientes distintos** | Reservar con diez correos distintos: los diez entran |
| 2 | La reserva **número once, con un correo nuevo, se rechaza**, y el turno no queda creado | Intentar con un correo nuevo: la pantalla avisa y el horario sigue libre |
| 3 | **Un cliente que ya reservó antes puede seguir reservando** aunque la cuenta esté en el tope | Con la cuenta en diez, reservar con uno de esos diez correos: entra |
| 4 | El mensaje que ve el cliente rechazado **no menciona planes, pagos ni el estado de la cuenta del profesional** | Leer el mensaje del rechazo |
| 5 | El panel **muestra el aviso de límite alcanzado cuando la cuenta llegó a diez**, y no antes | Con nueve clientes, el panel no lo muestra; con diez, sí |
| 6 | El aviso lleva a un **formulario de contacto** para pedir información | Tocar el botón del aviso |
| 7 | La lista de clientes muestra **a los clientes que reservaron con ese profesional**, ordenados por nombre, y a nadie más | Comparar la lista con los turnos de la cuenta |
| 8 | **El tope no apaga ninguna otra función** del producto: agenda, bloqueos, panel, cancelaciones y correos siguen igual | Con la cuenta en el tope, cambiar el horario semanal y cancelar un turno |
| 9 | Cuenta como cliente **cada persona distinta que reservó alguna vez**, incluidas las que después cancelaron | Cancelar el turno de uno de los diez y probar con un correo nuevo: sigue rechazando |

## Casos borde

- **Cliente que canceló y no volvió.** Sigue ocupando lugar. Es a propósito: si cancelar
  liberara un lugar, el tope se esquiva cancelando.
- **El mismo cliente en dos profesionales distintos.** Ocupa un lugar en cada cuenta. Son
  relaciones distintas (`D-4`).
- **El correo escrito con mayúsculas.** `Sofia@Mail.com` y `sofia@mail.com` son la misma
  persona y ocupan un solo lugar.
- **No se puede determinar cuántos clientes tiene la cuenta.** No se bloquea: se deja reservar.
  Un cliente de más es más barato que una reserva perdida por un error nuestro.
- **La cuenta llega al tope con el cliente en la pantalla de reserva.** El rechazo llega al
  confirmar, no antes: la disponibilidad no depende del plan.

## Qué se asume

- Que todas las cuentas son gratuitas. **No hay plan pago todavía**, así que no hay cuentas
  exentas ni topes distintos por cuenta.
- Que diez es el número, y que va a cambiar cuando existan planes. Vive en un solo lugar del
  código para que cambiarlo sea cambiar un número.
- Que el profesional prefiere enterarse en el panel y no por correo: el tope no es una urgencia.
- Que el cliente rechazado va a escribirle al profesional por otro lado. Es el resultado
  esperado: es lo que hace que el profesional se entere de que el tope le está costando algo.

## Preguntas abiertas

Ninguna. La de si el tope tenía que contar **clientes** o **turnos** se cerró en `clarify`:
clientes. Un tope de turnos castiga al profesional que más usa el producto, que es justo el que
queremos que se quede.
