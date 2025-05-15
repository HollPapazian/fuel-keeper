import './index.css'
import { FuelingsBlock } from './features/FuelingsBlock'
import { useGetSession } from './hooks/useGetSession'
import { LoginModal } from './features/LoginModal'

export default function App() {
  const session = useGetSession()
  
  return session ? <FuelingsBlock /> : <LoginModal />
}