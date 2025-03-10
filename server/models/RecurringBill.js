import mongoose from 'mongoose'

const recurringBillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
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
  frequency: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly'
  },
  nextDueDate: {
    type: Date,
    required: true
  }
}, { timestamps: true })

recurringBillSchema.index({ userId: 1 })
recurringBillSchema.index({ userId: 1, nextDueDate: -1 })

export default mongoose.model('RecurringBill', recurringBillSchema)