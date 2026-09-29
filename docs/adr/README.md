# Decisiones de arquitectura

Una decisión por archivo, numerada y con fecha: `NNN-titulo-en-kebab.md`. Se registran
acá las decisiones que **cuesta revertir** —las que atan el proyecto a una tecnología,
a un proveedor o a una forma de modelar los datos—, no las que se resuelven dentro de
una feature.

Cada archivo lleva cuatro secciones:

| Sección | Qué dice |
| :--- | :--- |
| **Estado** | Propuesta · Aceptada · Reemplazada por `NNN` |
| **Contexto** | Qué había sobre la mesa cuando hubo que decidir |
| **Decisión** | Qué se eligió, y contra qué alternativas |
| **Consecuencias** | Lo que se gana, lo que se pierde y lo que queda atado |

Un ADR **no se edita cuando la decisión cambia**: se escribe uno nuevo que lo reemplaza,
y el viejo pasa a estado `Reemplazada`. El registro tiene que mostrar cómo se llegó
hasta acá, no solo dónde se terminó.

---

## Las decisiones registradas

| # | Decisión | Estado |
| :-: | :--- | :--- |
| [001](./001-identidad-y-datos-en-el-mismo-proveedor.md) | Identidad y datos salen del mismo proveedor | Aceptada |
| [002](./002-una-zona-horaria-para-toda-la-aplicacion.md) | Una zona horaria para toda la aplicación | Aceptada |
| [003](./003-la-disponibilidad-se-calcula-no-se-guarda.md) | La disponibilidad se calcula, no se guarda | Aceptada |
| [004](./004-el-cliente-final-no-tiene-cuenta.md) | El cliente final no tiene cuenta | Aceptada |

> ⚠️ **Las cuatro se escribieron en junio de 2026, al adoptar trabajo dirigido por
> especificaciones, y documentan decisiones anteriores.** La fecha del archivo es la de
> registro; cuándo se decidió de verdad está en el *Contexto* de cada una. **De acá en
> adelante, el ADR se escribe cuando se decide.**
