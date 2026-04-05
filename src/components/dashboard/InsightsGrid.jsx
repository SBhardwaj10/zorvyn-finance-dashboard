import React from 'react';
import { motion } from 'framer-motion';
import { useSmartInsights } from '../../hooks/useSmartInsights';
import { InsightCard } from './InsightCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const InsightsGrid = () => {
  const { insights } = useSmartInsights();

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">Smart Insights</h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">AI-Powered Financial Intelligence</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-xs font-black text-primary hover:gap-3 transition-all uppercase tracking-widest">
           View Analysis <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <InsightCard key={`${insight.type}-${index}`} {...insight} index={index} />
        ))}
        
        {insights.length === 0 && (
          <div className="col-span-full py-12 glass-card rounded-3xl border-dashed flex flex-col items-center justify-center text-muted-foreground bg-secondary/10">
            <Sparkles size={48} className="mb-4 opacity-20" />
            <p className="font-bold text-lg">Analyzing your data...</p>
            <p className="text-sm">We'll show insights here as soon as they're ready.</p>
          </div>
        )}
      </div>
    </div>
  );
};
