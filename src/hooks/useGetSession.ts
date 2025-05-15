
import { useState, useEffect } from 'react'
import { supabaseClient } from '../utils/supabase'
import type { Session } from '@supabase/supabase-js'

export const useGetSession = () => {
    const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return session
}