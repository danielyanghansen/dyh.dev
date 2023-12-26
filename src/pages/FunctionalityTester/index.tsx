import React from 'react';
import { SceneRenderer } from '@/components/sceneRenderer';
import { createBoxScene } from '@/threeScenes/boxScene';
import type { ThreeSceneConfig, ThreeSceneSettings } from '@/types/three';
import { Typography } from '@mui/material';

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
      <Typography
        variant="h4"
        sx={{
          zIndex: 10,
          position: 'fixed',
          top: '10%',
          left: '10%',
          color: 'white',
        }}
      >
        {' '}
        This page is just for myself to be able to test my sceneRenderer
        component
      </Typography>
      <SceneRenderer sceneActions={boxScene} settings={settings} />
    </>
  );
};

export default ModelLoaderPage;
