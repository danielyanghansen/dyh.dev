import { noiseFunctor, noiseParams } from '@/utils/terrainGeneration';
import * as THREE from 'three';

export const gridInfo = {
  // Keep the ration 1 to 1 for now
  size: 10,
  divisions: 30,
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

export const fillMap = (map: Array<CellProps>): void => {
  for (let xIndex = 0; xIndex < gridInfo.divisions; xIndex++) {
    for (let zIndex = 0; zIndex < gridInfo.divisions; zIndex++) {
      const x = xIndex * sideLengthUnit - offset + sideLengthUnit / 2;
      const z = zIndex * sideLengthUnit - offset + sideLengthUnit / 2;
      const noiseProps: noiseParams = {
        coords: { x, z },
        optionalParams: {
          frequency: 500,
          redistribution: 50, // needs to be an even number to avoid NaN
          extraOctaves: [
            {
              frequency: 0.005,
              redistribution: 2,
            },
            {
              frequency: 0.0025,
              redistribution: 4,
            },
            {
              frequency: 0.00125,
              redistribution: 8,
            },
          ],
        },
      };
      const noise = noiseFunctor(noiseProps);

      const blockStack: Array<BlockVariant> = [];

      // Set up initial block stack
      if (noise <= 0.1) {
        blockStack.push('waterSlab');
      }
      if (noise > 0.1) {
        blockStack.push('stoneBlock');
      }
      if (noise > 0.4) {
        blockStack.push('stoneBlock');
      }
      if (noise > 0.6) {
        blockStack.push('grassBlock');
      }
      if (noise > 0.9) {
        blockStack.push('dirtBlock');
      }
      if (noise > 1.2) {
        blockStack.push('grassBlock');
      }
      if (noise > 1.6) {
        blockStack.push('grassBlock');
      }
      if (noise > 2.1) {
        blockStack.push('grassBlock');
      }
      if (noise > 2.6) {
        blockStack.push('grassBlock');
      }
      if (noise > 3.3) {
        blockStack.push('stoneBlock');
      }
      if (noise > 5) {
        blockStack.push('stoneBlock');
      }

      // Add slabs
      if (noise % 0.1 > 0.05) {
        switch (blockStack[-1]) {
          case 'dirtBlock':
          case 'grassBlock':
            blockStack.push('grassSlab');
            break;
          case 'stoneBlock':
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
