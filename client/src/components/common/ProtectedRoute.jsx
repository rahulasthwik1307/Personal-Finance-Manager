import { useAuth } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../common/Navbar' // Create this component
import Loader from '../common/Loader' // Create loading spinner

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return <Loader fullScreen />

  return user ? (
    <>
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  )
}