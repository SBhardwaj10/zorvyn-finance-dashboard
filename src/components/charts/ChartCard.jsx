import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ChartCard = ({ title, subtitle, trend, trendValue, children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass-card p-6 rounded-3xl flex flex-col h-full", className)}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {trend && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold",
              trend === 'up' ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
            )}>
              {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {trendValue}%
            </div>
          )}
          <button className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-[240px] relative">
        {children}
      </div>
    </motion.div>
  );
};
