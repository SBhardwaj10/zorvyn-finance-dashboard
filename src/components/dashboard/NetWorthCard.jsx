import React, { useEffect, useState } from 'react';
import { useTransactionStore } from '../../store/transactionStore';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const NetWorthCard = () => {
  const { getSummary } = useTransactionStore();
  const summary = getSummary();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 1000);
    return () => clearTimeout(timer);
  }, [summary.balance]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      <motion.div 
        whileHover={{ y: -5 }}
        className="lg:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden group"
      >
        {/* Background Decorative patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/20 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-emerald-500/20 transition-all duration-700" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Available Balance</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Live Tracking</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between items-start gap-4">
            <motion.h2 
              animate={pulse ? { scale: [1, 1.05, 1], color: ['hsl(var(--foreground))', 'hsl(var(--primary))', 'hsl(var(--foreground))'] } : {}}
              className="text-5xl lg:text-6xl font-black tracking-tighter"
            >
              {formatCurrency(summary.balance)}
            </motion.h2>
            
            <div className="flex gap-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Monthly Growth</span>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold">
                    <TrendingUp size={16} />
                    <span>+12.5%</span>
                  </div>
               </div>
               <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"
               >
                 <ArrowUpRight size={24} />
               </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mini Stats Column */}
      <div className="flex flex-col gap-6">
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex-1 glass-card p-6 rounded-3xl flex flex-col justify-between border-l-4 border-emerald-500"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl border border-emerald-500/20">
               <ArrowUpRight size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg">INCOME</span>
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-4">Total Income</p>
            <h3 className="text-2xl font-black">{formatCurrency(summary.income)}</h3>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ x: 5 }}
          className="flex-1 glass-card p-6 rounded-3xl flex flex-col justify-between border-l-4 border-rose-500"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-rose-500/10 text-rose-600 rounded-2xl border border-rose-500/20">
               <ArrowDownRight size={20} />
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-500/10 px-2 py-1 rounded-lg">EXPENSES</span>
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-4">Total Expenses</p>
            <h3 className="text-2xl font-black">{formatCurrency(summary.expense)}</h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
