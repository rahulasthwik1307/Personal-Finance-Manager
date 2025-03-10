// components/ai/InsightsFeed.jsx
import { motion } from 'framer-motion'
import { FaLightbulb, FaChartLine, FaMoneyBillWave } from 'react-icons/fa'

const insights = [
  {
    icon: <FaLightbulb className="w-6 h-6 text-yellow-400" />,
    title: "Top Spending Category",
    value: "Food & Dining"
  },
  {
    icon: <FaChartLine className="w-6 h-6 text-blue-400" />,
    title: "Monthly Comparison",
    value: "12% less than last month"
  },
  {
    icon: <FaMoneyBillWave className="w-6 h-6 text-green-400" />,
    title: "Savings Potential",
    value: "Save ₹5,200 by optimizing"
  }
]

export default function InsightsFeed() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {insights.map((insight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              {insight.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {insight.title}
              </h3>
              <p className="mt-1 text-lg font-semibold">
                {insight.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}