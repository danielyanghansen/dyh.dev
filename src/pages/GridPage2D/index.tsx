import { Box } from '@mui/material';
import React, { useState } from 'react';

const GridPage2D: React.FC = () => {
  return <RandomGrid sideLengthInPixels={50} numCols={16} numRows={12} />;
};

export default GridPage2D;

const gridProps: {
  sideLength: string;
  numRows: number;
  numCols: number;
} = {
  sideLength: '50px',
  numRows: 16,
  numCols: 4,
};

type RandomGridProps = {
  sideLengthInPixels: number;
  numRows: number;
  numCols: number;
  disableGridLines?: boolean;
  overrideSideLength?: string;
};

const RandomGrid: React.FC<RandomGridProps> = ({
  sideLengthInPixels,
  numCols,
  numRows,
  disableGridLines = false,
  overrideSideLength,
}) => {
  const sideLength = overrideSideLength ?? `${sideLengthInPixels}px`;

  const grid = [];

  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      // create random color node
      row.push(Node(randomColor(), disableGridLines, sideLength));
    }
    grid.push(row);
  }

  return (
    <div
      className="grid"
      style={{
        textAlign: 'center',
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, ${sideLength})`,
      }}
    >
      {grid.map((row, i) => {
        return (
          <div key={i}>
            {row.map((node, j) => {
              return <div key={j}>{node}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

const Node = (
  initialColor: string,
  disableGridLines: boolean,
  sideLength: string,
) => {
  const [color, setColor] = useState(initialColor);
  const onClick = () => {
    setColor(randomColor());
  };

  return (
    <div
      style={{
        backgroundColor: color,
        width: sideLength,
        height: sideLength,
        outline: disableGridLines
          ? 'none'
          : '1px solid rgba(144, 175, 175, 0.75)',
      }}
      className="node"
      onClick={onClick}
    />
  );
};

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
