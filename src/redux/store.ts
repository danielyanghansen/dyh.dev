import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { gridReducer } from './slices/gridSlice.ts';
import { voteReducer } from './slices/voteSlice.ts';

// Create a simple redux store
const store = configureStore({
  reducer: combineReducers({
    gridState: gridReducer,
    voteSession: voteReducer,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);

export default store;
