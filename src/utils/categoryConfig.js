import {
  Briefcase, ShoppingBag, Zap, UtensilsCrossed, Home,
  TrendingUp, Tv, HeartPulse, MoreHorizontal
} from 'lucide-react';

export const CATEGORY_CONFIG = {
  Salary:        { icon: Briefcase,       color: 'emerald', bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  Freelance:     { icon: Briefcase,       color: 'teal',    bg: 'bg-teal-500/10',    text: 'text-teal-600',    border: 'border-teal-500/20',    dot: 'bg-teal-500' },
  Investment:    { icon: TrendingUp,      color: 'cyan',    bg: 'bg-cyan-500/10',    text: 'text-cyan-600',    border: 'border-cyan-500/20',    dot: 'bg-cyan-500' },
  Food:          { icon: UtensilsCrossed, color: 'amber',   bg: 'bg-amber-500/10',   text: 'text-amber-600',   border: 'border-amber-500/20',   dot: 'bg-amber-500' },
  Shopping:      { icon: ShoppingBag,     color: 'violet',  bg: 'bg-violet-500/10',  text: 'text-violet-600',  border: 'border-violet-500/20',  dot: 'bg-violet-500' },
  Utilities:     { icon: Zap,             color: 'blue',    bg: 'bg-blue-500/10',    text: 'text-blue-600',    border: 'border-blue-500/20',    dot: 'bg-blue-500' },
  Rent:          { icon: Home,            color: 'rose',    bg: 'bg-rose-500/10',    text: 'text-rose-600',    border: 'border-rose-500/20',    dot: 'bg-rose-500' },
  Entertainment: { icon: Tv,              color: 'pink',    bg: 'bg-pink-500/10',    text: 'text-pink-600',    border: 'border-pink-500/20',    dot: 'bg-pink-500' },
  Healthcare:    { icon: HeartPulse,      color: 'red',     bg: 'bg-red-500/10',     text: 'text-red-600',     border: 'border-red-500/20',     dot: 'bg-red-500' },
};

export const getCategoryConfig = (category) =>
  CATEGORY_CONFIG[category] ?? {
    icon: MoreHorizontal,
    color: 'slate',
    bg: 'bg-slate-500/10',
    text: 'text-slate-600',
    border: 'border-slate-500/20',
    dot: 'bg-slate-500',
  };
