'use client';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 200, background: '#f0f0f0', padding: '1rem' }}>
        <h2>Dashboard</h2>
        <p>User: {user}</p>
        <button onClick={logout}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>{children}</main>
    </div>
  );
}
