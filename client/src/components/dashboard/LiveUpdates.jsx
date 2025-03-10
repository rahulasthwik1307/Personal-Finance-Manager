// src/components/dashboard/LiveUpdates.jsx
import { motion } from 'framer-motion'
import { Clock } from 'react-feather'

export default function LiveUpdates({ updates = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-500"/>
        Recent Transactions
      </h3>
      
      {updates.map((update, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
        >
          <div className="flex-1">
            <p className="text-sm font-medium">{update.category}</p>
            <p className="text-xs text-gray-500">{new Date(update.date).toLocaleDateString()}</p>
          </div>
          <span className="text-sm font-semibold">₹{update.amount}</span>
        </motion.div>
      ))}
      
      {updates.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No recent transactions
        </div>
      )}
    </div>
  )
}