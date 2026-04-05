import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Lock, ReceiptText, ArrowUpDown } from 'lucide-react';
import { useTransactionStore } from '../../store/transactionStore';
import { useUserStore } from '../../store/userStore';
import { useUIStore } from '../../store/uiStore';
import { TransactionFilters } from './TransactionFilters';
import { TransactionRow, TransactionCard } from './TransactionItems';
import { TransactionModal } from './TransactionModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...i) => twMerge(clsx(i));

/* ── Empty State ──────────────────────────────────────────── */
const EmptyState = ({ hasFilters, onAdd, isAdmin }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 text-center"
  >
    <div className="w-20 h-20 rounded-3xl bg-secondary/60 border-2 border-dashed flex items-center justify-center text-muted-foreground mb-5">
      <ReceiptText size={32} className="opacity-40" />
    </div>
    {hasFilters ? (
      <>
        <h4 className="text-lg font-black mb-1">No results found</h4>
        <p className="text-sm text-muted-foreground">Try adjusting your search or clearing the active filters.</p>
      </>
    ) : (
      <>
        <h4 className="text-lg font-black mb-1">No transactions yet</h4>
        <p className="text-sm text-muted-foreground mb-5">Your ledger is empty. Add your first transaction to get started.</p>
        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
          >
            <Plus size={16} /> Add First Transaction
          </motion.button>
        )}
      </>
    )}
  </motion.div>
);

/* ── Desktop Table Header ─────────────────────────────────── */
const TableHeader = ({ sortBy, sortDir, onSort }) => {
  const col = (key, label, cls = '') => (
    <th className={cn('py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground', cls)}>
      <button
        onClick={() => onSort(key)}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        {label}
        {sortBy === key
          ? <span className="text-primary">{sortDir === 'asc' ? '↑' : '↓'}</span>
          : <ArrowUpDown size={10} className="opacity-30" />}
      </button>
    </th>
  );

  return (
    <thead className="border-b border-border/50">
      <tr>
        <th className="py-3 pl-6 pr-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-left">Category</th>
        <th className="py-3 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-left">Description</th>
        {col('date', 'Date', 'px-3 text-left')}
        <th className="py-3 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-left">Status</th>
        {col('amount', 'Amount', 'pl-3 pr-6 text-right')}
        <th className="py-3 pr-6 pl-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
      </tr>
    </thead>
  );
};

/* ── Main Section ─────────────────────────────────────────── */
export const TransactionsSection = () => {
  const { getFilteredTransactions, deleteTransaction, filters, setSortBy, getCategories } = useTransactionStore();
  const { user } = useUserStore();
  const { openAddModal, openEditModal } = useUIStore();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const isAdmin = user.role === 'admin';

  const filtered = useMemo(() => getFilteredTransactions(), [
    getFilteredTransactions,
    filters,
  ]);

  const hasActiveFilters = filters.search || filters.category !== 'All' || filters.type !== 'All';

  const handleDelete = (id) => {
    deleteTransaction(id);
    setDeleteTarget(null);
  };

  return (
    <section className="mt-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
            <ReceiptText size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">Transactions</h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
        </div>

        {/* Add Button / Lock */}
        {isAdmin ? (
          <motion.button
            whileHover={{ scale: 1.05, gap: '10px' }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
          >
            <Plus size={16} /> Add Transaction
          </motion.button>
        ) : (
          <div
            title="Switch to Admin mode to add transactions"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-sm border cursor-not-allowed opacity-60"
          >
            <Lock size={14} /> Add Transaction
          </div>
        )}
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Desktop Table */}
      <div className="hidden lg:block glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader sortBy={filters.sortBy} sortDir={filters.sortDir} onSort={setSortBy} />
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.length > 0 ? (
                  filtered.map((tx, i) => (
                    <TransactionRow
                      key={tx.id}
                      transaction={tx}
                      isAdmin={isAdmin}
                      index={i}
                      onEdit={openEditModal}
                      onDelete={setDeleteTarget}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <EmptyState hasFilters={hasActiveFilters} onAdd={openAddModal} isAdmin={isAdmin} />
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="lg:hidden flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((tx, i) => (
              <TransactionCard
                key={tx.id}
                transaction={tx}
                isAdmin={isAdmin}
                index={i}
                onEdit={openEditModal}
                onDelete={setDeleteTarget}
              />
            ))
          ) : (
            <EmptyState hasFilters={hasActiveFilters} onAdd={openAddModal} isAdmin={isAdmin} />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile FAB */}
      {isAdmin && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openAddModal}
          className="sm:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center z-40 border-4 border-background"
        >
          <Plus size={22} strokeWidth={3} />
        </motion.button>
      )}

      {/* Modals */}
      <TransactionModal />
      <DeleteConfirmModal
        transaction={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </section>
  );
};
