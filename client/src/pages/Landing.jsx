import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/common/ThemeToggle'
import AnimatedText from '../components/common/AnimatedText'
import { useTheme } from '../contexts/ThemeContext'

export default function Landing() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-200 ${
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <AnimatedText
          text="Welcome to Expense Tracker"
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        />
        
        <div className="space-y-4 mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}