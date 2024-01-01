import type { GridInfo2D } from '@/types/grid';
import { compose } from 'redux';
import { createNoise2D } from 'simplex-noise';
import { seededRandom } from 'three/src/math/MathUtils.js';
import type {
  NoiseFunctor,
  NoiseFunctorGenerator,
  NoiseFunctorInput,
  NoiseParams,
  OctaveParams,
} from '@/types/terrainGeneration';

export const DEFAULT_EXTRA_OCTAVES: OctaveParams[] = [
  {
    frequency: 2,
    weight: 0.5,
  },
  {
    frequency: 4,
    weight: 0.25,
  },
];

export const createNoiseFunctor: NoiseFunctorGenerator = (
  noiseParams: NoiseParams,
) => {
  const { redistribution, baseOctave, randomSeed, extraOctaves } = noiseParams;

  const noise2D = randomSeed
    ? createNoise2D(() => seededRandom(randomSeed))
    : createNoise2D();
  // Transform noise output domain from [-1, 1] to [0, 1]
  const transformNoiseDomain = (noise: number): number => (noise + 1) / 2;

  // Everything that requires nx and nz should be done here
  const createNoiseCombinedOctaves = (input: NoiseFunctorInput): number => {
    const { coords, maxValues } = input;
    // Something weird here, might wanna look at wavelengths
    const nx = coords.x / (maxValues?.x ?? 1) - 0.5;
    const nz = coords.z / (maxValues?.z ?? 1) - 0.5;

    // wavelength = maxValue / frequency (per dimension? not sure)
    // actualNoise should be noise2D(x / wavelength, z / wavelength));

    const allOctaves = [baseOctave, ...(extraOctaves ?? [])];

    const sumWeights = allOctaves.reduce((acc, curr) => acc + curr.weight, 0);
    const sumOctaves = allOctaves.reduce(
      (acc, curr) =>
        acc + noise2D(nx * curr.frequency, nz * curr.frequency) * curr.weight,
      0,
    );

    return sumOctaves / sumWeights;
  };

  // Also known as redistribution
  const curveNoise = (noise: number): number => {
    return Math.pow(noise, redistribution);
  };

  // Compose functions from right to left / bottom to top
  const finalFunc: NoiseFunctor = compose(
    curveNoise,
    transformNoiseDomain,
    createNoiseCombinedOctaves,
  );

  return finalFunc;
};

export const createNoiseGrid = (
  gridInfo: GridInfo2D<any>,
): GridInfo2D<number> => {
  return {
    ...gridInfo,
  };
};
