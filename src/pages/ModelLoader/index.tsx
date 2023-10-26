import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
  let _gltf: GLTF;

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
      camera.position.z = 5;
      camera.position.y = 5;
      camera.position.x = 5;
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

      const light = new THREE.DirectionalLight(0xffffff, 0.6);
      light.position.set(5, -5, 5);
      light.castShadow = true;
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(light, ambientLight);

      scene.fog = new THREE.Fog(0x000000, 1, 1000);
      scene.background = new THREE.Color(0xbef7f5);

      // ============================================================================================
      // Add Objects
      // ============================================================================================

      loader.load(
        'casa.glb',
        (gltf) => {
          gltf.scene.scale.set(0.5, 0.5, 0.5);
          scene.add(gltf.scene);
          _gltf = gltf;
        },
        undefined,
        (error) => {
          console.error(error);
        },
      );

      const dispose = (): void => {
        console.log('dispose called');
      };

      disposals.push(dispose);

      const animate = (): void => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
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
    <div className={'page'}>
      <canvas className={'canvas'} ref={canvasRef}></canvas>
    </div>
  );
};

export default ModelLoaderPage;
