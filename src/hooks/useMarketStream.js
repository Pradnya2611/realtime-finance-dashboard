import { useState, useEffect } from 'react';

const generateInitialTransactions = () => {
  return Array.from({ length: 10000 }, (_, i) => ({
    id: `tx-init-${i}`,
    type: Math.random() > 0.5 ? 'BUY' : 'SELL',
    amount: (Math.random() * 1000).toFixed(2),
    status: 'COMPLETED',
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
  }));
};

export const useMarketStream = () => {
  const [stocks, setStocks] = useState([
    { symbol: 'BTC', price: 0, change: 0 },
    { symbol: 'ETH', price: 0, change: 0 },
    { symbol: 'SOL', price: 0, change: 0 },
    { symbol: 'BNB', price: 0, change: 0 }
  ]);
  const [transactions, setTransactions] = useState(generateInitialTransactions());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect React directly to Binance's free public WebSocket
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade/ethusdt@trade/solusdt@trade/bnbusdt@trade');

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);

    ws.onmessage = (event) => {
      const trade = JSON.parse(event.data);
      const symbol = trade.s.replace('USDT', '');
      const price = parseFloat(trade.p);

      // Update Stocks
      setStocks(currentStocks => {
        return currentStocks.map(stock => {
          if (stock.symbol === symbol) {
            const change = stock.price ? (price - stock.price) : 0;
            return { symbol, price, change };
          }
          return stock;
        });
      });

      // Update Transactions
      const newTx = {
        id: `tx-${trade.t}`,
        type: trade.m ? 'SELL' : 'BUY',
        amount: (price * parseFloat(trade.q)).toFixed(2),
        status: 'COMPLETED',
        timestamp: new Date(trade.T).toISOString()
      };

      setTransactions(prev => [newTx, ...prev].slice(0, 10000));
    };

    return () => ws.close();
  }, []);

  return { stocks: stocks.filter(s => s.price > 0), transactions, isConnected };
};