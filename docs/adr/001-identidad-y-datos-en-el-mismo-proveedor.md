# 001 · Identidad y datos salen del mismo proveedor

**Fecha:** 2026-06-10

## Estado

Aceptada.

> Esta decisión se tomó al empezar el proyecto, en noviembre de 2024. Se documenta ahora, al
> adoptar trabajo dirigido por especificaciones, porque es la que más cuesta revertir y hasta
> hoy no estaba escrita en ningún lado.

## Contexto

Cita.ai necesita cuentas de profesional con confirmación por correo, recuperación de
contraseña y sesiones que expiren. Necesita además que **cada profesional vea solo sus datos**:
sus turnos, sus clientes, su agenda.

Lo segundo es lo que decide. Las reglas de acceso se pueden escribir en dos lugares: en la
aplicación, consulta por consulta, o en la base, una vez por tabla. La primera forma funciona
hasta que alguien escribe la consulta número treinta y se olvida el filtro; y cuando eso pasa,
no falla nada: simplemente se ven datos de otro.

Para escribirlas en la base hace falta que **la base sepa quién es el que consulta**. Eso
requiere que la sesión de autenticación llegue hasta ahí.

## Decisión

**Supabase provee las tres cosas a la vez: Postgres, autenticación y Row Level Security.** El
identificador de la cuenta de autenticación **es** el identificador del profesional en
`professionals`, y las políticas de acceso filtran por él.

Las alternativas que se evaluaron, y por qué no:

| Alternativa | Por qué no |
| :--- | :--- |
| Autenticación propia, con contraseñas en nuestra base | Hay que escribir hash, expiración, confirmación por correo, recuperación e invalidación de enlaces. Es la parte del producto donde un error se paga con datos ajenos, y no nos diferencia en nada |
| Un proveedor de identidad separado del de la base | La sesión se queda afuera de la base, y las reglas de acceso vuelven a escribirse consulta por consulta |

## Consecuencias

**Lo que se gana.** Las reglas de acceso viven en un solo lugar y se cumplen aunque la consulta
se escriba mal. Una tabla nueva con datos de un profesional necesita su política y nada más.

**Lo que se pierde.** Identidad y datos quedan atados al mismo proveedor: **mudar uno es mudar
los dos**. No hay un camino barato para quedarse con la base y cambiar el inicio de sesión, ni
al revés.

**Lo que queda atado, y hay que tenerlo presente:**

- Toda tabla con datos de un profesional **nace con RLS y con una política por operación**. La
  constitución lo exige en `T-2`.
- Existe una clave de servicio que **esquiva RLS**. Es necesaria para lo que ocurre sin sesión
  —la reserva pública—, y cada uso nuevo se justifica en el plan de su feature. Es la única
  puerta que deja afuera todo lo que esta decisión compró.
- Los correos del **sistema de cuentas** —confirmar, recuperar— los manda el proveedor de
  identidad. Los correos **del producto** son otra cosa y no están cubiertos por este ADR.
