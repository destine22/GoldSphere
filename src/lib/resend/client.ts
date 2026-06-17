import { Resend } from 'resend'

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'hello@goldsphere.com'
export const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL || 'admin@goldsphere.com'

export const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set, emails will not be sent')
    return null
  }
  return new Resend(process.env.RESEND_API_KEY)
}
