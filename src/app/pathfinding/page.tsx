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
      <div className="flex flex-col h-full" onMouseLeave={handleMouseUp}>
        <header className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Breadth-First Search (BFS)</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl flex items-center space-x-2">
              <MousePointer2 size={16} className="text-primary"/> 
              <span>Click and drag on the grid to draw walls (obstacles).</span>
            </p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={clearBoard}
              disabled={isRunning}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <RotateCcw size={18} />
              <span>Clear Board</span>
            </button>
            <button 
              onClick={visualizeBFS}
              disabled={isRunning}
              className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center space-x-2 disabled:opacity-50"
            >
              <Play size={18} />
              <span>Visualize BFS</span>
            </button>
          </div>
        </header>

        {/* Legend */}
        <div className="flex space-x-6 mb-4 p-3 bg-muted/20 rounded-xl border">
          <div className="flex items-center space-x-2"><div className="w-5 h-5 bg-green-500 rounded-sm"></div><span className="text-sm">Start Node</span></div>
          <div className="flex items-center space-x-2"><div className="w-5 h-5 bg-red-500 rounded-sm"></div><span className="text-sm">Target Node</span></div>
          <div className="flex items-center space-x-2"><div className="w-5 h-5 bg-slate-700 border-slate-800 rounded-sm"></div><span className="text-sm">Wall Node</span></div>
          <div className="flex items-center space-x-2"><div className="w-5 h-5 bg-primary/20 rounded-sm"></div><span className="text-sm">Visited Node</span></div>
          <div className="flex items-center space-x-2"><div className="w-5 h-5 bg-yellow-400 rounded-sm"></div><span className="text-sm">Shortest Path</span></div>
        </div>

        {/* Grid Container */}
        <div className="flex-1 overflow-auto bg-muted/10 border rounded-2xl p-4 flex items-center justify-center min-w-max shadow-inner relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] z-0"></div>
            <div 
              ref={gridRef}
              className="grid gap-0 z-10 p-2 bg-background/50 backdrop-blur-sm rounded-xl border shadow-xl"
              style={{ gridTemplateColumns: \`repeat(\${NUM_COLS}, minmax(0, 1fr))\` }}
            >
              {grid.map((row, rowIdx) => (
                row.map((node, nodeIdx) => {
                  const { row, col, isStart, isEnd, isWall } = node;
                  return (
                    <GridNode
                      key={\`\${row}-\${col}\`}
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
