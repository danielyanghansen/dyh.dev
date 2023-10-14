import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

//create a slice to store the state of the app
export const slice = createSlice({
  name: "app",
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
      state.grid = action.payload
    },
    updateGridWidth: (state, action) => {
      state.grid.gridWidth = action.payload
    },
    updateGridHeight: (state, action) => {
      state.grid.gridHeight = action.payload
    },
    updateGridCells: (state, action) => {
      state.grid.gridCells = action.payload
    },
  },
})

export const { reducer } = slice
export const { actions } = slice

export const selectGrid = (state: any) => state.reducer.grid;


//Create a simple redux store
const store = configureStore({
    reducer: combineReducers({
        reducer
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
