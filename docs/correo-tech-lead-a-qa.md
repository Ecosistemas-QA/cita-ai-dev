# Correo del tech lead a QA

> Lo pego acá para que no quede solo en la casilla, porque es lo que acordamos y de esto
> depende bastante. Va tal como salió.
>
> — D.

---

**De:** Diego
**Para:** qa@cita.ai
**CC:** Mariana, Fernando
**Fecha:** 08/09/2026 09:34
**Asunto:** Cómo seguimos con QA

Hola. Esto es largo, pero es la conversación que venimos pateando desde julio. Va por partes.

## Qué cambió de este lado

En junio cambiamos la forma de trabajar. Ya no arrancamos por el código: **cada feature empieza
por un documento que dice qué tiene que hacer y por qué**, y recién cuando eso está acordado se
escribe el plan técnico, las tareas, y después el código. Todo eso vive en el repositorio, al
lado de lo que implementa.

Si abrís el repo vas a ver la forma enseguida:

- `.specify/memory/constitution.md` — las reglas que ninguna feature puede romper. Este
  documento manda sobre todos los demás, incluido el `AGENTS.md`.
- `specs/<número>-<nombre>/` — una carpeta por feature, con su `spec.md`, su `plan.md` y su
  `tasks.md`.
- `docs/adr/` — las decisiones de arquitectura, una por archivo.
- `docs/historial/` — todo lo de antes de junio. **Eso no se toca**: es registro, no
  documentación de trabajo.

Te lo cuento porque cambia el terreno. En mayo te pedimos que escribieras lo que el producto
tenía que hacer, porque no existía en ningún lado. **Ahora existe.** Lo que no existe es alguien
que lo mire antes de que nosotros escribamos código.

## El problema, que es nuestro y no tuyo

Desde que trabajamos así entregamos bastante más rápido. Y ahí está el problema: vos seguís
trabajando **después**, por afuera y a mano.

Cuando encontrás algo, la feature ya está hecha, a veces desplegada, y arreglarla cuesta el
doble. Peor: un par de veces lo que encontraste no era un error de código sino que la spec
estaba mal escrita desde el principio, y eso lo podríamos haber sabido antes de empezar.

Con el ritmo de ahora, revisar de a una y a mano no da. No es un problema de esfuerzo tuyo.
**Es un problema de dónde está parada la revisión.**

## Lo que te pedimos

Ya no te vamos a pedir que nos alcances. **Queremos que seas una etapa nuestra. Armá tu parte
del flujo y decinos dónde se enchufa.**

Lo digo más concreto, con lo que hay que contestar. Son cuatro preguntas y ninguna la podemos
contestar nosotros por vos:

1. **Qué leés.** De todo lo que producimos —constitución, spec, plan, tareas, código, el
   historial—, qué necesitás como entrada y en qué momento.
2. **Qué escribís.** Qué produce tu trabajo, dónde queda y en qué forma, para que nosotros lo
   podamos leer sin tener que preguntarte.
3. **Dónde nos damos la mano.** En qué punto exacto del ciclo entra lo tuyo y cómo nos
   enteramos: ¿un estado en el tablero?, ¿algo en el pull request?, ¿otra cosa?
4. **Qué frena y qué no.** Esto es lo más importante y lo que más nos va a costar acordar: qué
   cosa tuya **bloquea** una feature, y qué cosa es una observación que anotamos y seguimos.

No te estoy pidiendo un plan de pruebas. Te estoy pidiendo **el diseño de tu parte del flujo**.
Cómo lo hagas adentro es asunto tuyo.

## Lo que ya nos comprometimos a hacer, y no cumplimos

Acá me tengo que hacer cargo. **El 24 de agosto metimos en la constitución que ninguna feature
pasa a implementación sin una revisión de QA registrada en su pull request.** Está escrito, es
la sección 4, y dice que sin ese registro la rama no se integra.

Lo escribimos y **no lo tenemos**. No hay nada que lo verifique: ni en el flujo de trabajo, ni
en el tablero, ni en ningún lado. Si mirás el registro de enmiendas al pie de la constitución
vas a ver que quedó anotado *"a definir con QA"*, y de eso hace dos semanas y media.

Así que lo que te pido arriba no es un pedido nuevo: es la parte que nos falta para cumplir algo
que ya firmamos.

## Accesos

Igual que la vez pasada: **registrate vos como si fueras un profesional más** y armate tu
agenda. No te doy un usuario.

La dirección donde está andando esto es **https://cita-ai-dev.vercel.app**. Sigue valiendo todo
lo que te dejé anotado en la nota de ambientes, incluido lo de que **lo que cargues queda**: no
hay forma de volver a un estado anterior.

Y sigue valiendo lo otro también: **no uses la cuenta de Fernando.**

## El plazo, que no lo pongo yo

Fernando tiene tres reuniones cerradas para octubre, y una es la red de consultorios: son unos
veinte profesionales y entran todos juntos. Si eso entra, **duplicamos el volumen de features en
un mes**.

Mi miedo no es no llegar. Es llegar con la revisión atrás, como ahora, pero con el doble de
cosas atrás.

Decime qué necesitás de nuestro lado para arrancar. Lo que sea que esté en el repositorio, lo
tenés; lo que haya que cambiar en cómo trabajamos nosotros, lo hablamos.

D.
