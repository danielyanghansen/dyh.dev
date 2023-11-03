import React, { useRef } from 'react';

import * as THREE from 'three';

const gridInfo = {
  size: 10,
  divisions: 10,
};

const gridHelper = new THREE.GridHelper(gridInfo.size, gridInfo.divisions);

export const GridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div>
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
};
