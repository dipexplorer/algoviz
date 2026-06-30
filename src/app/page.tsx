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
    <DashboardLayout activeAlgorithm={activeAlgorithm} onSelectAlgorithm={setActiveAlgorithm}>
      <div className="flex flex-col gap-6 pb-20">
        
        {/* Header Area */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">{currentInfo.title}</h1>
            <p className="text-slate-500 max-w-2xl text-lg">{currentInfo.description}</p>
          </div>
          <button 
            onClick={() => setArray(generateRandomArray(20))}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            Generate New Array
          </button>
        </div>
        
        {/* Visualizer Card */}
        <div className="bento-card bg-white p-6 min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-6 text-sm text-slate-500 font-medium">
            <span>Step {currentStepIndex + 1} / {history.length}</span>
            <div className="px-3 py-1 bg-slate-100 rounded-md">
              {currentStep?.message || "Initial array."}
            </div>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
            {currentStep && <ArrayVisualizer step={currentStep} />}
          </div>

          {/* Integrated Control Panel */}
          <div className="flex justify-center w-full">
            <ControlPanel 
              isPlaying={isPlaying}
              onPlay={play}
              onPause={pause}
              onReset={reset}
              onStep={stepForward}
              speed={speed}
              onSpeedChange={setSpeed}
            />
          </div>
        </div>
        
        {/* Complexity and Info Cards */}
        <AlgorithmInfo algorithm={currentInfo} />
      </div>
    </DashboardLayout>
  );
}
