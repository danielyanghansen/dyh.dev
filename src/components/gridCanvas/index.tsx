import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
  gridSpecification,
  sideLengthUnit,
  offset,
  noiseFunctor,
} from './gridUtils';

import { createNoiseGridInfo2D } from '@/services/noiseProceduralGeneration';

import '../../shared.css';
import { type GridInfo2D } from '@/types/grid';

const cameraDefaultPosition = new THREE.Vector3(10, 10, 10);
const directionalLightPosition = new THREE.Vector3(20, -20, 20);

const gridHelper = new THREE.GridHelper(
  gridSpecification.size,
  gridSpecification.divisions,
);

const block = new THREE.BoxGeometry(
  1 * sideLengthUnit,
  1 * sideLengthUnit,
  1 * sideLengthUnit,
);

const waterFieldGeometry = new THREE.BoxGeometry(
  gridSpecification.size + 0.1,
  2 * sideLengthUnit,
  gridSpecification.size + 0.1,
);

const wallPlusCornerGeometry = new THREE.BoxGeometry(
  1 * sideLengthUnit,
  4 * sideLengthUnit,
  (gridSpecification.divisions + 2) * sideLengthUnit,
);

const sideWallGeometry = new THREE.BoxGeometry(
  gridSpecification.divisions * sideLengthUnit,
  4 * sideLengthUnit,
  1 * sideLengthUnit,
);

const dirtBlockMaterial = new THREE.MeshLambertMaterial({ color: 0xe0621f });
const grassBlockMaterial = new THREE.MeshLambertMaterial({ color: 0x86eb23 });
const stoneBlockMaterial = new THREE.MeshLambertMaterial({ color: 0x5c280d });
const sandBlockMaterial = new THREE.MeshLambertMaterial({ color: 0xc2b280 });
const waterBlockMaterial = new THREE.MeshToonMaterial({
  color: 0x1f9de0,
  transparent: true,
  opacity: 0.7,
});

const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

const dirtBlock = new THREE.Mesh(block, dirtBlockMaterial);
const grassBlock = new THREE.Mesh(block, grassBlockMaterial);
const stoneBlock = new THREE.Mesh(block, stoneBlockMaterial);
const sandBlock = new THREE.Mesh(block, sandBlockMaterial);

const waterField = new THREE.Mesh(waterFieldGeometry, waterBlockMaterial);

const wallOffset = ((gridSpecification.divisions + 1) * sideLengthUnit) / 2;
const northWall = new THREE.Mesh(wallPlusCornerGeometry, wallMaterial);
northWall.position.set(wallOffset, 0, 0);
const southWall = new THREE.Mesh(wallPlusCornerGeometry, wallMaterial);
southWall.position.set(-wallOffset, 0, 0);
const eastWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
eastWall.position.set(0, 0, wallOffset);
const westWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
westWall.position.set(0, 0, -wallOffset);

// TODO: This needs to be split into two functions, one for the map and one for the noise
// This is to maintain the SRP
const populateNoise = (scene: THREE.Scene) => {
  scene.add(waterField);
  scene.add(northWall, southWall, eastWall, westWall);

  const noiseTable: GridInfo2D<number> = createNoiseGridInfo2D(
    gridSpecification.divisions,
    gridSpecification.divisions,
    1.2,
    noiseFunctor,
  );

  let blockToClone: THREE.Mesh = sandBlock; // Single instanciation, with fallback

  for (let x = 0; x < noiseTable.metadata.width; x++) {
    for (let y = 0; y < noiseTable.metadata.height; y++) {
      const noise = noiseTable.functions.getElement(x, y); // Is a little slow, but not too bad. Rather slow than hard to read
      if (noise < 0.01) {
        continue;
      } else if (noise < 0.2) {
        blockToClone = sandBlock;
      } else if (noise < 0.4) {
        blockToClone = dirtBlock;
      } else if (noise < 0.6) {
        blockToClone = grassBlock;
      } else {
        blockToClone = stoneBlock;
      }

      const block = blockToClone.clone();

      const scaledNoise = noise * 10;

      const nx = (x + 1) * sideLengthUnit;
      const ny = (y + 1) * sideLengthUnit;
      const nz = noise * 5 * sideLengthUnit;

      block.scale.set(1, scaledNoise, 1);
      block.position.set(nx - offset, nz, ny - offset);
      scene.add(block);
    }
  }
};

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
      scene.background = new THREE.Color(0xffffff);

      // ============================================================================================
      // Add Objects
      // ============================================================================================

      populateNoise(scene);

      scene.add(gridHelper);

      // Might want to make this disposal outside of useEffect to avoid attempting to dispose of undefined
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

  useEffect(() => {
    return () => {
      if (location.pathname !== '/') {
        console.log('dispose called');
        disposeAll();
      }
    };
  }, [location]);

  return (
    <div className="fullscreenCanvasContainer">
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
};
