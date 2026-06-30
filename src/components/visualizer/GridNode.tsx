"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface GridNodeProps {
  row: number;
  col: number;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

// Ensure the memo correctly compares props to avoid unnecessary re-renders
export const GridNode = React.memo(({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}: GridNodeProps) => {
  // Base classes for the cell
  let baseClass = "w-6 h-6 border-r border-b border-slate-200 transition-all duration-200";
  
  if (isStart) {
    baseClass += " bg-emerald-500 shadow-sm scale-105 z-10 rounded-sm";
  } else if (isEnd) {
    baseClass += " bg-red-500 shadow-sm scale-105 z-10 rounded-sm";
  } else if (isWall) {
    baseClass += " bg-slate-800 scale-105 rounded-sm shadow-inner transition-transform duration-200";
  } else {
    baseClass += " bg-white hover:bg-slate-100";
  }

  return (
    <div
      id={`node-${row}-${col}`}
      className={baseClass}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
      onDragStart={(e) => e.preventDefault()}
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.isStart === nextProps.isStart &&
    prevProps.isEnd === nextProps.isEnd &&
    prevProps.isWall === nextProps.isWall
  );
});
