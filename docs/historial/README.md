# Historial

Lo que el proyecto sabía **antes** de adoptar Spec-Driven Development. Está acá porque las
specs de `specs/` no salieron de la nada: salieron de estas conversaciones, estas
entrevistas y estas decisiones tomadas por correo.

> 🔴 **Esto es un registro, no documentación de trabajo. No se edita.**
> Si algo de acá contradice una spec actual, **eso es un hallazgo, no una errata.** Se
> reporta con las dos versiones y se deja abierto. Corregir el registro para que cierre
> con el presente borra la única evidencia de que el presente cambió.

---

## Qué hay, y en qué orden vale

**Ante dos documentos que se contradicen, gana el más reciente.** No porque sea mejor, sino
porque describe un sistema que ya había cambiado. Pero el viejo no se descarta: la
diferencia entre los dos **es** el dato.

### Registro histórico — nov 2024 a may 2026

| Archivo | Qué es | Fecha |
| :--- | :--- | :--- |
| `01-minuta-kickoff.md` | La reunión donde se decidió hacer esto | 14/11/2024 |
| `02-notas-entrevistas.md` | Siete entrevistas a profesionales, sin ordenar | 24/11 – 02/12/2024 |
| `03-especificacion-funcional-v0.3.md` | La especificación funcional. **Estado: BORRADOR**, con secciones `TBD` | — |
| `04-notas-tecnicas.md` | Apuntes del desarrollador sobre cómo quedó armado, con la deuda declarada | — |
| `05-hilo-mail-cambio-de-alcance.md` | El hilo donde se recortó el alcance antes de lanzar | 03/03/2026 |
| `06-tickets-soporte-resumen.md` | Lo que más repiten los usuarios en la casilla de soporte | 01/03 – 15/05/2026 |

> ⚠️ **La versión 0.3 nunca pasó de BORRADOR.** Es la última que existe, y el hilo de
> cambio de alcance es posterior: hay decisiones tomadas ahí que **no están en ninguna
> especificación**.

### `documentacion para QA/` — may 2026

Lo que se preparó cuando se decidió sumar QA al proyecto.

| Archivo | Qué es |
| :--- | :--- |
| `transcripcion-reunion-2026-05-19.md` | La transcripción automática de la revisión, con sus timestamps y sus muletillas |
| `resumen-automatico-reunion-2026-05-19.md` | El resumen que una herramienta hizo **de esa misma reunión** |
| `hilo-mail-alcance-qa.md` | El pedido de trabajo a QA |
| `nota-ambientes-y-accesos.md` | Dónde está desplegado esto de verdad y cómo entrar |

> ⚠️ **La transcripción y el resumen describen la misma reunión.** El resumen aclara en su
> encabezado que puede contener errores. Conviene leer los dos antes de citar cualquiera.

### `ingenieria/`

Documentación de producto y de ingeniería anterior al ciclo SDD: el PRD, el SRS, las
épicas con sus historias, y las guías internas de desarrollo.

> ⚠️ **Es la capa más desactualizada de las tres y la que más se contradice con `specs/`.**
> Describe un alcance planificado, no el que se implementó: varias de sus historias
> quedaron a medias, cambiaron por correo o nunca se hicieron. **Nada de acá reemplaza a
> una spec**, y una historia de `ingenieria/PBI/` no es una especificación vigente aunque
> lo parezca. Sirve para entender de dónde viene una decisión, no para saber qué hace el
> sistema hoy.

---

## Lo que no vas a encontrar

**Entre el último documento de esta carpeta y el estado actual del proyecto hay meses sin
un solo papel.** No es un descuido de archivo: durante ese período el equipo cambió su
forma de trabajar y empezó a escribir specs en vez de documentos sueltos. Lo que pasó en
el medio está en `specs/` y en el historial de Git, no acá.
