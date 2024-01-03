import { createNoiseFunctor } from './terrainGeneration';
import { OctaveParams } from './types';

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

export const DEFAULT_NOISE_FUNCTOR = createNoiseFunctor({
  redistribution: 4,
  baseOctave: {
    frequency: 2,
    weight: 4,
  },
  extraOctaves: DEFAULT_EXTRA_OCTAVES,
});
