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
    gridCells: [],
    gridWidth: 0,
    gridHeight: 0,
  },
  reducers: {
    // reducers go here
    updateGrid: (gridState, action) => {
      gridState = action.payload;
    },
    updateGridWidth: (gridState, action) => {
      gridState.gridWidth = action.payload;
    },
    updateGridHeight: (gridState, action) => {
      gridState.gridHeight = action.payload;
    },
    updateGridCells: (gridState, action) => {
      gridState.gridCells = action.payload;
    },
  },
});

export const { reducer: gridReducer } = gridSlice;
export const { actions: gridActions } = gridSlice;

// This name needs to match the name of the slice in the store
export const selectGrid = (state: any): grid => state.gridState;
