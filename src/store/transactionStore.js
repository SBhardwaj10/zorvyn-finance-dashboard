import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_TRANSACTIONS = [
  { id: '1',  date: '2026-04-01', amount: 3200, category: 'Salary',        type: 'income',  description: 'Monthly Salary',          status: 'completed', tags: ['work'] },
  { id: '2',  date: '2026-04-02', amount: 52.50,  category: 'Food',           type: 'expense', description: 'Lunch with team',          status: 'completed', tags: ['food'] },
  { id: '3',  date: '2026-04-03', amount: 120,  category: 'Utilities',      type: 'expense', description: 'Electricity Bill',         status: 'completed', tags: ['bills'] },
  { id: '4',  date: '2026-04-04', amount: 200,  category: 'Shopping',       type: 'expense', description: 'New Headphones',           status: 'completed', tags: ['electronics'] },
  { id: '5',  date: '2026-04-05', amount: 350,  category: 'Investment',     type: 'income',  description: 'Dividend Payment',         status: 'completed', tags: ['stocks'] },
  { id: '6',  date: '2026-04-06', amount: 45,   category: 'Food',           type: 'expense', description: 'Grocery Shopping',         status: 'completed', tags: ['food'] },
  { id: '7',  date: '2026-04-07', amount: 800,  category: 'Rent',           type: 'expense', description: 'Monthly Rent',             status: 'completed', tags: ['bills'] },
  { id: '8',  date: '2026-04-08', amount: 500,  category: 'Freelance',      type: 'income',  description: 'UI Design Project',        status: 'completed', tags: ['work'] },
  { id: '9',  date: '2026-04-09', amount: 35,   category: 'Entertainment',  type: 'expense', description: 'Netflix Subscription',     status: 'completed', tags: ['subscription'] },
  { id: '10', date: '2026-04-10', amount: 680,  category: 'Shopping',       type: 'expense', description: 'Laptop Stand + Peripherals', status: 'pending',  tags: ['electronics'] },
  { id: '11', date: '2026-04-11', amount: 90,   category: 'Food',           type: 'expense', description: 'Weekend Dinner',           status: 'completed', tags: ['food'] },
  { id: '12', date: '2026-04-12', amount: 1500, category: 'Salary',        type: 'income',  description: 'Bonus Payment',            status: 'completed', tags: ['work'] },
  { id: '13', date: '2026-04-13', amount: 25,   category: 'Entertainment',  type: 'expense', description: 'Spotify Premium',          status: 'completed', tags: ['subscription'] },
  { id: '14', date: '2026-04-14', amount: 180,  category: 'Utilities',      type: 'expense', description: 'Internet Bill',            status: 'pending',  tags: ['bills'] },
  { id: '15', date: '2026-04-15', amount: 75,   category: 'Healthcare',     type: 'expense', description: 'Pharmacy Prescription',    status: 'completed', tags: ['health'] },
];

export const useTransactionStore = create(
  persist(
    (set, get) => ({
      transactions: INITIAL_TRANSACTIONS,

      filters: {
        search: '',
        category: 'All',
        type: 'All',
        sortBy: 'date',
        sortDir: 'desc',
      },

      // --- Filter Actions ---
      setSearch: (search) => set((s) => ({ filters: { ...s.filters, search } })),
      setCategory: (category) => set((s) => ({ filters: { ...s.filters, category } })),
      setType: (type) => set((s) => ({ filters: { ...s.filters, type } })),
      setSortBy: (sortBy) =>
        set((s) => ({
          filters: {
            ...s.filters,
            sortBy,
            sortDir: s.filters.sortBy === sortBy && s.filters.sortDir === 'asc' ? 'desc' : 'asc',
          },
        })),
      clearFilters: () =>
        set((s) => ({
          filters: { search: '', category: 'All', type: 'All', sortBy: 'date', sortDir: 'desc' },
        })),

      // --- CRUD Actions ---
      addTransaction: (transaction) =>
        set((s) => ({ transactions: [transaction, ...s.transactions] })),

      updateTransaction: (id, updated) =>
        set((s) => ({
          transactions: s.transactions.map((t) => (t.id === id ? { ...t, ...updated } : t)),
        })),

      deleteTransaction: (id) =>
        set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) })),

      // --- Computed Getters (called from hooks, not components directly) ---
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          );
        }
        if (filters.category !== 'All') {
          result = result.filter((t) => t.category === filters.category);
        }
        if (filters.type !== 'All') {
          result = result.filter((t) => t.type === filters.type);
        }

        result.sort((a, b) => {
          const dir = filters.sortDir === 'asc' ? 1 : -1;
          if (filters.sortBy === 'date') {
            return (new Date(a.date) - new Date(b.date)) * dir;
          }
          if (filters.sortBy === 'amount') {
            return (a.amount - b.amount) * dir;
          }
          return 0;
        });

        return result;
      },

      getSummary: () => {
        const { transactions } = get();
        return transactions.reduce(
          (acc, t) => {
            if (t.type === 'income') acc.income += t.amount;
            else acc.expense += t.amount;
            acc.balance = acc.income - acc.expense;
            return acc;
          },
          { balance: 0, income: 0, expense: 0 }
        );
      },

      getCategories: () => {
        const { transactions } = get();
        return ['All', ...new Set(transactions.map((t) => t.category))];
      },
    }),
    {
      name: 'mysticmart-transactions',
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);
