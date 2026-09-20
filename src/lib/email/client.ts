import { Resend } from 'resend';

// NOTE: In production, this key should be in process.env.RESEND_API_KEY
// For this MVP, ensure the variable is set in .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
