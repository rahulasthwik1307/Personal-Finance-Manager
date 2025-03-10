import express from 'express'
import { verifyJWT, attachUser } from '../middleware/authMiddleware.js'
import { 
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
} from '../controllers/goalController.js'
import { validateGoal } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/', verifyJWT, attachUser, validateGoal, createGoal)
router.get('/', verifyJWT, attachUser, getGoals)
router.put('/:id', verifyJWT, attachUser, validateGoal, updateGoal)
router.delete('/:id', verifyJWT, attachUser, deleteGoal)

export default router