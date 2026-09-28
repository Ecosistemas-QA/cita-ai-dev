---
feature: 001-registro-y-agenda
estado: implementada
---

# 001 · Registro y agenda

## Por qué

Un profesional independiente coordina sus turnos por WhatsApp. La entrevista lo dejó medido:
*"cuatro horas por semana"* de ida y vuelta para acomodar gente que pregunta si hay lugar el
jueves. No es que le falte una agenda —tiene una, en papel o en el teléfono—: **le falta que
otro pueda consultarla sin preguntarle a él**.

Para que eso exista, primero tienen que existir dos cosas: una cuenta suya, y las reglas de
cuándo atiende. Todo lo demás del producto —la página pública, la reserva, los avisos— se apoya
en esas dos.

Esta es la feature que abre el producto, así que también define cómo se entra: registro, acceso,
y qué hacer cuando alguien se olvida la contraseña.

## Alcance

**Entra:**

- **Registro** del profesional con nombre, correo y contraseña, con confirmación por correo.
- **Acceso** con correo y contraseña, y **cierre de sesión**.
- **Recuperación y cambio de contraseña**.
- **Dirección pública propia**, derivada del nombre, reservada en el momento del registro.
- **Horario semanal**: qué días atiende y en qué franjas.
- **Duración del turno**, una sola para toda la agenda.
- **Bloqueos puntuales**: un rato o un día en que no atiende, sin tocar el horario semanal.
- **Protección del panel**: sin sesión, no se entra.

**No entra:**

- **Varios profesionales en una misma cuenta.** Apareció en una entrevista —una estilista con
  dos personas a cargo— y se dejó afuera a conciencia: obliga a repensar agenda, página pública
  y cobro. Es otro producto.
- **Duración distinta por tipo de servicio.** Hoy la duración es una sola. Un catálogo de
  servicios con duraciones y precios propios es una feature en sí misma.
- **Feriados automáticos.** El calendario de feriados cambia por país y por año. Se cubre con
  bloqueos puntuales hasta que haya demanda real.
- **Inicio de sesión con Google.** Suma un proveedor de identidad y su ADR; con correo y
  contraseña alcanza para empezar.

## Usuarios y escenarios

**El profesional que se registra.** Deja nombre, correo y contraseña, confirma desde el correo
que le llega y entra al panel. Su dirección pública ya existe desde ese momento.

**El profesional que configura su semana.** Marca los días que atiende y la franja de cada uno,
elige cuánto dura un turno, y guarda. A partir de ahí su página pública ofrece horarios.

**El profesional que se va de viaje el martes.** Bloquea ese día. El horario semanal no se
toca: cuando vuelve, sigue igual que antes.

**El profesional que se olvidó la contraseña.** Pide el enlace, le llega al correo, define una
nueva y entra.

**Alguien sin cuenta que prueba una dirección del panel.** No entra, y termina en la pantalla de
acceso.

## Criterios de aceptación

| # | Criterio | Cómo se verifica |
| :-: | :--- | :--- |
| 1 | El registro pide **nombre, correo y contraseña**, y rechaza los tres vacíos o mal formados antes de mandar nada | Correo sin `@`, contraseña de menos de 8 caracteres: no avanza y dice cuál está mal |
| 2 | Después de registrarse, el profesional **recibe un correo para confirmar la cuenta** | Registrarse y mirar la casilla |
| 3 | El registro **reserva una dirección pública derivada del nombre**, y si ya está tomada, le agrega un sufijo hasta encontrar una libre | Registrar dos cuentas con el mismo nombre: la segunda queda con la dirección numerada |
| 4 | **Los mensajes de error de las pantallas de acceso son genéricos**: no dicen si el correo existe, y no muestran el texto que devuelve el proveedor de identidad. Vale para acceso, registro, recuperación y cambio de contraseña | Probar las cuatro pantallas con un correo inexistente, uno ya registrado y una contraseña mal: ningún mensaje distingue entre esos casos ni menciona al proveedor |
| 5 | Con la sesión iniciada se entra al panel; **sin sesión, cualquier dirección del panel termina en la pantalla de acceso** | Abrir `/dashboard` en una ventana sin sesión |
| 6 | El **horario semanal** se guarda y se ve igual al recargar: los días marcados, con su franja | Guardar lunes de 9 a 17, recargar |
| 7 | Guardar el horario **reemplaza el anterior por completo**: un día que se desmarca deja de ofrecer turnos | Sacar el miércoles, guardar, y mirar un miércoles en la página pública |
| 8 | La **duración del turno** se elige entre los valores previstos —15, 30, 45, 60, 90 y 120 minutos— y queda guardada | Elegir 45, recargar, y verificar que los horarios ofrecidos van de 45 en 45 |
| 9 | Un **bloqueo puntual** saca de la oferta los horarios que cubre, **sin modificar el horario semanal** | Bloquear el martes de 14 a 16: esa franja deja de ofrecerse y el resto del martes sigue igual |
| 10 | Borrar un bloqueo **devuelve esos horarios a la oferta** | Borrar el bloqueo anterior y volver a mirar el martes |

## Casos borde

- **Dos profesionales con el mismo nombre.** El segundo recibe la dirección con sufijo. Se
  intenta hasta cien veces; más allá de eso el registro falla y hay que elegir otro nombre.
- **Un nombre sin letras aprovechables** —solo símbolos o emojis— no produce una dirección
  utilizable. Se valida el nombre en el registro, no la dirección.
- **Franja que termina antes de empezar** (de 17 a 9): no se guarda.
- **Un bloqueo encima de un turno ya reservado.** El bloqueo se guarda y el turno reservado
  **no se cancela solo**: la agenda es del profesional (`P-2`), y cancelar por su cuenta sería
  decidir por él. El turno sigue en su lista y él decide.
- **Cambiar la duración con turnos ya reservados.** Los turnos existentes conservan la duración
  con la que se reservaron. La nueva rige para los que vengan.
- **El correo de confirmación no llega.** La cuenta queda creada y sin confirmar. El profesional
  puede volver a pedirlo desde la pantalla de acceso.

## Qué se asume

- Que un profesional atiende en **una sola agenda**: un lugar, una persona, una duración.
- Que el horario semanal **se repite todas las semanas** hasta que se cambie. No hay semanas
  distintas entre sí salvo por bloqueos.
- Que la identidad la maneja el proveedor de autenticación: este producto no guarda contraseñas
  ni las verifica (`T-1`).
- Que el profesional configura su agenda **antes** de compartir su dirección pública. Si no lo
  hace, su página no ofrece nada, y eso es correcto: no hay horarios que ofrecer.

## Preguntas abiertas

Ninguna. La de si el horario semanal debía admitir **dos franjas por día** —mañana y tarde, con
el mediodía afuera— se resolvió en `clarify`: se admite más de una franja por día, porque el
corte del mediodía es lo normal y no el caso raro.
