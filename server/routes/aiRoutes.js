import express from 'express'
import { verifyJWT, attachUser } from '../middleware/authMiddleware.js'
import { getInsights } from '../controllers/aiController.js'

const router = express.Router()

router.get('/insights', 
  verifyJWT,
  attachUser,
  getInsights
)

export default router