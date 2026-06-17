export const CURRENCY = {
  code: 'NGN',
  symbol: '₦',
  name: 'Nigerian Naira',
  locale: 'en-NG',
} as const

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPriceCompact(amount: number): string {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(0)}K`
  }
  return formatPrice(amount)
}

export function parsePriceInput(value: string): number {
  const cleaned = value.replace(/[₦,\s]/g, '')
  return parseFloat(cleaned) || 0
}
