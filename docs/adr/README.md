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
