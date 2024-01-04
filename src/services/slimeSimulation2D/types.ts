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
export type Pheromone = {
  count: number;
  type: SlimeType;
  coords: {
    x: number;
    y: number;
  };
};

/**
 *
 */
export type SlimeGridInfo = {
  width: number;
  height: number;
  pheromones: Pheromone[];
};

export type SlimeParticle = {
  coords: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  type: SlimeType;
};
