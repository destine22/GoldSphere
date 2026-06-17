import {
  Text,
  Button,
  Section,
} from '@react-email/components'
import { EmailLayout } from './components/EmailLayout'
import * as React from 'react'

interface PasswordResetEmailProps {
  customerName: string
  resetUrl: string
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  customerName,
  resetUrl,
}) => {
  return (
    <EmailLayout>
      <Text
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#F0C040',
          fontFamily: "'Playfair Display', Georgia, serif",
          margin: '0 0 24px 0',
        }}
      >
        Reset Your Password
      </Text>

      <Text
        style={{
          fontSize: '16px',
          color: '#E8D5A3',
          lineHeight: '1.6',
          margin: '0 0 24px 0',
        }}
      >
        Hi {customerName}, We received a request to reset your GoldSphere account password. Click the button below to create a new password. This link expires in 1 hour.
      </Text>

      {/* Reset Password Button */}
      <Button
        href={resetUrl}
        style={{
          background: 'linear-gradient(135deg, #D4A017, #E8780C)',
          color: '#1A0800',
          fontWeight: 'bold',
          padding: '14px 32px',
          borderRadius: '6px',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '24px',
        }}
      >
        Reset Password
      </Button>

      {/* Security Note Box */}
      <Section
        style={{
          backgroundColor: '#2C1A0E',
          border: '1px solid #8B5E3C',
          borderRadius: '6px',
          padding: '16px',
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#C8A882',
          }}
        >
          If you did not request a password reset please ignore this email. Your account is safe.
        </Text>
      </Section>
    </EmailLayout>
  )
}
