import { AlgorithmStep, AlgorithmHistory } from "../types";

export function getSelectionSortHistory(initialArray: number[]): AlgorithmHistory {
  const history: AlgorithmHistory = [];
  const array = [...initialArray];
  const sortedIndices: number[] = [];

  history.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [...sortedIndices],
    message: "Initial array.",
  });

  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Highlight the current minIndex we are starting with
    history.push({
      array: [...array],
      comparingIndices: [minIndex],
      swappingIndices: [],
      sortedIndices: [...sortedIndices],
      message: `Assuming ${array[minIndex]} (index ${minIndex}) is the minimum.`,
    });

    for (let j = i + 1; j < n; j++) {
      // Comparing current min with array[j]
      history.push({
        array: [...array],
        comparingIndices: [minIndex, j],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        message: `Comparing current min ${array[minIndex]} with ${array[j]}.`,
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        history.push({
          array: [...array],
          comparingIndices: [minIndex],
          swappingIndices: [],
          sortedIndices: [...sortedIndices],
          message: `Found new minimum: ${array[minIndex]}.`,
        });
      }
    }

    if (minIndex !== i) {
      // Swap needed
      history.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [i, minIndex],
        sortedIndices: [...sortedIndices],
        message: `Swapping ${array[i]} and ${array[minIndex]}.`,
      });

      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      history.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [i, minIndex],
        sortedIndices: [...sortedIndices],
        message: `Swapped.`,
      });
    } else {
      history.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        message: `${array[i]} is already in the correct position.`,
      });
    }

    sortedIndices.push(i);
    history.push({
      array: [...array],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [...sortedIndices],
      message: `${array[i]} is now in its sorted position.`,
    });
  }

  // The last element is inherently sorted
  sortedIndices.push(n - 1);
  history.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [...sortedIndices],
    message: "Selection Sort completed!",
  });

  return history;
}
