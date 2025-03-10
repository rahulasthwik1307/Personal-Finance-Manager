import RecurringBill from '../models/RecurringBill.js'

export const createRecurringBill = async (req, res, next) => {
  try {
    const bill = await RecurringBill.create({
      ...req.body,
      userId: req.userId
    })
    res.status(201).json(bill)
  } catch (error) {
    next(error)
  }
}

export const getRecurringBills = async (req, res, next) => {
  try {
    const bills = await RecurringBill.find({ userId: req.userId })
    res.json(bills)
  } catch (error) {
    next(error)
  }
}

export const updateRecurringBill = async (req, res, next) => {
  try {
    const bill = await RecurringBill.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    )
    if (!bill) return res.status(404).json({ error: 'Bill not found' })
    res.json(bill)
  } catch (error) {
    next(error)
  }
}

export const deleteRecurringBill = async (req, res, next) => {
  try {
    const bill = await RecurringBill.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    })
    if (!bill) return res.status(404).json({ error: 'Bill not found' })
    res.json({ message: 'Recurring bill deleted' })
  } catch (error) {
    next(error)
  }
}