// import { InstallPWA } from './InstallPWA'

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 fixed left-0 right-0 top-0 w-full z-50">
      <div className="max-w-[1024px] mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fuel-pump-fill" viewBox="0 0 16 16">
            <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1q.846-.002 1.412.336c.383.228.634.551.794.907.295.655.294 1.465.294 2.081V7.5a.5.5 0 0 1-.5.5H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1zm2.5 0a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z" />
          </svg>
          {/* <img src="/assets/logo_mini.webp" alt="instaslide logo" className="h-10 w-10" /> */}
          <h1 className="text-2xl font-bold">Fuel Keeper</h1>
        </div>
        {/* <InstallPWA /> */}
      </div>
    </header>
  )
} 