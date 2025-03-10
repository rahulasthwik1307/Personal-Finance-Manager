import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  budget: {
    type: Number,
    default: 1000,
    min: 0
  },
  categoryBudgets: [{
    category: String,
    limit: Number
  }]
}, { timestamps: true })

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.index({ name: 'text' }) 

// Change from default export to named export
export const User = mongoose.model('User', userSchema)