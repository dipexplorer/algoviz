import { getBubbleSortHistory } from "../algorithms/bubbleSort";
import { getSelectionSortHistory } from "../algorithms/selectionSort";
import { getInsertionSortHistory } from "../algorithms/insertionSort";
import { getMergeSortHistory } from "../algorithms/mergeSort";
import { getQuickSortHistory } from "../algorithms/quickSort";
import { AlgorithmHistory } from "../types";
import { AlgorithmType } from "@/components/layout/Sidebar";

export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface AlgorithmDetails {
  title: string;
  description: string;
  complexities: AlgorithmComplexity;
  codeSnippet: string;
  generator: (arr: number[]) => AlgorithmHistory;
}

export const ALGORITHM_INFO: Record<AlgorithmType, AlgorithmDetails> = {
  bubble: {
    title: "Bubble Sort",
    description: "Bubble Sort repeatedly steps through the list, comparing adjacent elements and swapping them if they are in the wrong order. It is named for the way smaller or larger elements 'bubble' to the top of the list.",
    complexities: {
      time: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
    },
    codeSnippet: `function bubbleSort(arr) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}`,
    generator: getBubbleSortHistory,
  },
  selection: {
    title: "Selection Sort",
    description: "Selection Sort divides the list into a sorted and unsorted region. It repeatedly selects the smallest element from the unsorted region and swaps it with the leftmost unsorted element.",
    complexities: {
      time: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
    },
    codeSnippet: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
}`,
    generator: getSelectionSortHistory,
  },
  insertion: {
    title: "Insertion Sort",
    description: "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
    complexities: {
      time: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
    },
    codeSnippet: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    generator: getInsertionSortHistory,
  },
  merge: {
    title: "Merge Sort",
    description: "Merge Sort is an efficient, stable sorting algorithm that makes use of the divide and conquer principle. It divides the unsorted list into n sublists, each containing one element, and then repeatedly merges sublists to produce new sorted sublists.",
    complexities: {
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      space: "O(n)",
    },
    codeSnippet: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    generator: getMergeSortHistory,
  },
  quick: {
    title: "Quick Sort",
    description: "Quick Sort is a highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays. A large array is partitioned into two arrays one of which holds values smaller than the specified value, say pivot, based on which the partition is made and another array holds values greater than the pivot value.",
    complexities: {
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      space: "O(log n)",
    },
    codeSnippet: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}`,
    generator: getQuickSortHistory,
  },
};
