import { checkLowStockAndNotify } from '@/lib/resend/stockChecker'

export async function GET(request: Request) {
  const authHeader = request.headers.get('x-cron-secret')
  
  if (authHeader !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  try {
    const result = await checkLowStockAndNotify()
    return Response.json(result)
  } catch (error) {
    console.error('Error in check-stock API:', error)
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
