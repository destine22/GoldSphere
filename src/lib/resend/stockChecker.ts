'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { sendLowStockAlert } from './emailService'

interface LowStockProduct {
  name: string
  currentStock: number
  category: string
}

export const checkLowStockAndNotify = async () => {
  const supabase = createAdminClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select('name, stock_quantity, category')
    .lte('stock_quantity', 5)
  
  if (error) {
    console.error('Error checking low stock:', error)
    return { success: false, count: 0 }
  }
  
  if (!products || products.length === 0) {
    return { success: true, count: 0 }
  }
  
  const lowStockProducts: LowStockProduct[] = products.map(product => ({
    name: product.name,
    currentStock: product.stock_quantity,
    category: product.category || 'Uncategorized'
  }))
  
  await sendLowStockAlert(lowStockProducts)
  
  return { success: true, count: lowStockProducts.length }
}
