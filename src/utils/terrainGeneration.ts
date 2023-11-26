import { GridInfo2D } from '@/types/grid';
import { compose } from 'redux';
import { createNoise2D, createNoise3D } from 'simplex-noise';
import { seededRandom } from 'three/src/math/MathUtils';

export const DEFAULT_EXTRA_OCTAVES: Array<OctaveParams> = [
  {
    frequency: 2,
    weight: 0.5,
  },
  {
    frequency: 4,
    weight: 0.25,
  },
];

export type NoiseFunctorInput = {
  coords: {
    x: number;
    z: number;
  };
  maxValues?: {
    x: number;
    z: number;
  };
};

/**
 * NoiseFunctor is a function that takes in a NoiseFunctorInput and SHOULD return a number between 0 and 1
 * when implemented correctly
 * @param input - NoiseFunctorInput, given in the form of { coords: { x, z }, maxValues: { x, z } }
 * @returns noise number between 0 and 1 (inclusive),
 */
export type NoiseFunctor = (input: NoiseFunctorInput) => number;

/**
 * Creates a NoiseFunctor from NoiseParams
 * @param noiseParams.redistribution - redistribution is the exponent used to curve the noise output
 * @param noiseParams.baseOctave - baseOctave is the base octave of the noise function, including frequency and weight
 * @param noiseParams.randomSeed - if you want to use a specific random seed, you can pass it in here
 * @param noiseParams.extraOctaves - extraOctaves is an array of OctaveParams that will be added to the baseOctave
 * @returns NoiseFunctor
 */
type NoiseFunctorGenerator = (noiseParams: NoiseParams) => NoiseFunctor;

export type OctaveParams = {
  frequency: number;
  weight: number;
};

export type NoiseParams = {
  redistribution: number;
  baseOctave: OctaveParams;
  randomSeed?: number;
  extraOctaves?: Array<OctaveParams>;
};

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
