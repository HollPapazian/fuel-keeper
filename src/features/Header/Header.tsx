// import { InstallPWA } from './InstallPWA'
import { UserIcon } from '../../components/UserIcon/UserIcon'
import { useSessionStore } from '../../store/sessionStore'
import { InstallPWA } from './InstallPWA'

export const Header = () => {
  const { session } = useSessionStore()
  return (
    <header className="bg-gray-800 text-white py-4 fixed left-0 right-0 top-0 w-full z-50">
      <div className="max-w-[1024px] mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <img src="/gas_icon.png" alt="Fuel Keeper logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">Fuel Keeper</h1>
        </div>
        <div className="flex items-center gap-4">
          <InstallPWA />
          {session && <UserIcon initials="AK" size={36} />}
        </div>
      </div>
    </header>
  )
} 