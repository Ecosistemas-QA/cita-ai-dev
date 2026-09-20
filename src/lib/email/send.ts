import resend from './client';
import { getClientConfirmationTemplate, getProfessionalNotificationTemplate, getCancellationTemplate } from './templates';
import { formatAppointmentDate } from '@/lib/utils/datetime';

interface EmailParams {
  appointmentId: string;
  clientEmail: string;
  clientName: string;
  professionalEmail: string;
  professionalName: string;
  startTime: string;
}

export async function sendConfirmationEmails({
  appointmentId,
  clientEmail,
  clientName,
  professionalEmail,
  professionalName,
  startTime
}: EmailParams) {
  // ... (previous implementation remains same)
  const date = formatAppointmentDate(startTime, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const time = formatAppointmentDate(startTime, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const cancelLink = `${process.env.NEXT_PUBLIC_APP_URL}/cancelar/${appointmentId}`;

  const emailData = { clientName, professionalName, date, time, cancelLink };

  try {
    await resend.emails.send({
      from: 'Cita.ai <onboarding@resend.dev>',
      to: clientEmail,
      subject: `Reserva confirmada con ${professionalName}`,
      html: getClientConfirmationTemplate(emailData)
    });

    await resend.emails.send({
      from: 'Cita.ai <onboarding@resend.dev>',
      to: professionalEmail,
      subject: `Nueva reserva: ${clientName}`,
      html: getProfessionalNotificationTemplate(emailData)
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending emails:', error);
    return { success: false, error };
  }
}

export async function sendCancellationEmail({
  clientEmail,
  clientName,
  professionalEmail,
  professionalName,
  startTime,
  cancelledBy
}: Omit<EmailParams, 'appointmentId'> & { cancelledBy: 'professional' | 'client' }) {
  const date = formatAppointmentDate(startTime, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const time = formatAppointmentDate(startTime, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  const emailData = { clientName, professionalName, date, time, cancelLink: '', cancelledBy };
  const recipient = cancelledBy === 'professional' ? clientEmail : professionalEmail;
  const subject = cancelledBy === 'professional' 
    ? `Cita cancelada con ${professionalName}`
    : `Cita cancelada: ${clientName}`;

  try {
    await resend.emails.send({
      from: 'Cita.ai <onboarding@resend.dev>',
      to: recipient,
      subject: subject,
      html: getCancellationTemplate(emailData)
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    return { success: false, error };
  }
}
