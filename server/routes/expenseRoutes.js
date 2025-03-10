import { Router } from 'express'
import { Expense } from '../models/Expense.js'
import { verifyJWT } from '../middleware/authMiddleware.js'
import { validateExpense } from '../middleware/validationMiddleware.js'

const router = Router()

export const createExpenseRoutes = (io) => {
  // Create expense with middleware validation
  router.post('/', verifyJWT, validateExpense, async (req, res, next) => {
    try {
      const newExpense = await Expense.create({
        userId: req.userId,
        ...req.body  // Use validated data from middleware
      })

      // Populate user details for real-time update
      const populatedExpense = await Expense.findById(newExpense._id)
        .populate('userId', 'name email')
        .lean()

      io.emit('expenseAdded', populatedExpense)
      
      res.status(201).json({
        ...populatedExpense,
        message: 'Expense added successfully'
      })

    } catch (error) {
      next(error)  // Pass to error handler
    }
  })

  // Get all expenses with sorting
  router.get('/categories', verifyJWT, async (req, res) => {
    try {
      const categories = await Expense.distinct('category', { userId: req.userId })
      res.json(categories)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' })
    }
  })

  // Delete expense with existence check
  router.delete('/:id', verifyJWT, async (req, res, next) => {
    try {
      const expense = await Expense.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId
      })

      if (!expense) {
        return res.status(404).json({
          error: 'NOT_FOUND',
          message: 'Expense not found or unauthorized'
        })
      }

      res.json({
        message: 'Expense deleted successfully',
        deletedId: req.params.id
      })
    } catch (error) {
      next(error)
    }
  })

  return router
}