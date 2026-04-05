import { useMemo } from 'react';
import { useTransactionStore } from '../store/transactionStore';

export const useSmartInsights = () => {
  const { transactions } = useTransactionStore();

  const insights = useMemo(() => {
    const list = [];
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) return [];

    // Grouping by category
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const topCategory = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)[0];

    // Insight 1: Highest Spending Category (Trend)
    if (topCategory) {
      list.push({
        type: 'trend',
        title: 'Spending Breakdown',
        explanation: `Your main expense is ${topCategory[0]}, which accounts for the largest portion of your monthly outflow. Consider reviewing entries here to optimize savings.`,
        highlight: topCategory[0],
        value: topCategory[1],
        status: 'neutral'
      });
    }

    // Insight 2: Anomaly Detection (Large Transactions)
    const avgSpend = expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length;
    const largeSpend = expenses.find(t => t.amount > avgSpend * 2.5);

    if (largeSpend) {
      list.push({
        type: 'anomaly',
        title: 'Unusual Spending Activity',
        explanation: `A transaction of $${largeSpend.amount} for "${largeSpend.description}" was noted. This is significantly higher than your typical $${avgSpend.toFixed(0)} average.`,
        highlight: largeSpend.category,
        value: largeSpend.amount,
        status: 'warning'
      });
    }

    // Insight 3: Financial Health / Savings Ratio (Suggestion)
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
    const savingsRatio = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    if (savingsRatio < 20 && totalIncome > 0) {
      list.push({
        type: 'suggestion',
        title: 'Optimization Tip',
        explanation: `Your savings rate is currently at ${savingsRatio.toFixed(1)}%. Experts suggest a 20% target. Cutting back on ${topCategory[0]} could help you bridge this gap.`,
        highlight: 'Savings Rate',
        value: `${savingsRatio.toFixed(0)}%`,
        status: 'suggestion'
      });
    } else if (totalIncome > 0) {
      list.push({
        type: 'suggestion',
        title: 'Strong Financial Health',
        explanation: `You're saving ${savingsRatio.toFixed(1)}% of your income! This is above the average benchmark. You might want to consider diversified investments.`,
        highlight: 'Portfolio',
        value: 'Optimal',
        status: 'success'
      });
    }

    return list;
  }, [transactions]);

  return { insights };
};
