import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  fetchDashboardData,
  fetchInsights,
  addExpense,
  deleteExpense,
  updateExpense,
} from '../api/analytics';
import { api } from '../api/axiosConfig'; // Import your axios instance
import SpendingPie from '../components/dashboard/SpendingPie';
import MonthlyTrend from '../components/dashboard/MonthlyTrend';
import ThemeToggle from '../components/common/ThemeToggle';
import InsightsFeed from '../components/ai/InsightsFeed';
import Loader from '../components/common/Loader';
import BudgetMeter from '../components/dashboard/BudgetMeter';
import QuickStats from '../components/dashboard/QuickStats';
import LiveUpdates from '../components/dashboard/LiveUpdates';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import ErrorBoundary from '../components/common/ErrorBoundary';

export default function Dashboard() {
  const { isDark } = useTheme();
  const [dashboardData, setDashboardData] = useState({
    categoryData: [],
    monthlyData: [],
    recentExpenses: [],
    budget: 10000,
    stats: {
      totalSpent: 0,
      remainingBudget: 10000,
      avgDailySpend: 0,
    },
  });
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // Add category state

  const refreshData = async () => {
    try {
      const [analyticsRes, insightsRes] = await Promise.all([
        fetchDashboardData(),
        fetchInsights(),
      ]);

      setDashboardData({
        categoryData: Object.entries(analyticsRes.data.categoryData || {}).map(
          ([name, amount]) => ({
            name,
            amount,
          })
        ),
        monthlyData: analyticsRes.data.monthlyData || [],
        recentExpenses: analyticsRes.data.recentExpenses || [],
        budget: analyticsRes.data.budget || 10000,
        stats: {
          totalSpent: analyticsRes.data.totalSpent || 0,
          remainingBudget:
            (analyticsRes.data.budget || 10000) -
            (analyticsRes.data.totalSpent || 0),
          avgDailySpend: analyticsRes.data.avgDailySpend || 0,
        },
      });

      setInsights(insightsRes.data.insights || []);
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/expenses/categories');
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddExpense = async (newExpense) => {
    try {
      await addExpense(newExpense);
      await refreshData();
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      setDashboardData((prev) => ({
        ...prev,
        recentExpenses: prev.recentExpenses.filter((e) => e._id !== expenseId),
      }));
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  const handleUpdateExpense = async (expenseId, updatedData) => {
    try {
      await updateExpense(expenseId, updatedData);
      setDashboardData((prev) => ({
        ...prev,
        recentExpenses: prev.recentExpenses.map((e) =>
          e._id === expenseId ? { ...e, ...updatedData } : e
        ),
      }));
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen p-6 transition-colors duration-200 ${
        isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl font-bold">Financial Dashboard</h1>
          <ThemeToggle />
        </motion.div>

        <QuickStats stats={dashboardData.stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
          <BudgetMeter
            spent={dashboardData.stats.totalSpent}
            budget={dashboardData.budget}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <ErrorBoundary>
              <LiveUpdates updates={dashboardData.recentExpenses || []} />
            </ErrorBoundary>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
            <SpendingPie data={dashboardData.categoryData} isDark={isDark} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
            <MonthlyTrend data={dashboardData.monthlyData} isDark={isDark} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <ExpenseList
            expenses={dashboardData.recentExpenses}
            onDelete={handleDeleteExpense}
            onUpdate={handleUpdateExpense}
            isDark={isDark}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-6 p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
          <InsightsFeed insights={insights} />
        </motion.div>

        <ErrorBoundary>
          <ExpenseForm
            categories={categories} // Use fetched categories
            onAdd={handleAddExpense}
          />
        </ErrorBoundary>
      </div>
    </motion.div>
  );
}