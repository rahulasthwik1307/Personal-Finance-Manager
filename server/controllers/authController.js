import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { 
    expiresIn: '7d'
  })
}

// Add this new controller function
export const checkCredentials = async (req, res, next) => {
  try {
    const { email, name } = req.body
    
    const emailExists = await User.exists({ email })
    const nameExists = await User.exists({ name })
    
    res.json({ emailExists, nameExists })
  } catch (error) {
    next(error)
  }
}

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        error: 'Password must contain: 8+ chars, 1 uppercase, 1 number, 1 special char'
      })
    }

    // Remove duplicate check since frontend handles it
    const user = await User.create({ name, email, password })
    const token = generateToken(user._id)
    
    res.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 3600000
    })
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      budget: user.budget
    })
    
  } catch (error) {
    next({
      status: 500,
      message: 'Registration failed',
      error: error.message
    })
  }
}

// Rest of the file remains same (login, logout, checkAuth)
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(user._id)
    
    res.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 3600000
    })
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      budget: user.budget
    })
    
  } catch (error) {
    next(error)
  }
}

export const logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
}

export const checkAuth = async (req, res, next) => {
  try {
    // Remove .cache() method
    const user = await User.findById(req.userId).select('-password')
    res.json(user || null)
  } catch (error) {
    next(error)
  }
}