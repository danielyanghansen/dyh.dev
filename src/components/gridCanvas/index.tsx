import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { noiseFunctor, noiseParams } from '@/utils/terrainGeneration';

const cameraDefaultPosition = new THREE.Vector3(30, 30, 30);
const directionalLightPosition = new THREE.Vector3(5, -5, 5);

const gridInfo = {
  // Keep the ration 1 to 1 for now
  size: 16,
  divisions: 16,
};

const offset = (gridInfo.size - gridInfo.size / gridInfo.divisions) / 2;

type BlockVariant =
  | 'dirtBlock'
  | 'dirtSlab'
  | 'grassBlock'
  | 'grassSlab'
  | 'stoneBlock'
  | 'stoneSlab'
  | 'waterBlock'
  | 'waterSlab';

type CellProps = {
  coords: THREE.Vector2;
  blockStack: Array<BlockVariant>;
};

const map: Array<CellProps> = [];

for (let x = 0; x < gridInfo.divisions; x++) {
  for (let z = 0; z < gridInfo.divisions; z++) {
    const noiseProps: noiseParams = {
      coords: { x: 1.1 * x, z: 1.1 * z },
      optionalParams: {
        frequency: 500,
        redistribution: 50, // needs to be an even number to avoid NaN
        extraOctaves: [
          {
            frequency: 0.005,
            redistribution: 2,
          },
          {
            frequency: 0.0025,
            redistribution: 4,
          },
          {
            frequency: 0.00125,
            redistribution: 8,
          },
        ],
      },
    };
    const noise = noiseFunctor(noiseProps);

    const blockStack: Array<BlockVariant> = [];

    // Set up initial block stack
    if (noise <= 0.1) {
      blockStack.push('waterSlab');
    }
    if (noise > 0.1) {
      blockStack.push('stoneBlock');
    }
    if (noise > 0.4) {
      blockStack.push('stoneBlock');
    }
    if (noise > 0.6) {
      blockStack.push('grassBlock');
    }
    if (noise > 0.9) {
      blockStack.push('dirtBlock');
    }
    if (noise > 1.2) {
      blockStack.push('grassBlock');
    }
    if (noise > 1.6) {
      blockStack.push('grassBlock');
    }
    if (noise > 2.1) {
      blockStack.push('grassBlock');
    }
    if (noise > 2.6) {
      blockStack.push('grassBlock');
    }
    if (noise > 3.3) {
      blockStack.push('stoneBlock');
    }
    if (noise > 5) {
      blockStack.push('stoneBlock');
    }

    // Add slabs
    if (noise % 0.1 > 0.05) {
      switch (blockStack[-1]) {
        case 'dirtBlock':
        case 'grassBlock':
          blockStack.push('grassSlab');
          break;
        case 'stoneBlock':
          blockStack.push('stoneSlab');
          break;
        default:
          break;
      }
    }

    map.push({
      coords: new THREE.Vector2(x - offset, z - offset),
      blockStack: blockStack,
    });
  }
}

console.log(map);

const gridHelper = new THREE.GridHelper(gridInfo.size, gridInfo.divisions);

const block = new THREE.BoxGeometry(1, 1, 1);
const slab = new THREE.BoxGeometry(1, 0.5, 1);

const dirtBlockMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
const grassBlockMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const stoneBlockMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
const waterBlockMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });

const dirtSlab = new THREE.Mesh(slab, dirtBlockMaterial);
const grassSlab = new THREE.Mesh(slab, grassBlockMaterial);
const stoneSlab = new THREE.Mesh(slab, stoneBlockMaterial);
const waterSlab = new THREE.Mesh(slab, waterBlockMaterial);

const dirtBlock = new THREE.Mesh(block, dirtBlockMaterial);
const grassBlock = new THREE.Mesh(block, grassBlockMaterial);
const stoneBlock = new THREE.Mesh(block, stoneBlockMaterial);
const waterBlock = new THREE.Mesh(block, waterBlockMaterial);

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

      renderer.setClearColor('SkyBlue');
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

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

      const light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.copy(directionalLightPosition);
      light.castShadow = true;
      const ambientLight = new THREE.AmbientLight(0xaaaaff, 0.2);

      scene.add(light, ambientLight);
      disposals.push(light.dispose, ambientLight.dispose);

      scene.fog = new THREE.Fog(0x000000, 1, 1000);
      scene.background = new THREE.Color(0x0e4745);

      // ============================================================================================
      // Add Objects
      // ============================================================================================
      scene.add(gridHelper);

      //Might want to make this disposal outside of useEffect to avoid attempting to dispose of undefined
      disposals.push(gridHelper.dispose);

      // BEEEEG Populate the map
      map.forEach((cell) => {
        let heightLikeY = 1 / 2;
        cell.blockStack.forEach((blockVariant) => {
          switch (blockVariant) {
            case 'dirtBlock':
              const dirtBlockClone = dirtBlock.clone();
              dirtBlockClone.position.set(
                cell.coords.x,
                heightLikeY,
                cell.coords.y,
              );
              scene.add(dirtBlockClone);
              break;
            case 'grassBlock':
              const grassBlockClone = grassBlock.clone();
              grassBlockClone.position.set(
                cell.coords.x,
                heightLikeY,
                cell.coords.y,
              );
              scene.add(grassBlockClone);
              break;
            case 'stoneBlock':
              const stoneBlockClone = stoneBlock.clone();
              stoneBlockClone.position.set(
                cell.coords.x,
                heightLikeY,
                cell.coords.y,
              );
              scene.add(stoneBlockClone);
              break;
            case 'waterBlock':
              const waterBlockClone = waterBlock.clone();
              waterBlockClone.position.set(
                cell.coords.x,
                heightLikeY,
                cell.coords.y,
              );
              scene.add(waterBlockClone);
              break;
            case 'dirtSlab':
              const dirtSlabClone = dirtSlab.clone();
              dirtSlabClone.position.set(
                cell.coords.x,
                heightLikeY,
                cell.coords.y,
              );
              scene.add(dirtSlabClone);
              break;
            case 'grassSlab':
              const grassSlabClone = grassSlab.clone();
              grassSlabClone.position.set(
                cell.coords.x,
                heightLikeY,
                cell.coords.y,
              );
              scene.add(grassSlabClone);
              break;
            case 'stoneSlab':
              const stoneSlabClone = stoneSlab.clone();
              stoneSlabClone.position.set(
                cell.coords.x,
                heightLikeY,
                cell.coords.y,
              );
              scene.add(stoneSlabClone);
              break;
            case 'waterSlab':
              const waterSlabClone = waterSlab.clone();
              waterSlabClone.position.set(
                cell.coords.x,
                heightLikeY,
                cell.coords.y,
              );
              scene.add(waterSlabClone);
              break;
          }
          switch (blockVariant) {
            case 'dirtBlock':
            case 'grassBlock':
            case 'stoneBlock':
            case 'waterBlock':
              heightLikeY += 1;
              break;
            case 'dirtSlab':
            case 'grassSlab':
            case 'stoneSlab':
            case 'waterSlab':
              heightLikeY += 0.5;
              break;
          }
        });
      });

      // ============================================================================================
      // Helpers and Dispose
      // ============================================================================================

      disposals.push(controls.dispose);
      disposals.push(renderer.dispose);

      // ============================================================================================
      // Animate
      // ============================================================================================

      const animate = (): void => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
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
