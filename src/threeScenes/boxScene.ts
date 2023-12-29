import {
  type CreateThreeScene,
  type ThreeCameraConfig,
  type ThreeSceneActions,
} from '@/types/three';
import * as THREE from 'three';

export const createBoxScene: CreateThreeScene = (config) => {
  // ============================================================================================
  // CONFIG
  // ============================================================================================
  const cameraConfig: ThreeCameraConfig = config.camera ?? {
    configParams: {
      fov: 75,
      near: 0.1,
      far: 1000,
    },
    position: new THREE.Vector3(5, 5, 5),
    lookAt: new THREE.Vector3(0, 0, 0),
  };

  // ============================================================================================
  // Disposable asset arrays
  // ============================================================================================

  const meshObjects: THREE.Mesh[] = [];
  const geometryObjects: THREE.BufferGeometry[] = [];
  const materialObjects: THREE.Material[] = [];

  // ============================================================================================
  // Asset creation
  // ============================================================================================

  // =============== GEOMETRY AND MATERIALS =================
  const geometry = new THREE.BoxGeometry();
  geometryObjects.push(geometry);
  const material = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
  materialObjects.push(material);

  // ==================== 3D OBJECTS ====================

  const cube = new THREE.Mesh(geometry, material);
  meshObjects.push(cube);

  // ==================== LIGHTS ====================
  // ... TODO
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  // ============================================================================================
  // Functions
  // ============================================================================================
  const populateScene = (scene: THREE.Scene): boolean => {
    meshObjects.forEach((mesh) => scene.add(mesh));
    scene.background = new THREE.Color(0x000070); // dark blue
    scene.add(light);

    return true;
  };

  const getCameraConfig = (): ThreeCameraConfig => {
    return cameraConfig;
  };

  /**
   *
   * @param t Time in milliseconds
   */
  const animateFrame = (t?: number): void => {};

  const dispose = (): void => {
    meshObjects.forEach((mesh) => {
      mesh.geometry.dispose();
    });
    geometryObjects.forEach((geometry) => {
      geometry.dispose();
    });
    materialObjects.forEach((material) => {
      material.dispose();
    });
    light.dispose();
  };

  const returnActions: ThreeSceneActions = {
    populateScene,
    animateFrame,
    dispose,
    getCameraConfig,
  };

  return returnActions;
};
