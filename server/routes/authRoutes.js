import express from 'express'
import { 
  signup, 
  login, 
  logout, 
  checkAuth,
  checkCredentials
} from '../controllers/authController.js'
import { verifyJWT } from '../middleware/authMiddleware.js' // Add this

const router = express.Router()

// Public routes (no authentication needed)
router.post('/signup', signup)
router.post('/login', login)
router.post('/check-credentials', checkCredentials)

// Protected routes (require valid JWT)
router.post('/logout', verifyJWT, logout) // Add middleware
router.get('/check', verifyJWT, checkAuth) // Add middleware

export default router