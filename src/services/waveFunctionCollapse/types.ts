export type WeightedOption<T> = {
  value: T;
  weight: number;
};

export type WfcCell<T> = {
  hasFinalValue: boolean;
  finalValue: T | undefined;
  possibleValues: Set<WeightedOption<T>>;
  entropy: number;
};

export type Grid<T> = WfcCell<T>[][];

export type GridInfo<T> = {
  width: number;
  height: number;

  grid: Grid<T>;
};

export type WfcChoice<T> = {
  x: number;
  y: number;
  value: T;
};

export type CalculateEntropy = (
  weightedPossibilities: Set<WeightedOption<any>>,
) => number;

export type SelectOption<T> = (
  weightedPossibilities: Set<WeightedOption<T>>,
) => T;
