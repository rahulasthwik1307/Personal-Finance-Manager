import Goal from '../models/Goal.js'

export const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      userId: req.userId
    })
    res.status(201).json(goal)
  } catch (error) {
    next(error)
  }
}

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId })
    res.json(goals)
  } catch (error) {
    next(error)
  }
}

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    )
    res.json(goal)
  } catch (error) {
    next(error)
  }
}

export const deleteGoal = async (req, res) => {
  try {
    await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    })
    res.json({ message: 'Goal deleted' })
  } catch (error) {
    next(error)
  }
}