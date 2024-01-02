export interface NoiseFunctorInput {
  coords: {
    x: number;
    z: number;
  };
  maxValues?: {
    x: number;
    z: number;
  };
}

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

export type NoiseFunctorGenerator = (noiseParams: NoiseParams) => NoiseFunctor;

export interface OctaveParams {
  frequency: number;
  weight: number;
}

export interface NoiseParams {
  redistribution: number;
  baseOctave: OctaveParams;
  randomSeed?: number;
  extraOctaves?: OctaveParams[];
}
