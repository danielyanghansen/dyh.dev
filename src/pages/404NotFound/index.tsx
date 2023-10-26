import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import './404NotFound.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotFoundPageProps {
  // props
}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  // prettier-ignore
  const grid404reversed = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' '],
    [' ', 'X', ' ', ' ', 'X', ' ', 'X', ' ', ' ', 'X', ' ', 'X', ' ', ' ', 'X', ' '],
    [' ', 'X', 'X', 'X', 'X', ' ', 'X', ' ', ' ', 'X', ' ', 'X', 'X', 'X', 'X', ' '],
    [' ', ' ', ' ', ' ', 'X', ' ', 'X', ' ', ' ', 'X', ' ', ' ', ' ', ' ', 'X', ' '],
    [' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']

  ]

  const blockVirtualSideLength = 1;
  const blockSideNegativeMargin = 0.04;
  const emptyMaterial = new THREE.MeshLambertMaterial({ color: 0xee1111 });
  const filledMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee });

  const blockActualSideLength =
    blockVirtualSideLength - 2 * blockSideNegativeMargin;

  const blockGeometry = new THREE.BoxGeometry(
    blockActualSideLength,
    blockActualSideLength,
    blockActualSideLength,
  );

  const blocks: THREE.Mesh[] = [];
  const width = grid404reversed[0].length;
  const height = grid404reversed.length;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const grid404 = grid404reversed.reverse();

  let t = 1; // used for animation frames

  useEffect(() => {
    if (canvasRef?.current != null) {
      const canvas = canvasRef.current;

      // create blocks
      grid404.forEach((row, i) => {
        row.forEach((col, j) => {
          const material = col === 'X' ? filledMaterial : emptyMaterial;
          const block = new THREE.Mesh(blockGeometry, material);
          block.position.x =
            j * blockVirtualSideLength -
            (width / 2) * blockVirtualSideLength +
            blockSideNegativeMargin;
          block.position.y =
            i * blockVirtualSideLength -
            (height / 2) * blockVirtualSideLength +
            blockSideNegativeMargin;
          block.position.z = 0;
          blocks.push(block);
        });
      });
      // ============================================================================================
      // create scene and camera
      // ============================================================================================
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        100,
      );
      camera.position.z = 9;
      camera.position.y = 3;

      camera.lookAt(0, 0, 0);

      // create renderer
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      //= ===============================================================================================
      // add objects to scene
      //= ===============================================================================================
      blocks.forEach((block) => scene.add(block));
      // Set background to sky blue
      scene.background = new THREE.Color(0x60dffe);
      // Add light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 5, 100);
      scene.add(light, ambientLight);

      const animate = (): void => {
        requestAnimationFrame(animate);
        t += 0.01;

        blocks.forEach((block) => {
          block.position.z =
            Math.sin(t * 5 + block.position.x) / 3 +
            Math.cos(t + block.position.y) / 15;
        });
        camera.position.x = Math.sin(t / 2) * 3;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      animate();
    }
  }, [canvasRef.current, grid404, window]);

  return (
    <div className={'page'}>
      <div className={'canvasContainer'}>
        <canvas className={'canvas'} ref={canvasRef}></canvas>
      </div>
      <h2>You seem to have misnavigated</h2>
    </div>
  );
};

export default NotFoundPage;
