# Constitución de Cita.ai

> Las reglas que ninguna feature puede romper. Este documento **manda sobre cualquier
> otro** del repositorio, incluido `AGENTS.md`. Una spec que necesite una excepción la
> declara con su motivo; nunca se asume.

**Versión 1.3.0** · ratificada el 2026-06-08 · última enmienda: **2026-08-24** (§5).

Cada regla tiene un identificador estable —`P-1`, `T-2`, `Q-3`— que no cambia aunque la
regla se reescriba. Las specs, los planes y los ADR citan ese identificador cuando
justifican una decisión o cuando piden una excepción.

---

## 1. Principios de producto

**P-1 · Reservar no exige cuenta.** El cliente final reserva con su nombre y su correo, y
nada más. Ninguna feature puede pedirle que se registre, que instale algo o que recuerde
una contraseña para usar un turno que ya reservó.

**P-2 · La agenda es del profesional.** El sistema no crea, mueve ni cancela turnos por su
cuenta. Solo pasa lo que pidió el profesional, o lo que hizo el cliente dentro de lo que
el profesional habilitó.

**P-3 · Lo que el producto promete por correo, el producto lo sostiene.** Si un correo
lleva una acción —confirmar, cancelar, ver un turno—, esa acción funciona desde el correo,
sin sesión previa y sin pasos intermedios. Un correo que ofrece algo que después no se
puede hacer es un defecto de producto, no una molestia menor.

**P-4 · El plan gratuito limita el tamaño, no las funciones.** La cuenta gratuita tiene un
tope de clientes únicos —hoy, diez— y ese es todo el límite. Ninguna feature se esconde
detrás de un plan pago: lo que existe, existe para todas las cuentas.

**P-5 · Lo que Cita.ai no hace.** No cobra ni intermedia pagos, no guarda notas clínicas
ni observaciones sobre la persona atendida, y no envía nada que no haya disparado una
acción del usuario. Una feature que necesite cualquiera de las tres cosas no es una
feature: es otro producto, y se discute como tal.

---

## 2. Restricciones técnicas

**T-1 · El stack no se decide por feature.** Next.js con App Router y TypeScript, Supabase
para datos y autenticación, Vercel para el despliegue. Cambiar cualquiera de esos tres, o
sumar un servicio externo nuevo, es un ADR en `docs/adr/` — nunca una línea suelta en un
`plan.md`.

**T-2 · Row Level Security en toda tabla con datos de un profesional**, con una política
por operación. La clave `service_role` **esquiva RLS**: se usa solo del lado del servidor,
solo donde no puede haber sesión —el formulario público de reserva es el caso— y cada uso
nuevo se justifica en el `plan.md` de su feature.

**T-3 · Las horas se guardan en UTC y se muestran en la zona de la aplicación.** Hoy la
zona es una sola, `America/Argentina/Buenos_Aires`, y no hay zona por profesional. Toda
hora que se guarde, se compare o se mande por correo pasa por los utilitarios de
`src/lib/utils/`: ninguna feature arma una fecha a mano.

**T-4 · El correo es una consecuencia, no un requisito.** Una operación que ya quedó
registrada no puede fallar —ni devolverle un error al usuario— porque una notificación no
salió. Los fallos de envío se registran y se reintentan; no se propagan hacia afuera.

**T-5 · Toda variable de entorno nueva se declara en `.env.example`**, con qué se rompe si
falta. Una variable que no está declarada ahí no existe para este equipo.

---

## 3. Privacidad y datos de clientes

**D-1 · Del cliente final se guarda lo mínimo**: nombre, correo y los turnos que reservó.
Si una feature necesita otro dato de la persona, lo justifica en su spec y lo pide en el
formulario. No se deduce, no se compra y no se completa por nuestra cuenta.

**D-2 · El dato que la persona escribe es el dato que se guarda.** Lo que el cliente carga
en el formulario público queda tal como lo escribió. Ninguna feature lo reemplaza en
silencio por otro valor que el sistema ya tuviera guardado.

**D-3 · El enlace de cancelación es una credencial.** Le da poder sobre un turno a
cualquiera que lo tenga, así que no se indexa, no se reutiliza para otra cosa y no aparece
nunca en una página pública ni en un registro de errores.

**D-4 · Un profesional ve únicamente a los clientes que reservaron con él.** Ni sus datos,
ni sus turnos, ni su existencia se filtran hacia otra cuenta.

**D-5 · Los datos del cliente no salen hacia terceros**, salvo al proveedor de correo y
solo con lo que el correo necesita. Las páginas públicas de reserva no llevan analítica de
terceros.

---

## 4. Compuerta de calidad

**Q-1 · Ninguna feature pasa a `implement` sin revisión de QA.** La revisión es sobre la
spec y el plan, **antes** de que se escriba código, y queda registrada en el pull request
de la feature. Sin ese registro, la rama no se integra.

**Q-2 · El piso de lo que se revisa**: que cada criterio de aceptación se pueda responder
con sí o no sin interpretar, que los casos borde estén escritos, que lo declarado fuera de
alcance tenga su motivo, y que la feature terminada se pueda verificar sin depender de
quien la escribió. El detalle fino —qué evidencia se pide y en qué forma se entrega— lo
define QA.

**Q-3 · Qué bloquea y qué no.** Bloquea un criterio que no se puede verificar y una
feature que contradice esta constitución sin declarar la excepción. No bloquea una
observación de estilo ni una sugerencia de alcance: se anotan y la feature sigue.

**Q-4 · La revisión tiene plazo.** Dos días hábiles desde que la spec queda `en revisión`.
Vencido el plazo sin respuesta, la feature avanza, y la observación que llegue después se
trata como trabajo nuevo y no como un bloqueo retroactivo.

**Q-5 · El estado vive en la spec.** El campo `estado` del encabezado de cada `spec.md`
—`borrador`, `en revisión`, `aprobada`, `implementada`, `fuera de alcance`— es la única
fuente sobre en qué punto está una feature. Si el estado y la conversación no coinciden,
gana el estado.

---

## 5. Proceso de enmienda

**Quién.** El tech lead, con acuerdo explícito del equipo de desarrollo. Una enmienda que
toca §3 o §4 se acuerda además con quien se vea obligado por ella.

**Cómo.** Un pull request contra este archivo, con el motivo escrito y el identificador de
la regla que se agrega, se cambia o se saca. Las reglas no se renumeran: una regla
derogada se marca como tal y su identificador no se reutiliza.

**Versionado.** Mayor cuando se saca o se invierte una regla; menor cuando se agrega una
nueva; parche cuando solo cambia la redacción.

**Desde cuándo rige.** Una enmienda obliga a las features que entran a `specify` después
de su fecha. **Las features ya implementadas no se vuelven a auditar**, salvo que la propia
enmienda lo diga.

### Registro de enmiendas

| Versión | Fecha | Qué cambió |
| :--- | :--- | :--- |
| 1.0.0 | 2026-06-08 | Texto inicial, al adoptar SDD: §1, §2 y §5 |
| 1.1.0 | 2026-06-29 | Se agrega §3 completa, después de la revisión de privacidad del formulario público |
| 1.2.0 | 2026-07-20 | `T-3`: se fija una zona horaria única para toda la aplicación y se descarta la zona por profesional |
| 1.3.0 | 2026-08-24 | Se agrega §4, la compuerta de calidad. **La forma de registrar la revisión en el pipeline queda a definir con QA** |
