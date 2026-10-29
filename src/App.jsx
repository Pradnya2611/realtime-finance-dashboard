import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import StockCard from './components/StockCard';
import PerformanceChart from './components/PerformanceChart';
import VirtualizedTransactions from './components/VirtualizedTransactions';
import { useMarketStream } from './hooks/useMarketStream';

const AppContent = () => {
  const theme = useSelector((state) => state.ui.theme);
  const { stocks, transactions, isConnected } = useMarketStream();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header isConnected={isConnected} />
      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stocks.map(stock => (
            <StockCard key={stock.symbol} symbol={stock.symbol} price={stock.price} change={stock.change} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div className="lg:col-span-1">
            <VirtualizedTransactions transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppContent;