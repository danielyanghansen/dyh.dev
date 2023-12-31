import type { Vector3 } from 'three';

/**
 * ThreeSceneActions is the interface that all threeScenes must implement
 * @param populateScene - populateScene is called once when the scene is first loaded, and should return true if the scene is ready to be rendered
 * @param animateFrame - animateFrame is the callback that is called on every animation frame
 * @param dispose - dispose is called when the scene is unloaded
 * @param reloadAssets - callback implemented by the scene to reload assets
 * @param resetScene - resetScene callback implemented by the scene to reset the scene to its initial state
 */
export interface ThreeSceneActions {
  populateScene: (scene: THREE.Scene) => boolean;
  animateFrame: (t_ms?: number) => void;
  // animateFrame should called externally

  dispose: () => void;

  getCameraConfig?: () => ThreeCameraConfig;
  resetScene?: () => void;
  reloadAssets?: () => void;
}

export interface ThreeSceneSettings {
  enableOrbitControls?: boolean;
  renderer?: {
    pixelRatio?: number;
    size?: {
      width?: number;
      height?: number;
    };
  };
}

export interface ThreeCameraConfig {
  configParams?: {
    fov?: number;
    aspect?: number;
    near?: number;
    far?: number;
  };
  position?: Vector3;
  lookAt?: Vector3;
}

export interface ThreeSceneConfig {
  width?: number;
  height?: number;
  backgroundColor?: string;
  camera?: ThreeCameraConfig;
  controls?: {
    enableOrbitControls?: boolean;
  };
}

export type CreateThreeScene = (config: ThreeSceneConfig) => ThreeSceneActions;
