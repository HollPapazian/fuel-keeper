import { useEffect } from 'react'
import { supabaseClient } from '../utils/supabase'
import { useSessionStore } from '../store/sessionStore'

export const useGetSession = () => {
  const { setSession, setSessionLoading } = useSessionStore()

  useEffect(() => {
    setSessionLoading(true)
    
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setSessionLoading(false)
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [setSession, setSessionLoading])
}