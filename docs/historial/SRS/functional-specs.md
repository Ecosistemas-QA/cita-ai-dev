# Functional Specifications: Cita.ai MVP

Este documento detalla los requerimientos funcionales (FR) para el MVP de Cita.ai, derivados de las User Stories definidas en el documento `mvp-scope.md`.

---

### **EPIC-CAI-1: Gestión de Cuentas de Profesional (Admin)**

**FR-001: El sistema debe permitir el registro de un nuevo profesional.**
- **Relacionado a:** EPIC-CAI-1, US 1.1
- **Input:**
  - `name` (string, no vacío, max 100 chars)
  - `email` (string, formato de email válido, max 254 chars)
  - `password` (string, min 8 chars)
- **Processing:**
  1. Validar que todos los campos cumplan con las reglas.
  2. Verificar que el `email` no exista en la tabla `professionals`.
  3. Hashear el `password` usando un algoritmo seguro (ej: bcrypt).
  4. Crear un `slug` único para la URL a partir del `name` (ej: "carlos-rojas-2").
  5. Guardar el nuevo registro en la tabla `professionals`.
- **Output:**
  - **Success:** Objeto del profesional creado (incluyendo ID y slug) y un token de sesión (JWT).
  - **Error:** Mensaje de error descriptivo (ej: "El email ya está en uso", "La contraseña es muy corta").
- **Validations:**
  - El `email` debe ser único en el sistema.
  - El `password` debe cumplir la política de seguridad mínima.

**FR-002: El sistema debe permitir la autenticación de un profesional.**
- **Relacionado a:** EPIC-CAI-1, US 1.2
- **Input:**
  - `email` (string)
  - `password` (string)
- **Processing:**
  1. Buscar al profesional por `email`.
  2. Si se encuentra, comparar el `password` proporcionado con el hash almacenado en la base de datos.
- **Output:**
  - **Success:** Objeto del profesional y un nuevo token de sesión (JWT).
  - **Error:** Mensaje de error genérico ("Email o contraseña incorrectos").
- **Validations:**
  - El profesional debe existir y estar activo.
  - La contraseña debe coincidir.

**FR-003: El sistema debe permitir la recuperación de contraseña.**
- **Relacionado a:** EPIC-CAI-1, US 1.3
- **Input:** `email` (string)
- **Processing:**
  1. Buscar al profesional por `email`.
  2. Si existe, generar un token de reseteo único y con tiempo de expiración (ej: 1 hora).
  3. Almacenar el token y su expiración asociados al profesional.
  4. Enviar un email al profesional con un enlace que contenga dicho token.
- **Output:** Mensaje de éxito genérico ("Si el email existe en nuestro sistema, recibirás un enlace para recuperar tu contraseña").
- **Validations:**
  - Se ejecuta el proceso solo si el email existe, pero la respuesta al usuario es siempre la misma para no revelar qué emails están registrados.

**FR-004: El sistema debe generar una URL de perfil pública y única.**
- **Relacionado a:** EPIC-CAI-1, US 1.4
- **Nota:** Este requerimiento es parte del proceso de registro (FR-001).
- **Input:** `name` (string) del profesional durante el registro.
- **Processing:**
  1. Convertir el `name` a un formato `slug` (minúsculas, sin acentos, espacios a guiones).
  2. Verificar si el `slug` ya existe en la tabla `professionals`.
  3. Si existe, añadir un sufijo numérico incremental (ej: `ana-perez-2`, `ana-perez-3`) hasta encontrar uno único.
  4. Almacenar el `slug` final en el registro del profesional.
- **Output:** El `slug` único se almacena en la base de datos.
- **Validations:**
  - El `slug` generado debe ser único en toda la plataforma.

---

### **EPIC-CAI-2: Gestión de Disponibilidad**

**FR-005: El sistema debe permitir definir bloques de disponibilidad semanal recurrentes.**
- **Relacionado a:** EPIC-CAI-2, US 2.1
- **Input:** `professionalId` (UUID), `availability` (array de objetos: `{ day: int[0-6], startTime: 'HH:mm', endTime: 'HH:mm' }`).
- **Processing:**
  1. Para el `professionalId` dado, eliminar todas las reglas de disponibilidad existentes.
  2. Insertar las nuevas reglas del array `availability`.
- **Output:** Mensaje de éxito.
- **Validations:**
  - `endTime` debe ser posterior a `startTime`.
  - Los bloques de un mismo día no deben solaparse.

**FR-006: El sistema debe permitir definir la duración estándar de las citas.**
- **Relacionado a:** EPIC-CAI-2, US 2.2
- **Input:** `professionalId` (UUID), `duration` (int, en minutos).
- **Processing:** Actualizar el campo `appointment_duration` en el perfil del profesional.
- **Output:** Mensaje de éxito.
- **Validations:**
  - `duration` debe ser un valor positivo (ej: > 0).

**FR-007: El sistema debe permitir bloquear rangos de tiempo específicos.**
- **Relacionado a:** EPIC-CAI-2, US 2.3
- **Input:** `professionalId` (UUID), `startTime` (datetime ISO), `endTime` (datetime ISO).
- **Processing:** Crear un nuevo registro en la tabla `time_blocks` asociado al profesional.
- **Output:** Objeto del bloqueo creado.
- **Validations:**
  - `endTime` debe ser posterior a `startTime`.

---

### **EPIC-CAI-3: Portal de Reserva del Cliente**

**FR-008: El sistema debe mostrar los huecos de cita disponibles de un profesional.**
- **Relacionado a:** EPIC-CAI-3, US 3.1
- **Input:** `slug` (string), `startDate` (date).
- **Processing:**
  1. Obtener el perfil del profesional a través del `slug`.
  2. Generar todos los posibles slots de cita para un rango (ej: 1 semana desde `startDate`) basados en su disponibilidad recurrente (FR-005) y duración de cita (FR-006).
  3. Consultar las citas ya agendadas y los bloqueos de tiempo (FR-007) en ese rango.
  4. Filtrar la lista de slots posibles, eliminando aquellos que se solapen con citas o bloqueos existentes.
- **Output:** Array de `datetimes` ISO representando el inicio de cada slot disponible.
- **Validations:**
  - Si el `slug` no existe, retornar un error 404.

**FR-009: El sistema debe permitir a un cliente solicitar una cita.**
- **Relacionado a:** EPIC-CAI-3, US 3.2
- **Input:** `professionalId` (UUID), `startTime` (datetime ISO), `clientName` (string), `clientEmail` (string).
- **Processing:**
  1. **(Lógica Freemium)** Verificar si el `clientEmail` es nuevo para este profesional. Si es nuevo y el profesional ha alcanzado el límite de 10 clientes, rechazar la solicitud (ver FR-015).
  2. **(Control de Concurrencia)** Volver a verificar que el `startTime` sigue disponible inmediatamente antes de la inserción.
  3. Buscar o crear un registro en la tabla `clients` con el `clientEmail`.
  4. Crear un registro en la tabla `appointments` con estado "confirmed", asociando al profesional y al cliente.
  5. Disparar el evento de notificación (FR-011).
- **Output:**
  - **Success:** Objeto de la cita creada.
  - **Error:** Mensaje de error (ej: "El horario ya no está disponible", "Este profesional ha alcanzado el límite de nuevos clientes").
- **Validations:**
  - El `startTime` debe corresponder a un slot válido y disponible.

**FR-010: El sistema debe mostrar una página de confirmación.**
- **Relacionado a:** EPIC-CAI-3, US 3.3
- **Nota:** Este es un requerimiento de frontend. El backend solo necesita devolver una respuesta exitosa en FR-009 para que el frontend pueda mostrar esta página.

---

### **EPIC-CAI-4: Gestión de Citas**

**FR-011: El sistema debe listar las próximas citas de un profesional.**
- **Relacionado a:** EPIC-CAI-4, US 4.1
- **Input:** `professionalId` (UUID), `rangeStartDate` (date).
- **Processing:** Consultar en la tabla `appointments` todas las citas para el `professionalId` donde `startTime` sea posterior a `rangeStartDate`. Unir con la tabla `clients` para obtener los nombres.
- **Output:** Array de objetos de cita, cada uno con los datos del cliente.

**FR-012: El sistema debe permitir la cancelación de una cita.**
- **Relacionado a:** EPIC-CAI-4, US 4.2, US 4.3
- **Input:** `appointmentId` (UUID), `cancelledBy` (rol: 'professional' o 'client').
- **Processing:**
  1. Verificar que la cita existe y que quien la cancela tiene permiso (el profesional dueño o el cliente a través de un token seguro).
  2. Cambiar el estado de la cita a `cancelled` o eliminar el registro.
  3. Disparar el evento de notificación de cancelación (FR-014).
- **Output:** Mensaje de éxito.
- **Validations:**
  - La cita no debe estar en el pasado.

---

### **EPIC-CAI-5: Notificaciones Transaccionales**

**FR-013: El sistema debe enviar notificaciones de nueva cita.**
- **Relacionado a:** EPIC-CAI-5, US 5.1
- **Input:** Evento de "cita creada" con los datos de la cita, profesional y cliente.
- **Processing:**
  1. Construir y enviar un email de confirmación al cliente. Debe incluir los detalles de la cita y un enlace/token para la cancelación.
  2. Construir y enviar un email de notificación al profesional.
- **Output:** N/A (proceso asíncrono).

**FR-014: El sistema debe enviar notificaciones de cancelación de cita.**
- **Relacionado a:** EPIC-CAI-5, US 5.2
- **Input:** Evento de "cita cancelada" con los datos de la cita y quién la canceló.
- **Processing:** Enviar un email a la parte que NO inició la cancelación para informarle.
- **Output:** N/A (proceso asíncrono).

---

### **EPIC-CAI-6: Lógica Freemium**

**FR-015: El sistema debe listar los clientes de un profesional.**
- **Relacionado a:** EPIC-CAI-6, US 6.1
- **Input:** `professionalId` (UUID).
- **Processing:** Obtener una lista de registros únicos de la tabla `clients` que estén asociados a citas con el `professionalId`.
- **Output:** Array de objetos de cliente.

**FR-016: El sistema debe aplicar el límite de clientes del plan gratuito.**
- **Relacionado a:** EPIC-CAI-6, US 6.2
- **Nota:** Este requerimiento es una regla de negocio dentro de FR-009.
- **Processing:** Antes de crear una cita para un cliente nuevo, el sistema debe contar el número de clientes únicos (FR-015) del profesional. Si el conteo es 10 o más, la operación de creación de cita (FR-009) debe fallar con un error específico.
- **Validations:**
  - El conteo de clientes debe ser preciso.
  - El límite solo aplica a clientes nuevos, no a reservas de clientes existentes.

**FR-017: El sistema debe exponer el estado del límite del plan.**
- **Relacionado a:** EPIC-CAI-6, US 6.3
- **Nota:** Este es un requerimiento de frontend/UI. El backend debe simplemente exponer el conteo actual de clientes del profesional a través de un endpoint del perfil. El frontend usará este dato para mostrar o no el banner de "Upgrade".