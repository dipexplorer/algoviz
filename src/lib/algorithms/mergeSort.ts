import { AlgorithmStep, AlgorithmHistory } from "../types";

export function getMergeSortHistory(initialArray: number[]): AlgorithmHistory {
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

  function merge(left: number, mid: number, right: number) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let j = 0; j < n2; j++) R[j] = array[mid + 1 + j];

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      history.push({
        array: [...array],
        comparingIndices: [left + i, mid + 1 + j],
        swappingIndices: [],
        sortedIndices: [...sortedIndices],
        message: `Comparing left element ${L[i]} with right element ${R[j]}.`,
      });

      if (L[i] <= R[j]) {
        array[k] = L[i];
        i++;
      } else {
        array[k] = R[j];
        j++;
      }

      history.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [k],
        sortedIndices: [...sortedIndices],
        message: `Wrote ${array[k]} into the merged array.`,
      });
      k++;
    }

    while (i < n1) {
      array[k] = L[i];
      history.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [k],
        sortedIndices: [...sortedIndices],
        message: `Writing remaining left element ${array[k]}.`,
      });
      i++;
      k++;
    }

    while (j < n2) {
      array[k] = R[j];
      history.push({
        array: [...array],
        comparingIndices: [],
        swappingIndices: [k],
        sortedIndices: [...sortedIndices],
        message: `Writing remaining right element ${array[k]}.`,
      });
      j++;
      k++;
    }

    // At the end of a merge step spanning the whole array, those elements are technically sorted in that sub-array
    // For visual clarity, we only mark as green when the entire array is sorted at the very end
    if (left === 0 && right === array.length - 1) {
      for (let idx = 0; idx <= right; idx++) {
        if (!sortedIndices.includes(idx)) sortedIndices.push(idx);
      }
    }
  }

  function mergeSort(left: number, right: number) {
    if (left >= right) return;
    const mid = left + Math.floor((right - left) / 2);
    
    history.push({
      array: [...array],
      comparingIndices: [left, right],
      swappingIndices: [],
      sortedIndices: [...sortedIndices],
      message: `Dividing array from index ${left} to ${right}.`,
    });

    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSort(0, array.length - 1);

  history.push({
    array: [...array],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [...sortedIndices],
    message: "Merge Sort completed!",
  });

  return history;
}
