import express from 'express'
import { verifyJWT, attachUser } from '../middleware/authMiddleware.js'
import { 
  createRecurringBill,
  getRecurringBills,
  updateRecurringBill,
  deleteRecurringBill
} from '../controllers/recurringController.js'
import { validateRecurringBill } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/', verifyJWT, attachUser, validateRecurringBill, createRecurringBill)
router.get('/', verifyJWT, attachUser, getRecurringBills)
router.put('/:id', verifyJWT, attachUser, validateRecurringBill, updateRecurringBill)
router.delete('/:id', verifyJWT, attachUser, deleteRecurringBill)

export default router