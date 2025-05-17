import './index.css'
import { FuelingsBlock } from './features/FuelingsBlock'
import { useGetSession } from './hooks/useGetSession'
import { LoginModal } from './features/LoginModal'
import { Header } from './features/Header/Header'
import { Footer } from './features/Footer/Footer'
import { useSessionStore } from './store/sessionStore'
import { Loader } from './components/Loader'

export default function App() {
  const { session, sessionLoading } = useSessionStore()
  useGetSession()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="w-[min(100%,1024px)] mx-auto px-4 flex-1 mt-16 min-h-[calc(100vh-4rem-4rem)]">
        <div className="container mx-auto py-6 w-full">
          {sessionLoading ? (
            <Loader />
          ) : session ? (
            <FuelingsBlock />
          ) : (
            <LoginModal />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}