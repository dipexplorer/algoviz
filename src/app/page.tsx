"use client";

import React, { useMemo, useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ControlPanel } from "@/components/layout/ControlPanel";
import { ArrayVisualizer } from "@/components/visualizer/ArrayVisualizer";
import { useAlgorithmPlayer } from "@/hooks/useAlgorithmPlayer";
import { getBubbleSortHistory } from "@/lib/algorithms/bubbleSort";

// Generate a random array of integers
function generateRandomArray(length = 10, max = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * max) + 10);
}

export default function Home() {
  const [array, setArray] = useState<number[]>(() => generateRandomArray(15));
  
  // Recompute history only when the initial array changes
  const history = useMemo(() => getBubbleSortHistory(array), [array]);
  
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

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col pb-24">
        <header className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bubble Sort</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Bubble Sort is a simple sorting algorithm that repeatedly steps through the input list element by element, comparing the current element with the one after it, swapping their values if needed.
            </p>
          </div>
          <button 
            onClick={handleGenerateNew}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Generate New Array
          </button>
        </header>
        
        {/* Visualizer Canvas */}
        <div className="flex-1 border rounded-2xl bg-muted/10 flex flex-col relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
          
          {/* Status Bar */}
          <div className="relative z-10 p-4 border-b bg-background/50 backdrop-blur-sm flex justify-between items-center">
            <div className="text-sm font-medium">
              Step {currentStepIndex + 1} / {totalSteps}
            </div>
            <div className="text-sm font-medium text-primary">
              {currentStep?.message || "Ready"}
            </div>
          </div>

          {/* Canvas Area */}
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
