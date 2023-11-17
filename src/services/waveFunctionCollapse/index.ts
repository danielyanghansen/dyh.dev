import type {
  WeightedOption,
  WfcCell,
  Grid,
  GridInfo,
  WfcChoice,
  CalculateEntropy,
  SelectOption,
} from './types.ts';

/**
 * Calculate the entropy of a set of weighted possibilities, to be used in the WFC algorithm
 * @param weightedPossibilities A set of weighted possibilities
 * @returns an entropy value, which is a measure of the disorder of the system. Generally, a set with uniform weights will have a higher entropy than a set with non-uniform weights.
 */
export const calculateEntropy: CalculateEntropy = (weightedPossibilities) => {
  const sumOfWeights = Array.from(weightedPossibilities).reduce((acc, curr) => {
    return acc + curr.weight;
  }, 0);

  const sumOfWeightLogWeights = Array.from(weightedPossibilities).reduce(
    (acc, curr) => {
      return acc + curr.weight * Math.log(curr.weight);
    },
    0,
  );

  const entropy = Math.log(sumOfWeights) - sumOfWeightLogWeights / sumOfWeights;

  return entropy;
};

/**
 * Select an option from a set of weighted possibilities, to be used in the WFC algorithm
 * @param weightedPossibilities A set of weighted possibilities
 * @returns a value from the set of weighted possibilities
 */
export const selectOptionWeightedRandom: SelectOption = <T>(
  weightedPossibilities: Set<WeightedOption<T>>,
): T => {
  const sumOfWeights = Array.from(weightedPossibilities).reduce((acc, curr) => {
    return acc + curr.weight;
  }, 0);

  const randomValue = Math.random() * sumOfWeights;

  let runningSum = 0;
  for (const weightedOption of weightedPossibilities) {
    runningSum += weightedOption.weight;
    if (randomValue < runningSum) {
      return weightedOption.value;
    }
  }

  throw new Error('selectOptionWeightedRandom failed');
};
