import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PageProps {
  // props
}

const ModelLoaderPage: React.FC<PageProps> = () => {
  const loader = new GLTFLoader();

  let _gltf: GLTF;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef?.current != null) {
      // ============================================================================================
      // Configure Camera, Scene, and Renderer
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

      const someCube = new THREE.TorusGeometry(5, 1, 100, 100, Math.PI);

      const someMaterial = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide,
      });
      const someMesh = new THREE.Mesh(someCube, someMaterial);

      scene.add(someMesh);

      // ============================================================================================
      // Add Objects
      // ============================================================================================

      loader.load(
        'casa.glb',
        (gltf) => {
          gltf.scene.scale.set(100, 100, 100);
          scene.add(gltf.scene);
          _gltf = gltf;
        },
        undefined,
        (error) => {
          console.error(error);
        },
      );

      renderer.render(scene, camera);
    }
  }, [canvasRef.current]);

  return (
    <div className={'page'}>
      <canvas className={'canvas'} ref={canvasRef}></canvas>
    </div>
  );
};

export default ModelLoaderPage;
