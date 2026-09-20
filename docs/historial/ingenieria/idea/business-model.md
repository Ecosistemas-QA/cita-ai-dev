# Business Model Canvas: Cita.ai (MVP)

## Problem Statement

Los profesionales independientes que basan su negocio en citas (como terapeutas, entrenadores y estilistas) enfrentan una brecha de eficiencia crítica. Su experiencia central es el servicio que proveen, no la administración. Sin embargo, se ven forzados a dedicar horas no facturables cada semana a la tediosa coordinación de horarios a través de medios manuales como WhatsApp, DM de Instagram y llamadas.

Este proceso manual no solo consume tiempo, sino que es altamente propenso a errores humanos. Las "dobles reservas" (agendar a dos clientes a la misma hora) y los "no-shows" (clientes que olvidan su cita) son comunes, impactando directamente en los ingresos. Para el cliente final, la experiencia es igualmente frustrante; la incapacidad de ver un calendario completo y la necesidad de esperar una confirmación manual genera fricción y, en muchos casos, el abandono de la reserva.

---

## MVP Hypothesis

1.  **Hipótesis de Valor (Admin):** Creemos que los profesionales independientes adoptarán nuestra herramienta gratuita si les ahorra al menos 30 minutos de trabajo administrativo a la semana.
    *   **Métrica Clave:** Tasa de retención de Admins > 40% después de 4 semanas.

2.  **Hipótesis de Valor (Cliente):** Creemos que los clientes finales preferirán la auto-reserva online en lugar de contactar al profesional por chat.
    *   **Métrica Clave:** > 60% de las nuevas citas serán creadas a través del portal de cliente en lugar de ser cargadas manualmente por el Admin.

3.  **Hipótesis de Crecimiento/Monetización:** Creemos que los profesionales que alcancen el límite del plan gratuito (10 clientes) percibirán suficiente valor como para estar interesados en un plan pago.
    *   **Métrica Clave:** > 15% de los Admins activos que alcancen el límite de 10 clientes harán clic en el botón "Solicitar Upgrade".

---

## Business Model Canvas

| **Key Partners** | **Key Activities** | **Value Propositions** | **Customer Relationships** | **Customer Segments** |
| :--- | :--- | :--- | :--- | :--- |
| **(MVP) Ninguno.** El MVP es autocontenido. <br/><br/> *(Visión Futura):* <br/> - Pasarelas de pago (Stripe) <br/> - Proveedores de SMS/WhatsApp (Twilio) | **Desarrollo de Software:** <br/> - Construir y mantener la app (Admin, Cliente, API). <br/><br/> **Mantenimiento de Infraestructura:** <br/> - Asegurar uptime, velocidad y seguridad. <br/><br/> **Marketing de Captación (MVP):** <br/> - Dirigir tráfico a la Landing Page. <br/><br/> **Soporte al Usuario:** <br/> - Responder emails de los Admins. | **Para el Admin (Profesional):** <br/> - Ahorro de tiempo en tareas admin. <br/> - Centralización y orden de la agenda. <br/> - Reducción de errores (citas duplicadas). <br/> - Profesionalización de su servicio. <br/><br/> **Para el Cliente:** <br/> - Auto-reserva 24/7 sin fricción. <br/> - Visibilidad de disponibilidad real. <br/> - Confirmación automática por email. | **Auto-servicio (Self-Service):** <br/> - El Admin se registra y configura solo. <br/><br/> **Automatizada:** <br/> - El Cliente interactúa con el software (portal, emails). <br/><br/> **Soporte (MVP):** <br/> - Soporte reactivo básico vía email para el Admin. | **Profesionales Independientes (Admin):** <br/> - Terapeutas, entrenadores, tutores, estilistas. <br/> - Necesitan una solución simple de gestión de citas. <br/><br/> **Clientes Finales (Cliente):** <br/> - Buscan una forma fácil y rápida de reservar. |
| **Key Resources** | | **Channels** |
| **Plataforma de Software:** <br/> - Código fuente (backend, frontend). <br/><br/> **Infraestructura Cloud:** <br/> - Servidores, base de datos. <br/><br/> **Dominio y Landing Page.** <br/><br/> **Conocimiento Técnico:** <br/> - Equipo de desarrollo. | | **Landing Page** con SEO enfocado (ej: "gestor de turnos para psicólogos"). <br/><br/> **Redes Sociales** (Instagram, LinkedIn) mostrando el *pain point* y la solución. <br/><br/> **Comunidades y Foros** de profesionales. <br/><br/> **Boca a boca.** |
| **Cost Structure** | **Revenue Streams** |
| **Costos Fijos (MVP):** <br/> - Costo de desarrollo (horas/hombre) para construir el MVP. <br/><br/> **Costos Variables (MVP):** <br/> - Hosting de infraestructura (Cloud, DB). <br/> - Servicio de envío de emails transaccionales (ej: SendGrid). <br/> - Dominio y hosting de la Landing Page. | **Modelo Freemium (Enfoque del MVP):** <br/> - El MVP es el plan gratuito. <br/><br/> **Plan Gratuito:** <br/> - 1 calendario activo. <br/> - 10 clientes registrados. <br/> - Confirmaciones por email. <br/><br/> ***Hipótesis de Ingreso (a validar):*** <br/> La monetización vendrá de un futuro "Plan Pro" (no en el MVP) cuando los usuarios alcancen los límites del plan gratuito. |