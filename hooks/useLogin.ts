'use client';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { loginUserMock } from '../service/mockAuthService';
import { useAuth } from "../context/AuthContext"; // <-- ESTO ERA LO QUE FALTABA

export const useLoginForm = () => {
  const setAuth = useAuthStore(state => state.setAuth);
    const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userNotFound, setUserNotFound] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUserNotFound(false);
    setError(null);

    try {
      const result = await loginUserMock({ username, password });
      setAuth(result.data.user, result.data.token);
       await login(username, password);
    } catch (err: any) {
      if (err.message === "USER_NOT_FOUND") {
        setUserNotFound(true);
      } else {
        setError("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    loading,
    error,
    userNotFound,
    setUsername,
    setPassword,
    handleSubmit,
  };
};
