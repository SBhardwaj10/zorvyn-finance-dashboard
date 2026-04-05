import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useChartData } from '../../hooks/useChartData';
import { formatCurrency, formatDate } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card dark:bg-[#1E293B] p-4 rounded-2xl border-white/20 dark:border-white/5 shadow-2xl dark:shadow-none backdrop-blur-xl dark:backdrop-blur-sm">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
          {formatDate(label, { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-foreground font-medium">Balance</span>
            <span className="text-sm font-black text-primary">{formatCurrency(payload[0].value)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
             <span className="text-[10px] text-emerald-500 font-bold">Income</span>
             <span className="text-[10px] text-emerald-500 font-bold">+{formatCurrency(payload[0].payload.income)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
             <span className="text-[10px] text-rose-500 font-bold">Expense</span>
             <span className="text-[10px] text-rose-500 font-bold">-{formatCurrency(payload[0].payload.expense)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const BalanceAreaChart = () => {
  const { trendData } = useChartData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.6} />
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          tickFormatter={(str) => formatDate(str, { month: 'short', day: 'numeric' })}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          tickFormatter={(val) => `$${val}`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }} />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="hsl(var(--primary))"
          strokeWidth={5}
          fillOpacity={1}
          fill="url(#colorBalance)"
          animationDuration={1500}
          animationEasing="ease-in-out"
          activeDot={{ r: 6, stroke: 'white', strokeWidth: 3, fill: 'hsl(var(--primary))', className: 'shadow-lg' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
