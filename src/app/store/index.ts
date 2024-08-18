import { configureStore } from '@reduxjs/toolkit';

// Reducers
import fruitsReducer from './slices/fruits.slice';

export const createStore = () =>
  configureStore({
    reducer: {
      fruits: fruitsReducer,
    },
  });

export const store = createStore();

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
