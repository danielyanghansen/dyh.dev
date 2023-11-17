import { GridDirection } from '@/types/grid/index.ts';
import type {
  WeightedOption,
  WfcGridInfo,
  WfcCell,
  WfcRuleBase,
} from './types.ts';

import {
  normalizeWeightedOptions,
  calculateEntropy,
  selectOptionWeightedRandom,
} from './utils.ts';

/**
 * @abstract NON-DETERMINISTIC FUNCTION
 * Expects entropy to be pre-calculated for each cell in the grid
 * @param wfcGridInfo
 * @returns boolean indicating whether or not the grid has finished collapsing
 */
export const wfcGridCollapseIteration = <T>(
  wfcGridInfo: WfcGridInfo<T>,
): boolean => {
  const { grid, width, height, rules } = wfcGridInfo;

  // Select the cell with the lowest entropy
  // Might be able to optimize this by keeping track of the cell with the lowest entropy as we go
  const cells = grid.flatMap((row) => {
    return row;
  });

  const cellWithLowestEntropy = cells.reduce((acc, curr) => {
    if (curr.entropy < acc.entropy) {
      return curr;
    } else {
      return acc;
    }
  }, cells[0]);

  // If the cell has a final value, then we're done
  if (cellWithLowestEntropy.hasFinalValue) {
    return true;
  }

  // Select a value for the cell
  const selectedValue = selectOptionWeightedRandom(
    cellWithLowestEntropy.possibleValues,
  );

  // Set the cell's final value
  cellWithLowestEntropy.finalValue = selectedValue;
  cellWithLowestEntropy.hasFinalValue = true;

  // Propagate the change to neighboring cells

  const relevantRules = rules
    .filter((ruleset) => {
      return ruleset.tileOrigin === selectedValue;
    })
    .flatMap((ruleset) => {
      return ruleset.rules;
    })
    .flatMap((rule) => {
      return rule;
    });

  const upRules = relevantRules.filter((rule) => {
    return rule.direction === GridDirection.Up;
  });
  const downRules = relevantRules.filter((rule) => {
    return rule.direction === GridDirection.Down;
  });
  const leftRules = relevantRules.filter((rule) => {
    return rule.direction === GridDirection.Left;
  });
  const rightRules = relevantRules.filter((rule) => {
    return rule.direction === GridDirection.Right;
  });

  const frontier: WfcCell<T>[] = [];
  const collapsedCells = [
    grid[cellWithLowestEntropy.x][cellWithLowestEntropy.y],
  ];

  /**
   * Iteratively fill the frontier with new cells
   * @returns a boolean indicating whether or not the frontier was changed in this iteration
   */
  const fillFrontierIteration = (collapsedCells: WfcCell<T>[]) => {
    let changed = false;

    const getNextWeightedPossibilities = (
      originCell: WfcCell<T>,
      rules: WfcRuleBase<T>[],
    ): Array<WeightedOption<T>> => {
      const newPossibleValuesNotJoined: Array<WeightedOption<T>> =
        originCell.possibleValues.flatMap((weightedOption) => {
          const { value, weight } = weightedOption;

          // For each possible value, get the rules that apply to it and weight them by the weight of the current value
          const relevantWeightedPossibilities: Array<WeightedOption<T>> =
            rules.flatMap((rule) => {
              return rule.weightedPossibilities
                .filter((weightedPossibility) => {
                  return weightedPossibility.value === value; // Only keep the rules that apply to the current value
                })
                .map((weightedPossibility) => {
                  return {
                    ...weightedPossibility,
                    weight: weightedPossibility.weight * weight, // Weight the rules by the weight of the current value
                  };
                });
            });

          return relevantWeightedPossibilities;
        });

      const newPossibleValuesJoined: Array<WeightedOption<T>> = [];
      newPossibleValuesNotJoined.forEach((weightedOption) => {
        const existing = newPossibleValuesJoined.find((existingOption) => {
          return existingOption.value === weightedOption.value;
        });
        if (existing) {
          existing.weight += weightedOption.weight;
        } else {
          newPossibleValuesJoined.push(weightedOption);
        }
      });
      return normalizeWeightedOptions(newPossibleValuesJoined);
    };

    const applyRulesAndPushToFrontier = (
      cell: WfcCell<T>,
      nextX: number,
      nextY: number,
      rules: WfcRuleBase<T>[],
    ) => {
      if (
        !cell.hasFinalValue &&
        !frontier.includes(grid[nextX][nextY]) &&
        !collapsedCells.includes(grid[nextX][nextY])
      ) {
        const next = grid[nextX][nextY];

        // Set the new possible values
        next.possibleValues = getNextWeightedPossibilities(cell, rules);

        // Calculate the new entropy
        next.entropy = calculateEntropy(next.possibleValues);

        frontier.push(next);
        changed = true;
      }
    };

    for (const cell of collapsedCells) {
      if (cell.x > 0) {
        // Left
        applyRulesAndPushToFrontier(cell, cell.x - 1, cell.y, leftRules);
      }
      if (cell.x < width - 1) {
        // Right
        applyRulesAndPushToFrontier(cell, cell.x + 1, cell.y, rightRules);
      }
      if (cell.y > 0) {
        // Up
        applyRulesAndPushToFrontier(cell, cell.x, cell.y - 1, upRules);
      }
      if (cell.y < height - 1) {
        // Down
        applyRulesAndPushToFrontier(cell, cell.x, cell.y + 1, downRules);
      }
    }
    return changed;
  };

  while (fillFrontierIteration(collapsedCells)) {
    // This loop should run until the frontier can no longer be filled
    // Each iteration will:
    // 1. Fill the frontier with new cells
    // 2. Partially Collapse the frontier
    // 2.1  Retrieve relevant rules
    // 2.2 Use rules to propogate superpositions to the frontier
    // 2.3 Place all frontier cells into the collapsed cells

    frontier.forEach((cell) => {
      if (!collapsedCells.includes(cell)) {
        collapsedCells.push(cell);
      }
    });

    // 3. Repeat
  }

  // TODO: Check if multiplicative weights is the correct way to do this

  return false;
};
