import { type Vector2 } from 'three';

export const calculateDistance = (source: Vector2, target: Vector2): number => {
  return Math.sqrt(
    Math.pow(source.x - target.x, 2) + Math.pow(source.y - target.y, 2),
  );
};

export const calculateAngle = (source: Vector2, target: Vector2): number => {
  return Math.atan2(target.y - source.y, target.x - source.x);
};

export const getAngleFromVelocity = (velocity: Vector2): number => {
  return Math.atan2(velocity.y, velocity.x);
};
