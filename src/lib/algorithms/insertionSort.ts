import { AlgorithmStep, AlgorithmHistory } from "../types";

export function getInsertionSortHistory(initialArray: number[]): AlgorithmHistory {
  const history: AlgorithmHistory = [];
  const array = [...initialArray];
  // For insertion sort, the sorted portion grows from the left.
  const sortedIndices: number[] = [0];

  history.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [...sortedIndices],
    message: "Initial array. The first element is considered sorted.",
  });

  const n = array.length;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    history.push({
      array: [...array],
      comparingIndices: [i],
      swappingIndices: [],
      sortedIndices: [...sortedIndices],
      message: `Selected ${key} to be inserted into the sorted portion.`,
    });

    while (j >= 0 && array[j] > key) {
      history.push({
        array: [...array],
        comparingIndices: [j, j + 1],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        message: `${array[j]} is greater than ${key}. Shifting ${array[j]} to the right.`,
      });

      array[j + 1] = array[j];

      history.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        message: `Shifted.`,
      });

      j = j - 1;
    }

    // Now insert the key at its correct position
    array[j + 1] = key;
    
    // Add the newly sorted index to the array
    if (!sortedIndices.includes(i)) {
      sortedIndices.push(i);
    }

    history.push({
      array: [...array],
      comparingIndices: [],
      swappingIndices: [j + 1],
      sortedIndices: [...sortedIndices],
      message: `Inserted ${key} at its correct position.`,
    });
  }

  history.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [...sortedIndices],
    message: "Insertion Sort completed!",
  });

  return history;
}
