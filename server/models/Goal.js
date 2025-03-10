import mongoose from 'mongoose'

const goalSchema = new mongoose.Schema({
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
  targetAmount: {
    type: Number,
    required: true,
    min: 0
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true })

goalSchema.index({ userId: 1 })
goalSchema.index({ userId: 1, deadline: 1 })

export default mongoose.model('Goal', goalSchema)