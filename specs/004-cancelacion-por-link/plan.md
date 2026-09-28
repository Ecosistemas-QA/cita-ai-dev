---
feature: 004-cancelacion-por-link
spec: ./spec.md
---

# 004 · Plan técnico

## Enfoque

Tres piezas: el enlace que se arma al mandar el correo de confirmación, la página pública que
ese enlace abre, y el endpoint público que hace la cancelación.

El enlace es `<dirección de la aplicación>/cancelar/<id del turno>`. La dirección sale de
`NEXT_PUBLIC_APP_URL`, que por eso queda declarada en `.env.example` (`T-5`): sin ella el
enlace se arma mal y el correo sale con un destino roto.

La página busca el turno por su identificador y muestra el detalle con el botón de confirmar.
Si el turno ya está cancelado no muestra el botón: muestra el estado.

El endpoint es público y **no tiene sesión posible**: lo abre alguien que no tiene cuenta. Por
eso corre del lado del servidor con la clave de servicio, que es el caso que `T-2` contempla.
Queda acotado a lo que esta feature necesita: leer el turno, pasarlo a `cancelled` y disparar
el aviso.

> **La página y el endpoint tienen que alcanzar a ver el mismo turno.** Si uno de los dos lo ve
> y el otro no, el cliente queda con un enlace que abre pero no cancela, o que cancela sin
> haberle mostrado nunca qué estaba cancelando.

## Decisiones

| Decisión | Alternativa descartada | Por qué |
| :--- | :--- | :--- |
| El identificador del turno viaja en el enlace | Un token aparte, guardado en su propia columna e invalidado al usarse | El UUID del turno ya es imposible de adivinar. El token suma una columna, un momento de generación y una regla de expiración, para cubrir un ataque que exige conocer de antemano el enlace de una persona concreta. Queda anotado en riesgos |
| Página de confirmación antes de cancelar | Cancelar directo al abrir el enlace | Los clientes de correo prefetchean enlaces: uno que cancela al abrirse termina cancelando solo. La confirmación explícita además le muestra al cliente qué turno está soltando |
| El turno pasa a `cancelled` y se conserva | Borrar la fila | El profesional necesita ver que hubo una cancelación, y la disponibilidad ya filtra por estado |
| El aviso se manda después de cancelar | Mandarlo dentro de la misma operación, y revertir si falla | Un fallo de correo no puede deshacer una cancelación que el cliente ya dio por hecha (`T-4`) |

## Modelo de datos

Ninguna tabla ni columna nueva. Se usa `appointments.status`, que ya tiene el valor `cancelled`,
y se leen los datos del profesional y del cliente para armar el aviso.

El cálculo de disponibilidad ya excluye los turnos cancelados, así que liberar el horario no
requiere nada adicional.

## Contratos

| Método y ruta | Entrada | Salida | Errores |
| :--- | :--- | :--- | :--- |
| `GET /cancelar/<id>` | El identificador del turno en la ruta | La página con el detalle y el botón, o el estado *ya cancelada* | `404` si no existe |
| `POST /api/public/appointments/<id>/cancel` | El identificador en la ruta. Sin cuerpo y sin sesión | `{ success: true }` | `404` si no existe · `409` si ya estaba cancelada |

## Riesgos

| Riesgo | Impacto | Cómo se mitiga |
| :--- | :--- | :--- |
| **El enlace no caduca ni se invalida.** Quien lo tenga puede cancelar el turno mientras siga vigente | Un correo reenviado, o una casilla ajena, permiten cancelar un turno que no es propio | Asumido y declarado en la spec. El enlace se trata como credencial (`D-3`): no se publica ni se muestra en ninguna pantalla. Si aparece un caso real, se pasa a token con expiración |
| **La página y el endpoint pueden diferir en qué turno alcanzan a ver**, porque no acceden a la base de la misma manera | El cliente abre un enlace que no le muestra nada, o al revés | Se prueba con el mismo identificador en los dos lados, **desde una ventana sin sesión** |
| `NEXT_PUBLIC_APP_URL` no tiene valor por defecto | El correo sale con un enlace mal armado y la feature no existe para el cliente | Declarada en `.env.example` con qué rompe si falta (`T-5`) |

## Qué queda para después

- **Token con expiración**, si el enlace sin caducidad llega a generar algún caso real.
- **Reprogramar desde el enlace**, que hoy es cancelar y volver a reservar.
- **Comprobante de cancelación para el cliente**, si aparece pedido en soporte.
