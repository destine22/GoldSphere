'use server'

import { render } from '@react-email/render'
import { getResendClient, FROM_EMAIL, ADMIN_EMAIL } from './client'
import { WelcomeEmail } from '../../emails/WelcomeEmail'
import { OrderConfirmationEmail } from '../../emails/OrderConfirmationEmail'
import { OrderStatusEmail } from '../../emails/OrderStatusEmail'
import { PasswordResetEmail } from '../../emails/PasswordResetEmail'
import { AbandonedCartEmail } from '../../emails/AbandonedCartEmail'
import { NewOrderAdminEmail } from '../../emails/NewOrderAdminEmail'
import { LowStockAdminEmail } from '../../emails/LowStockAdminEmail'

interface OrderConfirmationProps {
  customerName: string
  orderNumber: string
  orderItems: { name: string; quantity: number; unitPrice: number }[]
  shippingAddress: { street: string; city: string; country: string; zip: string }
  total: number
  orderUrl: string
}

interface OrderStatusProps {
  customerName: string
  orderNumber: string
  status: string
  message: string
  orderUrl: string
}

interface AbandonedCartProps {
  customerName: string
  cartItems: { name: string; price: number; imageUrl: string }[]
  cartUrl: string
  totalValue: number
}

interface NewOrderAdminProps {
  orderNumber: string
  customerName: string
  customerEmail: string
  orderItems: { name: string; quantity: number; unitPrice: number }[]
  total: number
  shippingAddress: { street: string; city: string; country: string; zip: string }
}

interface LowStockProduct {
  name: string
  currentStock: number
  category: string
}

export const sendWelcomeEmail = async (to: string, customerName: string) => {
  const resend = getResendClient()
  if (!resend) return { success: false, error: 'Resend not configured' }

  try {
    const html = await render(
      <WelcomeEmail
        customerName={customerName}
        shopUrl={process.env.NEXT_PUBLIC_URL || 'http://localhost:3000/products'}
      />
    )

    await resend.emails.send({
      from: `GoldSphere <${FROM_EMAIL}>`,
      to,
      subject: `Welcome to GoldSphere, ${customerName}!`,
      html,
    })

    return { success: true, error: null }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const sendOrderConfirmation = async (to: string, props: OrderConfirmationProps) => {
  const resend = getResendClient()
  if (!resend) return { success: false, error: 'Resend not configured' }

  try {
    const html = await render(<OrderConfirmationEmail {...props} />)

    await resend.emails.send({
      from: `GoldSphere <${FROM_EMAIL}>`,
      to,
      subject: `Order Confirmed - GS-${props.orderNumber}`,
      html,
    })

    return { success: true, error: null }
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const sendOrderStatusUpdate = async (to: string, props: OrderStatusProps) => {
  const resend = getResendClient()
  if (!resend) return { success: false, error: 'Resend not configured' }

  try {
    const html = await render(<OrderStatusEmail {...props} />)

    await resend.emails.send({
      from: `GoldSphere <${FROM_EMAIL}>`,
      to,
      subject: `Your GoldSphere Order Update - GS-${props.orderNumber}`,
      html,
    })

    return { success: true, error: null }
  } catch (error) {
    console.error('Error sending order status email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const sendPasswordReset = async (to: string, customerName: string, resetUrl: string) => {
  const resend = getResendClient()
  if (!resend) return { success: false, error: 'Resend not configured' }

  try {
    const html = await render(<PasswordResetEmail customerName={customerName} resetUrl={resetUrl} />)

    await resend.emails.send({
      from: `GoldSphere <${FROM_EMAIL}>`,
      to,
      subject: 'Reset Your GoldSphere Password',
      html,
    })

    return { success: true, error: null }
  } catch (error) {
    console.error('Error sending password reset email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const sendAbandonedCartEmail = async (to: string, props: AbandonedCartProps) => {
  const resend = getResendClient()
  if (!resend) return { success: false, error: 'Resend not configured' }

  try {
    const html = await render(<AbandonedCartEmail {...props} />)

    await resend.emails.send({
      from: `GoldSphere <${FROM_EMAIL}>`,
      to,
      subject: 'You left something in your cart!',
      html,
    })

    return { success: true, error: null }
  } catch (error) {
    console.error('Error sending abandoned cart email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const sendNewOrderAdminNotification = async (props: NewOrderAdminProps) => {
  const resend = getResendClient()
  if (!resend) return { success: false, error: 'Resend not configured' }

  try {
    const html = await render(<NewOrderAdminEmail {...props} />)

    await resend.emails.send({
      from: `GoldSphere <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Order - GS-${props.orderNumber}`,
      html,
    })

    return { success: true, error: null }
  } catch (error) {
    console.error('Error sending new order admin email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const sendLowStockAlert = async (products: LowStockProduct[]) => {
  const resend = getResendClient()
  if (!resend) return { success: false, error: 'Resend not configured' }

  try {
    const html = await render(<LowStockAdminEmail products={products} />)

    await resend.emails.send({
      from: `GoldSphere <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: 'Low Stock Alert - Action Required',
      html,
    })

    return { success: true, error: null }
  } catch (error) {
    console.error('Error sending low stock alert email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
