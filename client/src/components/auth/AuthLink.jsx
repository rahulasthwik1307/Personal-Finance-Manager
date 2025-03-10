import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

export default function AuthLink({ text, linkText, to }) {
  const { isDark } = useTheme()
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
    >
      {text}{' '}
      <Link 
        to={to}
        className={`font-medium ${
          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
        } transition-colors`}
      >
        {linkText}
      </Link>
    </motion.div>
  )
}