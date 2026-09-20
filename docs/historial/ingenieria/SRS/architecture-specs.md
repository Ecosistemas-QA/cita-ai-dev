# Architecture Specifications: Cita.ai MVP

Este documento describe la arquitectura de software, el diseño de la base de datos y las decisiones técnicas para la construcción del MVP de Cita.ai, basado en el PRD y los requerimientos funcionales.

---

## 1. System Architecture

Se adopta una arquitectura de contenedores C4 (Nivel 2) para visualizar los componentes principales del sistema y sus interacciones.

```mermaid
graph TD
    subgraph "Usuarios"
        Professional["Profesional (Admin)"]
        Client["Cliente Final"]
    end

    subgraph "Plataforma Vercel"
        subgraph "Cita.ai Web App (Next.js 15)"
            Frontend["Frontend (React Server Components)"]
            Backend["Backend (API Routes)"]
        end
    end

    subgraph "Plataforma Supabase"
        Database["Base de Datos (PostgreSQL)"]
        Auth["Servicio de Autenticación"]
        Email["Servicio de Email Transaccional"]
    end

    Professional -- "Gestiona su agenda y perfil" --> Frontend
    Client -- "Consulta disponibilidad y reserva citas" --> Frontend
    Frontend -- "Renderiza UI y realiza llamadas a la API interna" --> Backend
    Backend -- "Valida credenciales y gestiona sesiones" --> Auth
    Backend -- "Lee y escribe datos de la aplicación" --> Database
    Backend -- "Dispara el envío de emails" --> Email
```

**Descripción del Flujo:**
- Los usuarios (Profesionales y Clientes) interactúan con el **Frontend** de Next.js, renderizado por Vercel.
- Las acciones del usuario que requieren lógica de negocio (ej: registrarse, crear una cita) son manejadas por el **Backend** (API Routes de Next.js).
- El Backend orquesta las operaciones con los servicios de **Supabase**: gestiona usuarios con el servicio de **Auth**, almacena y recupera datos de la **Base de Datos PostgreSQL**, y utiliza el servicio de **Email** para enviar notificaciones.

---

## 2. Database Design

El siguiente Diagrama de Entidad-Relación (ERD) muestra las entidades principales para el MVP. 

**Nota Importante:** Este es un modelo conceptual. No se generarán schemas SQL estáticos. Se utilizarán las herramientas de migración y el cliente de Supabase para interactuar con la base de datos, permitiendo que el schema evolucione de forma ágil.

```mermaid
erDiagram
    professionals {
        UUID id PK "FK to auth.users.id"
        string name
        string slug UK "URL pública"
        int appointment_duration_minutes
        timestamp created_at
    }

    clients {
        UUID id PK
        string name
        string email UK
        timestamp created_at
    }

    appointments {
        UUID id PK
        UUID professional_id FK
        UUID client_id FK
        timestamp start_time
        timestamp end_time
        string status
    }

    availability_rules {
        UUID id PK
        UUID professional_id FK
        int day_of_week "0=Domingo, 6=Sábado"
        time start_time
        time end_time
    }

    time_blocks {
        UUID id PK
        UUID professional_id FK
        timestamp start_time
        timestamp end_time
        string reason
    }

    professionals ||--o{ appointments : "tiene"
    clients ||--o{ appointments : "tiene"
    professionals ||--o{ availability_rules : "define"
    professionals ||--o{ time_blocks : "define"
```

---

## 3. Tech Stack Justification

| Componente | Justificación de la Elección |
| :--- | :--- |
| **Frontend: Next.js 15 (App Router)** | ✅ **React Server Components (RSC):** Mejora drásticamente la performance al reducir el JavaScript enviado al cliente.<br/>✅ **Framework Full-stack:** La integración nativa de UI y API Routes simplifica el desarrollo y el despliegue.<br/>✅ **Ecosistema Vercel:** Despliegue y optimizaciones automáticas (ISR, Edge Network) sin configuración adicional.<br/>❌ **Trade-off:** La curva de aprendizaje del App Router y los RSC es más pronunciada que la del Pages Router tradicional. |
| **Backend & DB: Supabase** | ✅ **Backend as a Service (BaaS):** Provee Auth, DB (PostgreSQL) y Storage listos para usar, acelerando el desarrollo del MVP.<br/>✅ **PostgreSQL Real:** Permite usar toda la potencia de una base de datos relacional, incluyendo RLS (Row Level Security) para la seguridad de los datos.<br/>✅ **Generoso Plan Gratuito:** Ideal para un MVP, permitiendo validar el producto con costos iniciales muy bajos.<br/>❌ **Trade-off:** Cierta dependencia del proveedor (vendor lock-in). Menos control sobre la infraestructura de la DB en comparación con una solución auto-gestionada. |
| **Hosting: Vercel** | ✅ **Integración Perfecta con Next.js:** Creado por el mismo equipo, garantiza el mejor rendimiento y compatibilidad.<br/>✅ **CI/CD Integrado:** Despliegues automáticos con cada push a la rama principal y creación de *preview deployments* para cada PR.<br/>✅ **Red de Edge Global:** Asegura baja latencia para usuarios en cualquier parte del mundo sin costo adicional en el plan básico.<br/>❌ **Trade-off:** Puede volverse costoso a medida que el tráfico y el uso de funciones serverless aumentan significativamente. |
| **CI/CD: GitHub Actions** | ✅ **Integrado en el Repositorio:** No requiere herramientas externas. Los flujos de trabajo viven junto al código.<br/>✅ **Gran Ecosistema:** Miles de acciones pre-construidas por la comunidad para tareas como linting, testing, etc.<br/>✅ **Flexibilidad:** Permite definir flujos de trabajo complejos más allá del simple despliegue (ej: correr tests de integración).<br/>❌ **Trade-off:** La sintaxis YAML y la gestión de flujos complejos pueden volverse verbosas. |

---

## 4. Data Flow: Reserva de Cita

Flujo de datos para la operación más crítica: un cliente reservando una cita.

1.  **Cliente** visita la página pública `cita.ai/{slug-del-profesional}`.
2.  **Frontend (Next.js)**: La página, renderizada en el servidor (vía ISR), realiza una llamada a la API interna en `/api/availability` para obtener los horarios de la semana actual.
3.  **Backend (API Route)**: El endpoint `/api/availability` consulta a **Supabase** para obtener las reglas de disponibilidad, los bloqueos de tiempo y las citas ya existentes para ese profesional.
4.  **Supabase (PostgreSQL)**: Ejecuta las consultas y devuelve los datos al Backend.
5.  **Backend**: Calcula los slots de tiempo disponibles y los devuelve como un array JSON al Frontend.
6.  **Frontend**: Renderiza los slots disponibles en el calendario para que el cliente pueda seleccionarlos.
7.  **Cliente** selecciona un slot y envía el formulario con su nombre y email.
8.  **Frontend** realiza una petición `POST` a `/api/appointments` con los datos de la reserva.
9.  **Backend**: Valida los datos de entrada. Verifica las reglas de negocio (límite freemium, concurrencia).
10. **Backend**: Llama a Supabase para crear (o encontrar) el registro del `client` y crear el nuevo registro en la tabla `appointments`.
11. **Backend**: Dispara el evento de notificación que será procesado por **Supabase Email**.
12. **Backend** devuelve una respuesta `201 Created` al Frontend.
13. **Frontend** muestra la página de confirmación de la reserva.

---

## 5. Security Architecture

### Flujo de Autenticación (Login)

```mermaid
sequenceDiagram
    participant C as Cliente (Navegador)
    participant S as Servidor (Next.js API)
    participant A as Supabase Auth

    C->>S: POST /api/auth/login (email, password)
    S->>A: Verifica credenciales del usuario
    A-->>S: Devuelve JWT (Access & Refresh Tokens)
    S-->>C: Establece los tokens en una cookie segura (httpOnly)
    C->>S: Realiza petición a un endpoint protegido (con la cookie)
    S->>A: Valida el JWT de la cookie en la petición
    A-->>S: Devuelve la sesión del usuario validada
    S-->>C: Devuelve los datos protegidos solicitados
```

### Implementación de RBAC (Role-Based Access Control)

Para el MVP, el control de acceso se implementará directamente en la base de datos usando **Row Level Security (RLS) de PostgreSQL**, una característica clave de Supabase.

-   **Rol `professional`:** Las políticas de RLS asegurarán que un profesional autenticado solo pueda leer o modificar registros que le pertenecen. Por ejemplo, una política en la tabla `appointments` sería `(auth.uid() = professional_id)`.
-   **Rol `public_client`:** Los usuarios anónimos solo tendrán acceso de lectura a datos públicos (perfil del profesional, horarios disponibles). No tendrán acceso a tablas como `clients` o a los detalles de citas de otros.

### Protección de Datos

-   **Encriptación:** Los datos están encriptados en tránsito (HTTPS/TLS 1.3 por Vercel) y en reposo (por Supabase).
-   **Sanitización de Entradas:** Todas las entradas del usuario serán validadas y sanitizadas en el Backend (API Routes) antes de ser procesadas o guardadas en la base de datos para prevenir ataques de inyección (SQLi, XSS).