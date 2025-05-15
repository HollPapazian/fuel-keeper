import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabaseClient } from '../utils/supabase'

export function LoginModal() {
  return (
    <dialog open className='mx-auto fixed top-1/2 -translate-y-1/2 border-1 border-gray-300 p-4 rounded-xl shadow-xl'>
      <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} providers={[]} />
    </dialog>
  )
} 