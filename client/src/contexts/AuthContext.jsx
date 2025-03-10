import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { api } from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const checkAuthSource = useRef(null);
  const retryCount = useRef(0);
  const navigate = useNavigate();

  const clearError = () => setError(null);

  const checkAuth = useCallback(async () => {
    try {
      if (checkAuthSource.current) {
        checkAuthSource.current.cancel('Operation canceled by new request');
      }

      checkAuthSource.current = axios.CancelToken.source();

      const { data } = await api.get('/auth/check', {
        cancelToken: checkAuthSource.current.token,
        params: { _: Date.now() },
      });

      setUser(data);
      clearError();
      retryCount.current = 0;
    } catch (error) {
      if (axios.isCancel(error)) return;

      setUser(null);

      if (error.response?.status === 429) {
        const delay = Math.min(30000, Math.pow(2, retryCount.current) * 1000);
        retryCount.current += 1;
        setTimeout(checkAuth, delay);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialCheck = setTimeout(checkAuth, 1000);
    return () => {
      clearTimeout(initialCheck);
      checkAuthSource.current?.cancel('Component unmounted');
    };
  }, [checkAuth]);

  const handleAuthError = (error) => {
    const message =
      error.response?.data?.message || error.message || 'Authentication failed';
    setError(message);
    throw error;
  };

  const signup = async (userData) => {
    try {
      clearError(); // Added line
      const { data: checkData } = await api.post('/auth/check-credentials', {
        email: userData.email,
        name: userData.name,
      });

      if (checkData.emailExists) throw new Error('Email already registered');
      if (checkData.nameExists) throw new Error('Username already taken');

      const { data: newUser } = await api.post('/auth/signup', userData);
      setUser(newUser);
      return newUser;
    } catch (error) {
      return handleAuthError(error);
    }
  };

  const login = async (credentials) => {
    try {
      clearError(); //added line
      const { data } = await api.post('/auth/login', credentials, {
        _retryCount: 0,
      });
      setUser(data);
      return data;
    } catch (error) {
      return handleAuthError(error);
    }
  };

  const logout = async () => {
    try {
      clearError(); //added line
      await api.post('/auth/logout');
      setUser(null);
    } catch (error) {
      setError('Logout failed - Please try again');
    }
  };

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setUser(null);
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        clearError,
        checkAuth,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);