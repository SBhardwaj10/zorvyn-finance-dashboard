import { create } from 'zustand';

export const useUIStore = create((set, get) => ({
  isSidebarOpen: true,
  isDarkMode: false,

  // Modal state
  isModalOpen: false,
  editingTransaction: null, // null = add mode, object = edit mode

  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  setDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),

  openAddModal: () => set({ isModalOpen: true, editingTransaction: null }),
  openEditModal: (transaction) => set({ isModalOpen: true, editingTransaction: transaction }),
  closeModal: () => set({ isModalOpen: false, editingTransaction: null }),
}));
