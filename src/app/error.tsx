'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ minHeight: '100vh', background: '#1A0800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ color: '#F0C040', fontFamily: 'serif', fontSize: '2rem' }}>Something went wrong</h2>
      <p style={{ color: '#C8A882' }}>We encountered an unexpected error. Please try again.</p>
      <button onClick={reset} style={{ background: 'linear-gradient(135deg, #D4A017, #E8780C)', color: '#1A0800', padding: '12px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
        Try Again
      </button>
    </div>
  )
}
