import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MainLayout } from './components/layout/MainLayout';
import { HeroHeader } from './components/dashboard/HeroHeader';
import { NetWorthCard } from './components/dashboard/NetWorthCard';
import { ChartCard } from './components/charts/ChartCard';
import { BalanceAreaChart } from './components/charts/BalanceAreaChart';
import { CategoryDonutChart } from './components/charts/CategoryDonutChart';
import { InsightsGrid } from './components/dashboard/InsightsGrid';
import { TransactionsSection } from './components/transactions/TransactionsSection';
import { DashboardSkeleton } from './components/feedback/DashboardSkeleton';
import { containerVariants, itemVariants } from './utils/motionVariants';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        {loading ? (
          <DashboardSkeleton key="skeleton" />
        ) : (
          <motion.div
            key="dashboard"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            <motion.div variants={itemVariants}>
              <HeroHeader />
            </motion.div>

            <motion.div variants={itemVariants}>
              <NetWorthCard />
            </motion.div>

            {/* Charts */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <ChartCard
                  title="Balance Over Time"
                  subtitle="Current Period Analysis"
                  trend="up"
                  trendValue={12.5}
                >
                  <BalanceAreaChart />
                </ChartCard>
              </div>
              <div className="xl:col-span-1">
                <ChartCard title="Expense Categories" subtitle="Spending Distribution">
                  <CategoryDonutChart />
                </ChartCard>
              </div>
            </motion.div>

            {/* Insights */}
            <motion.div variants={itemVariants}>
              <InsightsGrid />
            </motion.div>

            {/* Transactions */}
            <motion.div variants={itemVariants}>
              <TransactionsSection />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
