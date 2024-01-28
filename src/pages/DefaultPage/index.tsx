import React from 'react';

import { LoadingScreen } from '@/components';
import { gridActions, selectGrid } from '@/redux/slices/gridSlice';

import './DefaultPage.css';
import { useAppDispatch, useAppSelector } from '@/redux/store';

const App: React.FC = () => {
  const grid = useAppSelector(selectGrid);

  const height = grid.gridHeight;

  const dispatch = useAppDispatch();

  const addToGridHeight = (diff: number) => {
    dispatch(gridActions.updateGridHeight(height + diff));
  };

  console.log(grid);

  return (
    <div className="App">
      <LoadingScreen isOpen={false} />
      <h1>Daniel Yang Hansen</h1>
      <div className="card">
        <button
          onClick={() => {
            addToGridHeight(1);
          }}
        >
          increment
        </button>
        <h2>Grid height is {height}</h2>
        <button
          onClick={() => {
            addToGridHeight(-1);
          }}
        >
          decrement
        </button>
      </div>
    </div>
  );
};

export default App;
