import { type GridInfo2D, GridOrganization } from '@/types/grid';
import {
  createNoiseFunctor,
  DEFAULT_EXTRA_OCTAVES,
  type NoiseFunctor,
} from '@/utils/terrainGeneration';
import * as THREE from 'three';

export const gridSpecification = {
  // Keep the ration 1 to 1 for now
  size: 16,
  divisions: 32,
};

export const sideLengthUnit =
  gridSpecification.size / gridSpecification.divisions;

export const offset = (gridSpecification.size + sideLengthUnit) / 2; // (gridInfo.size* ratio - ratio) / 2;

export type BlockVariant =
  | 'dirtBlock'
  | 'dirtSlab'
  | 'grassBlock'
  | 'grassSlab'
  | 'stoneBlock'
  | 'stoneSlab'
  | 'waterBlock'
  | 'waterSlab';

export interface CellProps {
  coords: THREE.Vector2;
  blockStack: BlockVariant[];
}

export const noiseFunctor = createNoiseFunctor({
  redistribution: 4,
  baseOctave: {
    frequency: 2,
    weight: 4,
  },
  extraOctaves: DEFAULT_EXTRA_OCTAVES,
});

/**
 *
 * @param height is the number of points in the z (or y) direction
 * @param width is the number of points in the x direction
 * @param resolution is the number of points per unit. 1 is the default. A higher resolution will result in a more detailed map, and feel like a "zoomed in" map
 * @param _noiseFunctor
 */
export const createNoiseGridInfo2D = (
  height: number,
  width: number,
  resolution: number,
  _noiseFunctor: NoiseFunctor,
): GridInfo2D<number> => {
  const grid: number[][] = [];
  // Initialize grid to correct size
  for (let i = 0; i < height; i++) {
    grid[i] = [];
  }

  const localResolution = resolution === 0 ? 1 : resolution;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Note, running x,y from 1 to divisions, not 0 to divisions - 1
      // This is just for convenience, so that the coordinates match the map array
      grid[y][x] = _noiseFunctor({
        coords: {
          x: x,
          z: y,
        },
        maxValues: {
          x: width * localResolution, // Not quite sure about this one
          z: height * localResolution,
        },
      });
    }
  }

  const getElement = (x: number, y: number): number => {
    return grid[y][x];
  };

  const setElement = (x: number, y: number, value: number): void => {
    grid[y][x] = value;
  };

  return {
    metadata: {
      height,
      width,
      organization: GridOrganization.RowMajor,
    },
    grid,
    functions: {
      getElement,
      setElement,
    },
  };
};

// TODO: Make this a generator, fix code smell, and make the signature GridInfo2D<number> => (Array<CellProps> | GridInfo2D<Array<BlockVariant>>)  (or something like that)
export const fillMap = (map: CellProps[]): void => {
  for (let xIndex = 0; xIndex < gridSpecification.divisions; xIndex++) {
    for (let zIndex = 0; zIndex < gridSpecification.divisions; zIndex++) {
      const x = xIndex * sideLengthUnit - offset + sideLengthUnit / 2;
      const z = zIndex * sideLengthUnit - offset + sideLengthUnit / 2;

      const noiseProps = {
        coords: {
          x,
          z,
        },
        maxValues: {
          x: gridSpecification.divisions,
          z: gridSpecification.divisions,
        },
      };
      const noise = noiseFunctor(noiseProps);

      const blockStack: BlockVariant[] = [];

      // Set up initial block stack

      if (noise < -0.9) {
        blockStack.push('waterBlock');
      } else {
        blockStack.push('grassBlock');
      }
      if (noise > -0.7) {
        blockStack.push('grassSlab');
      } else if (noise > 0.2) {
        blockStack.push('stoneSlab');
      }
      if (noise > -0.5) {
        blockStack.push('stoneSlab');
      }
      if (noise > -0.3) {
        blockStack.push('grassSlab');
      }
      if (noise > -0.1) {
        blockStack.push('dirtSlab');
      }
      if (noise > 0.1) {
        blockStack.push('grassSlab');
      }
      if (noise > 0.3) {
        blockStack.push('grassSlab');
      }
      if (noise > 0.5) {
        blockStack.push('grassSlab');
      }
      if (noise > 0.7) {
        blockStack.push('grassSlab');
      }
      if (noise > 0.9) {
        blockStack.push('stoneSlab');
      }
      if (noise > 0.95) {
        blockStack.push('stoneSlab');
      }

      // Add slabs
      if (noise % 0.2 > 0.1) {
        switch (blockStack[-1]) {
          case 'dirtSlab':
          case 'grassSlab':
          case 'dirtBlock':
          case 'grassBlock':
            blockStack.push('grassSlab');
            break;
          case 'stoneBlock':
          case 'stoneSlab':
            blockStack.push('stoneSlab');
            break;
          default:
            break;
        }
      }

      map.push({
        coords: new THREE.Vector2(x, z),
        blockStack,
      });
    }
  }
};
