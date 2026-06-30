import { AlgorithmStep, AlgorithmHistory } from "../types";

export function getQuickSortHistory(initialArray: number[]): AlgorithmHistory {
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

  function partition(low: number, high: number): number {
    const pivot = array[high];
    
    history.push({
      array: [...array],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [...sortedIndices],
      pivotIndices: [high],
      message: `Selected ${pivot} as the pivot.`,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      history.push({
        array: [...array],
        comparingIndices: [j],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        pivotIndices: [high],
        message: `Comparing ${array[j]} with pivot ${pivot}.`,
      });

      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          history.push({
            array: [...array],
            comparingIndices: [],
            swappingIndices: [i, j],
            sortedIndices: [...sortedIndices],
            pivotIndices: [high],
            message: `${array[j]} < ${pivot}. Swapping ${array[i]} and ${array[j]}.`,
          });

          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;

          history.push({
            array: [...array],
            comparingIndices: [],
            swappingIndices: [i, j],
            sortedIndices: [...sortedIndices],
            pivotIndices: [high],
            message: `Swapped.`,
          });
        }
      }
    }

    // Swap pivot to its correct position
    const pivotCorrectIndex = i + 1;
    if (pivotCorrectIndex !== high) {
      history.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [pivotCorrectIndex, high],
        sortedIndices: [...sortedIndices],
        pivotIndices: [high],
        message: `Moving pivot ${pivot} to its correct sorted position.`,
      });

      const temp = array[pivotCorrectIndex];
      array[pivotCorrectIndex] = array[high];
      array[high] = temp;

      history.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [pivotCorrectIndex, high],
        sortedIndices: [...sortedIndices],
        pivotIndices: [pivotCorrectIndex],
        message: `Pivot ${pivot} is now in place.`,
      });
    }

    sortedIndices.push(pivotCorrectIndex);
    history.push({
      array: [...array],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [...sortedIndices],
      message: `${pivot} is now considered sorted.`,
    });

    return pivotCorrectIndex;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    } else if (low === high) {
      if (!sortedIndices.includes(low)) {
        sortedIndices.push(low);
        history.push({
          array: [...array],
          comparingIndices: [],
          swappingIndices: [],
          sortedIndices: [...sortedIndices],
          message: `Single element ${array[low]} is sorted.`,
        });
      }
    }
  }

  quickSort(0, array.length - 1);

  history.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [...sortedIndices],
    message: "Quick Sort completed!",
  });

  return history;
}
