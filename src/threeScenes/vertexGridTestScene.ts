import { createVertexGrid } from '@/utils/vertexGridPrefab';
import * as THREE from 'three';

import type {
  CreateThreeScene,
  ThreeCameraConfig,
  ThreeSceneActions,
} from '@/types/three';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const createWaterScene: CreateThreeScene = (config) => {
  // ============================================================================================
  // CONFIG
  // ============================================================================================
  const cameraConfig: ThreeCameraConfig = config.camera ?? {
    configParams: {
      fov: 75,
      near: 0.1,
      far: 1000,
    },
    position: new THREE.Vector3(50, 50, 5),
    lookAt: new THREE.Vector3(0, 0, 0),
  };

  // ============================================================================================
  // Disposable asset arrays
  // ============================================================================================

  const meshObjects: THREE.Mesh[] = [];
  const geometryObjects: THREE.BufferGeometry[] = [];
  const materialObjects: THREE.Material[] = [];
  const lightObjects: THREE.Light[] = [];

  // ============================================================================================
  // Asset creation
  // ============================================================================================

  // =============== GEOMETRY AND MATERIALS =================

  // ==================== 3D OBJECTS ====================

  // ==================== HELPERS ====================
  const gridHelper = new THREE.GridHelper(100, 100);
  gridHelper.material.opacity = 0.75;
  gridHelper.material.transparent = true;
  gridHelper.position.x = -0.5;
  gridHelper.position.z = -0.5;
  gridHelper.position.y = 0.1;
  const axesHelper = new THREE.AxesHelper(15);
  axesHelper.position.x = -0.5;
  axesHelper.position.z = -0.5;
  axesHelper.position.y = 0.5;

  // ==================== LIGHTS ====================
  // ... TODO
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  const ambientLight = new THREE.AmbientLight(0xccefff, 0.2);

  lightObjects.push(light, ambientLight);

  // ============================================================================================
  // Functions
  // ============================================================================================
  const populateScene = (scene: THREE.Scene): boolean => {
    meshObjects.forEach((mesh) => scene.add(mesh));
    lightObjects.forEach((light) => scene.add(light));

    scene.add(gridHelper, axesHelper);

    scene.background = new THREE.Color(0xb0eeff); // dark blue

    return true;
  };

  const getCameraConfig = (): ThreeCameraConfig => {
    return cameraConfig;
  };

  /**
   *
   * @param t - time in milliseconds
   * @returns
   */
  const animateFrame = (t?: number): void => {
    // TODO: Implement animation
    console.log('Animating frame at time: ', t);
  };

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
    lightObjects.forEach((light) => {
      light.dispose();
    });
    gridHelper.dispose();
    axesHelper.dispose();
  };

  const returnActions: ThreeSceneActions = {
    populateScene,
    animateFrame,
    dispose,
    getCameraConfig,
  };

  return returnActions;
};
