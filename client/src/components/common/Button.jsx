import { motion } from 'framer-motion'

export default function Button({ 
  children, 
  loading = false, 
  variant = 'primary', 
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    text: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={loading}
      className={`px-6 py-2 rounded-lg font-medium transition-colors ${variants[variant]} ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {loading ? 'Processing...' : children}
    </motion.button>
  )
}