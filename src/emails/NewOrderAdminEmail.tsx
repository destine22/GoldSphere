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

interface NewOrderAdminEmailProps {
  orderNumber: string
  customerName: string
  customerEmail: string
  orderItems: OrderItem[]
  total: number
  shippingAddress: ShippingAddress
}

export const NewOrderAdminEmail: React.FC<NewOrderAdminEmailProps> = ({
  orderNumber,
  customerName,
  customerEmail,
  orderItems,
  total,
  shippingAddress,
}) => {
  const adminUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  
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
        New Order Received
      </Text>

      {/* Alert Banner */}
      <Section
        style={{
          backgroundColor: '#4A2C15',
          borderLeft: '4px solid #D4A017',
          padding: '12px 16px',
          borderRadius: '0 6px 6px 0',
          marginBottom: '24px',
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#E8D5A3',
          }}
        >
          A new order has been placed and requires processing.
        </Text>
      </Section>

      {/* Order & Customer Info */}
      <Section
        style={{
          marginBottom: '24px',
        }}
      >
        <Text
          style={{
            margin: '0 0 8px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#F0C040',
          }}
        >
          Order: GS-{orderNumber}
        </Text>
        <Text
          style={{
            margin: '0 0 4px 0',
            fontSize: '14px',
            color: '#C8A882',
          }}
        >
          Customer: {customerName}
        </Text>
        <Text
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#C8A882',
          }}
        >
          Email: {customerEmail}
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
        Order Items
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
        Shipping Address
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

      {/* Buttons */}
      <Row
        style={{
          gap: '16px',
        }}
      >
        <Column
          style={{
            width: '50%',
          }}
        >
          <Button
            href={`${adminUrl}/admin/orders`}
            style={{
              background: 'linear-gradient(135deg, #D4A017, #E8780C)',
              color: '#1A0800',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              display: 'inline-block',
              width: '100%',
              textAlign: 'center',
            }}
          >
            View Order in Admin
          </Button>
        </Column>
        <Column
          style={{
            width: '50%',
          }}
        >
          <Button
            href={`${adminUrl}/admin/orders`}
            style={{
              backgroundColor: '#4A2C15',
              border: '1px solid #D4A017',
              color: '#D4A017',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              display: 'inline-block',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Mark as Processing
          </Button>
        </Column>
      </Row>
    </EmailLayout>
  )
}
