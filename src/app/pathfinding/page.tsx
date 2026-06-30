"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GridNode } from "@/components/visualizer/GridNode";
import { NodeType, GridType } from "@/lib/pathfinding/types";
import { bfs, getNodesInShortestPathOrder } from "@/lib/algorithms/bfs";
import { Play, RotateCcw, MousePointer2 } from 'lucide-react';

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;
const NUM_ROWS = 20;
const NUM_COLS = 50;

const createInitialGrid = (): GridType => {
  const grid: GridType = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow: NodeType[] = [];
    for (let col = 0; col < NUM_COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col: number, row: number): NodeType => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isPath: false,
  };
};

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState<GridType>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  // Ref to hold the DOM nodes for ultra-fast animations without React re-renders
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGrid(createInitialGrid());
  }, []);

  const handleMouseDown = useCallback((row: number, col: number) => {
    if (isRunning) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }, [grid, isRunning]);

  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (!mouseIsPressed || isRunning) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }, [grid, mouseIsPressed, isRunning]);

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false);
  }, []);

  const animateShortestPath = (nodesInShortestPathOrder: NodeType[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.isStart || node.isEnd) return;
        const domNode = document.getElementById(`node-${node.row}-${node.col}`);
        if (domNode) {
          domNode.className = "w-6 h-6 border border-border/50 transition-colors bg-yellow-400 scale-105 rounded-sm shadow-[0_0_10px_rgba(250,204,21,0.8)]";
        }
      }, 30 * i);
    }
    setTimeout(() => {
      setIsRunning(false);
    }, 30 * nodesInShortestPathOrder.length);
  };

  const animateAlgorithm = (visitedNodesInOrder: NodeType[], nodesInShortestPathOrder: NodeType[]) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.isStart || node.isEnd) return;
        const domNode = document.getElementById(`node-${node.row}-${node.col}`);
        if (domNode) {
          // Add a custom animation class here for the "ripple" effect
          domNode.className = "w-6 h-6 border border-border/50 bg-primary/40 rounded-full scale-90 transition-all duration-300";
          
          // Shortly after, expand it to fill the cell for a cool trailing effect
          setTimeout(() => {
            domNode.className = "w-6 h-6 border border-border/50 bg-primary/20 transition-all duration-500";
          }, 150);
        }
      }, 10 * i);
    }
  };

  const visualizeBFS = () => {
    if (isRunning) return;
    setIsRunning(true);
    
    // Clear previous visual paths (we do this by resetting the grid state to clear walls, OR we just reset the DOM classes)
    // To be clean, we should reset the grid state but KEEP walls.
    const cleanGrid = grid.map(row => row.map(node => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null
    })));
    
    // Reset DOM classes manually before starting to ensure clean state without full re-render
    cleanGrid.forEach(row => row.forEach(node => {
        if (!node.isStart && !node.isEnd && !node.isWall) {
            const domNode = document.getElementById(`node-${node.row}-${node.col}`);
            if (domNode) domNode.className = "w-6 h-6 border border-border/50 transition-colors bg-background";
        }
    }));
    
    setGrid(cleanGrid);

    const startNode = cleanGrid[START_NODE_ROW][START_NODE_COL];
    const finishNode = cleanGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(cleanGrid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const clearBoard = () => {
    if (isRunning) return;
    const newGrid = createInitialGrid();
    setGrid(newGrid);
    // Force DOM reset
    newGrid.forEach(row => row.forEach(node => {
        if (!node.isStart && !node.isEnd) {
            const domNode = document.getElementById(`node-${node.row}-${node.col}`);
            if (domNode) domNode.className = "w-6 h-6 border border-border/50 transition-colors bg-background";
        }
    }));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full relative" onMouseLeave={handleMouseUp}>
        <header className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">Breadth-First Search</h1>
            <p className="text-white/60 mt-2 max-w-2xl flex items-center space-x-2 text-lg">
              <MousePointer2 size={18} className="text-[#00F0FF]"/> 
              <span>Click and drag on the grid to draw walls.</span>
            </p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={clearBoard}
              disabled={isRunning}
              className="px-5 py-2.5 glass-panel text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              <RotateCcw size={18} />
              <span>Clear Grid</span>
            </button>
            <button 
              onClick={visualizeBFS}
              disabled={isRunning}
              className="px-6 py-2.5 bg-[#00F0FF] text-black font-bold rounded-lg hover:bg-[#00F0FF]/90 transition-all glow-cyan flex items-center space-x-2 disabled:opacity-50"
            >
              <Play size={18} />
              <span>Run BFS</span>
            </button>
          </div>
        </header>

        {/* Legend */}
        <div className="flex space-x-8 mb-6 p-4 glass-card rounded-xl border-white/5">
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-[#39FF14] glow-lime rounded-sm"></div><span className="text-sm font-medium text-white/80">Start</span></div>
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-[#FF003C] glow-magenta rounded-sm"></div><span className="text-sm font-medium text-white/80">Target</span></div>
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-[#111] border border-[#333] shadow-inner rounded-sm"></div><span className="text-sm font-medium text-white/80">Wall</span></div>
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-[#00F0FF]/30 border border-[#00F0FF]/50 rounded-sm"></div><span className="text-sm font-medium text-white/80">Visited</span></div>
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-[#FFD700] glow-yellow rounded-sm"></div><span className="text-sm font-medium text-white/80">Shortest Path</span></div>
        </div>

        {/* Grid Container */}
        <div className="flex-1 overflow-hidden glass-card rounded-3xl p-6 flex items-center justify-center relative shadow-2xl border-white/5">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
            
            <div 
              ref={gridRef}
              className="grid gap-0 z-10 p-2 glass-panel rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.05)]"
              style={{ gridTemplateColumns: `repeat(${NUM_COLS}, minmax(0, 1fr))` }}
            >
              {grid.map((row, rowIdx) => (
                row.map((node, nodeIdx) => {
                  const { row, col, isStart, isEnd, isWall } = node;
                  return (
                    <GridNode
                      key={`${row}-${col}`}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isEnd={isEnd}
                      isWall={isWall}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={handleMouseEnter}
                      onMouseUp={handleMouseUp}
                    />
                  );
                })
              ))}
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const getNewGridWithWallToggled = (grid: GridType, row: number, col: number) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (node.isStart || node.isEnd) return newGrid;
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
