import {
  CreateThreeScene,
  ThreeCameraConfig,
  ThreeSceneActions,
} from '@/types';
import * as THREE from 'three';

export const createBoxScene: CreateThreeScene = (config) => {
  // ============================================================================================
  // CONFIG
  // ============================================================================================
  const cameraConfig: ThreeCameraConfig =
    {
      configParams: {
        fov: 75,
        near: 0.1,
        far: 1000,
      },
      position: new THREE.Vector3(5, 5, 5),
      lookAt: new THREE.Vector3(0, 0, 0),
    } || config.camera;

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
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  materialObjects.push(material);

  // ==================== 3D OBJECTS ====================

  const cube = new THREE.Mesh(geometry, material);
  meshObjects.push(cube);

  // ==================== LIGHTS ====================
  // ... TODO

  // ============================================================================================
  // Functions
  // ============================================================================================
  const populateScene = (scene: THREE.Scene): boolean => {
    meshObjects.forEach((mesh) => scene.add(mesh));

    return true;
  };

  const getCameraConfig = () => {
    return cameraConfig;
  };

  const animateFrame = (t_ms?: number) => {
    return;
  };

  const dispose = () => {
    meshObjects.forEach((mesh) => mesh.geometry.dispose());
    geometryObjects.forEach((geometry) => geometry.dispose());
    materialObjects.forEach((material) => material.dispose());
    return;
  };

  const returnActions: ThreeSceneActions = {
    populateScene,
    animateFrame,
    dispose,
    getCameraConfig,
  };

  return returnActions;
};
