"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlgorithmStep } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ArrayVisualizerProps {
  step: AlgorithmStep;
}

export function ArrayVisualizer({ step }: ArrayVisualizerProps) {
  if (!step) return null;

  const { array, comparingIndices, swappingIndices, sortedIndices, pivotIndices = [] } = step;
  const maxValue = Math.max(...array, 1); // Avoid division by zero

  return (
    <div className="flex items-end justify-center h-64 w-full gap-2 p-4">
      {array.map((value, index) => {
        const isComparing = comparingIndices.includes(index);
        const isSwapping = swappingIndices.includes(index);
        const isSorted = sortedIndices.includes(index);
        const isPivot = pivotIndices.includes(index);

        let barColor = "bg-primary";
        if (isPivot) barColor = "bg-purple-500"; // Purple for pivot
        else if (isSwapping) barColor = "bg-destructive"; // Red for swapping
        else if (isComparing) barColor = "bg-yellow-500"; // Yellow for comparing
        else if (isSorted) barColor = "bg-green-500"; // Green for sorted

        // Calculate height as a percentage of the max value
        const heightPercentage = (value / maxValue) * 100;

        return (
          <motion.div
            layout // This magical prop handles the smooth swapping animation!
            key={value} // IMPORTANT: Key must be the value (or unique ID) so Framer Motion knows it moved, not just changed index
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={cn(
              "w-12 rounded-t-md flex flex-col items-center justify-end text-primary-foreground font-bold pb-2",
              barColor
            )}
            style={{ height: `${heightPercentage}%` }}
          >
            {value}
          </motion.div>
        );
      })}
    </div>
  );
}
