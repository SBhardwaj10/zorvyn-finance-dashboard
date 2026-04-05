import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

export const DeleteConfirmModal = ({ transaction, onConfirm, onCancel }) => (
  <AnimatePresence>
    {transaction && (
      <>
        <motion.div key="del-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onCancel} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" />
        <motion.div key="del-card"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <div className="glass-card p-6 rounded-3xl w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-600">
                <AlertTriangle size={22} />
              </div>
              <button onClick={onCancel} className="p-2 hover:bg-secondary rounded-xl transition-colors text-muted-foreground">
                <X size={18} />
              </button>
            </div>
            <h4 className="text-lg font-black mb-1">Delete Transaction?</h4>
            <p className="text-sm text-muted-foreground mb-6">
              "<span className="font-semibold text-foreground">{transaction.description}</span>" will be permanently removed. This can't be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl border text-sm font-bold hover:bg-secondary transition-colors">
                Cancel
              </button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => onConfirm(transaction.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20">
                <Trash2 size={14} /> Delete
              </motion.button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
