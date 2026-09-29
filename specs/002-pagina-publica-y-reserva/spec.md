---
feature: 002-pagina-publica-y-reserva
estado: implementada
---

# 002 · Página pública y reserva

## Por qué

El profesional ya tiene cuenta y agenda cargada (`001`), pero eso no le ahorró un solo mensaje:
su agenda la ve él. **Lo que le saca las cuatro horas semanales de WhatsApp es que el cliente
pueda mirar los horarios libres y quedarse con uno, sin preguntarle nada a nadie.**

Del lado del cliente, la condición es no ponerle trámites: el que reserva un turno de peluquería
no va a crear una cuenta, ni va a recordar una contraseña para un lugar al que va cada dos meses
(`P-1`). Deja su nombre y su correo, y listo.

Es la feature que convierte la agenda en un producto: una dirección que el profesional pega en
su perfil de Instagram y que trabaja sola.

## Alcance

**Entra:**

- La **página pública** del profesional, en su dirección propia: quién es y cuánto dura una
  sesión.
- El **cálculo de horarios libres** para un día, cruzando el horario semanal, los bloqueos y los
  turnos ya tomados.
- La **reserva sin cuenta**, con nombre y correo.
- La **pantalla de confirmación**, con el turno que quedó reservado.
- Los **correos de confirmación**: uno al cliente y uno al profesional.

**No entra:**

- **Pagos y señas.** Cita.ai no cobra (`P-5`).
- **Elegir profesional dentro de la página.** Una dirección es una persona; la cuenta compartida
  quedó fuera en `001`.
- **Notas o comentarios del cliente al reservar.** Un campo libre invita a escribir motivos de
  consulta, y eso es dato sensible que este producto no quiere guardar (`D-1`).
- **Lista de espera** para un horario ocupado. Es una feature con su propia complejidad: avisos,
  vencimientos y orden de llegada.
- **Teléfono del cliente.** Se discutió y se dejó afuera: con el correo alcanza para confirmar y
  para cancelar, y un teléfono es un dato más que guardar y proteger.

## Usuarios y escenarios

**El cliente que entra desde Instagram.** Abre la dirección del profesional, ve un calendario,
elige el jueves, ve tres horarios libres, toca el de las 15, deja nombre y correo, y confirma.
Le llega un correo con el detalle.

**El cliente que se decide tarde.** Elige un horario que otro acaba de tomar. El sistema no se
lo da: le avisa y le pide que elija otro.

**El profesional.** Recibe un correo avisándole que tiene un turno nuevo, con el nombre del
cliente. No tiene que estar mirando el panel.

**El cliente que ya vino otras veces.** Reserva igual que la primera vez. No tiene cuenta y no
tiene que recordar nada.

## Criterios de aceptación

| # | Criterio | Cómo se verifica |
| :-: | :--- | :--- |
| 1 | La dirección pública de un profesional **muestra su nombre y la duración de sus sesiones**. Una dirección que no existe responde que no existe | Abrir la dirección del profesional, y después una inventada |
| 2 | Para un día elegido, **se ofrecen solo los horarios que caben en el horario semanal**, no están ocupados por otro turno y no caen dentro de un bloqueo | Cargar horario de 9 a 12 con turnos de 60: se ofrecen 9, 10 y 11. Reservar el de 10 y volver a mirar: queda fuera |
| 3 | **Reservar pide nombre y correo, y nada más.** No pide cuenta, contraseña ni teléfono | Reservar un turno de punta a punta en una ventana sin sesión |
| 4 | **El nombre que escribe el cliente es el que queda guardado**, y es el que ve el profesional en su panel y en el correo (`D-2`) | Reservar con un nombre, y mirar cómo aparece en el panel del profesional |
| 5 | Al confirmar, **el cliente ve en pantalla el turno que quedó reservado**: con quién, qué día y a qué hora | Completar una reserva y leer la pantalla final |
| 6 | **El cliente recibe un correo de confirmación** con el detalle del turno y el enlace para cancelarlo (`004`) | Reservar con una casilla cualquiera —no la del profesional ni la de la cuenta— y esperar el correo |
| 7 | **El profesional recibe un correo** avisándole de la reserva, con el nombre del cliente y el horario | Mirar la casilla del profesional después de una reserva |
| 8 | **Dos personas no pueden quedarse con el mismo horario.** El segundo recibe un aviso claro y el turno del primero no se toca | Reservar el mismo horario dos veces seguidas: la segunda avisa que ya fue tomado |
| 9 | **Si el correo no sale, la reserva igual queda confirmada** y el cliente ve su confirmación en pantalla: el correo es consecuencia, no requisito (`T-4`) | Con el proveedor de correo sin configurar, reservar: el turno queda y la pantalla confirma |
| 10 | Un cliente que reserva con **dos profesionales distintos** es, para cada uno, su propio cliente: ninguno ve los datos que el otro cargó (`D-4`) | Reservar con el mismo correo en dos profesionales, y mirar los dos paneles |

## Casos borde

- **Un día sin horario semanal cargado** no ofrece nada, y lo dice con todas las letras en lugar
  de mostrar una lista vacía.
- **El último horario del día no entra completo.** Si atiende hasta las 12 y el turno dura 60,
  las 11:30 no se ofrece: un turno que termina después del horario no es un turno.
- **Un bloqueo que cae en el medio de una franja** parte la oferta en dos: se ofrece lo de antes
  y lo de después.
- **El mismo correo con otro nombre.** La persona reserva hoy como *"Sofía"* y en tres meses
  como *"Sofía García"*. Vale, y queda el último que escribió (`D-2`).
- **Correo con mayúsculas o espacios de más.** Se normaliza antes de guardar: `Sofia@Mail.com `
  y `sofia@mail.com` son la misma persona.
- **La reserva llega justo cuando el horario se ocupa.** El control se repite inmediatamente
  antes de guardar, para achicar la ventana. Si igual pasa, el segundo recibe el aviso de
  horario ocupado.
- **El profesional llegó al tope de su plan** (`003`): la reserva se rechaza con su propio
  mensaje, no con un error genérico.

## Qué se asume

- Que el cliente escribe un correo al que tiene acceso. No se verifica: pedir verificación es
  pedir una cuenta con otro nombre (`P-1`).
- Que **el correo de confirmación llega a cualquier casilla**, sin importar el dominio.
- Que la dirección pública es la que el profesional comparte, y que no le molesta ser encontrable
  por ella.
- Que el volumen de un día entra en una consulta: se traen las reglas, los turnos y los bloqueos
  de ese día y se cruzan en memoria.

## Preguntas abiertas

Ninguna. La de si convenía **mostrar los horarios de toda la semana** en vez de día por día
quedó cerrada en `clarify`: día por día, porque la pantalla del cliente es un teléfono y una
grilla semanal entera no entra sin achicar la letra.
