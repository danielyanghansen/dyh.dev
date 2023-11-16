import { createNoise2D, createNoise3D } from 'simplex-noise';
import { seededRandom } from 'three/src/math/MathUtils';

export type NoiseParams = {
  coords: {
    x: number;
    z: number;
  };
  maxValues?: {
    x: number;
    z: number;
  };
  optionalParams?: {
    redistribution?: number;
    frequency?: number;
    randomSeed?: number;
    extraOctaves?: {
      frequency: number;
      redistribution: number;
    }[];
  };
};

/**
 * Note: Uses x and z coordinates in name only. This is to make it easier to use 2D noise functions generate 3D terrain.
 * @param noiseParams
 * @returns a noise value between -1 and 1
 */
export const noiseFunctor = (noiseParams: NoiseParams) => {
  const { coords, optionalParams } = noiseParams;
  const noise2D = createNoise2D(() => seededRandom(optionalParams?.randomSeed));
  const frequency = optionalParams?.frequency ?? 1;

  const baseNoise = noise2D(frequency * coords.x, frequency * coords.z);

  const curvedBase = Math.pow(baseNoise, optionalParams?.redistribution ?? 1);

  const extraNoise = optionalParams?.extraOctaves?.reduce(
    (acc, curr) =>
      acc +
      noise2D(coords.x * curr.frequency, coords.z * curr.frequency) *
        curr.redistribution,
    0,
  );

  const totalNoise = curvedBase + (extraNoise ?? 0);

  const scaled = totalNoise;

  return scaled;
};
