import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { useChartData } from '../../hooks/useChartData';
import { formatCurrency } from '../../utils/formatters';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="hsl(var(--foreground))"
        style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>
        {formatCurrency(value)}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="hsl(var(--muted-foreground))"
        style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {payload.name}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8}
        startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  );
};

export const CategoryDonutChart = () => {
  const { categoryData } = useChartData();
  const [activeIndex, setActiveIndex] = useState(0);

  if (categoryData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[260px] text-muted-foreground text-sm">
        No expense data yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={categoryData}
            cx="50%" cy="50%"
            innerRadius={65} outerRadius={85}
            paddingAngle={6}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            animationBegin={400}
            animationDuration={1200}
            stroke="none"
          >
            {categoryData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip wrapperStyle={{ display: 'none' }} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-col gap-2 max-h-32 overflow-y-auto pr-1">
        {categoryData.map((entry, index) => (
          <button
            key={entry.name}
            onClick={() => setActiveIndex(index)}
            className="flex items-center justify-between gap-2 px-2 py-1 rounded-lg hover:bg-secondary/50 transition-colors text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs font-semibold truncate">{entry.name}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-muted-foreground font-bold">{entry.percentage}%</span>
              <span className="text-xs font-black">{formatCurrency(entry.value)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
