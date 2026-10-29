import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import uiReducer from './uiSlice';

// Custom storage wrapper that works perfectly with Vite
const customStorage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, item) => {
    localStorage.setItem(key, item);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'finance-dashboard-root',
  storage: customStorage,
  whitelist: ['ui']
};

const rootReducer = combineReducers({
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
