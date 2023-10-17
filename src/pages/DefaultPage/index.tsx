import './DefaultPage.css';
import { useDispatch, useSelector, useStore } from 'react-redux'
import { actions, reducer, selectGrid } from '../../store.ts';
import LoadingScreen from '../../components/loadingScreen';

const App = () => {
  const grid = useSelector(selectGrid);
  const height = grid.gridHeight;

  const store = useStore();
  const state = store.getState();
  const dispatch = useDispatch();

  return (
    <div className="App">
      <LoadingScreen isOpen={true}/>
      <h1>Daniel Yang Hansen</h1>
      <div className="card">
        <button onClick={() => 
          dispatch(actions.updateGridHeight(height + 1))
        }>
          increment
        </button>
        <h2>
          Grid heigh is {height}
        </h2>
        <button onClick={() => dispatch(actions.updateGridHeight(height - 1))}>
          decrement
        </button>
      </div>

    </div>
  )
}

export default App
