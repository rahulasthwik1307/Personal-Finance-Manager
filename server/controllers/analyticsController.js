import { Expense } from '../models/Expense.js'

export const getDashboardData = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId })
    
    // Category-wise spending
    const categoryData = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {})

    // Monthly trends
    const monthlyData = expenses.reduce((acc, expense) => {
      const month = expense.date.toLocaleString('default', { month: 'short' })
      acc[month] = (acc[month] || 0) + expense.amount
      return acc
    }, {})

    res.json({
      categoryData,
      monthlyData: Object.entries(monthlyData).map(([month, amount]) => ({
        month,
        amount
      }))
    })

  } catch (error) {
    next(error)
  }
}