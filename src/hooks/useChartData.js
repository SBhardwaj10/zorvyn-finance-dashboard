import { useMemo } from 'react';
import { useTransactionStore } from '../store/transactionStore';

export const useChartData = () => {
  const { transactions } = useTransactionStore();

  const trendData = useMemo(() => {
    const dataMap = {};
    
    // Sort transactions by date
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let runningBalance = 0;
    
    sorted.forEach((t) => {
      const date = t.date;
      if (!dataMap[date]) {
        dataMap[date] = { date, income: 0, expense: 0, balance: 0 };
      }
      
      if (t.type === 'income') dataMap[date].income += t.amount;
      else dataMap[date].expense += t.amount;
      
      // Calculate daily running balance
      runningBalance += (t.type === 'income' ? t.amount : -t.amount);
      dataMap[date].balance = runningBalance;
    });

    return Object.values(dataMap);
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = {};
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    transactions.filter(t => t.type === 'expense').forEach((t) => {
      if (!categories[t.category]) {
        categories[t.category] = { name: t.category, value: 0 };
      }
      categories[t.category].value += t.amount;
    });

    return Object.values(categories).map(c => ({
      ...c,
      percentage: ((c.value / totalExpenses) * 100).toFixed(1)
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  return { trendData, categoryData };
};
