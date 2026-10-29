import React, { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StockCard = ({ symbol, price, change }) => {
  const isPositive = change >= 0;

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm flex flex-col gap-2">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{symbol}</h3>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{Math.abs(change).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(StockCard, (prevProps, nextProps) => prevProps.price === nextProps.price);