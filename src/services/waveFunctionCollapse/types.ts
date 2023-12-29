import { type GridDirection } from '@/types/grid';

export interface WeightedOption<T> {
  value: T;
  weight: number;
}

export interface WfcCell<T> {
  hasFinalValue: boolean;
  finalValue: T | undefined;
  possibleValues: Array<WeightedOption<T>>;
  entropy: number;
  x: number;
  y: number;
}

interface GridInfo<T> {
  width: number;
  height: number;

  grid: Array<Array<WfcCell<T>>>;
}

/**
 * A WFC grid is a grid with a set of rules for each tile
 * @template T The type of the tile
 * @property {GridInfo<T>} gridInfo The grid info
 * @property {Array<WfcTileRuleset<T>>} rules The rules for each tile. Should be grouped by tile origin
 */
export type WfcGridInfo<T> = GridInfo<T> & {
  rules: Array<WfcTileRuleset<T>>;
};

export interface WfcChoice<T> {
  x: number;
  y: number;
  value: T;
}

export type CalculateEntropy = <T>(
  weightedPossibilities: Array<WeightedOption<T>>,
) => number;

export type SelectOption = <T>(
  weightedPossibilities: Array<WeightedOption<T>>,
) => T;

// Note: Currenlty, the WFC algorithm only supports 2D grids, and a rule distance of 1
export interface WfcRuleBase<T> {
  direction: GridDirection;
  weightedPossibilities: Array<WeightedOption<T>>;
}

export type WfcRule<T> = WfcRuleBase<T> & {
  tileOrigin: T;
};

export interface WfcTileRuleset<T> {
  tileOrigin: T;
  rules: Array<WfcRuleBase<T>>;
}

export type WfcRuleFunction = <T>(
  gridInfo: GridInfo<T>,
  selectedTile: { x: number; y: number },
) => GridInfo<T>;
