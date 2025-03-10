import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import AuthLink from '../components/auth/AuthLink';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error, clearError } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Clear error messages when the component is unmounted
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Debounced login submission function
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Prevent duplicate submissions while loading
      if (loading) return;

      try {
        setLoading(true);
        await login({ email, password });
        navigate('/dashboard');
      } catch (err) {
        if (err.response?.status !== 429) {
          // Only show error if not rate-limited
          console.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [email, password, login, navigate, loading]
  );

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-xl shadow-lg ${
          isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        }`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Back
          </Button>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </div>

        <AuthLink
          text="Don't have an account?"
          linkText="Sign up here"
          to="/signup"
          className="mt-6"
        />
      </form>
    </div>
  );
}
