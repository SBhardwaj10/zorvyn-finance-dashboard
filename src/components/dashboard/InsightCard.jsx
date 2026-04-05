import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, TrendingUp, ChevronRight, ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatCurrency } from '../../utils/formatters';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const getIcon = (type) => {
  switch (type) {
    case 'trend': return TrendingUp;
    case 'anomaly': return AlertCircle;
    case 'suggestion': return Lightbulb;
    default: return Lightbulb;
  }
};

const getStatusStyles = (status) => {
  switch (status) {
    case 'warning': return "bg-rose-500/10 text-rose-600 border-rose-500/20";
    case 'suggestion': return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case 'success': return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    default: return "bg-primary/10 text-primary border-primary/20";
  }
};

export const InsightCard = ({ type, title, explanation, highlight, value, status, index }) => {
  const Icon = getIcon(type);
  const statusStyles = getStatusStyles(status);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 rounded-3xl flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-all"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2.5 rounded-2xl border", statusStyles)}>
            <Icon size={20} />
          </div>
          <div className={cn("px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border", statusStyles)}>
             {type}
          </div>
        </div>
        
        <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {explanation}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">{highlight}</span>
          <span className="text-sm font-black text-foreground">
             {typeof value === 'number' ? formatCurrency(value) : value}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};
