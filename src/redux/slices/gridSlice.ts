
import { type Slice, createSlice } from '@reduxjs/toolkit';

interface gridCell {
  x: number;
  y: number;
  isAlive: boolean;
}
export interface grid {
  gridCells: gridCell[];
  gridWidth: number;
  gridHeight: number;
}

// create a slice to store the state of the app
export const gridSlice: Slice = createSlice({
  name: 'grid',
  initialState: {
    // state goes here
    grid: {
      gridCells: [],
      gridWidth: 0,
      gridHeight: 0,
    },
  },
  reducers: {
    // reducers go here
    updateGrid: (state, action) => {
      state.grid = action.payload;
    },
    updateGridWidth: (state, action) => {
      state.grid.gridWidth = action.payload;
    },
    updateGridHeight: (state, action) => {
      state.grid.gridHeight = action.payload;
    },
    updateGridCells: (state, action) => {
      state.grid.gridCells = action.payload;
    },
  },
});

export const { reducer: gridReducer } = gridSlice;
export const { actions: gridActions } = gridSlice;
export const selectGrid = (state: any): grid => state.reducer.grid;