import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface EmailLayoutProps {
  children: React.ReactNode
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({ children }) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body
        style={{
          backgroundColor: '#1A0800',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          margin: 0,
          padding: '32px 16px',
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#3D2010',
            border: '1px solid #8B5E3C',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Section
            style={{
              background: 'linear-gradient(135deg, #6B3A1F, #D4A017)',
              padding: '32px',
              textAlign: 'center',
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#F5E8C0',
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              GoldSphere
            </Text>
            <Text
              style={{
                margin: '8px 0 0 0',
                fontSize: '14px',
                color: '#F5E8C0',
                opacity: 0.9,
              }}
            >
              Taste the Roots of Africa
            </Text>
          </Section>

          {/* Content */}
          <Section
            style={{
              padding: '32px',
            }}
          >
            {children}
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: '#1A0800',
              padding: '24px 32px',
              textAlign: 'center',
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: '12px',
                color: '#8B5E3C',
              }}
            >
              You are receiving this email because you have an account at GoldSphere.
            </Text>
            <Text
              style={{
                margin: '4px 0',
                fontSize: '12px',
                color: '#8B5E3C',
              }}
            >
              <a href="#" style={{ color: '#8B5E3C', textDecoration: 'underline' }}>
                Unsubscribe
              </a>
            </Text>
            <Text
              style={{
                margin: '4px 0',
                fontSize: '12px',
                color: '#8B5E3C',
              }}
            >
              Amsterdam, Netherlands
            </Text>
            <Text
              style={{
                margin: '4px 0 0 0',
                fontSize: '12px',
                color: '#8B5E3C',
              }}
            >
              © GoldSphere 2025. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
