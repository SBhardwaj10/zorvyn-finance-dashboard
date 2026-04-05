import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Lock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getCategoryConfig } from '../../utils/categoryConfig';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...i) => twMerge(clsx(i));

const StatusBadge = ({ status }) => (
  <span className={cn(
    'px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border',
    status === 'completed'
      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
      : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
  )}>
    {status}
  </span>
);

/* ──────────────────────────────────────────────────────────
   DESKTOP ROW
────────────────────────────────────────────────────────── */
export const TransactionRow = ({ transaction, isAdmin, onEdit, onDelete, index }) => {
  const config = getCategoryConfig(transaction.category);
  const Icon = config.icon;
  const isIncome = transaction.type === 'income';

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group border-b border-border/50 dark:border-white/5 hover:bg-secondary/30 dark:hover:bg-white/5 transition-colors"
    >
      {/* Category */}
      <td className="py-4 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-xl border', config.bg, config.border)}>
            <Icon size={16} className={config.text} />
          </div>
          <span className="text-sm font-semibold">{transaction.category}</span>
        </div>
      </td>

      {/* Description */}
      <td className="py-4 px-3 max-w-[200px]">
        <p className="text-sm text-muted-foreground truncate">{transaction.description}</p>
      </td>

      {/* Date */}
      <td className="py-4 px-3 text-sm text-muted-foreground whitespace-nowrap">
        {formatDate(transaction.date, { month: 'short', day: 'numeric', year: 'numeric' })}
      </td>

      {/* Status */}
      <td className="py-4 px-3">
        <StatusBadge status={transaction.status} />
      </td>

      {/* Amount */}
      <td className="py-4 pl-3 pr-6 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <span className={cn(
            'text-[15px] font-black',
            isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
          )}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </span>
          {isIncome
            ? <ArrowUpRight size={14} className="text-emerald-500" />
            : <ArrowDownRight size={14} className="text-rose-500" />
          }
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 pr-6 pl-3">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all justify-end">
          {isAdmin ? (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(transaction)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                title="Edit"
              >
                <Pencil size={14} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(transaction)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                title="Delete"
              >
                <Trash2 size={14} />
              </motion.button>
            </>
          ) : (
            <div className="flex items-center gap-1 text-muted-foreground/50" title="Switch to Admin to edit">
              <Lock size={12} />
              <span className="text-[10px] font-bold">Read-only</span>
            </div>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

/* ──────────────────────────────────────────────────────────
   MOBILE CARD
────────────────────────────────────────────────────────── */
export const TransactionCard = ({ transaction, isAdmin, onEdit, onDelete, index }) => {
  const config = getCategoryConfig(transaction.category);
  const Icon = config.icon;
  const isIncome = transaction.type === 'income';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.04 }}
      className={cn(
        'glass-card p-4 rounded-2xl border-l-4 flex items-center gap-4',
        isIncome ? 'border-l-emerald-500' : 'border-l-rose-500'
      )}
    >
      <div className={cn('p-2.5 rounded-xl border shrink-0', config.bg, config.border)}>
        <Icon size={18} className={config.text} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{transaction.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground">{transaction.category}</span>
          <span className="text-muted-foreground/30">·</span>
          <span className="text-xs text-muted-foreground">
            {formatDate(transaction.date, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={cn(
          'text-sm font-black',
          isIncome ? 'text-emerald-600' : 'text-rose-600'
        )}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>
        <StatusBadge status={transaction.status} />
      </div>

      {isAdmin && (
        <div className="flex flex-col gap-1 shrink-0">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => onEdit(transaction)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Pencil size={13} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => onDelete(transaction)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 size={13} />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};
