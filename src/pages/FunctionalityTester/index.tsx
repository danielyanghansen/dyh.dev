import React from 'react';
import { SceneRenderer } from '@/components/sceneRenderer';
import { createBoxScene } from '@/threeScenes/boxScene';
import type { ThreeSceneConfig, ThreeSceneSettings } from '@/types/three';

const ModelLoaderPage: React.FC = () => {
  const config: ThreeSceneConfig = {
    backgroundColor: 'SkyBlue',
    controls: {
      enableOrbitControls: true,
    },
  };

  const boxScene = createBoxScene(config);

  const settings: ThreeSceneSettings = {
    enableOrbitControls: true,
  };

  return (
    <>
      <SceneRenderer sceneActions={boxScene} settings={settings} />
    </>
  );
};

export default ModelLoaderPage;
