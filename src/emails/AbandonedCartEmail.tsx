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

interface CartItem {
  name: string
  price: number
  imageUrl: string
}

interface AbandonedCartEmailProps {
  customerName: string
  cartItems: CartItem[]
  cartUrl: string
  totalValue: number
}

export const AbandonedCartEmail: React.FC<AbandonedCartEmailProps> = ({
  customerName,
  cartItems,
  cartUrl,
  totalValue,
}) => {
  const visibleItems = cartItems.slice(0, 3)
  const remainingItems = cartItems.length - 3

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
        You Left Something Behind
      </Text>
      <Text
        style={{
          fontSize: '16px',
          color: '#C8A882',
          margin: '0 0 24px 0',
        }}
      >
        Hi {customerName}, You have {cartItems.length} items waiting in your cart. Do not let these authentic African foods go to someone else.
      </Text>

      {/* Cart Items */}
      {visibleItems.map((item, index) => (
        <Row
          key={index}
          style={{
            paddingBottom: '12px',
            paddingTop: index > 0 ? '12px' : '0',
          }}
        >
          <Column
            style={{
              width: '70%',
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
          </Column>
          <Column
            style={{
              width: '30%',
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
              {formatPrice(item.price)}
            </Text>
          </Column>
        </Row>
      ))}

      {remainingItems > 0 && (
        <Text
          style={{
            margin: '12px 0',
            fontSize: '14px',
            color: '#C8A882',
            textAlign: 'center',
          }}
        >
          + {remainingItems} more items
        </Text>
      )}

      {/* Divider */}
      <Section
        style={{
          borderTop: '1px solid #8B5E3C',
          margin: '24px 0 16px 0',
        }}
      />

      {/* Cart Total */}
      <Row>
        <Column
          style={{
            width: '50%',
          }}
        >
          <Text
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: '#E8D5A3',
            }}
          >
            Cart Total
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
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#F0C040',
            }}
          >
            {formatPrice(totalValue)}
          </Text>
        </Column>
      </Row>

      {/* Complete Your Order Button */}
      <Button
        href={cartUrl}
        style={{
          background: 'linear-gradient(135deg, #D4A017, #E8780C)',
          color: '#1A0800',
          fontWeight: 'bold',
          padding: '14px 32px',
          borderRadius: '6px',
          textDecoration: 'none',
          display: 'inline-block',
          margin: '24px 0 16px 0',
        }}
      >
        Complete Your Order
      </Button>

      {/* Urgency Line */}
      <Text
        style={{
          fontSize: '12px',
          color: '#E8780C',
          margin: 0,
        }}
      >
        Products are in high demand. We cannot guarantee availability.
      </Text>
    </EmailLayout>
  )
}
