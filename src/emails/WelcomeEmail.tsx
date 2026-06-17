import {
  Text,
  Button,
  Section,
  Row,
  Column,
} from '@react-email/components'
import { EmailLayout } from './components/EmailLayout'
import * as React from 'react'

interface WelcomeEmailProps {
  customerName: string
  shopUrl: string
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  customerName,
  shopUrl,
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
        Welcome to GoldSphere, {customerName}
      </Text>
      <Text
        style={{
          fontSize: '16px',
          color: '#C8A882',
          margin: '0 0 24px 0',
        }}
      >
        Your journey into authentic African flavors starts here
      </Text>

      {/* Decorative Divider */}
      <Section
        style={{
          borderTop: '1px solid #D4A017',
          marginBottom: '24px',
        }}
      />

      <Text
        style={{
          fontSize: '16px',
          color: '#E8D5A3',
          lineHeight: '1.6',
          margin: '0 0 24px 0',
        }}
      >
        Thank you for joining GoldSphere. We source the finest raw African foods directly from farmers across Nigeria, Ghana, Ethiopia, Senegal, Cameroon and more. Every product is 100% natural with no preservatives.
      </Text>

      {/* Feature Pills */}
      <Row
        style={{
          marginBottom: '32px',
        }}
      >
        <Column
          style={{
            padding: '0 4px',
          }}
        >
          <div
            style={{
              backgroundColor: '#4A2C15',
              border: '1px solid #8B5E3C',
              borderRadius: '6px',
              padding: '10px 16px',
              textAlign: 'center',
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: '600',
                color: '#F0C040',
              }}
            >
              Sourced from Africa
            </Text>
          </div>
        </Column>
        <Column
          style={{
            padding: '0 4px',
          }}
        >
          <div
            style={{
              backgroundColor: '#4A2C15',
              border: '1px solid #8B5E3C',
              borderRadius: '6px',
              padding: '10px 16px',
              textAlign: 'center',
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: '600',
                color: '#F0C040',
              }}
            >
              100% Natural
            </Text>
          </div>
        </Column>
        <Column
          style={{
            padding: '0 4px',
          }}
        >
          <div
            style={{
              backgroundColor: '#4A2C15',
              border: '1px solid #8B5E3C',
              borderRadius: '6px',
              padding: '10px 16px',
              textAlign: 'center',
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: '600',
                color: '#F0C040',
              }}
            >
              Fast Delivery
            </Text>
          </div>
        </Column>
      </Row>

      {/* Shop Now Button */}
      <Button
        href={shopUrl}
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
        Shop Now
      </Button>

      <Text
        style={{
          fontSize: '14px',
          color: '#C8A882',
          margin: 0,
        }}
      >
        Questions? Reply to this email or contact hello@goldsphere.com
      </Text>
    </EmailLayout>
  )
}
