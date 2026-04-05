import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...i) => twMerge(clsx(i));

/* Shimmer base */
const Shimmer = ({ className }) => (
  <div className={cn(
    'relative overflow-hidden rounded-xl bg-secondary/60',
    'before:absolute before:inset-0 before:-translate-x-full',
    'before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:animate-[shimmer_1.5s_infinite]',
    className
  )} />
);

/* Summary Card Skeleton */
const SummaryCardSkeleton = () => (
  <div className="glass-card p-6 rounded-3xl">
    <div className="flex items-center gap-3 mb-4">
      <Shimmer className="w-10 h-10 rounded-xl" />
      <div className="flex flex-col gap-2 flex-1">
        <Shimmer className="h-3 w-24" />
        <Shimmer className="h-2 w-16" />
      </div>
    </div>
    <Shimmer className="h-10 w-40 mb-2" />
    <Shimmer className="h-3 w-28" />
  </div>
);

/* Chart Skeleton */
const ChartSkeleton = ({ height = 'h-[300px]' }) => (
  <div className="glass-card p-6 rounded-3xl">
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-col gap-2">
        <Shimmer className="h-5 w-36" />
        <Shimmer className="h-3 w-24" />
      </div>
      <Shimmer className="h-8 w-16 rounded-lg" />
    </div>
    <Shimmer className={cn('w-full rounded-2xl', height)} />
  </div>
);

/* Table Row Skeleton */
const TableRowSkeleton = ({ index }) => (
  <div className="flex items-center gap-4 px-6 py-4 border-b border-border/50"
    style={{ opacity: 1 - index * 0.15 }}
  >
    <Shimmer className="w-10 h-10 rounded-xl shrink-0" />
    <Shimmer className="h-4 w-28" />
    <Shimmer className="h-3 w-40 flex-1" />
    <Shimmer className="h-3 w-20 hidden md:block" />
    <Shimmer className="h-6 w-20 rounded-full hidden lg:block" />
    <Shimmer className="h-5 w-20 ml-auto" />
  </div>
);

/* Insight Card Skeleton */
const InsightCardSkeleton = () => (
  <div className="glass-card p-6 rounded-3xl flex flex-col gap-4">
    <div className="flex justify-between">
      <Shimmer className="w-10 h-10 rounded-xl" />
      <Shimmer className="w-16 h-6 rounded-lg" />
    </div>
    <div className="flex flex-col gap-2">
      <Shimmer className="h-5 w-40" />
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-4/5" />
    </div>
    <div className="flex items-center justify-between pt-2 border-t">
      <div className="flex flex-col gap-1.5">
        <Shimmer className="h-2 w-16" />
        <Shimmer className="h-4 w-20" />
      </div>
      <Shimmer className="w-8 h-8 rounded-full" />
    </div>
  </div>
);

/* Full Dashboard Skeleton */
export const DashboardSkeleton = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col gap-8"
  >
    {/* Hero */}
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex flex-col gap-2">
        <Shimmer className="h-10 w-72" />
        <Shimmer className="h-4 w-48" />
      </div>
      <Shimmer className="h-8 w-40 rounded-full self-start sm:self-auto" />
    </div>

    {/* Net Worth + Stats */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <SummaryCardSkeleton />
      </div>
      <div className="flex flex-col gap-6">
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
      </div>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <ChartSkeleton height="h-[300px]" />
      </div>
      <ChartSkeleton height="h-[300px]" />
    </div>

    {/* Insight Cards */}
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Shimmer className="w-10 h-10 rounded-xl" />
        <div className="flex flex-col gap-2">
          <Shimmer className="h-5 w-36" />
          <Shimmer className="h-3 w-56" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsightCardSkeleton />
        <InsightCardSkeleton />
        <InsightCardSkeleton />
      </div>
    </div>

    {/* Transactions */}
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shimmer className="w-10 h-10 rounded-xl" />
          <div className="flex flex-col gap-2">
            <Shimmer className="h-5 w-32" />
            <Shimmer className="h-3 w-20" />
          </div>
        </div>
        <Shimmer className="h-10 w-36 rounded-xl" />
      </div>
      <div className="glass-card rounded-3xl overflow-hidden">
        {[...Array(6)].map((_, i) => <TableRowSkeleton key={i} index={i} />)}
      </div>
    </div>
  </motion.div>
);
