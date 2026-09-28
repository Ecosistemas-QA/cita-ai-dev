---
feature: 001-registro-y-agenda
plan: ./plan.md
---

# 001 · Investigación

Lo que hubo que averiguar antes de cerrar el plan fue una sola cosa, y es la que ata el
proyecto a un proveedor: **quién maneja la identidad.** La decisión está en `plan.md`; acá queda
contra qué se comparó y con qué criterio.

## El criterio

Tres cosas, en este orden:

1. **Que traiga confirmación por correo y recuperación de contraseña sin que haya que
   escribirlas.** Son las dos que más caro salen de hacer mal.
2. **Que la sesión llegue hasta la base**, para que las reglas de acceso se escriban una sola
   vez y del lado del dato, y no en cada consulta.
3. **Que no obligue a correr un servicio más.**

## Lo que se comparó

| Opción | Cómo cumple | Por qué no |
| :--- | :--- | :--- |
| **Autenticación propia**, con contraseñas en nuestra base | Control total | Hay que escribir el hash, la expiración, el correo de confirmación, el de recuperación y la invalidación de enlaces. Es la parte del producto donde un error se paga con datos de otros, y no diferencia en nada a Cita.ai |
| **Proveedor de identidad externo** con su propio servicio | Cumple 1 y 3 | La sesión se queda afuera de la base: las reglas de acceso vuelven a tener que escribirse consulta por consulta, y eso es lo que falla cuando aparece la consulta número treinta |
| **Autenticación del mismo proveedor de la base** | Cumple las tres | — |

## Qué se eligió y qué queda atado

La autenticación del proveedor de la base, porque es la única que cumple el punto 2: el
identificador de la cuenta **es** el identificador del profesional, y las políticas de la base
filtran por él sin que la aplicación tenga que acordarse.

Lo que queda atado, y conviene tenerlo escrito: **la identidad y los datos son el mismo
proveedor.** Mudar uno es mudar los dos. Se asume a cambio de que las reglas de acceso vivan en
un solo lugar.

## Lo que quedó sin investigar

**Acceso con Google.** Está fuera de alcance (ver `spec.md`), y cuando entre no cambia lo de
arriba: es un método más del mismo proveedor, no un proveedor nuevo.
