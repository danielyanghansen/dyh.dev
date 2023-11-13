import { createNoise3D } from 'simplex-noise';

export type noiseParams = {
  coords: {
    x: number;
    z: number;
    yHeight?: number;
  };
  optionalParams?: {
    redistribution?: number;
    frequency?: number;
    extraOctaves?: {
      frequency: number;
      redistribution: number;
    }[];
  };
};

export const noiseFunctor = (noiseParams: noiseParams) => {
  const { coords, optionalParams } = noiseParams;
  const noise3D = createNoise3D();
  const frequency = optionalParams?.frequency ?? 1;

  const baseNoise = noise3D(
    frequency * coords.x,
    frequency * (coords.yHeight ?? 0),
    frequency * coords.z,
  );

  const curvedBase = Math.pow(baseNoise, optionalParams?.redistribution ?? 1);

  const extraNoise = optionalParams?.extraOctaves?.reduce(
    (acc, curr) =>
      acc +
      noise3D(
        coords.x * curr.frequency,
        coords.yHeight ?? 0,
        coords.z * curr.frequency,
      ) *
        curr.redistribution,
    0,
  );

  const totalNoise = curvedBase + (extraNoise ?? 0);

  const scaled = totalNoise;

  return scaled;
};
