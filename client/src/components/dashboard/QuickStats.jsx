import { TrendingUp, TrendingDown, CreditCard } from 'react-feather';

export default function QuickStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900">
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-300"/>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Spent</p>
            <p className="text-xl font-bold">{stats.totalSpent}</p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900">
        <div className="flex items-center gap-3">
          <TrendingDown className="w-6 h-6 text-green-600 dark:text-green-300"/>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Savings</p>
            <p className="text-xl font-bold">{stats.savings}</p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-300"/>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Goals Progress</p>
            <p className="text-xl font-bold">{stats.goalsProgress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
