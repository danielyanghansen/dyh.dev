import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
  gridInfo,
  sideLengthUnit,
  offset,
  fillMap,
  type CellProps,
  noiseFunctor,
} from './gridUtils';

import '../../shared.css';

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

const dirtBlockMaterial = new THREE.MeshLambertMaterial({ color: 0xe0621f });
const grassBlockMaterial = new THREE.MeshLambertMaterial({ color: 0x86eb23 });
const stoneBlockMaterial = new THREE.MeshLambertMaterial({ color: 0x5c280d });
const waterBlockMaterial = new THREE.MeshToonMaterial({
  color: 0x1f9de0,
  transparent: true,
  opacity: 0.7,
});

const awaterBlockMaterial = new THREE.MeshLambertMaterial({ color: 0x1f9de0 });

const dirtSlab = new THREE.Mesh(slab, dirtBlockMaterial);
const grassSlab = new THREE.Mesh(slab, grassBlockMaterial);
const stoneSlab = new THREE.Mesh(slab, stoneBlockMaterial);
const waterSlab = new THREE.Mesh(slab, waterBlockMaterial);

const dirtBlock = new THREE.Mesh(block, dirtBlockMaterial);
const grassBlock = new THREE.Mesh(block, grassBlockMaterial);
const stoneBlock = new THREE.Mesh(block, stoneBlockMaterial);
const waterBlock = new THREE.InstancedMesh(
  block,
  waterBlockMaterial,
  gridInfo.divisions * gridInfo.divisions,
);

const populate = (scene: THREE.Scene, map: Array<CellProps>) => {
  map.forEach((cell) => {
    const cellX = cell.coords.x;
    const cellY = cell.coords.y;
    let heightLikeY = 0;

    cell.blockStack.forEach((blockVariant) => {
      switch (blockVariant) {
        case 'dirtSlab':
        case 'grassSlab':
        case 'stoneSlab':
        case 'waterSlab':
          heightLikeY += 0.25 * sideLengthUnit;
          break;
        default:
          heightLikeY += sideLengthUnit / 2;
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
          waterSlabClone.position.set(cellX, heightLikeY, cellY);
          scene.add(waterSlabClone);
          break;
      }
      switch (blockVariant) {
        case 'dirtBlock':
        case 'grassBlock':
        case 'stoneBlock':
        case 'waterBlock':
          heightLikeY += sideLengthUnit / 2;
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

const populateNoise = (scene: THREE.Scene) => {
  for (let x = 0; x <= gridInfo.divisions; x++) {
    for (let y = 0; y <= gridInfo.divisions; y++) {
      const noise = noiseFunctor({
        coords: {
          x,
          z: y,
        },
        maxValues: {
          x: gridInfo.divisions,
          z: gridInfo.divisions,
        },
      });

      let blockToClone: THREE.Mesh;
      let scaledNoise = noise * 10;

      const nx = x * sideLengthUnit;
      const ny = y * sideLengthUnit;
      let nz = noise * 5 * sideLengthUnit;
      if (noise < 0.2) {
        blockToClone = waterBlock;
        scaledNoise = 2;
        nz = sideLengthUnit / 2;
      } else if (noise < 0.4) {
        blockToClone = dirtBlock;
      } else if (noise < 0.6) {
        blockToClone = grassBlock;
      } else {
        blockToClone = stoneBlock;
      }

      console.log(noise);

      const block = blockToClone.clone();

      block.position.set(nx - offset, 0, ny - offset);
      block.scale.set(1, scaledNoise, 1);
      block.position.set(nx - offset, nz, ny - offset);
      scene.add(block);
    }
  }
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
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

      const lanternPointLight = new THREE.PointLight(0xefc070, 100, 100);
      lanternPointLight.position.set(0, 8, 0);

      const addLights = (): void => {
        scene.add(light, ambientLight);
      };
      addLights();
      disposals.push(
        light.dispose,
        ambientLight.dispose,
        lanternPointLight.dispose,
      );

      scene.fog = new THREE.Fog(0x000000, 1, 1000);
      scene.background = new THREE.Color(0xffe9c4);

      // ============================================================================================
      // Add Objects
      // ============================================================================================
      //fillMap(map);
      //populate(scene, mawp);

      populateNoise(scene);

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
    <div className="fullscreenCanvasContainer">
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
};
