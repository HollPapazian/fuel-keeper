import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'

interface SessionState {
  session: Session | null
  sessionLoading: boolean
  setSession: (session: Session | null) => void
  setSessionLoading: (loading: boolean) => void
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  sessionLoading: true,
  setSession: (session) => set({ session }),
  setSessionLoading: (loading) => set({ sessionLoading: loading }),
})) 