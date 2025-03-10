import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

expenseSchema.index({ userId: 1 })

expenseSchema.index({ userId: 1, date: -1 })

// Change to named export
export const Expense = mongoose.model('Expense', expenseSchema)