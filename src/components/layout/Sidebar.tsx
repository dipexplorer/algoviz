import React from 'react';
import { LayoutDashboard, ListTree, Code2, Network, ArrowDownUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AlgorithmType = "bubble" | "selection" | "insertion";

interface SidebarProps {
  activeAlgorithm: AlgorithmType;
  onSelectAlgorithm: (algo: AlgorithmType) => void;
}

export function Sidebar({ activeAlgorithm, onSelectAlgorithm }: SidebarProps) {
  const algorithms: { id: AlgorithmType; name: string }[] = [
    { id: "bubble", name: "Bubble Sort" },
    { id: "selection", name: "Selection Sort" },
    { id: "insertion", name: "Insertion Sort" },
  ];

  return (
    <aside className="w-64 border-r bg-background/50 backdrop-blur-xl h-full flex flex-col p-4 space-y-4">
      <div className="flex items-center space-x-2 font-bold text-xl mb-6">
        <Code2 className="text-primary" />
        <span>AlgoViz</span>
      </div>
      <nav className="flex-1 space-y-2">
        <div className="pt-2 pb-2 text-xs font-semibold uppercase text-muted-foreground flex items-center space-x-2">
          <ArrowDownUp size={14} />
          <span>Sorting Algorithms</span>
        </div>
        
        {algorithms.map((algo) => (
          <button
            key={algo.id}
            onClick={() => onSelectAlgorithm(algo.id)}
            className={cn(
              "w-full flex items-center space-x-2 p-2 rounded-lg transition-all text-left",
              activeAlgorithm === algo.id
                ? "bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20"
                : "hover:bg-accent text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{algo.name}</span>
          </button>
        ))}

        <div className="pt-6 pb-2 text-xs font-semibold uppercase text-muted-foreground flex items-center space-x-2 opacity-50">
          <ListTree size={14} />
          <span>Trees (Coming Soon)</span>
        </div>
        <div className="pt-2 pb-2 text-xs font-semibold uppercase text-muted-foreground flex items-center space-x-2 opacity-50">
          <Network size={14} />
          <span>Graphs (Coming Soon)</span>
        </div>
      </nav>
    </aside>
  );
}
