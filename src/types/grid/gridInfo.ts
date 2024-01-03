import { GridOrganization } from './gridEnums';

export interface GridInfo2D<T> {
  metadata: {
    height: number;
    width: number;
    organization: GridOrganization;
  };

  grid: T[][];
  functions: {
    getElement: (x: number, y: number) => T;
    setElement: (x: number, y: number, value: T) => void;
    populateGrid?: (value: T) => void;

    // This one might not be too useful
    fillRange?: (
      value: T,
      xStart: number,
      xEnd: number,
      yStart: number,
      yEnd: number,
    ) => void;
  };
}
