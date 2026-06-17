import {
  Text,
  Button,
  Section,
} from '@react-email/components'
import { EmailLayout } from './components/EmailLayout'
import * as React from 'react'

interface OrderStatusEmailProps {
  customerName: string
  orderNumber: string
  status: string
  message: string
  orderUrl: string
}

export const OrderStatusEmail: React.FC<OrderStatusEmailProps> = ({
  customerName,
  orderNumber,
  status,
  message,
  orderUrl,
}) => {
  const getHeading = () => {
    switch (status) {
      case 'processing':
        return 'Your Order is Being Prepared'
      case 'shipped':
        return 'Your Order is On Its Way'
      case 'delivered':
        return 'Your Order Has Arrived'
      case 'cancelled':
        return 'Your Order Has Been Cancelled'
      default:
        return 'Your Order Update'
    }
  }

  const getStatusBadgeStyle = () => {
    switch (status) {
      case 'processing':
        return { backgroundColor: '#E8780C', color: '#1A0800' }
      case 'shipped':
        return { backgroundColor: '#6A9A5A', color: '#1A0800' }
      case 'delivered':
        return { backgroundColor: '#4A7A3A', color: '#1A0800' }
      case 'cancelled':
        return { backgroundColor: '#C1440E', color: '#F5E8C0' }
      default:
        return { backgroundColor: '#D4A017', color: '#1A0800' }
    }
  }

  const statusBadgeStyle = getStatusBadgeStyle()

  return (
    <EmailLayout>
      <Text
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#F0C040',
          fontFamily: "'Playfair Display', Georgia, serif",
          margin: '0 0 16px 0',
        }}
      >
        {getHeading()}
      </Text>

      {/* Status Badge */}
      <Section
        style={{
          ...statusBadgeStyle,
          borderRadius: '6px',
          padding: '8px 16px',
          display: 'inline-block',
          marginBottom: '24px',
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </Section>

      <Text
        style={{
          fontSize: '16px',
          color: '#E8D5A3',
          lineHeight: '1.6',
          margin: '0 0 24px 0',
        }}
      >
        {message}
      </Text>

      {/* Status-specific extra text */}
      {status === 'shipped' && (
        <Text
          style={{
            fontSize: '14px',
            color: '#C8A882',
            margin: '0 0 24px 0',
          }}
        >
          Your package is on its way to you. Please allow 5 to 10 business days for delivery within Europe.
        </Text>
      )}
      {status === 'delivered' && (
        <Text
          style={{
            fontSize: '14px',
            color: '#C8A882',
            margin: '0 0 24px 0',
          }}
        >
          We hope you love your African foods. Please share your experience and consider leaving a review.
        </Text>
      )}
      {status === 'cancelled' && (
        <Text
          style={{
            fontSize: '14px',
            color: '#C8A882',
            margin: '0 0 24px 0',
          }}
        >
          We are sorry your order was cancelled. If you have questions please contact our support team.
        </Text>
      )}

      {/* View Order Button */}
      <Button
        href={orderUrl}
        style={{
          background: 'linear-gradient(135deg, #D4A017, #E8780C)',
          color: '#1A0800',
          fontWeight: 'bold',
          padding: '14px 32px',
          borderRadius: '6px',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        View Order
      </Button>
    </EmailLayout>
  )
}
