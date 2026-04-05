import React from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import { useUIStore } from '../../store/uiStore';
import { motion, AnimatePresence } from 'framer-motion';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar aria-label="Sidebar navigation" />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-screen pb-24 lg:pb-0">
          <Header />
          <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav aria-label="Mobile navigation" />
    </div>
  );
};
