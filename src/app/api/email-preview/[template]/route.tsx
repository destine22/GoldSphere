import { render } from '@react-email/render'
import { WelcomeEmail } from '../../../../emails/WelcomeEmail'
import { OrderConfirmationEmail } from '../../../../emails/OrderConfirmationEmail'
import { OrderStatusEmail } from '../../../../emails/OrderStatusEmail'
import { PasswordResetEmail } from '../../../../emails/PasswordResetEmail'
import { AbandonedCartEmail } from '../../../../emails/AbandonedCartEmail'
import { NewOrderAdminEmail } from '../../../../emails/NewOrderAdminEmail'
import { LowStockAdminEmail } from '../../../../emails/LowStockAdminEmail'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ template: string }> }
) {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not found', { status: 404 })
  }

  const { template } = await params
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

  let html: string

  switch (template) {
    case 'welcome':
      html = await render(
        <WelcomeEmail customerName="John Doe" shopUrl={`${baseUrl}/products`} />
      )
      break
    case 'order-confirmation':
      html = await render(
        <OrderConfirmationEmail
          customerName="Jane Smith"
          orderNumber="12345"
          orderItems={[
            { name: "Jollof Rice Seasoning", quantity: 2, unitPrice: 9500 },
            { name: "Egusi Soup Mix", quantity: 1, unitPrice: 8500 }
          ]}
          shippingAddress={{
            street: "123 Main St",
            city: "Lagos",
            country: "Nigeria",
            zip: "100001"
          }}
          total={27500}
          orderUrl={`${baseUrl}/account/orders/12345`}
        />
      )
      break
    case 'order-status':
      html = await render(
        <OrderStatusEmail
          customerName="Jane Smith"
          orderNumber="12345"
          status="shipped"
          message="Great news! Your order has been picked up by our delivery partner and is on its way to you."
          orderUrl={`${baseUrl}/account/orders/12345`}
        />
      )
      break
    case 'password-reset':
      html = await render(
        <PasswordResetEmail
          customerName="John Doe"
          resetUrl={`${baseUrl}/reset-password?token=12345`}
        />
      )
      break
    case 'abandoned-cart':
      html = await render(
        <AbandonedCartEmail
          customerName="John Doe"
          cartItems={[
            { name: "Jollof Rice Seasoning", price: 9500, imageUrl: `${baseUrl}/placeholder.png` },
            { name: "Egusi Soup Mix", price: 8500, imageUrl: `${baseUrl}/placeholder.png` },
            { name: "Suya Spice Blend", price: 10500, imageUrl: `${baseUrl}/placeholder.png` },
            { name: "Fufu Mix", price: 6500, imageUrl: `${baseUrl}/placeholder.png` }
          ]}
          cartUrl={`${baseUrl}/cart`}
          totalValue={35000}
        />
      )
      break
    case 'new-order-admin':
      html = await render(
        <NewOrderAdminEmail
          orderNumber="12345"
          customerName="Jane Smith"
          customerEmail="jane@example.com"
          orderItems={[
            { name: "Jollof Rice Seasoning", quantity: 2, unitPrice: 9500 },
            { name: "Egusi Soup Mix", quantity: 1, unitPrice: 8500 }
          ]}
          total={27500}
          shippingAddress={{
            street: "123 Main St",
            city: "Lagos",
            country: "Nigeria",
            zip: "100001"
          }}
        />
      )
      break
    case 'low-stock-admin':
      html = await render(
        <LowStockAdminEmail
          products={[
            { name: "Jollof Rice Seasoning", currentStock: 3, category: "Seasonings" },
            { name: "Egusi Soup Mix", currentStock: 0, category: "Soup Mixes" },
            { name: "Suya Spice Blend", currentStock: 7, category: "Seasonings" }
          ]}
        />
      )
      break
    default:
      return new Response('Template not found', { status: 404 })
  }

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
