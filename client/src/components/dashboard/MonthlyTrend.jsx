// components/dashboard/MonthlyTrend.jsx
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function MonthlyTrend({ data }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6B7280' }}
          />
          <YAxis tick={{ fill: '#6B7280' }} />
          <Tooltip
            contentStyle={{
              background: '#1F2937',
              border: 'none',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}