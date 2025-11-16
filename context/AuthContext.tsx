'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Aquí podrías cargar el token desde localStorage o cookies
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (username: string, password: string) => {
    // TODO: llamar a tu API
    // Simulamos login exitoso
    localStorage.setItem('user', username);
    setUser(username);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
