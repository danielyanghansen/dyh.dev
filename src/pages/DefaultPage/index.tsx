import React from 'react';

import { useDispatch, useSelector, useStore } from 'react-redux';

import LoadingScreen from '@/components/loadingScreen';
import { actions, selectGrid } from '@/store.ts';

import './DefaultPage.css';

const App: React.FC = () => {
  const grid = useSelector(selectGrid);
  const height = grid.gridHeight;

  const store = useStore();
  const state = store.getState();
  const dispatch = useDispatch();

  return (
    <div className="App">
      <LoadingScreen isOpen={true} />
      <h1>Daniel Yang Hansen</h1>
      <div className="card">
        <button onClick={() => dispatch(actions.updateGridHeight(height + 1))}>
          increment
        </button>
        <h2>Grid heigh is {height}</h2>
        <button onClick={() => dispatch(actions.updateGridHeight(height - 1))}>
          decrement
        </button>
      </div>
    </div>
  );
};

export default App;
