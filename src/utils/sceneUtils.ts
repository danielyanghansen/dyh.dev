import type * as THREE from 'three';

export const clearScene = (scene: THREE.Scene): void => {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
};
