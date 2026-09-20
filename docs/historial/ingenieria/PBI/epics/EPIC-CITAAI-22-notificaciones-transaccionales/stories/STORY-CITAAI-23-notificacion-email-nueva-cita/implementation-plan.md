# Implementation Plan: STORY-CITAAI-23 - New Appointment Notification

## Overview

Implementar el sistema de envío de correos transaccionales para confirmar reservas. Este es el primer punto de contacto "fuera de la app" con el usuario.

**Acceptance Criteria a cumplir:**
- ✅ Email al Cliente con detalles y link de cancelación.
- ✅ Email al Profesional con aviso de nueva reserva.
- ✅ Ejecución asíncrona (no debe bloquear la respuesta HTTP de la reserva).

---

## Technical Approach

**Chosen approach:** Utilizar **Resend** como proveedor de email (por su SDK simple y capa gratuita) invocado directamente desde el endpoint de creación de citas (`POST /api/appointments`). Para simplificar el MVP, haremos el envío de forma *síncrona* inicialmente (dentro de la misma función Serverless), aceptando un pequeño delay en la respuesta.

**Why this approach:**
- ✅ Simplicidad: Evita configurar colas (Queues/Workers) complejas en esta fase.
- ✅ Confiabilidad: Resend tiene alta entregabilidad.

---

## Implementation Steps

### **Step 1: Setup Resend**
**Task:** Configurar SDK y API Key.
**File:** `src/lib/email/client.ts`
**Env:** `RESEND_API_KEY`.

### **Step 2: Templates de Email (React Email)**
**Task:** Crear componentes visuales para los correos.
**Files:**
- `src/components/email/ClientConfirmation.tsx`
- `src/components/email/ProfessionalNotification.tsx`
**Content:** Logo, Fecha, Hora, Botón "Cancelar".

### **Step 3: Servicio de Envío**
**Task:** Función helper para orquestar el envío.
**File:** `src/lib/email/send.ts`
**Logic:** `sendConfirmationEmail(appointment, client, professional)`.

### **Step 4: Integración en Endpoint de Reserva**
**Task:** Llamar al servicio tras la inserción exitosa en DB.
**File:** `src/app/api/public/appointments/route.ts`

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Setup & Keys | 30m |
| 2. Email Templates | 1.5h |
| 3. Integration Logic | 1h |
| **Total** | **3h** |

**Story points:** 3

---

## Definition of Done Checklist
- [ ] Al reservar, llegan 2 correos (uno a cada parte).
- [ ] Los datos en el correo son correctos.
- [ ] El link de cancelación funciona.
