import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetMeter({ spent, budget }) {
  const percentage = (spent / budget) * 100
  const remaining = budget - spent

  return (
    <div className="space-y-4 p-4">
      <div className="w-40 h-40 mx-auto">
        <CircularProgressbar
          value={percentage}
          text={`${percentage.toFixed(1)}%`}
          styles={buildStyles({
            pathColor: percentage > 90 ? '#EF4444' : '#3B82F6',
            textColor: '#6B7280',
            trailColor: '#E5E7EB',
          })}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">Remaining Budget</p>
        <p className="text-2xl font-bold">{remaining.toFixed(2)}</p>
      </div>
    </div>
  )
}