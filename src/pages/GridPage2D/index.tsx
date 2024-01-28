import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

import txGrass from '@/assets/TX_Tileset_Grass.png';
import txStoneGround from '@/assets/TX_Tileset_Stone_Ground.png';

/**
 * AtlasInfo: Info about a texture atlas. Note: We expect each tile in the atlas to be square.
 * @property name - name of the atlas
 * @property url - url of the atlas
 * @property widthInTiles - number of tiles in the atlas in the x direction
 * @property heightInTiles - number of tiles in the atlas in the y direction
 * @property tileStride - the pixel width/height of each tile. We expect each tile to be square.
 */
interface AtlasInfo {
  name: string;
  url: string;
  widthInTiles: number;
  heightInTiles: number;
  tileStride: number;
}

const atlases: AtlasInfo[] = [
  {
    name: 'TX_Tileset_Grass',
    url: txGrass,
    widthInTiles: 8,
    heightInTiles: 8,
    tileStride: 32,
  },
  {
    name: 'TX_Tileset_Stone_Ground',
    url: txStoneGround,
    widthInTiles: 8,
    heightInTiles: 8,
    tileStride: 32,
  },
];

const SingleAtlasDisplay: React.FC<
AtlasInfo & { scale?: number; selectedTile?: { x: number; y: number } }
> = ({
  // name,
  url,
  widthInTiles,
  heightInTiles,
  tileStride,
  scale = 1,
  selectedTile,
}) => {
  const w = widthInTiles * tileStride * scale;
  const h = heightInTiles * tileStride * scale;
  const sections = [];
  for (let i = 0; i < heightInTiles; i++) {
    for (let j = 0; j < widthInTiles; j++) {
      sections.push(
        <Box
          sx={{
            width: `${tileStride * scale}px`,
            height: `${tileStride * scale}px`,
            backgroundImage: `url(${url})`,
            backgroundPosition: `-${j * tileStride * scale}px -${
              i * tileStride * scale
            }px`,
            backgroundSize: `${w}px ${h}px`,

            border:
              selectedTile?.x === i && selectedTile?.y === j
                ? '2px solid red'
                : 'none',
            zIndex: selectedTile?.x === i && selectedTile?.y === j ? 1 : 0,
          }}
        />,
      );
    }
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${widthInTiles}, ${tileStride * scale}px)`,
        gridTemplateRows: `repeat(${heightInTiles}, ${tileStride * scale}px)`,
        gap: '1px',
        backgroundColor: 'rgba(144, 175, 175, 0.75)',
      }}
      className="gridAtlas"
    >
      {sections}
    </Box>
  );
};

interface AtlasDisplaysProps {
  atlases: AtlasInfo[];
}

const AtlasDisplays: React.FC<AtlasDisplaysProps> = ({ atlases }) => {
  return (
    <Box>
      {atlases.map((atlas) => {
        const props = {
          ...atlas,
          scale: 1,
          selectedTile: { x: 0, y: 0 },
        };
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid rgba(144, 175, 175, 0.75)',
            }}
          >
            <Typography variant="h4">{atlas.name}</Typography>
            <SingleAtlasDisplay {...props} />
          </Box>
        );
      })}
    </Box>
  );
};

const GridPage2D: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">GridPage2D</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2">RandomGrid</Typography>
          <RandomGrid sideLengthInPixels={50} numCols={16} numRows={12} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2">Atlases</Typography>
          <AtlasDisplays atlases={atlases} />
        </Box>
      </Box>
    </Box>
  );
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

interface RandomGridProps {
  sideLengthInPixels: number;
  numRows: number;
  numCols: number;
  disableGridLines?: boolean;
  overrideSideLength?: string;
  retrieveSelectedTile?: () => void;
}

const RandomGrid: React.FC<RandomGridProps> = ({
  sideLengthInPixels,
  numCols,
  numRows,
  disableGridLines = false,
  overrideSideLength,
  retrieveSelectedTile,
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
  retrieveSelectedTile?: () => void,
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
    ></div>
  );
};

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
