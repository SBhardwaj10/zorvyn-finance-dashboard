import React from 'react';
import { LayoutDashboard, ReceiptText, PieChart, ShieldAlert, ShieldCheck, ChevronRight, Menu, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useUserStore } from '../../store/userStore';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 group",
      active
        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    )}
  >
    <Icon size={20} className={cn("transition-transform group-hover:scale-110", active ? "scale-110" : "")} />
    <span className="font-medium">{label}</span>
  </motion.button>
);

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { user, setRole } = useUserStore();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'transactions', icon: ReceiptText, label: 'Transactions' },
    { id: 'insights', icon: PieChart, label: 'Insights' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 280 : 0 }}
      className="hidden lg:flex flex-col h-screen glass border-r bg-card/50 sticky top-0 overflow-hidden"
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight">Zor<span className="text-primary">vyn</span></span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            active={item.id === 'dashboard'}
            onClick={() => { }}
          />
        ))}
      </nav>

      {/* User & Role Section */}
      <div className="p-4 border-t border-border/50 bg-secondary/30">
        <div className={cn("flex items-center gap-3 p-2", !isSidebarOpen && "justify-center")}>
          <div className="relative">
            <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-primary/20" alt="Avatar" />
            <div className={cn(
              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-black flex items-center justify-center",
              user.role === 'admin' ? "bg-emerald-500" : "bg-amber-500"
            )}>
              {user.role === 'admin' ? <ShieldCheck className="text-white" size={10} /> : <ShieldAlert className="text-white" size={10} />}
            </div>
          </div>
          {isSidebarOpen && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role} Mode</p>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <div className="mt-4 p-2 bg-background rounded-xl border flex flex-col gap-2">
            <p className="text-[10px] uppercase font-bold text-muted-foreground px-2">Role Switcher</p>
            <div className="flex gap-1 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setRole('viewer')}
                className={cn(
                  "flex-1 text-[10px] font-bold py-1 px-2 rounded-md transition-all",
                  user.role === 'viewer' ? "bg-card shadow-sm" : "hover:text-primary"
                )}
              >
                VIEWER
              </button>
              <button
                onClick={() => setRole('admin')}
                className={cn(
                  "flex-1 text-[10px] font-bold py-1 px-2 rounded-md transition-all",
                  user.role === 'admin' ? "bg-card shadow-sm" : "hover:text-primary"
                )}
              >
                ADMIN
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
};
