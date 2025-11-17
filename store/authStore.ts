import { create } from 'zustand';

interface AuthState {
  user: string | null;
  token: string | null;
  setAuth: (user: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
