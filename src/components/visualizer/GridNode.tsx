"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface GridNodeProps {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited?: boolean; // Managed externally or via class injection for performance
  isPath?: boolean;    // Managed externally or via class injection for performance
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

// We use React.memo to prevent unnecessary re-renders of all 1000 nodes when only a few change
export const GridNode = React.memo(function GridNode({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: GridNodeProps) {
  
  // Note: For extreme performance, isVisited and isPath classes are usually injected directly via DOM manipulation (Refs) in the parent component during the animation loop, bypassing React state. We set up the base classes here.
  
  let extraClassName = "";
  if (isStart) extraClassName = "bg-[#39FF14] glow-lime rounded-sm z-20";
  else if (isEnd) extraClassName = "bg-[#FF003C] glow-magenta rounded-sm z-20";
  else if (isWall) extraClassName = "bg-[#111] border-[#333] scale-105 rounded-sm transition-all duration-200 z-10 shadow-inner";
  else extraClassName = "bg-transparent border-white/5"; // Default unvisited

  return (
    <div
      id={`node-${row}-${col}`} // ID used for DOM manipulation during animation
      className={cn(
        "w-6 h-6 border-r border-b transition-colors relative", 
        extraClassName
      )}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
});
