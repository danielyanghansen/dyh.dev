// We start off placing our "slime" in a world.
// The world has a width and a height, and is a 2D world.
// This world can be populated with "slime pheromones", which decay over time.
// The slime is probibalistically attracted to the pheromones.
// The slime can also leave pheromones behind.
// The slime can also move semi-randomly.
// The pheromones decay over time.

// We start with defining our slime types

/**
 * SlimeType is an enum that defines the different types of slime
 * Has a single property, color, which is a hex string
 */
export enum SlimeType {
  Teal = '#00b2b2',
  Magenta = '#ff00ff',
  White = '#ffffff',
}

/**
 * For simplicity, we make the pheromone count go down by 1 every time step
 */
export interface Pheromone {
  count: number;
  type: SlimeType;
  coords: {
    x: number;
    y: number;
  };
}

/**
 * SlimeGridInfo is a type that defines the grid that the slime lives in
 * width: the width of the grid
 * height: the height of the grid
 * pheromones: an array of pheromones that are currently in the grid. These are expected to decay over time
 */
export interface SlimeGridInfo {
  width: number;
  height: number;
  pheromones: Pheromone[];
}

/**
 * SlimeScanCone is a type that defines a cone that the slime can "smell" in.
 * So far this is "universal" for all slime types.
 * radius: the distance from the slime that the cone extends to
 * includedAgnle, the angle of the cone, wall-to-wall, in radians
 */
export interface SlimeScanCone {
  radius: number;
  includedAngle: number;
}

export interface SlimeParticle {
  coords: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  type: SlimeType;
}
