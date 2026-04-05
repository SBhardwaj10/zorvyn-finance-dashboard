import React, { useState, useEffect } from 'react';
import { Search, X, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactionStore } from '../../store/transactionStore';
import { useDebounce } from '../../hooks/useDebounce';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...i) => twMerge(clsx(i));

const TypePill = ({ label, active, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      'px-4 py-1.5 rounded-full text-xs font-bold transition-all border',
      active
        ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
        : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
    )}
  >
    {label}
  </motion.button>
);

export const TransactionFilters = () => {
  const { filters, setSearch, setCategory, setType, setSortBy, clearFilters, getCategories } =
    useTransactionStore();

  const [localSearch, setLocalSearch] = useState(filters.search);
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  const categories = getCategories();
  const hasActiveFilters =
    filters.search || filters.category !== 'All' || filters.type !== 'All';

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Row 1: Search + Sort */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
          />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-9 pr-4 py-2.5 bg-secondary/50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <AnimatePresence>
            {localSearch && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Sort buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {['date', 'amount'].map((key) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSortBy(key)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all capitalize',
                filters.sortBy === key
                  ? 'bg-primary/10 text-primary border-primary/30'
                  : 'border-border text-muted-foreground hover:text-foreground'
              )}
            >
              <ArrowUpDown size={12} />
              {key}
              {filters.sortBy === key && (
                <span className="text-[10px]">{filters.sortDir === 'asc' ? '↑' : '↓'}</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Clear All */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => { clearFilters(); setLocalSearch(''); }}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all whitespace-nowrap"
            >
              <X size={12} /> Clear
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Row 2: Type + Category Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" />

        {/* Type Pills */}
        {['All', 'income', 'expense'].map((t) => (
          <TypePill
            key={t}
            label={t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
            active={filters.type === t}
            onClick={() => setType(t)}
          />
        ))}

        <div className="w-px h-4 bg-border mx-1" />

        {/* Category Pills (show top 5 to avoid clutter) */}
        {categories.slice(0, 6).map((cat) => (
          <TypePill
            key={cat}
            label={cat}
            active={filters.category === cat}
            onClick={() => setCategory(cat)}
          />
        ))}
      </div>

      {/* Active Filters Indicator */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-xs font-bold text-primary"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Filters active — showing filtered results
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
