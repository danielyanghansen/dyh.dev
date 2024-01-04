import { GridOrganization, type GridInfo2D } from '@/types/grid';
import type { NoiseFunctor } from './types';

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
          x,
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
