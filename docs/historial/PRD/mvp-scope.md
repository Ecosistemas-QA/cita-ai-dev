# MVP Scope: Cita.ai

Este documento define las funcionalidades que se incluirán en el Producto Mínimo Viable (MVP) de Cita.ai, así como aquellas que se excluirán deliberadamente para asegurar un lanzamiento rápido y enfocado en validar nuestras hipótesis principales.

## 1. In Scope (Must-Have Features)

Las siguientes épicas y user stories constituyen el núcleo del MVP. Deben estar completadas para considerar el producto lanzable.

---

### **EPIC-CAI-1: Gestión de Cuentas de Profesional (Admin)**
*Permite a los profesionales crear y gestionar su identidad en la plataforma.*

-   **US 1.1:** Como Laura (profesional), quiero poder registrarme con mi nombre, email y contraseña para crear mi cuenta en Cita.ai.
-   **US 1.2:** Como Carlos (profesional), quiero poder iniciar sesión con mi email y contraseña para acceder a mi panel de administración.
-   **US 1.3:** Como Laura, quiero poder recuperar mi contraseña a través de mi email si la olvido, para no perder el acceso a mi cuenta.
-   **US 1.4:** Como Carlos, quiero que se genere una URL pública única y simple para mi perfil (ej: `cita.ai/carlos-rojas`) para poder compartirla fácilmente en mi Instagram o WhatsApp.

---

### **EPIC-CAI-2: Gestión de Disponibilidad**
*El corazón de la propuesta de valor: el profesional define cuándo está disponible.*

-   **US 2.1:** Como Laura, quiero poder definir mis bloques de horario de trabajo recurrentes por día de la semana (ej: Lunes de 9:00 a 18:00) para establecer mi disponibilidad base.
-   **US 2.2:** Como Carlos, quiero poder definir la duración estándar de mis citas (ej: 45, 60 minutos) para que los turnos se muestren correctamente.
-   **US 2.3:** Como Laura, quiero poder añadir "bloqueos" de tiempo específicos en mi calendario para vacaciones o citas personales, para que nadie pueda reservar en esos momentos.

---

### **EPIC-CAI-3: Portal de Reserva del Cliente**
*La experiencia del cliente final para la auto-reserva.*

-   **US 3.1:** Como Sofía (cliente), al visitar la URL pública de un profesional, quiero ver sus horarios disponibles en una vista de calendario simple para encontrar un turno que me convenga.
-   **US 3.2:** Como Sofía, quiero poder seleccionar un día y hora disponibles e ingresar mi nombre y email para solicitar la cita.
-   **US 3.3:** Como Sofía, quiero ver una página de confirmación inmediata después de enviar mi solicitud para saber que el proceso funcionó.

---

### **EPIC-CAI-4: Gestión de Citas**
*Visualización y administración básica de las citas agendadas.*

-   **US 4.1:** Como Laura, quiero tener un panel principal donde pueda ver una lista o calendario de mis próximas citas agendadas para saber cómo se ve mi día/semana.
-   **US 4.2:** Como Carlos, quiero poder cancelar una cita desde mi panel. Esto debe eliminarla de mi agenda y liberar el espacio para que otro cliente pueda reservarlo.
-   **US 4.3:** Como Sofía, quiero que el email de confirmación contenga un enlace para poder cancelar mi cita si surge un imprevisto.

---

### **EPIC-CAI-5: Notificaciones Transaccionales**
*Asegura la comunicación y reduce la incertidumbre para ambas partes.*

-   **US 5.1:** Como Sofía y Laura, queremos recibir una notificación por email instantánea cuando se crea una nueva cita.
-   **US 5.2:** Como Sofía y Carlos, queremos recibir una notificación por email si una cita es cancelada (ya sea por el cliente o el profesional).

---

### **EPIC-CAI-6: Lógica Freemium**
*Introduce el modelo de negocio desde el inicio para validar la hipótesis de crecimiento.*

-   **US 6.1:** Como Carlos, quiero poder ver una lista simple de todos los clientes que han reservado conmigo.
-   **US 6.2:** Como Laura, al intentar agendar una cita para mi cliente número 11, el sistema debe informarme que he alcanzado el límite del plan gratuito.
-   **US 6.3:** Como profesional que ha alcanzado el límite, quiero ver un banner o sección que me invite a solicitar más información sobre los futuros planes de pago.

## 2. Out of Scope (Nice to Have for v2+)

Las siguientes funcionalidades son importantes pero no críticas para validar las hipótesis del MVP. Se considerarán para versiones futuras.

-   **Pagos:** Integración con Stripe/MercadoPago para cobrar por las citas.
-   **Sincronización de Calendario:** Sincronización bidireccional con Google Calendar, Outlook, etc.
-   **Recordatorios de Citas:** Notificaciones automáticas (email/SMS) 24h o 1h antes de la cita.
-   **Servicios Múltiples:** Posibilidad de definir diferentes tipos de servicios con distintas duraciones y precios.
-   **Formularios de Admisión:** Campos personalizables para que el cliente rellene al reservar.
-   **Gestión de Clientes Avanzada (CRM):** Añadir notas privadas a clientes, ver historial completo, etc.
-   **Dashboard y Analíticas:** Métricas visuales para el profesional (ingresos, citas por mes, etc.).
-   **Cuentas para Equipos:** Múltiples calendarios para varios profesionales bajo una misma cuenta.
-   **Aplicaciones Móviles Nativas:** Apps para iOS o Android.

## 3. Success Criteria

El MVP se considerará un éxito y estará listo para un lanzamiento público si cumple con los siguientes criterios:

-   **Criterios de Aceptación Funcional:**
    -   Todas las User Stories definidas en la sección "In Scope" están implementadas, probadas y funcionan correctamente en los navegadores web modernos (Chrome, Firefox, Safari), tanto en escritorio como en móvil.
    -   El flujo completo (Registro del profesional -> Configuración de disponibilidad -> Reserva del cliente -> Notificación por email) se completa sin errores.

-   **Criterios de Métrica (a alcanzar en las 8 semanas post-lanzamiento):**
    -   **Retención:** La tasa de retención de profesionales en la semana 4 es >= 40%.
    -   **Adopción de Valor:** El ratio de auto-reserva por parte de clientes es >= 60%.
    -   **Potencial de Negocio:** La tasa de clics en el botón de "Upgrade" por parte de usuarios que alcanzan el límite es >= 15%.

-   **Condiciones para el Lanzamiento (Go/No-Go):**
    -   Realizar un *soft launch* con un grupo de 20-50 profesionales "amigos y familia" para obtener feedback inicial.
    -   La plataforma debe demostrar una alta estabilidad (sin errores críticos o caídas del sistema) durante 2 semanas con los usuarios del *soft launch*.
    -   El tiempo de configuración inicial para un nuevo profesional (desde el registro hasta tener la URL pública lista) es inferior a 5 minutos.