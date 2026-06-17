import {
  Text,
  Button,
  Section,
  Row,
  Column,
} from '@react-email/components'
import { EmailLayout } from './components/EmailLayout'
import { formatPrice } from '@/lib/currency'
import * as React from 'react'

interface OrderItem {
  name: string
  quantity: number
  unitPrice: number
}

interface ShippingAddress {
  street: string
  city: string
  country: string
  zip: string
}

interface OrderConfirmationEmailProps {
  customerName: string
  orderNumber: string
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  total: number
  orderUrl: string
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  customerName,
  orderNumber,
  orderItems,
  shippingAddress,
  total,
  orderUrl,
}) => {
  return (
    <EmailLayout>
      <Text
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#F0C040',
          fontFamily: "'Playfair Display', Georgia, serif",
          margin: '0 0 8px 0',
        }}
      >
        Order Confirmed
      </Text>
      <Text
        style={{
          fontSize: '16px',
          color: '#C8A882',
          margin: '0 0 16px 0',
        }}
      >
        Thank you {customerName}. Your order has been received and is being prepared.
      </Text>

      {/* Order Number Badge */}
      <Section
        style={{
          backgroundColor: '#2C1A0E',
          border: '1px solid #8B5E3C',
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
            fontWeight: '600',
            color: '#F0C040',
            fontFamily: 'monospace',
          }}
        >
          GS-{orderNumber}
        </Text>
      </Section>

      {/* Your Items Section */}
      <Text
        style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#F0C040',
          margin: '0 0 16px 0',
        }}
      >
        Your Items
      </Text>

      {orderItems.map((item, index) => (
        <Row
          key={index}
          style={{
            borderBottom: '1px solid #8B5E3C',
            paddingBottom: '12px',
            paddingTop: index > 0 ? '12px' : '0',
          }}
        >
          <Column
            style={{
              width: '50%',
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '14px',
                color: '#F5E8C0',
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                color: '#C8A882',
              }}
            >
              Qty: {item.quantity}
            </Text>
          </Column>
          <Column
            style={{
              width: '50%',
              textAlign: 'right',
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '14px',
                fontWeight: '600',
                color: '#F0C040',
              }}
            >
              {formatPrice(item.unitPrice * item.quantity)}
            </Text>
          </Column>
        </Row>
      ))}

      {/* Divider */}
      <Section
        style={{
          borderTop: '1px solid #8B5E3C',
          margin: '16px 0',
        }}
      />

      {/* Total Row */}
      <Row>
        <Column
          style={{
            width: '50%',
          }}
        >
          <Text
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#E8D5A3',
            }}
          >
            Total
          </Text>
        </Column>
        <Column
          style={{
            width: '50%',
            textAlign: 'right',
          }}
        >
          <Text
            style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#F0C040',
            }}
          >
            {formatPrice(total)}
          </Text>
        </Column>
      </Row>

      {/* Shipping Address */}
      <Text
        style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#F0C040',
          margin: '24px 0 16px 0',
        }}
      >
        Shipping To
      </Text>
      <Section
        style={{
          backgroundColor: '#4A2C15',
          border: '1px solid #8B5E3C',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '24px',
        }}
      >
        <Text
          style={{
            margin: '0 0 4px 0',
            fontSize: '14px',
            color: '#E8D5A3',
          }}
        >
          {shippingAddress.street}
        </Text>
        <Text
          style={{
            margin: '0 0 4px 0',
            fontSize: '14px',
            color: '#E8D5A3',
          }}
        >
          {shippingAddress.city}, {shippingAddress.zip}
        </Text>
        <Text
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#E8D5A3',
          }}
        >
          {shippingAddress.country}
        </Text>
      </Section>

      {/* Track Order Button */}
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
          marginBottom: '24px',
        }}
      >
        Track Order
      </Button>

      <Text
        style={{
          fontSize: '14px',
          color: '#C8A882',
          margin: 0,
        }}
      >
        We will send you another email when your order ships. Estimated delivery 5 to 10 business days to Netherlands.
      </Text>
    </EmailLayout>
  )
}
