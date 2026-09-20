# Executive Summary: Cita.ai MVP

## 1. Problem Statement

Los profesionales independientes (terapeutas, entrenadores, estilistas) pierden ingresos y tiempo valioso debido a una gestión de citas ineficiente y manual. El uso de herramientas desconectadas como WhatsApp, Instagram DMs y agendas de papel provoca errores costosos como las dobles reservas, olvidos de clientes (*no-shows*), y una mala experiencia para el cliente final. Este trabajo administrativo no facturable genera estrés y frena el crecimiento de sus negocios en un mercado cada vez más digital.

## 2. Solution Overview

**Cita.ai** es una aplicación web SaaS diseñada para ser la solución de agendamiento más simple del mercado. Mientras competidores como Acuity Scheduling ofrecen gran potencia a costa de una alta complejidad, nuestra diferenciación clave es la **simplicidad radical**. El MVP (Producto Mínimo Viable) se enfoca en entregar valor inmediato al profesional independiente sin la abrumadora curva de aprendizaje de la competencia.

**Core Features del MVP:**

*   **Panel de Administración Minimalista:** Permitirá al profesional registrarse, definir sus bloques de horario disponibles y gestionar citas existentes en una interfaz limpia e intuitiva.
*   **Portal de Auto-Reserva para el Cliente:** Una página pública y compartible donde los clientes finales pueden ver la disponibilidad en tiempo real y reservar un turno 24/7, eliminando la fricción.
*   **Confirmaciones Automatizadas por Email:** Tanto el profesional como el cliente recibirán notificaciones instantáneas, aportando la certeza y profesionalismo que los métodos manuales no ofrecen.
*   **Gestión Básica de Clientes:** Un listado simple de los clientes que han reservado, sentando las bases para futuras funcionalidades de CRM.

Esta solución ataca el problema central al reemplazar el caos manual con un sistema automatizado que se puede configurar en menos de 5 minutos.

## 3. Tech Stack

La arquitectura de la solución se basará en un stack moderno y escalable para garantizar un desarrollo rápido y un rendimiento óptimo.

*   **Frontend:** Next.js 15 (React)
*   **Backend & Database:** Supabase (usando PostgreSQL)
*   **Hosting & Deployment:** Vercel
*   **CI/CD:** GitHub Actions

## 4. Success Metrics (KPIs)

Nuestras métricas del MVP están diseñadas para validar las hipótesis fundamentales de valor y crecimiento antes de escalar.

*   **Métricas de Adopción:**
    *   **Nuevos Profesionales Registrados:** > 20 por semana (validación de nuestro marketing de canales).
    *   **Tasa de Activación:** > 60% de los nuevos profesionales configuran su disponibilidad y reciben su primera reserva en los primeros 7 días (validación de la simplicidad y onboarding).

*   **Métricas de Engagement:**
    *   **Retención de Profesionales (Semana 4):** > 40% de los profesionales activados siguen utilizando la plataforma 4 semanas después (validación del valor a mediano plazo).
    *   **Ratio de Auto-Reserva:** > 60% de las nuevas citas son creadas por el cliente final a través del portal (validación de la propuesta de valor para el cliente).

*   **Métricas de Negocio (Indicador Futuro):**
    *   **Tasa de Clics en "Upgrade":** > 15% de los profesionales que alcanzan el límite del plan gratuito (10 clientes) hacen clic en el botón "Más información sobre el Plan Pro" (validación de la hipótesis de monetización).

## 5. Target Users

*   **Perfil 1: El Profesional Independiente (Admin)**
    *   **Nombre:** Laura, Terapeuta Holística.
    *   **Descripción:** Gestiona su propio negocio y utiliza Instagram para atraer clientes. Es competente con la tecnología pero está constantemente ocupada y se siente abrumada por herramientas complejas.
    *   **Pain Point Principal:** Pierde horas coordinando citas por WhatsApp, lo que le ha llevado a cometer errores de agendamiento y le resta tiempo para preparar sus sesiones.

*   **Perfil 2: El Cliente Final**
    *   **Nombre:** David, Cliente de Laura.
    *   **Descripción:** Acostumbrado a la inmediatez de los servicios digitales. Espera poder gestionar sus propias reservas de forma autónoma y rápida.
    *   **Pain Point Principal:** Le resulta frustrante la incertidumbre y la demora de la coordinación manual, a menudo teniendo que esperar horas para una simple confirmación de cita.