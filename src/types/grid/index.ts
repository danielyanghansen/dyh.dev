export type GridInfo2D<T> = {
  height: number;
  width: number;
  organization: 'rowMajor' | 'columnMajor';
  grid: Array<Array<T>>;
};
