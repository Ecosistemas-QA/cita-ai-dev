---
feature: 003-limite-del-plan-gratuito
spec: ./spec.md
---

# 003 · Plan técnico

## Enfoque

El tope se controla **en un solo lugar: el endpoint público de reserva** (`002`), antes de
verificar el horario y antes de guardar nada. Es el único camino por el que entra un cliente
nuevo, así que es el único que hace falta custodiar.

El control cuenta los clientes distintos que ya reservaron con ese profesional y decide con dos
datos: **cuántos hay**, y **si el que está reservando es uno de ellos**. Si la cuenta está en el
tope y el que reserva es nuevo, se rechaza. Si ya reservó antes, pasa: el tope es de personas,
no de turnos.

El panel usa el mismo conteo para decidir si muestra el aviso, pero por un camino distinto —es
una lectura con sesión, no una escritura anónima—, así que el cálculo vive en una función propia
que las dos partes usan.

**El número del tope está en una sola constante.** Cambiarlo es cambiar esa línea, y por eso no
hay ningún `10` suelto en el resto del código.

> **Ante un error al contar, no se bloquea.** Si la consulta falla, la reserva sigue. Es una
> decisión de producto escrita en la spec: un cliente de más cuesta menos que una reserva
> perdida por un error nuestro.

## Decisiones

| Decisión | Alternativa descartada | Por qué |
| :--- | :--- | :--- |
| Los clientes se cuentan **desde los turnos** | Una tabla de relación entre profesional y cliente | La relación ya existe implícita en los turnos. Una tabla más es una más que puede quedar desincronizada, y no agrega nada que los turnos no tengan |
| El control va en el endpoint de reserva | En la base, con una restricción o un *trigger* | La regla es de producto y tiene un mensaje para el cliente. En la base sería un error sin texto que después hay que traducir |
| El aviso vive en la estructura del panel, no en una pantalla | Ponerlo en la pantalla principal | Al profesional le tiene que aparecer esté donde esté dentro del panel |
| Fallar hacia el lado de dejar pasar | Bloquear ante la duda | Bloquear una reserva por un error de lectura le cuesta al profesional un cliente real, y a nosotros la confianza |
| Los cancelados siguen contando | Descontarlos | Si cancelar liberara lugar, el tope se esquiva cancelando |

## Modelo de datos

Ninguna tabla ni columna nueva. Se cuentan `client_id` distintos en `appointments` para el
profesional, y se cruza con `clients` por correo para saber si el que reserva ya estaba.

**No hay columna de plan.** Todas las cuentas son gratuitas, y el día que existan planes esa
columna entra acá con su propia spec.

## Contratos

Esta feature no agrega endpoints: agrega una respuesta al endpoint de reserva de `002`.

| Situación | Respuesta |
| :--- | :--- |
| Cliente nuevo con la cuenta en el tope | `403`, con `code: "LIMIT_REACHED"` y un `error` que se le puede mostrar al cliente tal cual |
| Cliente que ya reservó antes | La reserva sigue su curso normal |

El texto del mensaje **es parte del contrato**: lo muestra la pantalla de reserva sin
reescribirlo, y no menciona planes ni el estado de la cuenta del profesional.

## Riesgos

| Riesgo | Impacto | Cómo se mitiga |
| :--- | :--- | :--- |
| El conteo recorre todos los turnos de la cuenta en cada reserva | Con agendas grandes, la reserva se hace más lenta | Con el tope en diez clientes, el volumen es chico por definición. Se revisa cuando existan cuentas sin tope |
| **El aviso del panel y el rechazo de la reserva se calculan por caminos distintos** | Pueden no coincidir: el panel dice una cosa y la reserva hace otra | Las dos usan la misma constante y el mismo criterio de conteo. Si se toca uno, se verifica el otro |
| El tope se controla al confirmar, no al mostrar disponibilidad | El cliente elige un horario y recién ahí se entera de que no puede | Aceptado: la alternativa es que la página pública no muestre nada y nadie entienda por qué |

## Qué queda para después

- **Planes pagos**: la columna de plan, los topes por plan y las cuentas sin tope.
- **Avisos escalonados** antes de llegar al límite, cuando haya a dónde mandar al profesional.
- **Un tope configurable** por cuenta, para casos especiales.
