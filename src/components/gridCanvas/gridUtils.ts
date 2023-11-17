import {
  createNoiseFunctor,
  DEFAULT_EXTRA_OCTAVES,
} from '@/utils/terrainGeneration';
import * as THREE from 'three';

export const gridInfo = {
  // Keep the ration 1 to 1 for now
  size: 16,
  divisions: 48,
};

export const sideLengthUnit = gridInfo.size / gridInfo.divisions;

export const offset = gridInfo.size / 2; //(gridInfo.size* ratio - ratio) / 2;

export type BlockVariant =
  | 'dirtBlock'
  | 'dirtSlab'
  | 'grassBlock'
  | 'grassSlab'
  | 'stoneBlock'
  | 'stoneSlab'
  | 'waterBlock'
  | 'waterSlab';

export type CellProps = {
  coords: THREE.Vector2;
  blockStack: Array<BlockVariant>;
};

export const noiseFunctor = createNoiseFunctor({
  redistribution: 4,
  baseOctave: {
    frequency: 2,
    weight: 4,
  },
  extraOctaves: DEFAULT_EXTRA_OCTAVES,
});

//TODO: Make this a generator, fix code smell, and make the signature GridInfo2D<number> => (Array<CellProps> | GridInfo2D<Array<BlockVariant>>)  (or something like that)
export const fillMap = (map: Array<CellProps>): void => {
  for (let xIndex = 0; xIndex < gridInfo.divisions; xIndex++) {
    for (let zIndex = 0; zIndex < gridInfo.divisions; zIndex++) {
      const x = xIndex * sideLengthUnit - offset + sideLengthUnit / 2;
      const z = zIndex * sideLengthUnit - offset + sideLengthUnit / 2;

      const noiseProps = {
        coords: {
          x,
          z,
        },
        maxValues: {
          x: gridInfo.divisions,
          z: gridInfo.divisions,
        },
      };
      const noise = noiseFunctor(noiseProps);

      const blockStack: Array<BlockVariant> = [];

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
        blockStack: blockStack,
      });
    }
  }
};
