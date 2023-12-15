import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import {
  type GLTF,
  GLTFLoader,
} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../../shared.css';

const cameraDefaultPosition = new THREE.Vector3(10, 5, 5);
const modelScale = new THREE.Vector3(0.5, 0.5, 0.5);
const carScale = new THREE.Vector3(1.3, 1.3, 1.3);
const directionalLightPosition = new THREE.Vector3(5, -5, 5);

// VERY SENSITIVE
const lanternPointLightPosition = new THREE.Vector3(3.4, 0.7, 1.7);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PageProps {}

const ModelLoaderPage: React.FC<PageProps> = () => {
  const disposals: Array<() => void> = [];
  const disposeAll = (): void => {
    disposals.forEach((d) => {
      d();
    });
  };

  const loader = new GLTFLoader();
  // let _gltf: GLTF;

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

      // ============================================================================================
      // Add Lights, shadows, fog, and background
      // ============================================================================================

      const light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.copy(directionalLightPosition);
      light.castShadow = true;
      const ambientLight = new THREE.AmbientLight(0xaaaaff, 0.2);

      const lanternPointLight = new THREE.PointLight(0xefc070, 100, 100);
      lanternPointLight.position.copy(lanternPointLightPosition);

      // For checking light position
      /*
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.15), new THREE.MeshBasicMaterial({color: 0xff0000}));
      ball.position.copy(lanternPointLightPosition)
      scene.add(ball)
       */

      scene.add(light, ambientLight, lanternPointLight);

      scene.fog = new THREE.Fog(0x000000, 1, 1000);
      scene.background = new THREE.Color(0x0e4745);

      // ============================================================================================
      // Add Objects
      // ============================================================================================

      loader.load(
        'casa.glb',
        (gltf) => {
          gltf.scene.scale.copy(modelScale);
          gltf.scene.castShadow = true;
          gltf.scene.position.y = 0;
          gltf.scene.position.z = 0;
          scene.add(gltf.scene);
        },
        undefined,
        (error) => {
          console.error(error);
        },
      );
      loader.load(
        'truck_long.glb',
        (gltf) => {
          gltf.scene.castShadow = true;
          gltf.scene.scale.copy(carScale);
          gltf.scene.rotateZ(-0.05);
          gltf.scene.rotateY(Math.PI / 2.2);
          gltf.scene.position.x = 3.5;
          gltf.scene.position.y = -0.75;
          gltf.scene.position.z = 0;
          scene.add(gltf.scene);
        },
        undefined,
        (error) => {
          console.error(error);
        },
      );

      const dispose = (): void => {
        console.log('dispose called');
        light.dispose();
        ambientLight.dispose();
        lanternPointLight.dispose();

        renderer.dispose();
      };

      disposals.push(dispose);

      const animate = (): void => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [canvasRef.current]);

  useEffect(() => {
    return () => {
      if (location.pathname !== '/model') {
        disposeAll();
      }
    };
  }, [location]);

  return (
    <div className={'fullscreenCanvasContainer'}>
      <canvas className={'canvas'} ref={canvasRef}></canvas>
    </div>
  );
};

export default ModelLoaderPage;
