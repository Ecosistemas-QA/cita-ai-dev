interface EmailData {
  clientName: string;
  professionalName: string;
  date: string;
  time: string;
  cancelLink: string;
}

export function getClientConfirmationTemplate({ clientName, professionalName, date, time, cancelLink }: EmailData) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4F46E5;">Confirmación de Reserva</h1>
      <p>Hola <strong>${clientName}</strong>,</p>
      <p>Tu cita con <strong>${professionalName}</strong> ha sido confirmada con éxito.</p>
      
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;">📅 <strong>Fecha:</strong> ${date}</p>
        <p style="margin: 5px 0;">⏰ <strong>Hora:</strong> ${time}</p>
      </div>

      <p>Si necesitas cancelar, puedes hacerlo a través del siguiente enlace:</p>
      <a href="${cancelLink}" style="display: inline-block; background-color: #EF4444; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Cancelar Cita</a>
      
      <p style="margin-top: 30px; font-size: 12px; color: #6B7280;">Gracias por usar Cita.ai</p>
    </div>
  `;
}

export function getProfessionalNotificationTemplate({ clientName, date, time, cancelLink }: EmailData) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #10B981;">Nueva Reserva Recibida</h1>
      <p>¡Buenas noticias! Has recibido una nueva reserva.</p>
      
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;">👤 <strong>Cliente:</strong> ${clientName}</p>
        <p style="margin: 5px 0;">📅 <strong>Fecha:</strong> ${date}</p>
        <p style="margin: 5px 0;">⏰ <strong>Hora:</strong> ${time}</p>
      </div>

      <p>Puedes gestionar esta cita desde tu panel de control.</p>
      
      <p style="margin-top: 30px; font-size: 12px; color: #6B7280;">Equipo Cita.ai</p>
    </div>
  `;
}

export function getCancellationTemplate({ clientName, professionalName, date, time, cancelledBy }: EmailData & { cancelledBy: 'professional' | 'client' }) {
  const isPro = cancelledBy === 'professional';
  const title = isPro ? 'Cita Cancelada por el Profesional' : 'Cita Cancelada por el Cliente';
  const message = isPro 
    ? `Lamentamos informarte que <strong>${professionalName}</strong> ha tenido que cancelar la cita.`
    : `Te informamos que <strong>${clientName}</strong> ha cancelado su cita.`;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #EF4444;">${title}</h1>
      <p>Hola,</p>
      <p>${message}</p>
      
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;">📅 <strong>Fecha:</strong> ${date}</p>
        <p style="margin: 5px 0;">⏰ <strong>Hora:</strong> ${time}</p>
      </div>

      <p>${isPro ? 'Puedes intentar agendar en otro horario disponible.' : 'El horario ya está disponible nuevamente en tu calendario.'}</p>
      
      <p style="margin-top: 30px; font-size: 12px; color: #6B7280;">Equipo Cita.ai</p>
    </div>
  `;
}
