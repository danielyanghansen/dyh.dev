import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { noiseFunctor, noiseParams } from '@/utils/terrainGeneration';
import {
  gridInfo,
  sideLengthUnit,
  offset,
  fillMap,
  type BlockVariant,
  type CellProps,
} from './gridUtils';

const cameraDefaultPosition = new THREE.Vector3(10, 10, 10);
const directionalLightPosition = new THREE.Vector3(20, -20, 20);

const map: Array<CellProps> = [];
const gridHelper = new THREE.GridHelper(gridInfo.size, gridInfo.divisions);

const block = new THREE.BoxGeometry(
  1 * sideLengthUnit,
  1 * sideLengthUnit,
  1 * sideLengthUnit,
);
const slab = new THREE.BoxGeometry(
  1 * sideLengthUnit,
  0.5 * sideLengthUnit,
  1 * sideLengthUnit,
);

const unitBlock = new THREE.BoxGeometry(1, 1, 1);

const dirtBlockMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
const grassBlockMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const stoneBlockMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
const waterBlockMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });

const dirtSlab = new THREE.Mesh(slab, dirtBlockMaterial);
const grassSlab = new THREE.Mesh(slab, grassBlockMaterial);
const stoneSlab = new THREE.Mesh(slab, stoneBlockMaterial);
const waterSlab = new THREE.Mesh(slab, waterBlockMaterial);

const dirtBlock = new THREE.Mesh(block, dirtBlockMaterial);
const grassBlock = new THREE.Mesh(block, grassBlockMaterial);
const stoneBlock = new THREE.Mesh(block, stoneBlockMaterial);
const waterBlock = new THREE.Mesh(block, waterBlockMaterial);

let disposeRandomBlock: () => void;

const populate = (scene: THREE.Scene, map: Array<CellProps>) => {
  map.forEach((cell) => {
    const cellX = cell.coords.x;
    const cellY = cell.coords.y;
    let heightLikeY = sideLengthUnit / 2;

    cell.blockStack.forEach((blockVariant) => {
      switch (blockVariant) {
        case 'dirtSlab':
        case 'grassSlab':
        case 'stoneSlab':
        case 'waterSlab':
          heightLikeY += 0.25 * sideLengthUnit;
          break;
        default:
          break;
      }
      switch (blockVariant) {
        case 'dirtBlock':
          const dirtBlockClone = dirtBlock.clone();
          dirtBlockClone.position.set(cellX, heightLikeY, cellY);
          scene.add(dirtBlockClone);
          break;
        case 'grassBlock':
          const grassBlockClone = grassBlock.clone();
          grassBlockClone.position.set(cellX, heightLikeY, cellY);
          scene.add(grassBlockClone);
          break;
        case 'stoneBlock':
          const stoneBlockClone = stoneBlock.clone();
          stoneBlockClone.position.set(cellX, heightLikeY, cellY);
          scene.add(stoneBlockClone);
          break;
        case 'waterBlock':
          const waterBlockClone = waterBlock.clone();
          waterBlockClone.position.set(cellX, heightLikeY, cellY);
          scene.add(waterBlockClone);
          break;
        case 'dirtSlab':
          const dirtSlabClone = dirtSlab.clone();
          dirtSlabClone.position.set(cellX, heightLikeY, cellY);
          scene.add(dirtSlabClone);
          break;
        case 'grassSlab':
          const grassSlabClone = grassSlab.clone();
          grassSlabClone.position.set(cellX, heightLikeY, cellY);
          scene.add(grassSlabClone);
          break;
        case 'stoneSlab':
          const stoneSlabClone = stoneSlab.clone();
          stoneSlabClone.position.set(cellX, heightLikeY, cellY);
          scene.add(stoneSlabClone);
          break;
        case 'waterSlab':
          const waterSlabClone = waterSlab.clone();
          waterSlabClone.position.set(
            cellX,
            heightLikeY - sideLengthUnit / 2,
            cellY,
          );
          scene.add(waterSlabClone);
          break;
      }
      switch (blockVariant) {
        case 'dirtBlock':
        case 'grassBlock':
        case 'stoneBlock':
        case 'waterBlock':
          heightLikeY += sideLengthUnit;
          break;
        case 'dirtSlab':
        case 'grassSlab':
        case 'stoneSlab':
        case 'waterSlab':
          heightLikeY += 0.25 * sideLengthUnit;
          break;
      }
    });
  });
};

//enable shadows
// dirtBlock.castShadow = true;
// grassBlock.castShadow = true;
// stoneBlock.castShadow = true;
// waterBlock.castShadow = true;
// dirtSlab.castShadow = true;
// grassSlab.castShadow = true;
// stoneSlab.castShadow = true;
// waterSlab.castShadow = true;

export const GridCanvas: React.FC = () => {
  const disposals: Array<() => void> = [];
  const disposeAll = (): void => {
    disposals.forEach((d) => {
      d();
    });
    disposals.length = 0; // Maybe reassign to empty array with let binding?
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef?.current != null) {
      // ============================================================================================
      // Configure Camera, Scene, OrbitControls and Renderer
      // ============================================================================================
      const canvas = canvasRef.current;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000,
      );
      camera.position.copy(cameraDefaultPosition);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        depth: true,
        preserveDrawingBuffer: true,
      });

      renderer.setClearColor('white');
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      // renderer.shadowMap.enabled = true;
      // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default

      const controls = new OrbitControls(camera, renderer.domElement);

      // Scene Cleanup Helper
      const clearScene = (): void => {
        console.log('clearScene called');
        while (scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }
      };
      disposals.push(clearScene);

      // ============================================================================================
      // Add Lights, shadows, fog, and background
      // ============================================================================================

      const light = new THREE.DirectionalLight(0xffffff, 0.8);
      light.position.copy(directionalLightPosition);
      light.castShadow = true;
      const ambientLight = new THREE.AmbientLight(0xaaaaff, 0.8);

      const lanternPointLight = new THREE.PointLight(0xefc070, 100, 100);
      lanternPointLight.position.set(0, 8, 0);

      const addLights = (): void => {
        scene.add(light, ambientLight, lanternPointLight);
      };
      addLights();
      disposals.push(
        light.dispose,
        ambientLight.dispose,
        lanternPointLight.dispose,
      );

      scene.fog = new THREE.Fog(0x000000, 1, 1000);
      scene.background = new THREE.Color(0xaaccff);

      // ============================================================================================
      // Add Objects
      // ============================================================================================
      fillMap(map);
      populate(scene, map);

      scene.add(gridHelper);

      //Might want to make this disposal outside of useEffect to avoid attempting to dispose of undefined
      disposals.push(gridHelper.dispose);

      // BEEEEG Populate the map

      // ============================================================================================
      // Helpers and Dispose
      // ============================================================================================

      disposals.push(controls.dispose);
      disposals.push(renderer.dispose);

      // ============================================================================================
      // Animate
      // ============================================================================================

      let t = 0;
      const animate = (): void => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        t++;
      };
      animate();
    }
  }, [canvasRef.current]);

  // useEffect(() => {
  //   return () => {
  //     if (location.pathname !== '/model') {
  //       console.log('dispose called');
  //       disposeAll();
  //     }
  //   };
  // }, [location]);

  return (
    <div>
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
};
