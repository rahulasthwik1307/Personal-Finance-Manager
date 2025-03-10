import express from 'express'
import { verifyJWT, attachUser } from '../middleware/authMiddleware.js'
import { getDashboardData } from '../controllers/analyticsController.js'

const router = express.Router()

router.get('/dashboard', verifyJWT, attachUser, getDashboardData)

export default router