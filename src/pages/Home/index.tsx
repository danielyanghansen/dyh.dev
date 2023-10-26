import React, { useState } from 'react';

const Home: React.FC = () => {
  const [numberState, setNumberState] = useState(5);
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          setNumberState(numberState + 1);
        }}
      >
        Increment
      </button>
      <h2>{numberState}</h2>
    </div>
  );
};

export default Home;
