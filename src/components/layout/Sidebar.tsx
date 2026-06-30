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
    <aside className="w-64 glass-panel border-r-0 border-r border-white/5 h-full flex flex-col p-4 space-y-4 z-40 rounded-r-2xl m-4 my-4 ml-4">
      <Link href="/" className="flex items-center space-x-2 font-bold text-2xl mb-6 hover:opacity-80 transition-opacity tracking-tight">
        <Code2 className="text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">AlgoViz</span>
      </Link>

      
      <nav className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
        
        {/* SORTING SECTION */}
        <div>
          <Link href="/">
            <div className={cn(
              "pt-2 pb-2 text-xs font-semibold uppercase flex items-center space-x-2 transition-colors",
              isSortingRoute ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}>
              <ArrowDownUp size={14} />
              <span>Sorting Algorithms</span>
            </div>
          </Link>
          
          {isSortingRoute && (
            <div className="space-y-1 mt-1 pl-4 border-l-2 border-border/50 ml-2">
              {algorithms.map((algo) => (
                <button
                  key={algo.id}
                  onClick={() => onSelectAlgorithm?.(algo.id)}
                  className={cn(
                    "w-full flex items-center space-x-2 p-2 rounded-lg transition-all text-left text-sm",
                    activeAlgorithm === algo.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground"
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
              "pt-2 pb-2 text-xs font-semibold uppercase flex items-center space-x-2 transition-colors",
              isPathfindingRoute ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}>
              <Network size={14} />
              <span>Graph / Pathfinding</span>
            </div>
          </Link>

          {isPathfindingRoute && (
            <div className="space-y-1 mt-1 pl-4 border-l-2 border-border/50 ml-2">
              <div className="w-full flex items-center space-x-2 p-2 rounded-lg bg-primary/10 text-primary font-medium text-sm">
                <span>Breadth-First Search (BFS)</span>
              </div>
              <div className="w-full flex items-center space-x-2 p-2 rounded-lg text-muted-foreground/50 text-sm cursor-not-allowed">
                <span>DFS (Coming Soon)</span>
              </div>
            </div>
          )}
        </div>

        {/* TREES SECTION */}
        <div>
          <div className="pt-2 pb-2 text-xs font-semibold uppercase text-muted-foreground flex items-center space-x-2 opacity-50">
            <ListTree size={14} />
            <span>Trees (Coming Soon)</span>
          </div>
        </div>

      </nav>
    </aside>
  );
}
