import React from 'react';
import { useUserStore } from '../../store/userStore';
import { motion } from 'framer-motion';
import { slideInTop } from '../../utils/motionVariants';

export const HeroHeader = () => {
  const { user } = useUserStore();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <motion.div 
      variants={slideInTop}
      initial="initial"
      animate="animate"
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
            {getGreeting()}, <span className="text-primary">{user.name.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary" />
            Here's what's happening with your finance today.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border rounded-full self-start sm:self-auto group hover:bg-secondary transition-colors">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-widest">{formattedDate}</span>
        </div>
      </div>
    </motion.div>
  );
};
