import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
interface LoadingScreenProps {
  isOpen: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isOpen = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const green_basic = new THREE.MeshStandardMaterial({ color: 'green' });
  const white_basic = new THREE.MeshStandardMaterial({ color: 'white' });
  const teal_basic = new THREE.MeshStandardMaterial({ color: 'teal' });
  const res = 26;
  const res2 = 26;
  const refSize = 6;

  const boxGrid = {
    // var?
    xResolution: res,
    yResolution: res2,
    sideLength: 1,
    minHeight: 0,
    maxHeight: 1,
    boxes: new Array(res * res2),
  };

  const displayString = 'Loading...';

  const innerDimX = (refSize * boxGrid.sideLength) / boxGrid.xResolution;
  const innerDimZ = (refSize * boxGrid.sideLength) / boxGrid.yResolution;
  const miniBox = new THREE.BoxGeometry(
    innerDimX,
    boxGrid.maxHeight,
    innerDimZ,
  );

  const ArrayPosToGridPos = (arrayPos: number) => {
    return {
      positionX: arrayPos % boxGrid.xResolution,
      positionY: Math.floor(arrayPos / boxGrid.xResolution),
    };
  };

  const IsAtEdge = (arrayPos: number) => {
    const gridPos = ArrayPosToGridPos(arrayPos);
    return (
      gridPos.positionX === 0 ||
      gridPos.positionX === boxGrid.xResolution - 1 ||
      gridPos.positionY === 0 ||
      gridPos.positionY === boxGrid.yResolution - 1
    );
  };

  const IsOddDistanceFromCenter = (arrayPos: number) => {
    const gridPos = ArrayPosToGridPos(arrayPos);
    return (
      Math.abs(
        Math.sqrt(
          Math.pow(gridPos.positionX - boxGrid.xResolution / 2, 2) +
            Math.pow(gridPos.positionY - boxGrid.yResolution / 2, 2),
        ),
      ) %
        2 ===
      1
    );
  };

  const IsWithinDistanceFromCenter = (arrayPos: number, distance: number) => {
    const gridPos = ArrayPosToGridPos(arrayPos);
    return (
      Math.sqrt(
        Math.pow(gridPos.positionX - boxGrid.xResolution / 2, 2) +
          Math.pow(gridPos.positionY - boxGrid.yResolution / 2, 2),
      ) < distance
    );
  };

  let t = 1;

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;

      // Create a Three.js scene
      const scene = new THREE.Scene();

      // Create a Three.js camera
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000,
      );
      camera.position.z = 5;
      camera.position.y = 5;
      camera.position.x = 5;

      camera.lookAt(-5, 0, -5);

      // Create a Three.js renderer
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      // Create a Three.js cube
      const geometry = new THREE.BoxGeometry(2);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xffff00,
      });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const test = [1, 1, 1, 1, 1, 1, 1];
      const meshes: THREE.Mesh[] = [];

      test.forEach((element, index) => {
        const theMesh = new THREE.Mesh(miniBox, lambertMaterial);
        const gridPos = ArrayPosToGridPos(index);
        theMesh.position.x = index % boxGrid.xResolution;
        meshes.push(theMesh);
      });

      meshes.forEach((element) => {
        scene.add(element);
      });

      // add a light source
      // const light = new THREE.PointLight(0xffffff, 1);
      // light.position.set(5, 5, 5);
      // scene.add(light);

      // Set background to white
      scene.background = new THREE.Color(0xffffff);

      // Animate the cube
      const animate = () => {
		  cube.rotation.x += 0.01;
		  cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        meshes.forEach((element, index) => {
          const gridPos = ArrayPosToGridPos(index);
          element.position.x = gridPos.positionX;
          element.position.z = gridPos.positionY;
          element.position.y = Math.sin(t + index);
          t += 0.005;
        });
        camera.lookAt(meshes[1].position);
        camera.position.x = 3 * Math.sin(t);
        camera.position.z = 3 * Math.cos(t);
		requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
