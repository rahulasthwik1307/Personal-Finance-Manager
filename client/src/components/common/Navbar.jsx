import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import Button from './Button'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {user?.name}'s Expense Tracker
        </h1>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            onClick={handleLogout}
            variant="secondary"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}