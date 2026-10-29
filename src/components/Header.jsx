import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/uiSlice';
import { Moon, Sun, Activity } from 'lucide-react';

const Header = ({ isConnected }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full ${isConnected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          <Activity size={20} className={isConnected ? 'animate-pulse' : ''} />
        </div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Real-Time Market Terminal</h1>
      </div>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};

export default React.memo(Header);