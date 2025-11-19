/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useAuth } from "../context/AuthContext"; // <-- ESTO ERA LO QUE FALTABA
import { loginUser } from '@/service/authService';

export const useLoginForm = () => {
  const setAuth = useAuthStore(state => state.setAuth);
    const { login } = useAuth();

  const [email, setUserMail] = useState('');
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
      const result = await loginUser({ email, password });
      setAuth(result.data.user, result.data.token);
      localStorage.setItem('userId', result.data.user);
       await login(email, password);
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
    email,
    password,
    loading,
    error,
    userNotFound,
    setUserMail,
    setPassword,
    handleSubmit,
  };
};
