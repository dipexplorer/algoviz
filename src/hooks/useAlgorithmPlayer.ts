import { useState, useEffect, useCallback } from 'react';
import { AlgorithmHistory, AlgorithmStep } from '../lib/types';

export function useAlgorithmPlayer(history: AlgorithmHistory) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // ms per step

  const currentStep: AlgorithmStep | undefined = history[currentStepIndex];
  const isFinished = currentStepIndex >= history.length - 1;

  const play = useCallback(() => {
    if (!isFinished) setIsPlaying(true);
  }, [isFinished]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const stepForward = useCallback(() => {
    if (currentStepIndex < history.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [currentStepIndex, history.length]);

  const stepBackward = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  // Handle automatic playback
  useEffect(() => {
    if (isPlaying && !isFinished) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (isFinished) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStepIndex, isFinished, speed]);

  // If the history changes (e.g. user generates a new array), reset the player
  useEffect(() => {
    reset();
  }, [history, reset]);

  return {
    currentStep,
    currentStepIndex,
    totalSteps: history.length,
    isPlaying,
    isFinished,
    speed,
    setSpeed,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
  };
}
