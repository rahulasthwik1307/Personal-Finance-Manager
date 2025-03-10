import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

export default function InputField({ label, error, ...props }) {
  const { isDark } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-6"
    >
      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-lg border-2 transition-colors ${
          isDark
            ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
        } ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-sm text-red-500"
        >
          {error.message}
        </motion.p>
      )}
    </motion.div>
  )
}