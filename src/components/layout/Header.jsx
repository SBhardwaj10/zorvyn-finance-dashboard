import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Settings, ShieldCheck, ShieldAlert, ArrowUpRight, AlertCircle, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useUserStore } from '../../store/userStore';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Payment received', desc: 'Received +$1,500.00 from UI Design Project', time: '5m ago', icon: ArrowUpRight, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 2, title: 'Unusual spending', desc: 'You spent $800 on Rent today.', time: '2h ago', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { id: 3, title: 'System update', desc: 'Premium dashboard updates applied.', time: '1d ago', icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/10' },
];

// Helper Hook for clicking outside
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
};

export const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { user, setRole } = useUserStore();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const notifRef = useRef(null);
  const settingsRef = useRef(null);
  
  useClickOutside(notifRef, () => setShowNotifications(false));
  useClickOutside(settingsRef, () => setShowSettings(false));

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to completely reset all dashboard data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <header className="h-20 px-6 lg:px-10 flex items-center justify-between glass border-b sticky top-0 z-30">
      
      {/* Sidebar Toggle Space (Left) */}
      <div className="flex-1 flex items-center">
        {!isSidebarOpen && (
          <button 
            onClick={toggleSidebar} 
            className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground mr-4"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 lg:gap-4 ml-4">
        
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSettings(false);
            }}
            className="p-2.5 hover:bg-secondary rounded-xl transition-colors text-muted-foreground relative"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 glass-card p-2 rounded-2xl border shadow-2xl origin-top-right overflow-hidden z-50"
              >
                <div className="px-3 py-2 flex justify-between items-center border-b border-border/50 mb-2">
                  <h3 className="text-sm font-bold">Notifications</h3>
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map(n => (
                    <div key={n.id} className="flex gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group">
                      <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.bg} ${n.color}`}>
                        <n.icon size={14} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-bold group-hover:text-primary transition-colors">{n.title}</p>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 mt-2 pt-2 border-t border-border/50 text-center">
                  <button className="text-xs font-bold text-primary hover:underline">Mark all as read</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="w-px h-6 bg-border mx-2 hidden sm:block" />
        
        {/* Settings Dropdown */}
        <div className="relative" ref={settingsRef}>
          <motion.button 
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setShowSettings(!showSettings);
              setShowNotifications(false);
            }}
            className="p-2.5 hover:bg-secondary rounded-xl transition-colors text-muted-foreground"
          >
            <Settings size={20} />
          </motion.button>

          <AnimatePresence>
            {showSettings && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 glass-card p-2 rounded-2xl border shadow-2xl origin-top-right overflow-hidden z-50 flex flex-col gap-1"
              >
                <div className="px-3 py-2 border-b border-border/50 mb-1">
                  <h3 className="text-sm font-bold">Settings</h3>
                </div>

                {/* Role Toggle */}
                <button 
                  onClick={() => setRole(user.role === 'admin' ? 'viewer' : 'admin')}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/50 transition-colors w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${user.role === 'admin' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                      {user.role === 'admin' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">Role Mode</p>
                      <p className="text-[10px] text-muted-foreground capitalize">{user.role} Active</p>
                    </div>
                  </div>
                  <RefreshCw size={14} className="text-muted-foreground opacity-50" />
                </button>
                
                <div className="my-1 border-t border-border/50" />

                {/* Dangerous Action */}
                <button 
                  onClick={handleResetData}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-500/10 text-rose-500 transition-colors w-full text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                    <Trash2 size={14} />
                  </div>
                  <p className="text-sm font-bold">Reset Data</p>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
};
