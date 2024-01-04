// We start off placing our "slime" in a world.
// The world has a width and a height, and is a 2D grid.
// Each cell in the grid can posess a scalar amount "pheromones" that attract the slime.
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

export type PheromoneCell = {
  [key in SlimeType]: number;
};

export type PheromoneGrid2D = {
  width: number;
  height: number;
  grid: PheromoneCell[][];
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
