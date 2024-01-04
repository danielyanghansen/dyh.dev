export type {
  SlimeGridInfo,
  Pheromone,
  SlimeParticle,
  SlimeScanCone,
} from './types';
export { SlimeType } from './types';

export {
  updateAllParticles,
  decayPheromones,
  updateWorld,
} from './calculations';
