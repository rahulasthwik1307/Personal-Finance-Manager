import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const verifyJWT = (req, res, next) => {
  const token = req.cookies.token
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    console.error('JWT Verification Error:', error.message)
    return res.status(403).json({ error: 'Invalid or expired token' })
  }
}

export const attachUser = async (req, res, next) => {
  if (!req.userId) return next()
  
  try {
    const user = await User.findById(req.userId).select('-password')
    req.user = user
    next()
  } catch (error) {
    console.error('User attachment error:', error)
    next(error)
  }
}

