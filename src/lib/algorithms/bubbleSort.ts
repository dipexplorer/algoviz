import { AlgorithmStep, AlgorithmHistory } from "../types";

export function getBubbleSortHistory(initialArray: number[]): AlgorithmHistory {
  const history: AlgorithmHistory = [];
  const array = [...initialArray];
  const sortedIndices: number[] = [];

  // Initial step
  history.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [...sortedIndices],
    message: "Initial array.",
  });

  const n = array.length;
  let swapped: boolean;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing step
      history.push({
        array: [...array],
        comparingIndices: [j, j + 1],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        message: `Comparing ${array[j]} and ${array[j + 1]}.`,
      });

      if (array[j] > array[j + 1]) {
        // Swap
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;

        // Swapping step
        history.push({
          array: [...array],
          comparingIndices: [],
          swappingIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          message: `Swapped ${array[j + 1]} and ${array[j]} since ${array[j + 1]} > ${array[j]}.`,
        });
      }
    }

    // The element at n - i - 1 is now in its correct sorted position
    sortedIndices.push(n - i - 1);
    history.push({
      array: [...array],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [...sortedIndices],
      message: `${array[n - i - 1]} is now in its sorted position.`,
    });

    if (!swapped) {
      // If no swaps occurred, the rest of the array is sorted
      break;
    }
  }

  // Mark remaining elements as sorted
  for (let k = 0; k < n; k++) {
    if (!sortedIndices.includes(k)) {
      sortedIndices.push(k);
    }
  }

  // Final step
  history.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [...sortedIndices],
    message: "Bubble Sort completed!",
  });

  return history;
}
