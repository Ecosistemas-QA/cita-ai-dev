# User Journeys: Cita.ai MVP

Este documento mapea los flujos de interacción clave para los usuarios principales de Cita.ai, identificando acciones, respuestas del sistema y posibles puntos de fricción.

## 1. Journey: Onboarding y Primera Configuración (Happy Path)

**Persona:** Laura Fernández (La Profesional Organizada)

**Scenario:** Laura descubre Cita.ai a través de un colega. Cansada de gestionar su agenda por WhatsApp, decide probar la herramienta con el objetivo de tener un sistema de reservas profesional listo para usar lo antes posible.

**Steps:**

| Step | User Action | System Response | Potential Pain Point |
| :--- | :--- | :--- | :--- |
| 1 | **Registro:** Entra en `cita.ai`, hace clic en "Registrarse Gratis" y completa el formulario con su nombre, email y contraseña. | El sistema valida los datos en tiempo real. Al enviar, crea la cuenta, inicia sesión automáticamente y la redirige a un wizard de configuración. | El formulario pide demasiada información. La validación de la contraseña es confusa o excesivamente estricta. |
| 2 | **Configuración de Servicio:** El wizard le pregunta la duración de sus citas. Ella introduce "60 minutos". | El sistema guarda la duración estándar. Avanza al siguiente paso. | No está claro si podrá definir otros servicios más adelante. El campo no es flexible (ej: solo números). |
| 3 | **Configuración de Horarios:** El wizard muestra una vista semanal. Laura define su horario laboral de Lunes a Viernes de 9:00 a 18:00. | El sistema guarda la disponibilidad recurrente y muestra una vista previa de su semana. | La interfaz para seleccionar horarios es torpe (ej: no poder arrastrar o copiar un bloque de tiempo a otro día). |
| 4 | **Obtención del Link:** El wizard finaliza y le presenta su URL pública (ej: `cita.ai/laura-fernandez`) con un botón para "Copiar Link". | Al hacer clic, la URL se copia al portapapeles y aparece un mensaje de confirmación ("¡Link copiado!"). | Laura no entiende qué hacer con ese link o dónde debería compartirlo. |
| 5 | **Verificación:** Abre una nueva pestaña y pega su URL para ver la página de reserva como si fuera un cliente. | Se muestra su página pública con su nombre y los horarios disponibles para la semana, listos para ser reservados. | La página pública no se ve profesional o no refleja correctamente los horarios que acaba de configurar. |

**Expected Outcome:** En menos de 5 minutos, Laura tiene una cuenta activa y un enlace de reservas funcional, sintiendo que ha profesionalizado su consulta con un esfuerzo mínimo.

**Alternative Paths / Edge Cases:**
-   **Email ya existe:** Si intenta registrarse con un email ya existente, el sistema debe mostrar un error claro con un enlace a la página de "Recuperar Contraseña".
-   **Saltarse el wizard:** Si Laura cierra el wizard, el panel principal debe mostrar un "estado vacío" con llamadas a la acción claras para "Configurar mi disponibilidad" y "Ver mi link público".

---

## 2. Journey: Reserva de Cita con Conflicto (Edge Case)

**Persona:** Sofía Gómez (La Cliente Eficiente)

**Scenario:** Sofía recibe el link de Laura y lo abre para reservar una cita. Al mismo tiempo, otro cliente de Laura está viendo los mismos horarios.

**Steps:**

| Step | User Action | System Response | Potential Pain Point |
| :--- | :--- | :--- | :--- |
| 1 | **Selección de Horario:** Sofía abre la página de Laura, ve que el Miércoles a las 10:00 está disponible y hace clic en él. | El sistema la lleva a una pantalla para que confirme el horario e ingrese su nombre y email. | La página tarda demasiado en cargar los horarios. El diseño no es claro en móvil. |
| 2 | **Conflicto de Concurrencia:** Mientras Sofía introduce sus datos, otro cliente selecciona el mismo horario (Mié 10:00) y completa la reserva un segundo antes. | *En segundo plano:* El sistema del otro cliente reserva el slot. La base de datos ahora marca ese horario como ocupado. | No hay ninguna indicación visual de que el horario está "en riesgo" o que es una selección temporal. |
| 3 | **Intento de Reserva:** Sofía termina de escribir sus datos y hace clic en "Confirmar Cita". | El sistema intenta crear la cita, pero la validación del backend falla. En lugar de un error genérico, muestra un mensaje amigable: **"¡Casi! Parece que alguien más reservó este horario. Por favor, elige otro."** El calendario se actualiza, mostrando el slot de las 10:00 como no disponible. | El mensaje de error es un críptico "Error 500". O peor, la página se recarga y pierde los datos que Sofía ya había escrito. |
| 4 | **Recuperación del Flujo:** Sofía, aunque ligeramente frustrada, entiende lo que pasó. Selecciona el siguiente horario disponible (11:00). | El sistema la lleva a la pantalla de confirmación, pero esta vez **pre-rellena su nombre y email** que había introducido antes. | Tiene que volver a escribir su nombre y email, aumentando la fricción. |
| 5 | **Reserva Exitosa:** Sofía confirma la nueva cita. | El sistema muestra la página de éxito y envía los emails de confirmación a ella y a Laura. | La confirmación es ambigua y no le da certeza de que la cita está 100% agendada. |

**Expected Outcome:** A pesar del conflicto, Sofía logra reservar una cita porque el sistema manejó el error de forma elegante, le informó claramente y le facilitó la corrección sin hacerle repetir trabajo.

**Alternative Paths / Edge Cases:**
-   **Abandono:** Sofía se frustra por el error y abandona la página. (Esto es un dato a medir en las analíticas).
-   **Profesional bloquea el horario:** El resultado debería ser el mismo si Laura bloquea manualmente un horario justo cuando Sofía está a punto de seleccionarlo.

---

## 3. Journey: Profesional Alcanza el Límite Freemium (Business Case)

**Persona:** Carlos Rojas (El Profesional Práctico)

**Scenario:** Carlos ha usado Cita.ai con éxito y ya tiene 10 clientes únicos registrados. Un cliente nuevo intenta reservar a través de su link público.

**Steps:**

| Step | User Action | System Response | Potential Pain Point |
| :--- | :--- | :--- | :--- |
| 1 | **Intento de Reserva (Cliente 11):** Un nuevo cliente (cliente #11) entra al link de Carlos y selecciona un horario. | El sistema presenta la pantalla para introducir nombre y email, como siempre. | El cliente no tiene idea de que puede haber un problema. |
| 2 | **Bloqueo por Límite:** El cliente introduce sus datos y hace clic en "Confirmar Cita". | El sistema verifica que Carlos ya tiene 10 clientes únicos. Bloquea la creación del nuevo cliente y la cita. Muestra un mensaje al cliente: **"Este profesional no puede aceptar nuevos clientes a través de esta plataforma en este momento. Por favor, contacta con él directamente."** | El mensaje es vago y el cliente potencial se pierde. Carlos no se entera de que alguien intentó reservar. |
| 3 | **Notificación al Profesional:** Inmediatamente, el sistema envía un email a Carlos. | El email dice: **"¡Felicidades, tu negocio está creciendo! Has alcanzado el límite de 10 clientes de tu plan gratuito. Tus clientes actuales pueden seguir reservando, pero no se pueden añadir nuevos. ¿Listo para el siguiente nivel?"** Incluye un enlace al panel. | El email se va a spam o no es claro sobre las implicaciones (¿la app dejó de funcionar?). |
| 4 | **Visualización en el Panel:** Carlos inicia sesión en su panel de Cita.ai. | Ve un banner prominente, no intrusivo, en la parte superior: **"Has alcanzado el límite de 10 clientes. Para aceptar clientes ilimitados, conoce nuestros planes."** El banner tiene un botón "Ver Opciones". | El banner bloquea la pantalla o es demasiado agresivo, generando rechazo. |
| 5 | **Intento de Añadir Manualmente:** Carlos intenta añadir al cliente #11 manualmente desde su panel. | Al intentar guardar, el sistema muestra un pop-up en la interfaz con el mismo mensaje del banner, impidiendo guardar al nuevo cliente. | El sistema permite guardarlo, creando inconsistencias con el modelo de negocio. |

**Expected Outcome:** Carlos es consciente del límite de una manera que celebra su crecimiento. Entiende la limitación (no puede añadir *nuevos* clientes) y se le presenta una vía clara para explorar una futura actualización, validando la hipótesis de monetización.

**Alternative Paths / Edge Cases:**
-   **Cliente existente reserva:** Un cliente que ya está dentro de los 10 permitidos reserva una nueva cita. El sistema debe permitirlo sin problemas.
-   **Profesional no abre el email:** El banner en el dashboard actúa como un segundo punto de contacto para asegurar que el profesional vea la notificación.