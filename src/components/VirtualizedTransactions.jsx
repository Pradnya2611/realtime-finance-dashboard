import React, { memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { format } from 'date-fns';

const Row = memo(({ index, style, data }) => {
  const tx = data[index];
  const isBuy = tx.type === 'BUY';

  return (
    <div style={style} className="flex items-center justify-between px-4 border-b dark:border-gray-700/50 text-sm hover:bg-gray-50 dark:hover:bg-gray-750">
      <div className="flex flex-col w-1/4">
        <span className="font-medium text-gray-900 dark:text-gray-100">{tx.id.split('-')[1]}</span>
        <span className="text-xs text-gray-500">{format(new Date(tx.timestamp), 'HH:mm:ss')}</span>
      </div>
      <div className="w-1/4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${isBuy ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'}`}>
          {tx.type}
        </span>
      </div>
      <div className="w-1/4 text-right">
        <span className="text-gray-900 dark:text-gray-100 font-medium">${tx.amount}</span>
      </div>
      <div className="w-1/4 text-right">
        <span className={`text-xs ${tx.status === 'COMPLETED' ? 'text-green-500' : 'text-yellow-500'}`}>
          {tx.status}
        </span>
      </div>
    </div>
  );
});

const VirtualizedTransactions = ({ transactions }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-[400px]">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Live Ledger ({transactions.length.toLocaleString()} entries)</h2>
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <div className="w-1/4">ID</div>
        <div className="w-1/4">Action</div>
        <div className="w-1/4 text-right">Amount</div>
        <div className="w-1/4 text-right">Status</div>
      </div>
      <div className="flex-1 w-full">
        <List
          height={310}
          itemCount={transactions.length}
          itemSize={60}
          width="100%"
          itemData={transactions}
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default React.memo(VirtualizedTransactions);