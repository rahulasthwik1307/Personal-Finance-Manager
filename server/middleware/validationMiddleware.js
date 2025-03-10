import { body, validationResult } from 'express-validator'

export const validateRecurringBill = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('frequency')
    .isIn(['daily', 'weekly', 'monthly', 'yearly'])
    .withMessage('Invalid frequency'),
  body('nextDueDate')
    .isISO8601()
    .withMessage('Invalid date format (use YYYY-MM-DD)'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

export const validateExpense = [
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

export const validateGoal = [
  body('targetAmount')
    .isFloat({ gt: 0 })
    .withMessage('Target amount must be positive'),
  body('deadline')
    .isISO8601()
    .withMessage('Invalid deadline format'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]