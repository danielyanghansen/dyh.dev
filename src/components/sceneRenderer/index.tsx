import { ThreeSceneActions, ThreeSceneSettings } from '@/types';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';

interface SceneRendererProps {
  sceneActions: ThreeSceneActions;
  settings: ThreeSceneSettings;
}

export const SceneRenderer: React.FC<SceneRendererProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current != null) {
      const canvas = canvasRef.current;

      const scene = new THREE.Scene();

      const cameraConfig = {
        configParams: {
          fov: 75,
          aspect: canvas.clientWidth / canvas.clientHeight,
          near: 0.1,
          far: 1000,
        },
        lookAt: new THREE.Vector3(0, 0, 0),
        position: new THREE.Vector3(5, 5, 5),

        ...props.sceneActions.getCameraConfig(),
      };

      const camera = new THREE.PerspectiveCamera(
        cameraConfig.configParams.fov,
        cameraConfig.configParams.aspect,
        cameraConfig.configParams.near,
        cameraConfig.configParams.far,
      );

      camera.lookAt(cameraConfig.lookAt);
      camera.position.copy(cameraConfig.position);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        depth: true,
        preserveDrawingBuffer: true,
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      const controls = new OrbitControls(camera, renderer.domElement);

      // POPULATE FROM SCENE
      props.sceneActions.populateScene(scene);

      const animate = () => {
        props.sceneActions.animateFrame();
        if (props.settings.enableOrbitControls) {
          controls.update();
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
    }
  }),
    [canvasRef.current];

  return <canvas ref={canvasRef} className="canvas" />;
};
