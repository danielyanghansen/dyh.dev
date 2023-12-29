import {
  type CalculateEntropy,
  type SelectOption,
  type WeightedOption,
} from './types';

export const normalizeWeightedOptions = <T>(
  options: Array<WeightedOption<T>>,
): Array<WeightedOption<T>> => {
  const maxWeight = options.reduce((acc, currOption) => {
    return Math.max(acc, currOption.weight);
  }, 1);

  const normalizedOptions = options.map((option) => {
    return {
      ...option,
      weight: option.weight / maxWeight,
    };
  });
  return normalizedOptions;
};

/**
 * Calculate the entropy of an array of weighted possibilities, to be used in the WFC algorithm
 * @param weightedPossibilities An array of weighted possibilities
 * @returns an entropy value, which is a measure of the disorder of the system. Generally, a set with uniform weights will have a higher entropy than a set with non-uniform weights.
 */
export const calculateEntropy: CalculateEntropy = (weightedPossibilities) => {
  const sumOfWeights = weightedPossibilities.reduce((acc, curr) => {
    return acc + curr.weight;
  }, 0);

  const sumOfWeightLogWeights = weightedPossibilities.reduce((acc, curr) => {
    return acc + curr.weight * Math.log(curr.weight);
  }, 0);

  const entropy = Math.log(sumOfWeights) - sumOfWeightLogWeights / sumOfWeights;

  return entropy;
};

/**
 * Select an option from an array of weighted possibilities, to be used in the WFC algorithm
 * @param weightedPossibilities An array of weighted possibilities
 * @returns a value from the array of weighted possibilities
 */
export const selectOptionWeightedRandom: SelectOption = <T>(
  weightedPossibilities: Array<WeightedOption<T>>,
): T => {
  const sumOfWeights = weightedPossibilities.reduce((acc, curr) => {
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
