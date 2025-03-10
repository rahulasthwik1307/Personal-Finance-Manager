import { api } from './axiosConfig'

export const fetchDashboardData = () => api.get('/analytics/dashboard')
export const fetchInsights = () => api.get('/ai/insights')
export const addExpense = (data) => api.post('/expenses', data)
export const deleteExpense = (id) => api.delete(`/expenses/${id}`)
export const updateExpense = (id, data) => api.patch(`/expenses/${id}`, data)