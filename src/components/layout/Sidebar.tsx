import React from 'react';
import { LayoutDashboard, ListTree, Code2, Network, ArrowDownUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export type AlgorithmType = "bubble" | "selection" | "insertion" | "merge" | "quick";

interface SidebarProps {
  activeAlgorithm?: AlgorithmType;
  onSelectAlgorithm?: (algo: AlgorithmType) => void;
}

export function Sidebar({ activeAlgorithm, onSelectAlgorithm }: SidebarProps) {
  const pathname = usePathname();
  const isSortingRoute = pathname === "/";
  const isPathfindingRoute = pathname === "/pathfinding";

  const algorithms: { id: AlgorithmType; name: string }[] = [
    { id: "bubble", name: "Bubble Sort" },
    { id: "selection", name: "Selection Sort" },
    { id: "insertion", name: "Insertion Sort" },
    { id: "merge", name: "Merge Sort" },
    { id: "quick", name: "Quick Sort" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col p-6 space-y-6 z-40">
      <Link href="/" className="flex items-center space-x-3 font-bold text-2xl mb-2 hover:opacity-80 transition-opacity tracking-tight">
        <div className="bg-blue-500 p-2 rounded-xl">
          <Code2 className="text-white w-6 h-6" />
        </div>
        <span className="text-slate-900">AlgoViz</span>
      </Link>

      
      <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
        
        {/* SORTING SECTION */}
        <div>
          <Link href="/">
            <div className={cn(
              "text-xs font-bold tracking-wider uppercase flex items-center space-x-2 transition-colors mb-3",
              isSortingRoute ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            )}>
              <ArrowDownUp size={14} />
              <span>Sorting Algorithms</span>
            </div>
          </Link>
          
          {isSortingRoute && (
            <div className="space-y-1">
              {algorithms.map((algo) => (
                <button
                  key={algo.id}
                  onClick={() => onSelectAlgorithm?.(algo.id)}
                  className={cn(
                    "w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl transition-all text-left text-sm font-medium",
                    activeAlgorithm === algo.id
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                  )}
                >
                  <span>{algo.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PATHFINDING SECTION */}
        <div>
          <Link href="/pathfinding">
            <div className={cn(
              "text-xs font-bold tracking-wider uppercase flex items-center space-x-2 transition-colors mb-3",
              isPathfindingRoute ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            )}>
              <Network size={14} />
              <span>Graph / Pathfinding</span>
            </div>
          </Link>

          {isPathfindingRoute && (
            <div className="space-y-1">
              <div className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-medium text-sm shadow-sm">
                <span>Breadth-First Search</span>
              </div>
              <div className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-slate-400 text-sm cursor-not-allowed">
                <span>DFS (Coming Soon)</span>
              </div>
            </div>
          )}
        </div>

        {/* TREES SECTION */}
        <div>
          <div className="text-xs font-bold tracking-wider uppercase text-slate-300 flex items-center space-x-2 mb-3">
            <ListTree size={14} />
            <span>Trees (Coming Soon)</span>
          </div>
        </div>

      </nav>
    </aside>
  );
}
