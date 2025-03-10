import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import AuthLink from '../components/auth/AuthLink'
import InputField from '../components/common/InputField'
import Button from '../components/common/Button'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
})

export default function Signup() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema)
  })
  const { signup, error, clearError, loading } = useAuth()
  const [cooldownTime, setCooldownTime] = useState(0)
  const { isDark } = useTheme()

  useEffect(() => {
    let interval
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [cooldownTime])

  const onSubmit = async (data) => {
    if (cooldownTime > 0) return
    
    try {
      clearError()
      await signup(data)
      navigate('/login')
    } catch (error) {
      if (error.response?.status === 429) {
        setCooldownTime(10)
      }
    }
  }

  const getButtonText = () => {
    if (formState.isSubmitting || loading) return 'Creating Account...'
    if (cooldownTime > 0) return `Try again in ${cooldownTime}s`
    return 'Register'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full max-w-md p-8 rounded-xl shadow-lg ${
          isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Create Account</h2>

        <InputField
          label="Name"
          type="text"
          error={formState.errors.name}
          {...register('name')}
        />

        <InputField
          label="Email"
          type="email"
          error={formState.errors.email}
          {...register('email')}
        />

        <InputField
          label="Password"
          type="password"
          error={formState.errors.password}
          {...register('password')}
        />

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/')}
            className="order-2 sm:order-1"
          >
            Back
          </Button>
          
          <Button
            type="submit"
            loading={formState.isSubmitting || loading}
            disabled={formState.isSubmitting || loading || cooldownTime > 0}
            className="order-1 sm:order-2"
          >
            {getButtonText()}
          </Button>
        </div>

        <AuthLink
          text="Already have an account?"
          linkText="Login here"
          to="/login"
          className="mt-6"
        />
      </form>
    </motion.div>
  )
}