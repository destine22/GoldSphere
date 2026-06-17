import {
  Text,
  Button,
  Section,
  Row,
  Column,
} from '@react-email/components'
import { EmailLayout } from './components/EmailLayout'
import * as React from 'react'

interface LowStockProduct {
  name: string
  currentStock: number
  category: string
}

interface LowStockAdminEmailProps {
  products: LowStockProduct[]
}

export const LowStockAdminEmail: React.FC<LowStockAdminEmailProps> = ({
  products,
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
        Low Stock Alert
      </Text>

      {/* Alert Banner */}
      <Section
        style={{
          backgroundColor: 'rgba(193,68,14,0.3)',
          borderLeft: '4px solid #C1440E',
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
          The following products are running low on stock.
        </Text>
      </Section>

      {/* Products List */}
      {products.map((product, index) => (
        <Row
          key={index}
          style={{
            borderBottom: '1px solid #8B5E3C',
            paddingBottom: '16px',
            paddingTop: index > 0 ? '16px' : '0',
            alignItems: 'center',
          }}
        >
          <Column
            style={{
              width: '60%',
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '16px',
                color: '#F5E8C0',
              }}
            >
              {product.name}
            </Text>
            <Text
              style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                color: '#C8A882',
              }}
            >
              {product.category}
            </Text>
          </Column>
          <Column
            style={{
              width: '40%',
            }}
          >
            {product.currentStock === 0 ? (
              <div
                style={{
                  backgroundColor: '#C1440E',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  display: 'inline-block',
                }}
              >
                <Text
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#F5E8C0',
                  }}
                >
                  Out of Stock
                </Text>
              </div>
            ) : (
              <Text
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#E8780C',
                  textAlign: 'right',
                }}
              >
                {product.currentStock} left
              </Text>
            )}
          </Column>
        </Row>
      ))}

      {/* Manage Products Button */}
      <Button
        href={`${adminUrl}/admin/products`}
        style={{
          background: 'linear-gradient(135deg, #D4A017, #E8780C)',
          color: '#1A0800',
          fontWeight: 'bold',
          padding: '14px 32px',
          borderRadius: '6px',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '32px',
        }}
      >
        Manage Products
      </Button>
    </EmailLayout>
  )
}
