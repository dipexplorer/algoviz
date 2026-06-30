export type AlgorithmStep = {
  array: number[];
  comparingIndices: number[]; // Highlight yellow
  swappingIndices: number[];  // Highlight red
  sortedIndices: number[];    // Highlight green
  message: string;            // Explanation of what's happening
};

export type AlgorithmHistory = AlgorithmStep[];
