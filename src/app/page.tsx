"use client";

import React, { useMemo, useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ControlPanel } from "@/components/layout/ControlPanel";
import { ArrayVisualizer } from "@/components/visualizer/ArrayVisualizer";
import { useAlgorithmPlayer } from "@/hooks/useAlgorithmPlayer";
import { AlgorithmType } from "@/components/layout/Sidebar";
import { getBubbleSortHistory } from "@/lib/algorithms/bubbleSort";
import { getSelectionSortHistory } from "@/lib/algorithms/selectionSort";
import { getInsertionSortHistory } from "@/lib/algorithms/insertionSort";
import { getMergeSortHistory } from "@/lib/algorithms/mergeSort";
import { getQuickSortHistory } from "@/lib/algorithms/quickSort";
import { AlgorithmHistory } from "@/lib/types";

function generateRandomArray(length = 10, max = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * max) + 10);
}

const ALGORITHM_INFO: Record<AlgorithmType, { title: string; description: string; generator: (arr: number[]) => AlgorithmHistory }> = {
  bubble: {
    title: "Bubble Sort",
    description: "Bubble Sort repeatedly steps through the list, comparing adjacent elements and swapping them if they are in the wrong order.",
    generator: getBubbleSortHistory,
  },
  selection: {
    title: "Selection Sort",
    description: "Selection Sort divides the list into a sorted and unsorted region. It repeatedly selects the smallest element from the unsorted region and swaps it with the leftmost unsorted element.",
    generator: getSelectionSortHistory,
  },
  insertion: {
    title: "Insertion Sort",
    description: "Insertion Sort builds the final sorted array one item at a time by repeatedly taking the next element and inserting it into the correct position within the sorted portion.",
    generator: getInsertionSortHistory,
  },
  merge: {
    title: "Merge Sort",
    description: "Merge Sort is a divide-and-conquer algorithm that splits the array in half, recursively sorts each half, and then merges the sorted halves back together.",
    generator: getMergeSortHistory,
  },
  quick: {
    title: "Quick Sort",
    description: "Quick Sort is a divide-and-conquer algorithm that selects a 'pivot' element and partitions the array so that elements smaller than the pivot are on the left and larger on the right, then recursively sorts the partitions.",
    generator: getQuickSortHistory,
  },
};

export default function Home() {
  const [activeAlgorithm, setActiveAlgorithm] = useState<AlgorithmType>("bubble");
  const [array, setArray] = useState<number[]>(() => generateRandomArray(15));
  
  const currentInfo = ALGORITHM_INFO[activeAlgorithm];
  
  const history = useMemo(() => currentInfo.generator(array), [array, currentInfo]);
  
  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
  } = useAlgorithmPlayer(history);

  const handleGenerateNew = () => {
    setArray(generateRandomArray(15));
  };

  const handleSelectAlgorithm = (algo: AlgorithmType) => {
    setActiveAlgorithm(algo);
    setArray(generateRandomArray(15)); // Optionally regenerate array on switch
  };

  return (
    <DashboardLayout activeAlgorithm={activeAlgorithm} onSelectAlgorithm={handleSelectAlgorithm}>
      <div className="h-full flex flex-col pb-24">
        <header className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{currentInfo.title}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {currentInfo.description}
            </p>
          </div>
          <button 
            onClick={handleGenerateNew}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Generate New Array
          </button>
        </header>
        
        <div className="flex-1 border rounded-2xl bg-muted/10 flex flex-col relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
          
          <div className="relative z-10 p-4 border-b bg-background/50 backdrop-blur-sm flex justify-between items-center">
            <div className="text-sm font-medium">
              Step {currentStepIndex + 1} / {totalSteps}
            </div>
            <div className="text-sm font-medium text-primary">
              {currentStep?.message || "Ready"}
            </div>
          </div>

          <div className="flex-1 relative z-10 flex items-center justify-center p-8">
            {currentStep && <ArrayVisualizer step={currentStep} />}
          </div>
        </div>
      </div>

      <ControlPanel 
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onStep={stepForward}
        onReset={reset}
        speed={speed}
        onSpeedChange={setSpeed}
      />
    </DashboardLayout>
  );
}
