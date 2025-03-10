import { Outlet } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Layout() {
  return (
    <div className="min-h-screen">
      <nav className={`p-4 shadow-sm`}>
        <div className="max-w-7xl mx-auto flex justify-end">
          <ThemeToggle />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}