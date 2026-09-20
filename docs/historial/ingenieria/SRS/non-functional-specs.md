# Non-Functional Specifications: Cita.ai MVP

Este documento define los Requerimientos No Funcionales (NFRs) para el MVP de Cita.ai. Estos requerimientos describen los atributos de calidad del sistema, como performance, seguridad y fiabilidad.

---

## 1. Performance

-   **Page Load Time:** El *Largest Contentful Paint* (LCP) para las páginas principales (landing, portal de reserva) debe ser **< 2 segundos**.
-   **API Response Time:** El 95% de las llamadas a la API (percentil p95) deben completarse en **< 500ms**.
-   **Time to Interactive (TTI):** Las páginas deben ser interactivas en **< 3 segundos**.
-   **Concurrent Users:** El sistema debe soportar **100 usuarios concurrentes** para el MVP, con una arquitectura que permita escalar a **1,000+** en v2.
-   **Database Query Time:** Las consultas simples a la base de datos (ej: obtener un perfil) deben ejecutarse en **< 100ms**.

---

## 2. Security

-   **Authentication:** La autenticación de los profesionales se gestionará mediante **JWT (JSON Web Tokens)**, provistos por Supabase Auth.
-   **Authorization:** Se implementará un sistema de autorización básico. Para el MVP, los roles son: `professional` (autenticado, dueño de sus datos) y `public_client` (anónimo, solo puede ver páginas públicas y reservar).
-   **Data Encryption:**
    -   **At Rest:** Todos los datos persistidos en la base de datos de Supabase estarán encriptados por defecto.
    -   **In Transit:** Toda la comunicación entre el cliente y el servidor será a través de **HTTPS/TLS 1.3**, forzado por Vercel.
-   **Input Validation:** Se realizará validación de datos tanto en el **cliente** (para feedback inmediato al usuario) como en el **servidor** (para prevenir ataques).
-   **Password Policy:** La contraseña del profesional debe tener un mínimo de **8 caracteres, incluyendo al menos una mayúscula y un número**.
-   **Session Management:** El `access_token` de sesión expirará a los **15 minutos**. Se usará un `refresh_token` para renovar la sesión de forma segura, el cual expirará a los **7 días**.
-   **OWASP Top 10:** El desarrollo seguirá las mejores prácticas para mitigar las vulnerabilidades más comunes (ej: Inyección SQL, XSS, CSRF), aprovechando las protecciones nativas del stack (Supabase para SQLi, React/Next.js para XSS).

---

## 3. Scalability

-   **Database:** Se utilizará **PostgreSQL** a través de Supabase. Se activará **Row Level Security (RLS)** para asegurar que un profesional solo pueda acceder y modificar sus propios datos, garantizando la escalabilidad multi-tenant.
-   **CDN (Content Delivery Network):** El contenido estático y las páginas serán distribuidas globalmente a través de la **Vercel Edge Network** para baja latencia.
-   **Caching Strategy:**
    -   **Páginas Públicas:** Se usará **ISR (Incremental Static Regeneration)** de Next.js para las páginas de reserva, permitiendo que sean estáticas pero se actualicen periódicamente o bajo demanda.
    -   **API Caching:** Se configurarán headers de `Cache-Control` apropiados para las respuestas de la API que no sean dinámicas.
-   **Horizontal Scaling:** La arquitectura de API routes de Next.js sobre Vercel es *stateless* y escala horizontalmente de forma automática.
-   **Database Connection Pooling:** Gestionado automáticamente por Supabase para manejar múltiples conexiones de forma eficiente.

---

## 4. Accessibility

-   **WCAG Compliance:** El objetivo es alcanzar el nivel **AA de WCAG 2.1** para todas las interfaces públicas.
-   **Keyboard Navigation:** Todas las funcionalidades interactivas (formularios, botones, calendarios) deben ser completamente accesibles y operables usando solo el teclado.
-   **Screen Reader Support:** Se usarán atributos **ARIA (Accessible Rich Internet Applications)** en elementos clave para asegurar la compatibilidad con lectores de pantalla.
-   **Color Contrast:** El contraste de color entre el texto y el fondo debe ser de al menos **4.5:1** para texto de tamaño normal.
-   **Focus Indicators:** Los indicadores de foco del teclado deben ser claros y visibles en todos los elementos interactivos.

---

## 5. Browser Support

La aplicación debe ser completamente funcional en las **últimas 2 versiones** de los siguientes navegadores:

-   **Desktop:**
    -   Google Chrome
    -   Mozilla Firefox
    -   Apple Safari
    -   Microsoft Edge
-   **Mobile:**
    -   iOS Safari
    -   Android Chrome

---

## 6. Reliability

-   **Uptime:** El objetivo de disponibilidad del servicio es del **99.9%**.
-   **Error Rate:** La tasa de errores del lado del servidor (respuestas 5xx) debe ser **< 0.5%** del total de requests.
-   **Recovery Time Objective (RTO):** En caso de un incidente crítico, el tiempo para restaurar el servicio debe ser **< 15 minutos**.

---

## 7. Maintainability

-   **Code Coverage:** Se exigirá una cobertura de tests unitarios y de integración superior al **80%** para el nuevo código.
-   **Documentation:** El código debe estar documentado. Se mantendrá una colección de Postman (o similar) para la API y un `README.md` actualizado en el repositorio.
-   **Linting & Formatting:** Se configurará **ESLint** y **Prettier** en el proyecto, y se ejecutará como un pre-commit hook para garantizar un estilo de código consistente.
-   **TypeScript:** El proyecto se desarrollará en TypeScript con el modo `strict` habilitado para minimizar errores en tiempo de ejecución.