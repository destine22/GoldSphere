'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useCartStore } from '@/store/cartStore'

export default function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const setAuthenticated = useCartStore((state) => state.setAuthenticated)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setAuthenticated(true, session.user.id)
      } else {
        setAuthenticated(false)
      }
    }
    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setAuthenticated(true, session.user.id)
        } else {
          setAuthenticated(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, setAuthenticated])

  return <>{children}</>
}
