import React from 'react';
import { LayoutDashboard, ReceiptText, PieChart, Plus, UserCircle } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center p-2 rounded-xl transition-all",
      active ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
    )}
  >
    <Icon size={22} className={cn("transition-transform", active ? "scale-110" : "")} />
    <span className="text-[10px] font-bold uppercase tracking-wider mt-1">{label}</span>
  </button>
);

export const BottomNav = () => {
  const { user } = useUserStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 glass-card border-t px-6 flex items-center justify-between lg:hidden z-50 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
      <NavButton icon={LayoutDashboard} label="Home" active={true} />
      <NavButton icon={ReceiptText} label="Activity" active={false} />
      
      {user.role === 'admin' ? (
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30 -mt-10 border-4 border-background"
        >
          <Plus size={24} strokeWidth={3} />
        </motion.button>
      ) : (
        <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground -mt-10 border-4 border-background opacity-50 relative group">
           <Plus size={24} strokeWidth={3} className="grayscale" />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-full h-full rotate-45 border-t-2 border-muted-foreground/30" />
           </div>
        </div>
      )}

      <NavButton icon={PieChart} label="Analytics" active={false} />
      <NavButton icon={UserCircle} label="Account" active={false} />
    </nav>
  );
};
