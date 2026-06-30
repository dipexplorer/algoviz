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
        if (!node.isStart && !node.isEnd) {
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) {
            el.className = "w-6 h-6 border-r border-b border-slate-200 bg-amber-400 shadow-md scale-105 z-20 rounded-sm transition-all duration-200";
          }
        }
      }, 30 * i);
    }
  };

  const animateAlgorithm = (visitedNodesInOrder: NodeType[], nodesInShortestPathOrder: NodeType[]) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
          setIsRunning(false);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isEnd) {
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) {
            el.className = "w-6 h-6 border-r border-b border-blue-300 bg-blue-200 shadow-sm transition-all duration-200";
          }
        }
      }, 10 * i);
    }
  };

  const visualizeBFS = () => {
    if (isRunning) return;
    setIsRunning(true);
    
    const cleanGrid = grid.map(row => row.map(node => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null
    })));
    
    cleanGrid.forEach(row => row.forEach(node => {
        if (!node.isStart && !node.isEnd && !node.isWall) {
            const domNode = document.getElementById(`node-${node.row}-${node.col}`);
            if (domNode) domNode.className = "w-6 h-6 border-r border-b border-slate-200 bg-white hover:bg-slate-100 transition-all duration-200";
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
    newGrid.forEach(row => row.forEach(node => {
        if (!node.isStart && !node.isEnd) {
            const domNode = document.getElementById(`node-${node.row}-${node.col}`);
            if (domNode) domNode.className = "w-6 h-6 border-r border-b border-slate-200 bg-white hover:bg-slate-100 transition-all duration-200";
        }
    }));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 pb-20" onMouseLeave={handleMouseUp}>
        <header className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Breadth-First Search</h1>
            <p className="text-slate-500 max-w-2xl text-lg flex items-center space-x-2">
              <MousePointer2 size={18} className="text-blue-500"/> 
              <span>Click and drag on the grid to draw walls.</span>
            </p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={clearBoard}
              disabled={isRunning}
              className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center space-x-2 disabled:opacity-50"
            >
              <RotateCcw size={18} />
              <span>Clear Grid</span>
            </button>
            <button 
              onClick={visualizeBFS}
              disabled={isRunning}
              className="px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20 flex items-center space-x-2 disabled:opacity-50"
            >
              <Play size={18} />
              <span>Run BFS</span>
            </button>
          </div>
        </header>

        {/* Legend */}
        <div className="flex space-x-8 p-4 bento-card bg-white items-center">
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-emerald-500 rounded-lg"></div><span className="text-sm font-semibold text-slate-600">Start</span></div>
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-red-500 rounded-lg"></div><span className="text-sm font-semibold text-slate-600">Target</span></div>
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-slate-800 rounded-lg shadow-inner"></div><span className="text-sm font-semibold text-slate-600">Wall</span></div>
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-blue-200 border border-blue-300 rounded-lg"></div><span className="text-sm font-semibold text-slate-600">Visited</span></div>
          <div className="flex items-center space-x-3"><div className="w-5 h-5 bg-amber-400 rounded-lg"></div><span className="text-sm font-semibold text-slate-600">Shortest Path</span></div>
        </div>

        {/* Grid Container */}
        <div className="bento-card bg-white p-6 flex flex-col items-center justify-center min-h-[500px]">
            <div 
              ref={gridRef}
              className="grid gap-0 p-2 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner"
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
