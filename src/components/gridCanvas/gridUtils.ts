import { noiseFunctor, NoiseParams } from '@/utils/terrainGeneration';
import * as THREE from 'three';

export const gridInfo = {
  // Keep the ration 1 to 1 for now
  size: 10,
  divisions: 50,
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
      const noiseProps: NoiseParams = {
        coords: { x, z },
        maxValues: { x: gridInfo.divisions, z: gridInfo.divisions},
        optionalParams: {
          frequency: 500,
          redistribution: 2, // needs to be an even number to avoid NaN
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

      if (noise < 0.1) {
        blockStack.push('waterBlock');
      } else {
        blockStack.push('grassBlock');
      }
      if (noise > 0.3) {
        blockStack.push('grassSlab');
      } else if (noise > 0.2) {
        blockStack.push('stoneSlab');
      }
      if (noise > 0.4) {
        blockStack.push('stoneSlab');
      }
      if (noise > 0.6) {
        blockStack.push('grassSlab');
      }
      if (noise > 0.8) {
        blockStack.push('dirtSlab');
      }
      if (noise > 1.0) {
        blockStack.push('grassSlab');
      }
      if (noise > 1.2) {
        blockStack.push('grassSlab');
      }
      if (noise > 1.4) {
        blockStack.push('grassSlab');
      }
      if (noise > 1.6) {
        blockStack.push('grassSlab');
      }
      if (noise > 1.8) {
        blockStack.push('stoneSlab');
      }
      if (noise > 2.0) {
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
