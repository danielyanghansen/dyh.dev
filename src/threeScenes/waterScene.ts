import {
  CreateThreeScene,
  ThreeCameraConfig,
  ThreeSceneActions,
} from '@/types/three';
import * as THREE from 'three';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const createWaterScene: CreateThreeScene = (config) => {
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
      position: new THREE.Vector3(50, 50, 5),
      lookAt: new THREE.Vector3(0, 0, 0),
    } || config.camera;

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
  const boxGeometry = new THREE.BoxGeometry();
  const islandMainChunkGeometry = new THREE.BoxGeometry(5, 1, 7);
  const geometries = [
    islandMainChunkGeometry,
    islandMainChunkGeometry.clone().translate(0, 0, 7),
    islandMainChunkGeometry.clone().translate(5, 0, 7),
    islandMainChunkGeometry.clone().translate(5, 0, 14),
    boxGeometry,
    boxGeometry.clone().translate(3, 0, 3),

    boxGeometry.clone().translate(3, 0, 2),

    boxGeometry.clone().translate(3, 0, 1),
    boxGeometry.clone().translate(4, 0, 3),
  ];

  const islandGeometry = BufferGeometryUtils.mergeGeometries(geometries);

  geometries.forEach((geometry) => geometry.dispose());

  const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x23e553 });

  const largePlaneGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
  largePlaneGeometry.rotateX(-Math.PI / 2);
  const waterSurfaceMaterial = new THREE.MeshToonMaterial({
    color: 0x30d8ff,
    transparent: true,
    opacity: 0.6,
  });

  geometryObjects.push(islandGeometry, largePlaneGeometry);
  materialObjects.push(grassMaterial, waterSurfaceMaterial);

  // ==================== 3D OBJECTS ====================

  const island = new THREE.Mesh(islandGeometry, grassMaterial);
  const waterSurface = new THREE.Mesh(largePlaneGeometry, waterSurfaceMaterial);

  meshObjects.push(island, waterSurface);

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
    lightObjects.forEach((light) => light.dispose());
    gridHelper.dispose();
    axesHelper.dispose();
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
