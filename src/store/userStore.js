import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: {
    name: 'Saurabh Bhardwaj',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    role: 'admin', // 'admin' | 'viewer'
  },
  setRole: (role) => set((state) => ({ user: { ...state.user, role } })),
  isAdmin: () => useUserStore.getState().user.role === 'admin',
}));
