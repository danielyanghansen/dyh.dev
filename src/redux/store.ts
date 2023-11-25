import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { gridReducer } from './slices/gridSlice';


export const selectGrid = (state: any): grid => state.reducer.grid;

// Create a simple redux store
const store = configureStore({
  reducer: combineReducers({
    reducer: gridReducer,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;
