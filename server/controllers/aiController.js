import { Expense } from '../models/Expense.js'

export const getInsights = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const expenses = await Expense.find({ userId: req.userId })
    
    if (expenses.length === 0) {
      return res.json({ insights: ['No expenses recorded yet'] })
    }

    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
    const avgDaily = totalSpent / 30
    const categories = [...new Set(expenses.map(e => e.category))]
    const topCategory = categories.reduce((a, b) => 
      expenses.filter(e => e.category === a).length > 
      expenses.filter(e => e.category === b).length ? a : b
    )

    res.json({
      insights: [
        `Total spent this month: $${totalSpent.toFixed(2)}`,
        `Average daily spending: $${avgDaily.toFixed(2)}`,
        `Most frequent category: ${topCategory}`
      ]
    })
    
  } catch (error) {
    console.error('Insights error:', error)
    res.status(500).json({ error: 'Failed to generate insights' })
  }
}