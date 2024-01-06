import {
  calculateAngle,
  calculateDistance,
  getAngleFromVelocity,
} from './trigonometry';
import type {
  Pheromone,
  SlimeGridInfo,
  SlimeParticle,
  SlimeScanCone,
} from './types';
import { SlimeType } from './types';

const DEFAULT_PHEROMONE_PRODUCTION_RATE = 3;
const DEFAULT_PHEROMONE_DECAY_RATE = 1;
const DEFAULT_SLIME_SCAN_CONE: SlimeScanCone = {
  radius: 5,
  includedAngle: Math.PI / 4,
};

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

  const relevantPheromones = pheromoneGrid.pheromones.filter((pheromone) => {
    return isInSclimeScaneCone(particle, DEFAULT_SLIME_SCAN_CONE, pheromone);
  });

  // Need to be within bounds

  // Calculate acceleration based on pheromone grid and some randomness

  // If we are at the edge of the world, bounce off by inverting the velocity
};

export const isInSclimeScaneCone = (
  slimeParticle: SlimeParticle,
  cone: SlimeScanCone,
  pheromone: Pheromone,
): boolean => {
  const angleToPheromone = calculateAngle(
    slimeParticle.coords,
    pheromone.coords,
  );

  const velocityAngle = getAngleFromVelocity(slimeParticle.velocity);
  const absAngleDifference = Math.abs(angleToPheromone - velocityAngle);

  const isWithinConeAngle = absAngleDifference <= cone.includedAngle / 2;
  const isWithinRadius =
    calculateDistance(slimeParticle.coords, pheromone.coords) <= cone.radius;

  return isWithinConeAngle && isWithinRadius;
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
    coords,
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
