import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Plus } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useTransactionStore } from '../../store/transactionStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...i) => twMerge(clsx(i));

const CATEGORIES = ['Food', 'Shopping', 'Utilities', 'Salary', 'Freelance', 'Investment', 'Rent', 'Entertainment', 'Healthcare', 'Other'];

const InputField = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</label>
    {children}
    {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
  </div>
);

const inputClass = "w-full px-4 py-3 bg-secondary/50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all";

export const TransactionModal = () => {
  const { isModalOpen, editingTransaction, closeModal } = useUIStore();
  const { addTransaction, updateTransaction } = useTransactionStore();
  const isEdit = !!editingTransaction;

  const EMPTY = { description: '', amount: '', category: 'Food', type: 'expense', date: new Date().toISOString().split('T')[0], status: 'completed' };
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setForm({ ...editingTransaction, amount: String(editingTransaction.amount) });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [editingTransaction, isModalOpen]);

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Date is required';
    return e;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const payload = { ...form, amount: parseFloat(form.amount), id: editingTransaction?.id ?? crypto.randomUUID() };

    if (isEdit) updateTransaction(payload.id, payload);
    else addTransaction(payload);
    closeModal();
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal — desktop centered, mobile slide-up */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:inset-0 lg:flex lg:items-center lg:justify-center"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card relative w-full lg:max-w-lg rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 flex flex-col gap-5 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black">{isEdit ? 'Edit Transaction' : 'New Transaction'}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{isEdit ? 'Update transaction details' : 'Add a new entry to your ledger'}</p>
                </div>
                <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={closeModal}
                  className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <InputField label="Description" error={errors.description}>
                    <input className={cn(inputClass, errors.description && 'border-rose-500/50 focus:ring-rose-500/20')}
                      placeholder="e.g. Grocery Shopping" value={form.description} onChange={set('description')} />
                  </InputField>
                </div>

                <InputField label="Amount ($)" error={errors.amount}>
                  <input type="number" min="0" step="0.01" className={cn(inputClass, errors.amount && 'border-rose-500/50')}
                    placeholder="0.00" value={form.amount} onChange={set('amount')} />
                </InputField>

                <InputField label="Date" error={errors.date}>
                  <input type="date" className={cn(inputClass, errors.date && 'border-rose-500/50')}
                    value={form.date} onChange={set('date')} />
                </InputField>

                <InputField label="Category">
                  <select className={inputClass} value={form.category} onChange={set('category')}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </InputField>

                <InputField label="Status">
                  <select className={inputClass} value={form.status} onChange={set('status')}>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </InputField>

                {/* Type Toggle */}
                <div className="col-span-2">
                  <InputField label="Type">
                    <div className="flex gap-2 p-1 bg-secondary rounded-xl">
                      {['expense', 'income'].map((t) => (
                        <button key={t} type="button" onClick={() => setForm((f) => ({ ...f, type: t }))}
                          className={cn(
                            'flex-1 py-2 rounded-lg text-xs font-black capitalize transition-all',
                            form.type === t
                              ? t === 'income' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-rose-500 text-white shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </InputField>
                </div>
              </div>

              {/* Submit */}
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
              >
                {isEdit ? <><Save size={16} /> Save Changes</> : <><Plus size={16} /> Add Transaction</>}
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
