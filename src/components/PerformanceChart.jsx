import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceChart = () => {
  const chartData = useMemo(() => {
    let base = 10000;
    return Array.from({ length: 30 }, (_, i) => {
      base = base + (Math.random() - 0.4) * 500;
      return { day: `Day ${i + 1}`, value: base };
    });
  }, []);

  return (
    <div className="h-72 w-full bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Portfolio Performance (30D)</h2>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" hide />
          <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
          <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(PerformanceChart);