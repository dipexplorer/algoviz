"use client";

import React, { useMemo, useState } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ControlPanel } from "@/components/layout/ControlPanel";
import { ArrayVisualizer } from "@/components/visualizer/ArrayVisualizer";
import { AlgorithmInfo } from "@/components/visualizer/AlgorithmInfo";
import { useAlgorithmPlayer } from "@/hooks/useAlgorithmPlayer";
import { AlgorithmType } from "@/components/layout/Sidebar";
import { ALGORITHM_INFO } from "@/lib/data/algorithms";

function generateRandomArray(length = 10, max = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * max) + 10);
}

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
        
        {/* Complexity and Info Cards */}
        <AlgorithmInfo algorithm={currentInfo} />
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
