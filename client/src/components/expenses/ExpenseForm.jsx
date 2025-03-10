import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { api } from '../../api/axiosConfig';

export default function ExpenseForm({ onAdd, categories = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: categories[0] || '',
    description: '',
  });
  const [submissionError, setSubmissionError] = useState('');

  const defaultCategories = [
    'Food',
    'Transport',
    'Housing',
    'Entertainment',
    'Utilities',
    'Clothing',
    'Travel',
    'Healthcare',
    'Education',
    'Gifts',
    'Subscriptions',
    'Miscellaneous',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.amount || !formData.category) {
        throw new Error('Please fill all required fields');
      }
      if (isNaN(formData.amount) || formData.amount <= 0) {
        throw new Error('Amount must be a positive number');
      }

      const payload = {
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: new Date().toISOString(),
        description: formData.description || '',
      };

      await onAdd(payload);
      setFormData({
        amount: '',
        category: categories[0] || defaultCategories[0],
        description: '',
      });
      setIsOpen(false);
      setSubmissionError('');
    } catch (error) {
      setSubmissionError(error.message);
      console.error('Expense submission failed:', error);
      setTimeout(() => setSubmissionError(''), 5000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Add New Expense
            </Dialog.Title>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {submissionError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {submissionError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                required
                className="w-full p-2 border rounded-lg"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full p-2 border rounded-lg mb-4"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                {categories.concat(defaultCategories).map((cat) => (
                  <option key={cat} value={cat} className="p-2">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Expense
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
}