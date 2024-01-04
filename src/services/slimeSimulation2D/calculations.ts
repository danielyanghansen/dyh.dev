import type { Pheromone, SlimeGridInfo, SlimeParticle } from './types';
import { SlimeType } from './types';

const DEFAULT_PHEROMONE_PRODUCTION_RATE = 3;
const DEFAULT_PHEROMONE_DECAY_RATE = 1;

// We are always working with an array of slime particles

// We need to be able to update the slime particles

/**
 * Very simple function to update the slime particles based on its current velocity
 * @param particle The slime particle to update
 */
const updateParticlePosition = (particle: SlimeParticle): void => {
  particle.coords.x += particle.velocity.x;
  particle.coords.y += particle.velocity.y;
};

/**
 * Function to update the velocity of a slime particle. For world edges, we will just bounce off
 * When it comes to "smelling" pheromones, we only scan within a blocky cone in the direction of the velocity
 * @param particle The slime particle to update the velocity of
 * @param pheromoneGrid The pheromone grid to use to update the velocity
 */
const updateParticleVelocity = (
  particle: SlimeParticle,
  pheromoneGrid: SlimeGridInfo,
): void => {
  // Read grid. To get pheromone values for going front, left, or right.
  const { coords, velocity, type } = particle;

  // Need to be within bounds

  // Calculate acceleration based on pheromone grid and some randomness

  // If we are at the edge of the world, bounce off by inverting the velocity
};

const layPheromone = (
  particle: SlimeParticle,
  pheromoneGrid: SlimeGridInfo,
): void => {
  const { coords, type } = particle;
  const { x, y } = coords;

  // Need to be within bounds
  if (x < 0 || x >= pheromoneGrid.width || y < 0 || y >= pheromoneGrid.height) {
    return;
  }

  const newPheromone: Pheromone = {
    count: DEFAULT_PHEROMONE_PRODUCTION_RATE,
    type,
    coords: {
      x,
      y,
    },
  };

  pheromoneGrid.pheromones.push(newPheromone);
};

export const updateAllParticles = (
  particles: SlimeParticle[],
  pheromoneGrid: SlimeGridInfo,
): void => {
  particles.forEach((particle) => {
    updateParticleVelocity(particle, pheromoneGrid); // This will update the velocity
    updateParticlePosition(particle); // This will update the position
    layPheromone(particle, pheromoneGrid); // This will lay pheromone into the grid
  });
};

export const decayPheromones = (pheromoneGrid: SlimeGridInfo): void => {
  pheromoneGrid.pheromones = pheromoneGrid.pheromones
    .map((pheromone) => {
      pheromone.count -= DEFAULT_PHEROMONE_DECAY_RATE;
      return pheromone;
    })
    .filter((pheromone) => pheromone.count > 0);
};

export const updateWorld = (
  particles: SlimeParticle[],
  pheromoneGrid: SlimeGridInfo,
): void => {
  updateAllParticles(particles, pheromoneGrid);
  decayPheromones(pheromoneGrid);
};
